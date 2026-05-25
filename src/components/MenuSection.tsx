import React, { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Eye, Flame, AlertCircle, Sparkles, Check, Phone } from "lucide-react";
import { Product, Category } from "../types";

interface MenuSectionProps {
  products: Product[];
  categories: Category[];
  phone: string;
  addToast: (msg: string, type: "success" | "error" | "warning" | "info") => void;
}

export default function MenuSection({ products, categories, phone, addToast }: MenuSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceSort, setPriceSort] = useState<"default" | "low-high" | "high-low">("default");
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Simulated Cart/Meal Selector for interactive feedback
  const [selectedEstimateItems, setSelectedEstimateItems] = useState<{ [id: string]: number }>({});

  const handleToggleEstimate = (id: string, name: string, price: number) => {
    setSelectedEstimateItems((prev) => {
      const current = prev[id] || 0;
      if (current === 0) {
        addToast(`Added 1× ${name} to your Imperial Feast list estimator!`, "success");
        return { ...prev, [id]: 1 };
      } else {
        return { ...prev, [id]: 0 };
      }
    });
  };

  const handleUpdateQty = (id: string, delta: number) => {
    setSelectedEstimateItems((prev) => {
      const current = prev[id] || 0;
      const next = current + delta;
      if (next <= 0) {
        return { ...prev, [id]: 0 };
      }
      return { ...prev, [id]: next };
    });
  };

  const estimateTotal = useMemo(() => {
    const list = Object.entries(selectedEstimateItems) as [string, number][];
    return list.reduce((sum, [id, qty]) => {
      const prod = products.find((p) => p.id === id);
      return sum + (prod ? prod.price * qty : 0);
    }, 0);
  }, [selectedEstimateItems, products]);

  // Combined Search & Filter Pipeline
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search query match
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Category match
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Availability toggle
    if (onlyAvailable) {
      result = result.filter((p) => p.available);
    }

    // Pricing Sorting logic
    if (priceSort === "low-high") {
      result.sort((a, b) => a.price - b.price);
    } else if (priceSort === "high-low") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, searchQuery, selectedCategory, priceSort, onlyAvailable]);

  return (
    <div className="w-full text-zinc-100 bg-neutral-950/40 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="menu-view">
      
      {/* Dynamic Header */}
      <div className="text-center mb-16 flex flex-col items-center gap-4 pt-10">
        <span className="text-xs font-mono font-bold text-gold-500 tracking-widest uppercase border-b border-gold-500/20 pb-0.5">
          THE PALACE KITCHEN MENU
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight text-glow-gold">
          Steamed, Fried & Baked Gold
        </h1>
        <p className="text-sm text-stone-400 max-w-2xl">
          Savor Karachi's ultimate handcrafted dumplings. Built with premium tender meats, infused aromatic oils, and finished in golden highlights. Browse categories below to select items.
        </p>
      </div>

      {/* FILTER & SEARCH CONTROL CONSOLE */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border shadow-xl flex flex-col gap-6 mb-12" id="filter-console">
        
        {/* Search Input and Sort Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-6 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search Golden Emperor, Schezwan, cheese dumplings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-950/60 border border-stone-850 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-stone-200 placeholder-stone-600 focus:outline-none focus:border-gold-500/40 transition-colors"
            />
          </div>

          <div className="md:col-span-3 flex items-center justify-between px-4 py-3 bg-stone-950/60 rounded-2xl border border-stone-850">
            <span className="text-xs text-stone-500 font-medium">Availability</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={onlyAvailable}
                onChange={(e) => setOnlyAvailable(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-stone-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-stone-500 after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gold-500 peer-checked:after:bg-black" />
            </label>
          </div>

          <div className="md:col-span-3">
            <select
              value={priceSort}
              onChange={(e: any) => setPriceSort(e.target.value)}
              className="w-full bg-stone-950/60 border border-stone-850 rounded-2xl py-3.5 px-4 text-sm text-stone-300 focus:outline-none focus:border-gold-500/40 cursor-pointer"
            >
              <option value="default">Default Royal Sort</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Categories Bar Pills */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none border-t border-stone-900 pt-5" id="category-pills-bar">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`px-5 py-2.5 rounded-xl text-xs font-mono tracking-widest uppercase font-bold transition-all flex-shrink-0 cursor-pointer ${
              selectedCategory === "all"
                ? "bg-gold-500 text-stone-950 shadow-lg font-extrabold"
                : "bg-stone-900 hover:bg-stone-850 border border-stone-850 text-stone-400 hover:text-stone-200"
            }`}
          >
            All Dumplings ({products.length})
          </button>

          {categories.map((cat) => {
            const count = products.filter((p) => p.category === cat.id).length;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-xl text-xs font-mono tracking-widest uppercase font-bold transition-all flex-shrink-0 cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-gradient-to-r from-gold-400 to-gold-600 text-stone-950 font-extrabold shadow-lg"
                    : "bg-stone-900 hover:bg-stone-850 border border-stone-850 text-stone-400 hover:text-stone-200"
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* PRODUCTS DIRECT LISTINGS GRID */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6" id="products-catalog-grid">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full py-16 text-center text-stone-500 border border-dashed border-stone-900 rounded-3xl flex flex-col items-center justify-center gap-4">
              <AlertCircle className="w-10 h-10 text-stone-700" />
              <div>
                <h4 className="font-heading text-lg font-bold text-white mb-1">No Royal Delicacies Found</h4>
                <p className="text-xs text-stone-500">Try adjusting your filters or expanding your keyword inquiry search.</p>
              </div>
            </div>
          ) : (
            filteredProducts.map((prod) => {
              const estQty = selectedEstimateItems[prod.id] || 0;
              return (
                <div
                  key={prod.id}
                  className={`group relative bg-[#090706] border rounded-2xl overflow-hidden transition-all duration-300 flex flex-col h-full hover:-translate-y-1 ${
                    estQty > 0 ? "border-gold-500/40 shadow-xl" : "border-stone-900 hover:border-stone-800"
                  }`}
                  id={`prod-item-${prod.id}`}
                >
                  {/* Tags Badges Floating */}
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 items-start">
                    {prod.featured && (
                      <span className="px-2.5 py-1 text-[8px] font-mono tracking-widest uppercase font-bold bg-gold-500 text-stone-950 rounded shadow-md flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5 fill-current" />
                        <span>SIGNATURE</span>
                      </span>
                    )}
                    {!prod.available && (
                      <span className="px-2.5 py-1 text-[8px] font-mono tracking-widest uppercase font-bold bg-stone-900 border border-stone-850 text-stone-500 rounded shadow-md">
                        SOLD OUT
                      </span>
                    )}
                  </div>

                  {/* Thumbnail Image Section */}
                  <div className="relative aspect-[4/3] bg-stone-950 overflow-hidden">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      referrerPolicy="no-referrer"
                      className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
                        !prod.available ? "grayscale opacity-40" : ""
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090706] via-transparent to-transparent opacity-90" />
                  </div>

                  {/* Body Metadata Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {prod.tags.map((tag, i) => (
                          <span key={i} className="text-[9px] font-mono font-semibold text-stone-500 bg-stone-900/80 px-2 py-0.5 rounded border border-stone-850">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h3 className="font-heading text-base font-bold text-white mt-1 group-hover:text-gold-400 transition-colors">
                        {prod.name}
                      </h3>

                      <p className="text-xs text-stone-400 leading-relaxed min-h-[36px] line-clamp-3 font-medium">
                        {prod.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-stone-900 pt-4">
                      <div className="flex flex-col">
                        <span className="text-[9px] text-stone-600 font-mono tracking-widest uppercase">Per Serving</span>
                        <span className="text-base font-bold text-gold-400 font-mono">PKR {prod.price}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedProduct(prod)}
                          className="p-2 rounded-xl text-stone-400 hover:text-stone-200 bg-stone-900 border border-stone-850 hover:bg-stone-850 transition-colors"
                          title="View Ingredient Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {prod.available ? (
                          estQty > 0 ? (
                            <div className="flex items-center bg-stone-900 border border-gold-500/30 rounded-xl overflow-hidden">
                              <button
                                type="button"
                                onClick={() => handleUpdateQty(prod.id, -1)}
                                className="px-2.5 py-1.5 text-xs text-gold-400 hover:bg-stone-850 font-bold transition-colors"
                              >
                                -
                              </button>
                              <span className="px-2 font-mono font-bold text-xs text-white">
                                {estQty}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleUpdateQty(prod.id, 1)}
                                className="px-2.5 py-1.5 text-xs text-gold-400 hover:bg-stone-850 font-bold transition-colors"
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleToggleEstimate(prod.id, prod.name, prod.price)}
                              className="px-4 py-2 rounded-xl border border-stone-800 bg-stone-900/60 hover:bg-stone-850 text-xs font-bold text-gold-400 hover:text-white transition-all cursor-pointer"
                            >
                              Add serving
                            </button>
                          )
                        ) : (
                          <span className="text-[10px] text-stone-600 font-mono font-bold uppercase py-2 px-3 bg-stone-900 rounded-xl border border-stone-850">
                            Sold Out
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* INTERACTIVE ESTIMATOR SIDEBAR PANEL */}
        <div className="lg:col-span-4 lg:sticky lg:top-36" id="estimator-panel">
          <div className="glass-panel p-6 rounded-3xl border shadow-xl flex flex-col gap-6" id="order-calculator-card">
            <div className="flex items-center gap-3 border-b border-stone-900 pb-4">
              <span className="p-2 rounded-xl bg-gradient-to-r from-red-950 to-stone-950 text-red-500 block">
                <Flame className="w-5 h-5 fill-current text-gold-500" />
              </span>
              <div>
                <h3 className="font-heading text-base font-bold text-white">Imperial Meal Estimator</h3>
                <p className="text-[10px] text-stone-500 font-mono tracking-wider uppercase mt-0.5">Simulate Your Order Bill</p>
              </div>
            </div>

            {/* List items added to bill simulator */}
            <div className="flex flex-col gap-4 max-h-[220px] overflow-y-auto pr-2 scrollbar-none" id="estimator-items-panel">
              {(Object.entries(selectedEstimateItems) as [string, number][]).filter(([_, qty]) => qty > 0).length === 0 ? (
                <div className="text-center py-6 text-stone-600 text-xs leading-normal">
                  No dumplings added to bill. Click <span className="text-gold-500 font-bold">"Add serving"</span> on any product to estimate pricing.
                </div>
              ) : (
                (Object.entries(selectedEstimateItems) as [string, number][])
                  .filter(([_, qty]) => qty > 0)
                  .map(([id, qty]) => {
                    const prod = products.find((p) => p.id === id);
                    if (!prod) return null;
                    return (
                      <div key={id} className="flex items-center justify-between text-xs font-semibold gap-3 bg-stone-950/40 p-2.5 rounded-xl border border-stone-900">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-stone-200 truncate">{prod.name}</h4>
                          <span className="text-[10px] text-stone-600 font-mono">PKR {prod.price} × {qty}</span>
                        </div>
                        <div className="flex items-center bg-stone-900 rounded-lg overflow-hidden border border-stone-850 flex-shrink-0">
                          <button
                            type="button"
                            onClick={() => handleUpdateQty(id, -1)}
                            className="px-2 py-1 hover:bg-stone-850 font-bold text-stone-400 hover:text-white"
                          >
                            -
                          </button>
                          <span className="px-1.5 font-mono text-stone-200 text-xs">{(qty as number)}</span>
                          <button
                            type="button"
                            onClick={() => handleUpdateQty(id, 1)}
                            className="px-2 py-1 hover:bg-stone-850 font-bold text-stone-400 hover:text-white"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-mono text-gold-400 font-bold flex-shrink-0">PKR {prod.price * (qty as number)}</span>
                      </div>
                    );
                  })
              )}
            </div>

            {/* Estimate Totals */}
            <div className="border-t border-stone-900 pt-4 flex flex-col gap-2.5 font-semibold">
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span>Cooking Prep Standard</span>
                <span className="text-stone-300">Handmade Bamboo</span>
              </div>
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span>Karachi Tax / Delivery</span>
                <span className="text-emerald-500 font-mono">Calculated on Call</span>
              </div>
              
              <div className="flex items-center justify-between text-sm text-stone-200 pt-2 border-t border-dashed border-stone-900">
                <span>Estimated Subtotal</span>
                <span className="text-base font-bold text-gold-400 font-mono">PKR {estimateTotal}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href={`tel:${phone}`}
                className="w-full py-3.5 rounded-xl btn-gold text-center text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Call to Order: {phone}</span>
              </a>

              <p className="text-[10px] text-stone-600 leading-normal text-center">
                Press the call button to start booking. Our helpline supports instant cash-on-delivery and digital bank payment confirmations.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* INGREDIENT DETAIL MODAL OVERLAY */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" id="detail-modal-overlay">
          <div className="glass-panel-heavy rounded-3xl border max-w-lg w-full overflow-hidden shadow-2xl animate-scale-up">
            <div className="relative aspect-[16/10] bg-stone-950">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 to-transparent" />
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 border border-stone-800 text-stone-400 hover:text-white hover:bg-black transition-all cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded bg-stone-900 border border-stone-800 font-mono text-[9px] font-bold text-gold-500 uppercase tracking-widest">
                  {categories.find((c) => c.id === selectedProduct.category)?.name || "Royal Choice"}
                </span>
                <span className="text-lg font-bold text-gold-400 font-mono">PKR {selectedProduct.price}</span>
              </div>

              <div>
                <h3 className="font-heading text-lg font-bold text-white mb-2">{selectedProduct.name}</h3>
                <p className="text-xs text-stone-400 leading-relaxed font-medium mb-4">{selectedProduct.description}</p>
                
                <h4 className="text-xs font-mono font-bold text-stone-400 uppercase tracking-widest mb-2 border-b border-stone-900 pb-1">Taste Profiles</h4>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {selectedProduct.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] font-semibold text-stone-200 bg-stone-900 border border-stone-850 py-1 px-2.5 rounded-lg flex items-center gap-1">
                      <Check className="w-3 h-3 text-gold-500" />
                      <span>{tag}</span>
                    </span>
                  ))}
                  <span className="text-[10px] font-semibold text-stone-200 bg-stone-900 border border-stone-850 py-1 px-2.5 rounded-lg flex items-center gap-1">
                    <Check className="w-3 h-3 text-gold-500" />
                    <span>Hygienically Steamed</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-stone-900">
                <button
                  type="button"
                  onClick={() => {
                    handleToggleEstimate(selectedProduct.id, selectedProduct.name, selectedProduct.price);
                    setSelectedProduct(null);
                  }}
                  className="flex-1 py-3.5 rounded-xl btn-gold text-sm font-bold cursor-pointer"
                >
                  Add serving to Bill
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  className="px-5 py-3.5 rounded-xl border border-stone-800 bg-stone-900 hover:bg-stone-850 text-sm font-semibold text-stone-300 transition-colors cursor-pointer"
                >
                  Close details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
