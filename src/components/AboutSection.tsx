import React from "react";
import { ChefHat, ShieldCheck, Flame, Medal, CheckCircle } from "lucide-react";

export default function AboutSection() {
  const principles = [
    {
      title: "Artisanal Dough Work",
      desc: "Our dough wrapper is kneaded precisely and rolled thin so you taste the seasoned mince juice instead of sticky raw flour.",
      icon: <ChefHat className="w-5 h-5 text-gold-500" />,
    },
    {
      title: "Premium Tender Cuts",
      desc: "Every dumpling features clean, hand-trimmed premium chicken breast mince seasoned with natural cold-pressed root spice extracts.",
      icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
    },
    {
      title: "Himalayan Herbal Oil Infusions",
      desc: "Our dipping chili paste is aged in dry wok pans with scallions, organic garlic, and light sesame oil ratios for ultimate warmth.",
      icon: <Flame className="w-5 h-5 text-red-500" />,
    },
  ];

  return (
    <div className="w-full text-stone-200 bg-black/30 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="about-view">
      
      {/* 1. Header block */}
      <div className="text-center mb-16 flex flex-col items-center gap-4 pt-10">
        <span className="text-xs font-mono font-bold text-gold-500 tracking-widest uppercase border-b border-gold-500/20 pb-0.5">
          OUR SACRED CODE
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight text-glow-gold">
          The Legend of Momos Kingdom
        </h1>
        <p className="text-sm text-stone-400 max-w-2xl">
          Learn how a premium vision of street-food evolved into the sovereign authority of steamed and fried delicacies across Karachi.
        </p>
      </div>

      {/* 2. Visual Split Story introduction */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20" id="about-intro-grid">
        <div className="lg:col-span-6 flex flex-col gap-6">
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white leading-tight">
            How **Momos Kingdom** Decided to Crown the Steamed Dumpling
          </h2>
          
          <p className="text-sm text-stone-400 leading-relaxed font-medium">
            For decades, standard street food dumplings were prepared using thick dough envelopes, heavy fats, and generic synthetic flavor enhancers, which overshadowed the delicate heritage of the dish.
          </p>
          <p className="text-sm text-stone-400 leading-relaxed font-medium">
            In our quest for perfection, we launched **“Momos Kingdom”**. Our sacred recipe is engineered for health, elite flavor profiles, and premium artistic elegance. By introducing edible gold foils and gourmet cheddar bakes, we didn't just open an outlet: we established a royal dining kingdom.
          </p>

          <blockquote className="border-l-4 border-gold-500 p-4 bg-stone-900/60 rounded-r-xl my-2 text-stone-300 italic font-medium text-xs sm:text-sm">
            "A dumpling must have structural dignity. When bitten, the juice must erupt, and the outer fold must slide like silk."
            <span className="block text-[10px] font-mono tracking-widest font-bold text-gold-500 uppercase mt-2">— Chef S. Bahadur, Royal Kitchen Master</span>
          </blockquote>
        </div>

        {/* Visual card bento depicting craftsmanship */}
        <div className="lg:col-span-6 relative">
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-950/20 blur-[90px] rounded-full pointer-events-none" />
          
          <div className="relative p-6 bg-[#0c0908] border border-stone-900 rounded-3xl shadow-xl overflow-hidden flex flex-col gap-4">
            <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-stone-950">
              <img
                src="https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=800"
                alt="Imperial Wrapping Art"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0908] via-transparent to-transparent opacity-90" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-stone-950/80 border border-stone-900 text-center">
                <span className="block text-3xl font-extrabold text-gold-400 font-mono">100%</span>
                <span className="block text-[10px] text-stone-500 tracking-wider font-mono uppercase mt-1">Hygienic Bamboo</span>
              </div>
              <div className="p-4 rounded-xl bg-stone-950/80 border border-stone-900 text-center">
                <span className="block text-3xl font-extrabold text-[#FFF] font-mono">24/7</span>
                <span className="block text-[10px] text-stone-500 tracking-wider font-mono uppercase mt-1">Freshly Rolled</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Core Principles Grid */}
      <div className="mb-20" id="principles-block">
        <div className="text-center mb-12 flex flex-col items-center gap-2">
          <span className="text-xs font-mono font-bold text-stone-500 tracking-widest uppercase">THE CONSTITUTION</span>
          <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-white">Three Pillars of Culinary Authority</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="principles-cards-row">
          {principles.map((pr, idx) => (
            <div key={idx} className="p-6 bg-[#0c0908] border border-stone-900 rounded-2xl flex flex-col gap-4 hover:border-gold-500/20 transition-colors">
              <span className="p-3 bg-stone-900 rounded-xl border border-stone-850 w-fit text-gold-500 block">{pr.icon}</span>
              <h4 className="font-heading text-base font-bold text-white">{pr.title}</h4>
              <p className="text-xs text-stone-400 leading-relaxed font-semibold">{pr.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Imperial Checklist Standards */}
      <div className="p-8 sm:p-12 bg-gradient-to-r from-stone-950 via-red-950/40 to-stone-950 border border-stone-900 rounded-3xl" id="sop-checklist">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 flex flex-col gap-4">
            <span className="p-2.5 rounded-xl border border-gold-500/30 text-gold-400 font-bold font-mono text-xs w-fit">QUALITY ASSURANCE LOG</span>
            <h3 className="font-heading text-2xl font-extrabold text-white">Zero Compromise Standard Policies</h3>
            <p className="text-xs text-stone-400 leading-relaxed font-medium">
              Every package leaving Clifton Block 4 kitchens undergoes double-point check procedures to verify recipe temperatures, sauce seals, and gold highlights uniformity.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4" id="sop-list-grid">
            <div className="flex items-center gap-3 p-3 bg-black/60 rounded-xl border border-stone-900">
              <CheckCircle className="w-5 h-5 text-gold-500 flex-shrink-0" />
              <span className="text-xs font-semibold text-stone-200">Raw materials verified daily at 5:00 AM</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-black/60 rounded-xl border border-stone-900">
              <CheckCircle className="w-5 h-5 text-gold-500 flex-shrink-0" />
              <span className="text-xs font-semibold text-stone-200">Air-tight hermetic foil packaging</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-black/60 rounded-xl border border-stone-900">
              <CheckCircle className="w-5 h-5 text-gold-500 flex-shrink-0" />
              <span className="text-xs font-semibold text-stone-200">Double-steamed sanitized bamboo lattices</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-black/60 rounded-xl border border-stone-900">
              <CheckCircle className="w-5 h-5 text-gold-500 flex-shrink-0" />
              <span className="text-xs font-semibold text-stone-200">No msg additives or fillers</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
