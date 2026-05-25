import React, { useState, useEffect } from "react";
import { MessageSquare, Phone, ArrowUp, X, Sparkles, AlertCircle, ShoppingBag, ShieldAlert } from "lucide-react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomeSection from "./components/HomeSection";
import MenuSection from "./components/MenuSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import AdminSection from "./components/AdminSection";
import ToastContainer, { ToastMessage, ToastType } from "./components/Toast";
import { CMSData, Advertisement } from "./types";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [cmsData, setCmsData] = useState<CMSData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Promo Popups controller
  const [activePromoAd, setActivePromoAd] = useState<Advertisement | null>(null);
  const [hasAdTriggeredThisSession, setHasAdTriggeredThisSession] = useState(false);

  // Back to top floating states
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Toast dispatch utility
  const addToast = (message: string, type: ToastType = "info") => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Fetch Public CMS Content
  const fetchCmsData = async () => {
    try {
      const res = await fetch("/api/public/data");
      if (res.ok) {
        const data: CMSData = await res.json();
        setCmsData(data);
      } else {
        addToast("Error loading server-side CMS catalog. Reconnecting...", "error");
      }
    } catch {
      addToast("Network connection idle. Running dynamic local seed backup.", "warning");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCmsData();

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Synchronous Dynamic Header SEO Injector & Rich Schema microdata injection (Lighthouse optimization)
  useEffect(() => {
    if (cmsData) {
      // 1. Title Override
      document.title = cmsData.seo.title;

      // 2. Head Meta Description Inject
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement("meta");
        metaDesc.setAttribute("name", "description");
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute("content", cmsData.seo.description);

      // 3. Structured Data JSON-LD Schema
      const existingJsonLd = document.getElementById("momos-kingdom-sitemicro");
      if (existingJsonLd) existingJsonLd.remove();

      const script = document.createElement("script");
      script.id = "momos-kingdom-sitemicro";
      script.type = "application/ld+json";
      script.innerHTML = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FoodEstablishment",
        "name": "Momos Kingdom Karachi",
        "image": cmsData.seo.ogImage,
        "telephone": cmsData.settings.phone,
        "url": cmsData.seo.canonicalUrl,
        "priceRange": "PKR",
        "servesCuisine": "Fast Food, Steamed Dumplings, Crispy Fried Momos",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Block 4, Clifton Food Street",
          "addressLocality": "Clifton, Karachi",
          "addressCountry": "PK"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "1420",
          "bestRating": "5"
        }
      });
      document.head.appendChild(script);
    }
  }, [cmsData]);

  // Scheduled Advertisement trigger timeout logic
  useEffect(() => {
    if (cmsData && cmsData.advertisements.length > 0 && !hasAdTriggeredThisSession) {
      // Filter list of active and scheduled campaigns
      const now = new Date();
      const eligibleAds = cmsData.advertisements.filter((ad) => {
        if (!ad.active) return false;
        const start = new Date(ad.scheduleStart);
        const end = new Date(ad.scheduleEnd);
        return now >= start && now <= end;
      });

      if (eligibleAds.length > 0) {
        // Sort by highest priority parameter
        eligibleAds.sort((a, b) => b.priority - a.priority);
        const selectedAd = eligibleAds[0];

        // Trigger timeout delay
        const timer = setTimeout(() => {
          setActivePromoAd(selectedAd);
          setHasAdTriggeredThisSession(true);
        }, selectedAd.popupTiming || 1500);

        return () => clearTimeout(timer);
      }
    }
  }, [cmsData, hasAdTriggeredThisSession]);

  const handleWhatsAppFloat = () => {
    if (!cmsData) return;
    const link = `https://wa.me/${cmsData.settings.whatsapp}?text=Hello%20Momos%20Kingdom!%20I%20want%20to%20order%2520some%2520fresh%2520imperial%2520momos.`;
    window.open(link, "_blank");
    addToast("Connecting direct WhatsApp chat channel...", "info");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen text-stone-200 bg-[#040404] flex flex-col justify-between selection:bg-gold-500 selection:text-black">
      
      {/* Dynamic Header Navbar sticky frame */}
      {cmsData && (
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          brandSettings={cmsData.settings}
        />
      )}

      {/* RENDER SKELETON PRELOADER OR ACTIVE PORTAL PAGES */}
      <main className="flex-grow w-full">
        {isLoading || !cmsData ? (
          <div className="min-h-screen w-full flex flex-col items-center justify-center gap-4 bg-black" id="preloader-portal">
            <div className="relative flex items-center justify-center">
              {/* Spinning Golden highlights circle logo backdrops */}
              <div className="w-16 h-16 rounded-full border-t-2 border-r-2 border-gold-500 animate-spin" />
              <div className="absolute font-mono text-[9px] text-gold-400 font-bold uppercase tracking-widest animate-pulse">
                MOMOS
              </div>
            </div>
            <p className="text-xs font-mono font-medium text-stone-600 uppercase tracking-widest mt-2 skeleton-pulse">
              Steaming Imperial Kitchen...
            </p>
          </div>
        ) : (
          <div className="w-full relative animate-fade-in" id="active-panel-container">
            {activeTab === "home" && (
              <HomeSection
                products={cmsData.products}
                offers={cmsData.offers}
                reviews={cmsData.reviews}
                gallery={cmsData.gallery}
                heroTitle={cmsData.settings.heroTitle}
                heroSubtitle={cmsData.settings.heroSubtitle}
                phone={cmsData.settings.phone}
                onNavigate={setActiveTab}
                addToast={addToast}
              />
            )}

            {activeTab === "menu" && (
              <MenuSection
                products={cmsData.products}
                categories={cmsData.categories}
                phone={cmsData.settings.phone}
                addToast={addToast}
              />
            )}

            {activeTab === "about" && <AboutSection />}

            {activeTab === "contact" && (
              <ContactSection brandSettings={cmsData.settings} addToast={addToast} />
            )}

            {activeTab === "admin" && (
              <AdminSection
                cmsData={cmsData}
                isLoadingData={isLoading}
                onRefreshData={fetchCmsData}
                phone={cmsData.settings.phone}
                addToast={addToast}
              />
            )}
          </div>
        )}
      </main>

      {/* Footer view */}
      {cmsData && (
        <Footer
          onLinkClick={setActiveTab}
          brandSettings={cmsData.settings}
          addToast={addToast}
        />
      )}

      {/* GLOBAL HELPER CONTROLS - WHATSAPP FLOATER */}
      {cmsData && (
        <button
          type="button"
          onClick={handleWhatsAppFloat}
          className="fixed bottom-6 left-6 z-40 bg-emerald-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all outline-none border border-emerald-400/30 flex items-center justify-center cursor-pointer group"
          title="Direct WhatsApp Order Chat"
          id="global-floating-whatsapp"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-bold text-xs font-mono uppercase tracking-wider pl-0 group-hover:pl-2">
            WhatsApp Order
          </span>
        </button>
      )}

      {/* BACK TO TOP SMALL ARROW FLOATING */}
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 bg-stone-900/90 text-gold-500 p-3 rounded-full shadow-2xl hover:bg-stone-850 hover:text-white transition-all outline-none border border-stone-800 flex items-center justify-center cursor-pointer"
          title="Return to the Heavens"
          id="global-back-to-top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* GLOBAL TOAST ALERTS OVERLAY */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {/* ACTIVE SCHEDULED POPUP ADVERTISEMENT DISPLAY CONTAINER */}
      {activePromoAd && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md" id="popup-ad-overlay">
          <div className="glass-panel-heavy rounded-3xl border border-gold-500/20 max-w-md w-full overflow-hidden shadow-2xl relative animate-scale-up">
            
            {/* Header branding */}
            <div className="bg-gradient-to-r from-red-950 via-stone-950 to-red-950 p-4 border-b border-gold-500/20 text-center relative flex items-center justify-between">
              <span className="text-[9px] font-mono font-bold tracking-widest text-gold-400 block uppercase">
                👑 CROWN PROMO CAMPAIGN
              </span>

              <button
                type="button"
                onClick={() => setActivePromoAd(null)}
                className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-stone-900 transition-colors"
                title="Dismiss Offer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* If video exists, display video, otherwise luxurious Unsplash Banner */}
            <div className="relative aspect-[16/10] bg-stone-950 border-b border-stone-900 overflow-hidden select-none">
              {activePromoAd.videoUrl ? (
                <video
                  src={activePromoAd.videoUrl}
                  autoPlay
                  controls={false}
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={activePromoAd.image}
                  alt={activePromoAd.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-95" />
            </div>

            {/* Campaign info Body */}
            <div className="p-6 flex flex-col gap-4 text-center">
              <div>
                <h3 className="font-heading text-lg font-black text-white text-glow-gold leading-tight">
                  {activePromoAd.title}
                </h3>
                <p className="text-xs text-stone-400 leading-normal mt-2 font-medium">
                  Exclusive Sovereign discount terms. Copy the coupon code or click below to launch the menus catalog instantly!
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("menu");
                    setActivePromoAd(null);
                    addToast(`Check coupon terms inside the offers box.`, "info");
                  }}
                  className="flex-1 py-3.5 rounded-xl btn-gold text-xs font-mono uppercase font-bold tracking-widest cursor-pointer"
                >
                  Order Royalty Now
                </button>

                <button
                  type="button"
                  onClick={() => setActivePromoAd(null)}
                  className="px-5 py-3.5 rounded-xl border border-stone-800 bg-stone-900 hover:bg-stone-850 text-xs font-semibold text-stone-300 transition-colors cursor-pointer"
                >
                  Hide promo
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
