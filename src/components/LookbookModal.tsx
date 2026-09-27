import React from 'react';
import { X, Quote, ShoppingBag, Eye, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/catalog';

export const LookbookModal: React.FC = () => {
  const {
    activeLookbookStory,
    setActiveLookbookStory,
    setQuickViewProduct,
    formatPrice,
  } = useStore();

  if (!activeLookbookStory) return null;

  const featuredProducts = PRODUCTS.filter((p) =>
    activeLookbookStory.curatedProductIds.includes(p.id)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
        onClick={() => setActiveLookbookStory(null)}
      />

      {/* Reader Container */}
      <div className="relative w-full max-w-4xl bg-[#FAF9F6] text-slate-900 rounded-xl shadow-2xl overflow-hidden z-10 border border-slate-300 animate-in fade-in zoom-in-95 duration-200 my-8 max-h-[90vh] flex flex-col">
        {/* Header Bar */}
        <div className="p-4 px-6 bg-white border-b border-slate-200 flex items-center justify-between">
          <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
            {activeLookbookStory.edition} · {activeLookbookStory.season}
          </div>
          <button
            onClick={() => setActiveLookbookStory(null)}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-600 hover:text-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Story Content */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8">
          {/* Hero Cover */}
          <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden bg-slate-200 shadow-sm">
            <img
              src={activeLookbookStory.coverImage}
              alt={activeLookbookStory.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Title & Subtitle */}
          <div className="max-w-2xl mx-auto text-center space-y-3">
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
              {activeLookbookStory.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
              {activeLookbookStory.subtitle}
            </p>
          </div>

          {/* Pull Quote */}
          <div className="max-w-xl mx-auto p-6 bg-amber-50/60 rounded-xl border border-amber-200/60 text-center relative">
            <Quote className="w-8 h-8 text-amber-700/30 mx-auto mb-2" />
            <p className="font-serif-luxury text-lg sm:text-xl italic text-slate-800 leading-snug">
              "{activeLookbookStory.quote}"
            </p>
          </div>

          {/* Narrative Body Paragraphs */}
          <div className="max-w-2xl mx-auto space-y-5 text-sm sm:text-base text-slate-700 leading-relaxed font-light">
            {activeLookbookStory.narrative.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Curated Products in This Story */}
          {featuredProducts.length > 0 && (
            <div className="pt-8 border-t border-slate-200 max-w-3xl mx-auto">
              <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-4 text-center">
                Artifacts Featured In This Edition
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {featuredProducts.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => {
                      setActiveLookbookStory(null);
                      setQuickViewProduct(prod);
                    }}
                    className="p-3 bg-white rounded-lg border border-slate-200 hover:border-slate-400 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="aspect-[4/3] rounded overflow-hidden mb-2 bg-slate-100">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="text-[10px] uppercase font-bold text-slate-500">
                        {prod.brand}
                      </div>
                      <div className="text-xs font-semibold text-slate-900 line-clamp-1">
                        {prod.name}
                      </div>
                    </div>
                    <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900 tabular-nums">
                        {formatPrice(prod.price)}
                      </span>
                      <span className="text-amber-800 hover:underline flex items-center gap-1 font-medium">
                        Inspect <Eye className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
