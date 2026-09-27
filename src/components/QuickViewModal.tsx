import React, { useState, useEffect } from 'react';
import {
  X,
  Check,
  ShieldCheck,
  Truck,
  Wrench,
  ShoppingBag,
  Star,
  Layers,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductColor } from '../types';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    formatPrice,
    addToCart,
    selectedDivision,
    setActiveBookingService,
  } = useStore();

  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(
    quickViewProduct ? quickViewProduct.colors[0] : null
  );
  const [selectedStorage, setSelectedStorage] = useState<string | undefined>(
    quickViewProduct?.storageOptions?.[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [includeSetupVisit, setIncludeSetupVisit] = useState(false);

  // Reset state when product changes
  useEffect(() => {
    if (quickViewProduct) {
      setSelectedColor(quickViewProduct.colors[0]);
      setSelectedStorage(quickViewProduct.storageOptions?.[0]);
      setQuantity(1);
      setIncludeSetupVisit(false);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const activeColor = selectedColor || quickViewProduct.colors[0];

  const handleAdd = () => {
    addToCart(
      quickViewProduct,
      activeColor,
      selectedStorage,
      quantity,
      includeSetupVisit
    );
    setQuickViewProduct(null);
  };

  const setupCost = quickViewProduct.setupServiceCost || 1200;
  const totalPrice =
    quickViewProduct.price * quantity + (includeSetupVisit ? setupCost * quantity : 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden z-10 border border-slate-200 animate-in fade-in zoom-in-95 duration-200 my-8">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 hover:bg-slate-100 text-slate-700 hover:text-black transition-colors shadow-sm"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[85vh] overflow-y-auto">
          {/* Gallery / Left Side */}
          <div className="bg-[#F6F5F2] p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-white shadow-xs">
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded text-[11px] font-medium text-slate-800">
                Selected Shade: {activeColor.name}
              </div>
            </div>

            {/* Warranty & Guarantee Callouts */}
            <div className="mt-6 pt-6 border-t border-slate-200/70 space-y-2.5 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{quickViewProduct.warranty}</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-slate-700 shrink-0" />
                <span>
                  Insured dispatch to <strong className="text-slate-900">{selectedDivision}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-slate-700 shrink-0" />
                <span>Original BTRC seal with verified IMEI certificate</span>
              </div>
            </div>
          </div>

          {/* Right Info & Purchase Options */}
          <div className="p-6 sm:p-8 flex flex-col justify-between bg-white">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span className="uppercase tracking-wider font-semibold text-slate-700">
                  {quickViewProduct.brand} · {quickViewProduct.categoryName}
                </span>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-semibold text-slate-800">{quickViewProduct.rating}</span>
                  <span className="text-slate-400">({quickViewProduct.reviewsCount})</span>
                </div>
              </div>

              {/* Title & Tagline */}
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                {quickViewProduct.name}
              </h2>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                {quickViewProduct.description}
              </p>

              {/* Price display */}
              <div className="flex items-baseline gap-3 mb-6 p-3 bg-[#FAF9F6] rounded-md border border-[#ECEAE3]">
                <span className="text-2xl font-bold text-slate-900 tabular-nums">
                  {formatPrice(quickViewProduct.price)}
                </span>
                {quickViewProduct.compareAtPrice && (
                  <span className="text-sm text-slate-400 line-through tabular-nums">
                    {formatPrice(quickViewProduct.compareAtPrice)}
                  </span>
                )}
                <span className="ml-auto text-xs text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded">
                  In Stock ({quickViewProduct.stock} at Dhanmondi Atelier)
                </span>
              </div>

              {/* Color Selection */}
              <div className="mb-5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                  Select Color: <span className="font-normal text-slate-900">{activeColor.name}</span>
                </label>
                <div className="flex items-center gap-3">
                  {quickViewProduct.colors.map((color) => {
                    const isSelected = activeColor.name === color.name;
                    return (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        className={`group flex items-center gap-2 p-1.5 rounded-md border text-xs transition-all cursor-pointer ${
                          isSelected
                            ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900'
                            : 'border-slate-200 hover:border-slate-400'
                        }`}
                      >
                        <span
                          className="w-4 h-4 rounded-full border border-slate-300 inline-block shadow-xs"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="text-slate-800 text-[11px] font-medium">{color.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Storage Selection (If applicable) */}
              {quickViewProduct.storageOptions && (
                <div className="mb-5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                    Storage Capacity
                  </label>
                  <div className="flex items-center gap-2">
                    {quickViewProduct.storageOptions.map((storage) => {
                      const isSelected = selectedStorage === storage;
                      return (
                        <button
                          key={storage}
                          onClick={() => setSelectedStorage(storage)}
                          className={`px-3 py-1.5 text-xs font-semibold rounded border transition-all cursor-pointer ${
                            isSelected
                              ? 'border-slate-900 bg-slate-900 text-white'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400'
                          }`}
                        >
                          {storage}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Setting Visit Addon Checkbox */}
              {quickViewProduct.setupEligible && (
                <div className="mb-6 p-3.5 bg-amber-50/70 border border-amber-200 rounded-lg">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeSetupVisit}
                      onChange={(e) => setIncludeSetupVisit(e.target.checked)}
                      className="mt-0.5 w-4 h-4 text-amber-700 rounded border-amber-300 focus:ring-amber-500 cursor-pointer"
                    />
                    <div className="text-xs">
                      <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                        <Wrench className="w-3.5 h-3.5 text-amber-700" />
                        Include Doorstep Setting Visit (+{formatPrice(setupCost)})
                      </div>
                      <p className="text-slate-600 text-[11px] mt-0.5 leading-snug">
                        A certified Nexara technician visits your home/office in {selectedDivision} to transfer all WhatsApp chats, photos, setup biometrics, and calibrate device security.
                      </p>
                    </div>
                  </label>
                </div>
              )}

              {/* Key Specifications Bullet Points */}
              <div className="mb-6 pt-4 border-t border-slate-100">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  Atelier Specifications
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
                  {Object.entries(quickViewProduct.specs).map(([key, val]) => (
                    <div key={key} className="bg-slate-50 p-2 rounded">
                      <span className="text-slate-500 block text-[10px] uppercase font-mono">{key}</span>
                      <span className="font-medium text-slate-800 line-clamp-1">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Quantity Stepper */}
              <div className="flex items-center border border-slate-300 rounded overflow-hidden h-10 w-28 shrink-0">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors"
                >
                  -
                </button>
                <span className="flex-1 text-center text-xs font-semibold text-slate-900 tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors"
                >
                  +
                </button>
              </div>

              {/* Add to Bag CTA */}
              <button
                onClick={handleAdd}
                className="flex-1 h-10 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag · {formatPrice(totalPrice)}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
