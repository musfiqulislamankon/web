import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight, Eye, Wrench } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS, SETTING_SERVICES } from '../data/catalog';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    setQuickViewProduct,
    setActiveBookingService,
    formatPrice,
  } = useStore();

  const [query, setQuery] = useState('');

  const quickPicks = ['iPhone 16 Pro Max', 'iPhone 16', 'Pulse 12', 'Field One ANC', 'POS Terminal', 'Technician Visit'];

  const matchedProducts = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q)
    );
  }, [query]);

  const matchedServices = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return SETTING_SERVICES.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.subtitle.toLowerCase().includes(q) ||
        s.badge.toLowerCase().includes(q)
    );
  }, [query]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      {/* Search Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden z-10 border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Input Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center gap-3 bg-[#FAF9F6]">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search phones, acoustics, POS terminals, or technician visits..."
            autoFocus
            className="flex-1 bg-transparent text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-slate-400 hover:text-black p-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 rounded-full text-slate-400 hover:text-black hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Picks if no query */}
        {!query.trim() && (
          <div className="p-6">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-2.5">
              Popular Searches
            </span>
            <div className="flex flex-wrap gap-2">
              {quickPicks.map((pick) => (
                <button
                  key={pick}
                  onClick={() => setQuery(pick)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-xs text-slate-700 rounded-md transition-colors"
                >
                  {pick}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results list */}
        {query.trim() && (
          <div className="p-5 max-h-[60vh] overflow-y-auto space-y-4">
            {/* Products */}
            {matchedProducts.length > 0 && (
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                  Matching Hardware ({matchedProducts.length})
                </span>
                <div className="space-y-2">
                  {matchedProducts.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        setIsSearchOpen(false);
                        setQuickViewProduct(p);
                      }}
                      className="p-2.5 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 flex items-center justify-between gap-3 cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-12 h-12 rounded bg-slate-100 overflow-hidden shrink-0">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-semibold text-slate-900 truncate">
                            {p.name}
                          </h4>
                          <span className="text-[11px] text-slate-500">
                            {p.brand} · {p.categoryName}
                          </span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs font-bold text-slate-900 tabular-nums">
                          {formatPrice(p.price)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Services */}
            {matchedServices.length > 0 && (
              <div className="pt-3 border-t border-slate-100">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                  Matching Setting Services ({matchedServices.length})
                </span>
                <div className="space-y-2">
                  {matchedServices.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => {
                        setIsSearchOpen(false);
                        setActiveBookingService(s);
                      }}
                      className="p-2.5 rounded-lg bg-amber-50/50 hover:bg-amber-50 border border-amber-200/60 flex items-center justify-between gap-3 cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Wrench className="w-4 h-4 text-amber-700 shrink-0" />
                        <div className="min-w-0">
                          <h4 className="text-xs font-semibold text-slate-900 truncate">
                            {s.title}
                          </h4>
                          <span className="text-[11px] text-slate-500">
                            {s.badge} · {s.duration}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-slate-900 tabular-nums shrink-0">
                        {formatPrice(s.price)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {matchedProducts.length === 0 && matchedServices.length === 0 && (
              <div className="text-center py-10 text-xs text-slate-500">
                No matching hardware or service found for "{query}".
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
