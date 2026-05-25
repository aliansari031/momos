import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, MessageSquare, ExternalLink, Calendar } from "lucide-react";
import { BrandSettings } from "../types";

interface ContactSectionProps {
  brandSettings: BrandSettings;
  addToast: (msg: string, type: "success" | "error" | "warning" | "info") => void;
}

export default function ContactSection({ brandSettings, addToast }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      addToast("Please complete all required fields on the royal outreach log.", "warning");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      addToast(`Thank you, ${formData.name}! Your message has been received by the Kingdom court registry. We will send you a reply via email or WhatsApp shortly.`, "success");
      setFormData({
        name: "",
        email: "",
        whatsapp: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const handleWhatsAppChat = () => {
    const defaultText = encodeURIComponent(
      "Greetings Momos Kingdom! I am visiting your virtual website and would like to order some Steamed Gold Emperor dumplings for delivery in Clifton, Karachi."
    );
    const link = `https://wa.me/${brandSettings.whatsapp}?text=${defaultText}`;
    window.open(link, "_blank");
    addToast("Launching WhatsApp secure messaging portal with Momos Kingdom...", "info");
  };

  return (
    <div className="w-full text-zinc-100 bg-[#070504] py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="contact-view">
      
      {/* Page Header */}
      <div className="text-center mb-16 flex flex-col items-center gap-4 pt-10">
        <span className="text-xs font-mono font-bold text-gold-500 tracking-widest uppercase border-b border-gold-500/20 pb-0.5">
          HEAR OUT HELPLINES
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight text-glow-gold">
          Reach Our Court Registry
        </h1>
        <p className="text-sm text-stone-400 max-w-2xl">
          Interested in corporate catering, bulk delivery bookings, or franchise discussions? Speak directly with our representatives via the form or WhatsApp link.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="contact-panel-grid">
        
        {/* CONTACT DIRECTORY INFO COLUMN */}
        <div className="lg:col-span-5 flex flex-col gap-6" id="contact-info-col">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border shadow-xl flex flex-col gap-6" id="direct-contact-directory">
            <h3 className="font-heading text-lg font-bold text-white border-b border-stone-900 pb-3">Kingdom Directives</h3>
            
            <div className="flex flex-col gap-5 text-sm font-semibold">
              <a
                href={`tel:${brandSettings.phone}`}
                className="flex items-start gap-4 p-4 rounded-xl bg-stone-950 border border-stone-900 hover:border-gold-500/30 transition-all cursor-pointer group"
                id="dial-link-card"
              >
                <Phone className="w-5 h-5 text-gold-500 mt-0.5 group-hover:scale-115 transition-transform" />
                <div>
                  <h4 className="text-stone-300">Hotline & Delivery Phone</h4>
                  <p className="text-xs text-gold-400 font-mono mt-0.5 uppercase tracking-wide">{brandSettings.phone}</p>
                </div>
              </a>

              <div
                onClick={handleWhatsAppChat}
                className="flex items-start gap-4 p-4 rounded-xl bg-stone-950 border border-stone-900 hover:border-emerald-500/30 hover:bg-emerald-950/15 transition-all cursor-pointer group"
                id="whatsapp-chat-card"
              >
                <MessageSquare className="w-5 h-5 text-emerald-500 mt-0.5 group-hover:scale-115 transition-transform" />
                <div>
                  <h4 className="text-stone-300">WhatsApp Instant Catering Chat</h4>
                  <p className="text-xs text-emerald-400 font-mono mt-0.5 uppercase tracking-wide">Interactive Chat Link</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-stone-950 border border-stone-900">
                <MapPin className="w-5 h-5 text-red-500 mt-0.5" />
                <div>
                  <h4 className="text-stone-300">Flagship Palace Coordinates</h4>
                  <p className="text-xs text-stone-500 mt-1 leading-relaxed">{brandSettings.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-stone-950 border border-stone-900">
                <Clock className="w-5 h-5 text-amber-500 mt-0.5" />
                <div>
                  <h4 className="text-stone-300">Helpline Operating Hours</h4>
                  <p className="text-xs text-stone-500 mt-1 leading-normal">{brandSettings.businessHours}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECURE SUBMIT MESSAGE FORM COLUMN */}
        <div className="lg:col-span-7" id="contact-form-col">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border shadow-xl flex flex-col gap-6" id="submission-card-box">
            <h3 className="font-heading text-lg font-bold text-white border-b border-stone-900 pb-3">Transmit Private Inquiry</h3>

            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 font-semibold" id="contact-outreach-form">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-stone-400 font-mono">Your Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter full name..."
                    className="bg-stone-950/60 border border-stone-850 rounded-xl py-3 px-4 text-xs font-semibold text-stone-200 placeholder-stone-600 focus:outline-none focus:border-gold-500/40 transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-stone-400 font-mono">Your Email Address <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter personal email..."
                    className="bg-stone-950/60 border border-stone-850 rounded-xl py-3 px-4 text-xs font-semibold text-stone-200 placeholder-stone-600 focus:outline-none focus:border-gold-500/40 transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-stone-400 font-mono">WhatsApp Number (Optional)</label>
                <input
                  type="text"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  placeholder="e.g. +92 318 9212223"
                  className="bg-stone-950/60 border border-stone-850 rounded-xl py-3 px-4 text-xs font-semibold text-stone-200 placeholder-stone-600 focus:outline-none focus:border-gold-500/40 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-stone-400 font-mono">Detailed Inquiry Message <span className="text-red-500">*</span></label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Write your culinary requests, franchise ideas, feedback or custom event details here..."
                  className="bg-stone-950/60 border border-stone-850 rounded-xl py-3 px-4 text-xs font-semibold text-stone-200 placeholder-stone-600 focus:outline-none focus:border-gold-500/40 transition-colors resize-none leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-4 rounded-xl btn-gold text-sm font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                id="btn-send-message"
              >
                <span>{isSubmitting ? "Transmitting..." : "Send Secure Message"}</span>
              </button>
            </form>
          </div>
        </div>

      </div>

      {/* 4. GOOGLE MAPS EMBED OR FRAME MOCK */}
      <div className="mt-16 w-full glass-panel border rounded-3xl p-3 shadow-xl overflow-hidden" id="maps-block">
        <div className="relative aspect-[21/9] w-full rounded-2xl overflow-hidden bg-stone-950 border border-stone-900 group">
          {/* Real Google map Embed for Karachi Clifton coordinates */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14486.299596041!2d67.01633513364239!3d24.810557497676755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33c563ef31cb3%3A0xe6bf44208a38ae2b!2sClifton%2C%20Karachi%2CBahria%20Icon%20Tower!5e0!3m2!1sen!2spk!4v1716500000000!5m2!1sen!2spk"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(150%) brightness(95%)" }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Momos Kingdom Clifton Karachi Location Map Room"
            id="clifton-maps-frame"
            className="w-full h-full object-cover rounded-xl"
          />
          
          {/* Embedded Overlay Details */}
          <div className="absolute top-4 left-4 bg-stone-950/95 border border-gold-500/30 p-4 rounded-2xl shadow-xl flex items-center gap-3 backdrop-blur-md max-w-xs mt-2 ml-2">
            <span className="p-2 rounded-xl bg-gradient-to-r from-red-950 to-stone-950 border border-gold-500/30 text-gold-400 font-bold block">
              <MapPin className="w-5 h-5 text-red-500" />
            </span>
            <div>
              <h4 className="text-xs font-bold text-white tracking-widest uppercase">Physical Outlet</h4>
              <p className="text-[10px] text-stone-400 mt-1 font-medium leading-relaxed">
                Clifton Block 4, Clifton Food Street, Karachi. (Next to the waterfront Beach).
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
