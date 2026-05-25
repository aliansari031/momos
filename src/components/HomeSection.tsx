import React, { useState, useEffect } from "react";
import { ArrowRight, Flame, Award, Heart, ShieldCheck, Sparkles, ChefHat, Copy, Check, Star, LogIn, Utensils } from "lucide-react";
import { Product, Offer, Review, GalleryItem } from "../types";

interface HomeSectionProps {
  products: Product[];
  offers: Offer[];
  reviews: Review[];
  gallery: GalleryItem[];
  heroTitle: string;
  heroSubtitle: string;
  phone: string;
  onNavigate: (tab: string) => void;
  addToast: (msg: string, type: "success" | "error" | "warning" | "info") => void;
}

export default function HomeSection({
  products,
  offers,
  reviews,
  gallery,
  heroTitle,
  heroSubtitle,
  phone,
  onNavigate,
  addToast,
}: HomeSectionProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [hoveredFeatured, setHoveredFeatured] = useState<string | null>(null);

  // Statistics
  const stats = [
    { value: "100%", label: "Artisanal Recipe", icon: <Award className="w-5 h-5 text-gold-500" /> },
    { value: "4.9★", label: "Karachi's Top Rated", icon: <Star className="w-5 h-5 fill-gold-500 text-gold-500" /> },
    { value: "12,000+", label: "Monthly Steams", icon: <Flame className="w-5 h-5 text-red-500" /> },
    { value: "30 Mins", label: "Helpline Delivery", icon: <Sparkles className="w-5 h-5 text-amber-400" /> },
  ];

  const selectFeatured = products.filter((p) => p.featured && p.available).slice(0, 4);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    addToast(`Offer coupon "${code}" successfully copied to clipboard! Enjoy your meal.`, "success");
    setTimeout(() => setCopiedCode(null), 3000);
  };

  return (
    <div className="w-full text-white bg-black bg-grain" id="home-view-group">
      
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden" id="hero-block">
        
        {/* Cinematic Backdrop Image with Overlay & Floating Golden Sparkles */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=1920"
            alt="Momos Steaming Background"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-25 scale-105 filter blur-[2px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
          
          {/* Real-time floating dust/gold particle tags */}
          <div className="absolute top-[25%] left-[15%] w-2 h-2 rounded-full bg-gold-400 shadow-[0_0_10px_#D4AF37] opacity-60 animate-ping duration-[6000ms]" />
          <div className="absolute bottom-[35%] right-[20%] w-3 h-3 rounded-full bg-gold-500 shadow-[0_0_15px_#D4AF37] opacity-40 animate-ping duration-[8000ms]" />
          <div className="absolute top-[60%] right-[10%] w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_10px_#FF0000] opacity-50 animate-ping duration-[5000ms]" />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 items-center">
          
          {/* Main Hero Header Title Column */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold-400/20 bg-stone-900/60 w-fit self-center lg:self-start text-xs font-mono font-medium tracking-wider text-gold-400 uppercase">
              <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "12s" }} />
              <span>THE ULTIMATE DUMPLING DESTINATION</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              {heroTitle.split(" ").map((word, i) => {
                if (["Royalty", "Elite", "Kingdom", "Taste", "Ultimate"].includes(word.replace(/[^a-zA-Z]/g, ""))) {
                  return <span key={i} className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 block sm:inline">{word} </span>;
                }
                return word + " ";
              })}
            </h1>

            <p className="text-base sm:text-lg text-stone-300 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
              {heroSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-4">
              <button
                onClick={() => onNavigate("menu")}
                className="px-8 py-4 rounded-xl btn-gold text-base font-bold flex items-center justify-center gap-3 transition-transform hover:scale-105 cursor-pointer"
              >
                <span>Explore Royal Menu</span>
                <ArrowRight className="w-5 h-5 text-stone-950" />
              </button>

              <button
                onClick={() => onNavigate("contact")}
                className="px-8 py-4 rounded-xl border border-stone-800 bg-stone-950/45 hover:bg-stone-900 hover:border-gold-500/30 font-semibold text-stone-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Reservations / Location</span>
              </button>
            </div>

            {/* Micro details */}
            <div className="flex justify-center lg:justify-start items-center gap-6 mt-6 text-xs font-medium text-stone-500 font-mono">
              <div className="flex items-center gap-1.5"><ChefHat className="w-4 h-4 text-gold-500" /> Handmade Fresh</div>
              <div className="w-1.5 h-1.5 rounded-full bg-stone-800" />
              <div className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-500" /> Pure Ingredients</div>
              <div className="w-1.5 h-1.5 rounded-full bg-stone-800" />
              <div className="flex items-center gap-1.5"><Star className="w-4 h-4 fill-amber-500 text-amber-500" /> Karachi Clifton Block 4</div>
            </div>
          </div>

          {/* Interactive Hero Dish Feature Column */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative group">
              {/* Outer Golden Aura Ring */}
              <div className="absolute inset-0 bg-gold-500/10 rounded-full blur-3xl animate-pulse duration-[4000ms]" />
              
              {/* Spinning Logo Wheel frame and food container */}
              <div className="relative p-3 rounded-full border-2 border-dashed border-gold-500/20 max-w-[340px] sm:max-w-[420px] aspect-square flex items-center justify-center bg-stone-950/20 backdrop-blur-sm">
                
                <img
                  src="https://images.unsplash.com/photo-1625220194771-7ebded05fbe1?auto=format&fit=crop&q=80&w=800"
                  alt="Momos Kingdom Featured"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-full aspect-square border-4 border-stone-900 shadow-2xl transition-all duration-700 group-hover:scale-105 group-hover:rotate-6"
                />

                {/* Overlapping Quick Menu Floating Tag */}
                <div className="absolute bottom-6 right-6 bg-stone-900/95 border border-gold-500/30 p-4 rounded-2xl shadow-xl flex items-center gap-3 backdrop-blur-md">
                  <span className="p-2.5 rounded-xl bg-red-950/50 border border-red-500/30 text-rose-500 block">
                    <Sparkles className="w-5 h-5" />
                  </span>
                  <div>
                    <h5 className="font-heading text-xs font-bold text-white tracking-widest uppercase">Hot Seller</h5>
                    <p className="text-sm font-bold text-gold-400 font-mono">PKR 490</p>
                  </div>
                </div>

                <div className="absolute top-6 left-6 bg-stone-900/95 border border-gold-500/30 py-1.5 px-3 rounded-xl gap-1 flex items-center text-xs font-bold text-stone-200 shadow-lg font-mono backdrop-blur-md">
                  <Star className="w-3.5 h-3.5 text-gold-500 fill-gold-500" />
                  <span>4.9 Rated</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 2. STATS OVERVIEW HEADER */}
      <section className="relative z-20 -mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="stats-ribbon">
        <div className="glass-panel rounded-2xl p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center border shadow-xl">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center gap-2 border-r border-stone-900 last:border-0">
              <span className="p-2 rounded-xl bg-stone-950 border border-stone-850 block mb-1">{stat.icon}</span>
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{stat.value}</h3>
              <p className="text-xs font-medium text-stone-500 font-mono tracking-widest uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS (MOMOS SHOWCASE) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="featured-products">
        <div className="text-center mb-16 flex flex-col items-center gap-4">
          <span className="text-xs font-mono font-bold text-gold-500 tracking-widest uppercase border-b border-gold-500/30 pb-1">
            ROYAL RECOMMENDATIONS
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-glow-gold">
            The Emperor's Selected Pleasures
          </h2>
          <p className="text-sm text-stone-400 max-w-2xl">
            Handpicked, golden-framed specialties prepared daily by royal decree. High-density ingredients wrapped in featherlight luxury pastry.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" id="featured-items-grid">
          {selectFeatured.map((prod) => (
            <div
              key={prod.id}
              className="group relative bg-[#0d0a09] border border-stone-900 rounded-2xl overflow-hidden transition-all duration-300 hover:border-gold-500/20 hover:shadow-2xl flex flex-col h-full hover:-translate-y-1.5"
              onMouseEnter={() => setHoveredFeatured(prod.id)}
              onMouseLeave={() => setHoveredFeatured(null)}
              id={`featured-card-${prod.id}`}
            >
              {/* Floating Featured Badge */}
              <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-red-950/80 backdrop-blur-sm border border-red-500/40 rounded-full text-[10px] font-bold text-red-400 tracking-widest uppercase flex items-center gap-1">
                <Flame className="w-3 h-3 text-red-400 fill-red-400" />
                <span>HOT SELL</span>
              </span>

              {/* Product Thumbnail with zoom */}
              <div className="relative overflow-hidden aspect-[4/3] bg-stone-950">
                <img
                  src={prod.image}
                  alt={prod.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a09] to-transparent opacity-80" />
              </div>

              {/* Card Meta Content Info */}
              <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    {prod.tags.slice(0, 2).map((tag, idx) => (
                      <span key={idx} className="bg-stone-900 border border-stone-800 text-[9px] font-bold text-stone-400 px-2 py-0.5 rounded-md font-mono uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-heading text-base font-bold text-white tracking-normal group-hover:text-gold-400 transition-colors">
                    {prod.name}
                  </h3>

                  <p className="text-xs text-stone-400 leading-relaxed font-medium line-clamp-2">
                    {prod.description}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-stone-900 pt-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-stone-600 font-mono tracking-widest uppercase">Price</span>
                    <span className="text-base font-extrabold text-[#EAD075] font-mono">PKR {prod.price}</span>
                  </div>

                  <button
                    onClick={() => {
                      onNavigate("menu");
                      addToast(`${prod.name} selected. Check availability under our menu page.`, "info");
                    }}
                    className="p-2.5 rounded-xl bg-stone-900 hover:bg-gold-500 hover:text-stone-950 text-gold-400 border border-stone-850 hover:border-gold-500 transition-all font-bold cursor-pointer"
                    title="Order Now"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <button
            onClick={() => onNavigate("menu")}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-stone-800 hover:border-gold-500/40 text-sm font-semibold text-gold-400 hover:text-[#FFF] hover:bg-stone-950 transition-all cursor-pointer"
          >
            <span>Explore Complete Royal Menu Catalog</span>
            <Utensils className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 4. ACTIVE CAMPAIGNS (OFFERS BANNER) */}
      {offers.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="offers">
          <div className="bg-gradient-to-r from-red-950/70 via-stone-950 to-red-950/70 p-8 sm:p-12 rounded-3xl border border-red-900/40 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 blur-[90px] rounded-full" />
            
            <div className="flex flex-col gap-4 relative z-10 max-w-2xl text-center lg:text-left">
              <span className="px-3 py-1 rounded-full border border-red-500/30 bg-red-950/40 font-mono text-xs font-semibold text-red-400 self-center lg:self-start w-fit uppercase tracking-wider">
                👑 LIVE SOVEREIGN OFFERS
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-widest">
                Unlock Royal Privileges
              </h2>
              <p className="text-stone-400 text-sm font-medium leading-relaxed">
                Avail special dining permissions formulated directly by our head chefs. Copy the codes below to claim discount ratios at checkout.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4" id="coupons-scroller">
                {offers.map((off) => (
                  <div
                    key={off.id}
                    className="p-4 rounded-xl bg-stone-950/90 border border-stone-900 flex flex-col justify-between gap-3 text-left relative group hover:border-red-500/30 transition-all"
                  >
                    <div>
                      <span className="text-[10px] font-mono text-red-400 font-bold uppercase block tracking-wider">{off.discount}</span>
                      <h4 className="text-xs font-bold text-white mt-1">{off.title}</h4>
                      <p className="text-[11px] text-stone-500 mt-1 line-clamp-2 leading-tight">{off.description}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopyCode(off.code)}
                      className="w-full mt-2 py-1.5 rounded-lg border border-dashed border-gold-500/30 text-xs font-mono font-bold text-gold-400 flex items-center justify-center gap-1.5 hover:bg-gold-500 hover:text-stone-950 hover:border-solid transition-colors"
                      id={`btn-copy-${off.id}`}
                    >
                      {copiedCode === off.code ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-500" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>{off.code}</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Call To Order Plate */}
            <div className="relative z-10 flex flex-col items-center justify-center p-6 bg-[#0c0908] border border-stone-900 rounded-3xl min-w-[260px] max-w-xs shadow-xl flex-shrink-0">
              <span className="text-xs font-mono font-semibold text-stone-500 uppercase tracking-widest">DELIVERY CALLLINE</span>
              <a
                href={`tel:${phone}`}
                className="text-xl font-heading font-extrabold text-white text-glow-gold hover:text-gold-400 mt-2 block"
              >
                {phone}
              </a>
              <p className="text-[10px] text-stone-600 font-medium text-center mt-1 leading-normal">
                Order by dialling. Delivery active across Clifton, DHA, and Clifton Beach areas.
              </p>
              
              <button
                onClick={() => onNavigate("menu")}
                className="w-full mt-4 py-3 rounded-xl btn-gold text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Order Steamed Royalty
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 5. WHY CHOOSE US - THE CULINARY HONESTY SECTION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="why-choose-us">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 flex flex-col gap-6">
            <span className="text-xs font-mono font-bold text-gold-500 tracking-widest uppercase border-b border-gold-500/30 pb-1 w-fit">
              PURE CRAFTSMANSHIP
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Why Karachi Chooses **Momos Kingdom**
            </h2>
            <p className="text-sm text-stone-400 leading-relaxed font-semibold">
              We did not invent dumplings, but we engineered their luxurious evolution. Discover the meticulous methodology behind our imperial street food creations.
            </p>

            <div className="flex flex-col gap-4 mt-2" id="why-bullet-points">
              <div className="flex gap-4 items-start">
                <span className="p-3 bg-stone-900 border border-stone-800 rounded-2xl text-gold-500 flex-shrink-0">
                  <ChefHat className="w-5 h-5" />
                </span>
                <div>
                  <h4 className="font-heading text-base font-bold text-white">Culinary Bloodline Standards</h4>
                  <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                    Minced breast chicken combined with freshly plucked Himalayan spices, ginger julienne, and custom aromatic root oils. Zero artificial preservatives.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <span className="p-3 bg-stone-900 border border-stone-800 rounded-2xl text-gold-500 flex-shrink-0">
                  <Sparkles className="w-5 h-5" />
                </span>
                <div>
                  <h4 className="font-heading text-base font-bold text-white">Edible Golden highlights Custom Polish</h4>
                  <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                    Our flagship Steamed Emperors are decorated with premium, 100% edible gold metallic spray. A breathtaking dining experience unlike any other fast food.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <span className="p-3 bg-stone-900 border border-stone-800 rounded-2xl text-gold-500 flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </span>
                <div>
                  <h4 className="font-heading text-base font-bold text-white">Extreme Double-Insulation Packing</h4>
                  <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                    Deconstructed, thick foil-lined premium black containers that lock in thermal humidity and keep dumplings steaming hot for up to 45 minutes of transit.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4" id="why-visual-bento">
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl overflow-hidden aspect-square border border-stone-900 shadow-lg relative group">
                <img
                  src="https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=400"
                  alt="Crafting"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex items-end p-4">
                  <span className="text-xs font-semibold text-white">Hand Wrapping</span>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden aspect-[3/4] border border-stone-900 shadow-lg relative group">
                <img
                  src="https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=400"
                  alt="Schezwan fire"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex items-end p-4">
                  <span className="text-xs font-semibold text-white">Wok Sizzles</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 pt-12">
              <div className="rounded-2xl overflow-hidden aspect-[3/4] border border-stone-900 shadow-lg relative group">
                <img
                  src="https://images.unsplash.com/photo-1625220194771-7ebded05fbe1?auto=format&fit=crop&q=80&w=400"
                  alt="Crispy Coating"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex items-end p-4">
                  <span className="text-xs font-semibold text-white">Crispy Golden Coating</span>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden aspect-square border border-stone-900 shadow-lg relative group">
                <img
                  src="https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=400"
                  alt="Luxury Dinings"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex items-end p-4">
                  <span className="text-xs font-semibold text-white">Steaming Bamboo</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. REVIEWS & TESTIMONIALS AUTO-SCROLL LOOP */}
      {reviews.length > 0 && (
        <section className="py-24 bg-[#050403] border-y border-stone-900 overflow-hidden" id="testimonials">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16 flex flex-col items-center gap-4">
            <span className="text-xs font-mono font-bold text-gold-400 tracking-widest uppercase border-b border-gold-500/30 pb-1">
              SOVEREIGN COURT FEEDBACK
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-glow-gold">
              Approved by Food Lovers
            </h2>
            <p className="text-sm text-stone-500 max-w-xl">
              Real dining testimonies written by verified food critics and Karachi culinary judges.
            </p>
          </div>

          {/* Testimonial Double rows scrolling track simulators */}
          <div className="flex flex-col gap-6" id="scrolling-track-wrapper">
            <div className="flex items-center gap-6 animate-scroll-normal w-max overflow-x-auto pb-4 px-4 scrollbar-none" style={{ maxWidth: "100%" }}>
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="glass-panel p-6 rounded-2xl w-[320px] sm:w-[380px] border shadow-md flex flex-col justify-between gap-5 flex-shrink-0"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-gold-500 fill-gold-500" />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-stone-300 font-medium italic leading-relaxed">
                      "{rev.comment}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3 border-t border-stone-850 pt-3">
                    <img
                      src={rev.avatar}
                      alt={rev.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 object-cover rounded-full border border-gold-500/30 font-semibold"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white">{rev.name}</h4>
                      <p className="text-[10px] text-stone-600 font-mono font-medium uppercase mt-0.5">Verified critic • {rev.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. INSTAGRAM FEED & GALLERY BLOCK */}
      {gallery.length > 0 && (
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="instagram-block">
          <div className="text-center mb-16 flex flex-col items-center gap-4">
            <span className="text-xs font-mono font-bold text-gold-500 tracking-widest uppercase">
              INSTAGRAM GALLERY
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#FFF] tracking-tight">
              Our Culinary Feed @MomosKingdom
            </h2>
            <p className="text-sm text-stone-400 max-w-lg">
              Sizzling kitchen previews, custom folding logs, and active weekend chef events!
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6" id="insta-grid">
            {gallery.map((img) => (
              <div key={img.id} className="group relative rounded-2xl overflow-hidden aspect-square border border-stone-900 bg-stone-900 shadow-md">
                <img
                  src={img.url}
                  alt={img.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5">
                  <h4 className="font-heading text-xs font-bold text-white tracking-widest uppercase truncate">{img.title}</h4>
                  <p className="text-[10px] text-gold-500 font-mono font-semibold mt-1 flex items-center gap-1">
                    <span>View Post</span>
                    <ArrowRight className="w-3 h-3" />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
