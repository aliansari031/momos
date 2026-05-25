import React, { useState, useEffect } from "react";
import { Menu, X, Phone, Shield, ArrowRight, ShoppingBag } from "lucide-react";
import Logo from "./Logo";
import { BrandSettings } from "../types";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  brandSettings: BrandSettings;
}

export default function Navbar({ activeTab, setActiveTab, brandSettings }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", id: "home" },
    { label: "Royal Menu", id: "menu" },
    { label: "Our Story", id: "about" },
    { label: "Contact Us", id: "contact" },
  ];

  const handleLinkClick = (id: string) => {
    setActiveTab(id);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex flex-col" id="global-header">
      {/* Dynamic Top Announcement Banner */}
      {brandSettings.bannerText && (
        <div 
          className="w-full bg-gradient-to-r from-stone-950 via-red-950 to-stone-950 border-b border-gold-500/20 py-2.5 px-4 text-center text-xs font-mono font-medium text-gold-400 tracking-wider uppercase animate-pulse duration-[3000ms] flex items-center justify-center gap-2"
          id="promo-announcement-banner"
        >
          <span className="inline-block w-2-h-2 rounded-full bg-gold-500 animate-ping" />
          <span>{brandSettings.bannerText}</span>
          <span className="hidden md:inline font-sans text-[10px] px-2 py-0.5 rounded border border-gold-500/30 ml-2 bg-stone-900 text-stone-300">
            Karachi Special
          </span>
        </div>
      )}

      {/* Main Navigation Row */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "bg-black/90 backdrop-blur-xl border-b border-stone-800/80 py-3 shadow-lg"
            : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5"
        }`}
        id="navbar-main"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo & Brand Identity */}
          <button
            type="button"
            onClick={() => handleLinkClick("home")}
            className="flex items-center gap-3 group focus:outline-none"
            id="nav-logo-btn"
          >
            <Logo size="sm" className="transition-transform duration-500 group-hover:rotate-12" />
            <div className="text-left">
              <span className="block font-heading text-lg font-bold tracking-tight text-white group-hover:text-glow-gold transition-colors">
                MOMOS <span className="text-gold-500">KINGDOM</span>
              </span>
              <span className="block text-[9px] font-mono tracking-widest text-[#CE9A2E] uppercase">
                Steamed Royalty
              </span>
            </div>
          </button>

          {/* Large Screen Links */}
          <div className="hidden md:flex items-center gap-8" id="nav-desktop-links">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => handleLinkClick(link.id)}
                className={`relative py-2 text-sm font-medium tracking-wide transition-colors duration-300 focus:outline-none cursor-pointer ${
                  activeTab === link.id
                    ? "text-gold-500"
                    : "text-stone-300 hover:text-white"
                }`}
                id={`lnk-${link.id}`}
              >
                {link.label}
                {activeTab === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 rounded" />
                )}
              </button>
            ))}
          </div>

          {/* Desktop Call CTAs */}
          <div className="hidden md:flex items-center gap-4" id="nav-desktop-actions">
            <button
              type="button"
              onClick={() => handleLinkClick("admin")}
              className={`p-2.5 rounded-full border transition-colors ${
                activeTab === "admin"
                  ? "bg-amber-500/10 border-gold-500/40 text-gold-500"
                  : "border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700"
              }`}
              title="Admin Panel"
              id="admin-panel-nav-btn"
            >
              <Shield className="w-4 h-4" />
            </button>

            <a
              href={`tel:${brandSettings.phone}`}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-gold-500/20 bg-stone-950/60 hover:bg-stone-900 hover:border-gold-500/40 transition-all text-sm font-semibold text-gold-400 font-mono"
              id="navbar-dial-helpline"
            >
              <Phone className="w-4 h-4 animate-bounce" />
              <span>{brandSettings.phone}</span>
            </a>

            <button
              onClick={() => handleLinkClick("menu")}
              className="px-5 py-2.5 rounded-xl btn-gold text-sm font-bold flex items-center gap-2"
              id="navbar-order-btn"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Order Now</span>
            </button>
          </div>

          {/* Mobile Hamburguer Handler */}
          <div className="flex md:hidden items-center gap-3" id="mobile-nav-controls">
            <button
              type="button"
              onClick={() => handleLinkClick("admin")}
              className={`p-2 rounded-lg border text-stone-300 ${
                activeTab === "admin" ? "border-gold-500 bg-stone-900" : "border-stone-800"
              }`}
            >
              <Shield className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg border border-stone-800 text-stone-300 hover:text-white transition-colors"
              id="hamburger-toggle"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Drawer Slide-down */}
      {isMobileMenuOpen && (
        <div className="md:hidden w-full bg-stone-950 border-b border-stone-800 flex flex-col pt-2 pb-6 px-4 gap-4 shadow-2xl transition-all" id="mobile-drawer">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => handleLinkClick(link.id)}
                className={`w-full py-3 px-4 rounded-xl text-left text-base font-semibold transition-all ${
                  activeTab === link.id
                    ? "bg-gradient-to-r from-red-950 to-stone-900 text-gold-400 border-l-4 border-gold-500"
                    : "text-stone-300 hover:bg-stone-900 hover:text-white"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <hr className="border-stone-900 my-1" />

          {/* Action links inside mobile drawer */}
          <div className="flex flex-col gap-3">
            <a
              href={`tel:${brandSettings.phone}`}
              className="flex items-center justify-center gap-3 p-3 rounded-xl bg-stone-900 border border-stone-800 text-gold-400 font-bold font-mono text-sm"
            >
              <Phone className="w-4 h-4" />
              <span>Call Helpline: {brandSettings.phone}</span>
            </a>

            <button
              onClick={() => handleLinkClick("menu")}
              className="w-full py-3.5 rounded-xl btn-gold text-sm font-bold flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Order Steamed Royalty</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
