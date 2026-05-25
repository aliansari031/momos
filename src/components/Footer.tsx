import React, { useState } from "react";
import { Mail, Instagram, Facebook, Twitter, Phone, MapPin, Clock, ArrowUp, Send } from "lucide-react";
import Logo from "./Logo";
import { BrandSettings } from "../types";

interface FooterProps {
  onLinkClick: (id: string) => void;
  brandSettings: BrandSettings;
  addToast: (msg: string, type: "success" | "error" | "warning" | "info") => void;
}

export default function Footer({ onLinkClick, brandSettings, addToast }: FooterProps) {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      addToast("Please enter a valid luxury-class subscriber email address.", "warning");
      return;
    }
    addToast("Welcome to the Royalty Newsletter! We will email you secret weekend discount codes shortly.", "success");
    setEmail("");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#080605] border-t border-stone-900 pt-16 pb-8 text-stone-400 overflow-hidden" id="footer-section">
      
      {/* Absolute Backdrop ambient light */}
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-red-950/20 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16" id="footer-layout-grid">
          
          {/* Brand Presentation Columns */}
          <div className="flex flex-col gap-6" id="footer-identity-col">
            <div className="flex items-center gap-3">
              <Logo size="sm" />
              <div>
                <h3 className="font-heading text-lg font-bold text-white tracking-wider">
                  MOMOS <span className="text-gold-500">KINGDOM</span>
                </h3>
                <p className="text-[10px] font-mono tracking-widest text-stone-500 uppercase">
                  Karachi's Steamed Elite
                </p>
              </div>
            </div>
            
            <p className="text-sm font-medium leading-relaxed text-stone-400">
              Upholding the finest standards in culinary crafting. Every recipe is a royal masterpiece formulated to take Karachi's fast-food scene to spectacular luxury dimensions.
            </p>

            <div className="flex items-center gap-3.5" id="footer-social-links">
              {brandSettings.facebook && (
                <a
                  href={brandSettings.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-stone-950 border border-stone-850 hover:border-gold-500/50 hover:text-gold-400 transition-all cursor-pointer"
                  title="Follow us on Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {brandSettings.instagram && (
                <a
                  href={brandSettings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-stone-950 border border-stone-850 hover:border-gold-500/50 hover:text-gold-400 transition-all cursor-pointer"
                  title="Follow us on Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {brandSettings.twitter && (
                <a
                  href={brandSettings.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-stone-950 border border-stone-850 hover:border-gold-500/50 hover:text-gold-400 transition-all cursor-pointer"
                  title="Follow us on Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Nav Navigation Columns */}
          <div className="flex flex-col gap-6" id="footer-navigation-col">
            <h4 className="font-heading text-sm font-bold text-stone-100 uppercase tracking-widest border-l-2 border-gold-500 pl-3">
              Imperial Map
            </h4>
            <div className="flex flex-col gap-3 text-sm font-medium">
              <button
                type="button"
                onClick={() => onLinkClick("home")}
                className="text-left hover:text-gold-400 transition-colors cursor-pointer"
              >
                Home Palace
              </button>
              <button
                type="button"
                onClick={() => onLinkClick("menu")}
                className="text-left hover:text-gold-400 transition-colors cursor-pointer"
              >
                Royal Menu Selection
              </button>
              <button
                type="button"
                onClick={() => onLinkClick("about")}
                className="text-left hover:text-gold-400 transition-colors cursor-pointer"
              >
                Our Sacred Story
              </button>
              <button
                type="button"
                onClick={() => onLinkClick("contact")}
                className="text-left hover:text-gold-400 transition-colors cursor-pointer"
              >
                Reach Out Helpline
              </button>
              <button
                type="button"
                onClick={() => onLinkClick("admin")}
                className="text-left hover:text-stone-500 transition-colors text-xs text-stone-600"
              >
                Portal Administrator Control
              </button>
            </div>
          </div>

          {/* Contact and timing column */}
          <div className="flex flex-col gap-6" id="footer-timing-col">
            <h4 className="font-heading text-sm font-bold text-stone-100 uppercase tracking-widest border-l-2 border-gold-500 pl-3">
              Serving Hours
            </h4>
            <div className="flex flex-col gap-4 text-sm font-medium">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gold-500 mt-0.5" />
                <div>
                  <h5 className="text-stone-200">Operating Schedule</h5>
                  <p className="text-xs text-stone-500 mt-0.5">{brandSettings.businessHours}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold-500 mt-0.5" />
                <div>
                  <h5 className="text-stone-200">The Kingdom Location</h5>
                  <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">{brandSettings.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gold-500 mt-0.5" />
                <div>
                  <h5 className="text-stone-200">Helpline / Booking</h5>
                  <p className="text-xs text-gold-400 mt-0.5 font-mono">{brandSettings.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter section */}
          <div className="flex flex-col gap-6" id="footer-newsletter-col">
            <h4 className="font-heading text-sm font-bold text-stone-100 uppercase tracking-widest border-l-2 border-gold-500 pl-3">
              Imperial News
            </h4>
            <p className="text-sm font-medium leading-relaxed text-stone-400">
              Subscribe to unlock periodic royal meal announcements, secret discount codes, and Karachi delivery updates.
            </p>

            <form onSubmit={handleSubscribe} className="relative w-full" id="footer-newsletter-form">
              <input
                type="email"
                required
                placeholder="Enter elite email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl py-3 pl-4 pr-12 text-sm text-stone-200 placeholder-stone-600 focus:outline-none focus:border-gold-500/50 transition-colors"
              />
              <button
                type="submit"
                className="absolute right-1 text-gold-500 hover:text-gold-400 top-1 bottom-1 px-3 bg-stone-900 rounded-lg hover:bg-stone-850 flex items-center justify-center transition-colors border border-stone-850 cursor-pointer"
                title="Subscribe Now"
                id="newsletter-send-btn"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

        <hr className="border-stone-900 mb-8" />

        {/* Brand Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-stone-600" id="footer-bottom-row">
          <p>
            © {new Date().getFullYear()} **Momos Kingdom**. Empowered with premium street-food culinary excellence. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4">
            <span className="text-stone-700">Lahore • Karachi • Islamabad</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1.5 p-2 rounded-xl bg-stone-950 border border-stone-900 hover:border-gold-500/30 hover:text-gold-500 transition-all shadow-inner text-stone-500 cursor-pointer"
              title="Return to the Heavens"
              id="back-to-top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
