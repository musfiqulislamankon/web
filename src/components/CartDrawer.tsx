import React from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  Wrench,
  ShieldCheck,
  ShoppingBag,
  ArrowRight,
  MapPin,
  Calendar,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { DIVISIONS_INFO } from '../data/catalog';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    toggleItemSetup,
    serviceBookings,
    removeServiceBooking,
    selectedDivision,
    formatPrice,
    cartSubtotal,
    deliveryFee,
    cartTotal,
    setIsCheckoutModalOpen,
  } = useStore();

  if (!isCartOpen) return null;

  const totalLinesCount = cart.length + serviceBookings.length;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-slate-200 animate-in slide-in-from-right duration-200">
          {/* Header */}
          <div className="p-5 border-b border-slate-200 bg-[#FAF9F6] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-slate-900" />
              <h2 className="font-serif-luxury text-xl font-bold text-slate-900">
                Your Shopping Bag
              </h2>
              <span className="text-xs font-mono font-medium text-slate-500">
                ({totalLinesCount} {totalLinesCount === 1 ? 'item' : 'items'})
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {totalLinesCount === 0 ? (
              <div className="text-center py-16 px-4 space-y-3">
                <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="font-serif-luxury text-xl font-medium text-slate-800">
                  Your bag is currently empty
                </h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Browse our curated handhelds, acoustic monitors, or book an on-site technician visit.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 px-5 py-2.5 bg-slate-900 text-white text-xs font-semibold uppercase tracking-wider rounded hover:bg-slate-800 transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              <>
                {/* Physical Products */}
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 bg-white rounded-lg border border-slate-200 hover:border-slate-300 transition-all flex flex-col gap-2.5"
                  >
                    <div className="flex items-start gap-3">
                      {/* Thumbnail */}
                      <div className="w-16 h-16 rounded overflow-hidden bg-slate-100 shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-semibold text-slate-900 line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-slate-400 hover:text-red-600 transition-colors p-0.5"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1.5 flex-wrap">
                          <span>Shade: {item.selectedColor.name}</span>
                          {item.selectedStorage && (
                            <>
                              <span>·</span>
                              <span>{item.selectedStorage}</span>
                            </>
                          )}
                        </div>

                        <div className="mt-2 flex items-center justify-between">
                          {/* Quantity Stepper */}
                          <div className="flex items-center border border-slate-200 rounded h-7 w-20">
                            <button
                              onClick={() => updateCartQuantity(item.id, -1)}
                              className="w-6 h-full flex items-center justify-center text-slate-600 hover:bg-slate-100"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="flex-1 text-center text-xs font-mono font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.id, 1)}
                              className="w-6 h-full flex items-center justify-center text-slate-600 hover:bg-slate-100"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Line Price */}
                          <div className="text-xs font-bold text-slate-900 tabular-nums">
                            {formatPrice(item.unitPrice * item.quantity)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Setting Service Toggle for this item */}
                    {item.product.setupEligible && (
                      <div className="pt-2 border-t border-slate-100">
                        <label className="flex items-center justify-between text-[11px] text-slate-700 cursor-pointer">
                          <span className="flex items-center gap-1.5">
                            <input
                              type="checkbox"
                              checked={item.includeSetupVisit}
                              onChange={() => toggleItemSetup(item.id)}
                              className="rounded text-amber-700 focus:ring-amber-500 w-3.5 h-3.5 cursor-pointer"
                            />
                            <span className="flex items-center gap-1 text-slate-800 font-medium">
                              <Wrench className="w-3 h-3 text-amber-700" />
                              Doorstep Setting Visit
                            </span>
                          </span>
                          <span className="font-mono text-slate-600">
                            +{formatPrice((item.product.setupServiceCost || 1200) * item.quantity)}
                          </span>
                        </label>
                      </div>
                    )}
                  </div>
                ))}

                {/* Standalone Service Bookings */}
                {serviceBookings.map((b) => (
                  <div
                    key={b.id}
                    className="p-3.5 bg-amber-50/50 rounded-lg border border-amber-200/80 flex flex-col gap-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2">
                        <Wrench className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] uppercase font-bold text-amber-900">
                            Setting Appointment
                          </span>
                          <h4 className="text-xs font-semibold text-slate-900">
                            {b.service.title}
                          </h4>
                        </div>
                      </div>

                      <button
                        onClick={() => removeServiceBooking(b.id)}
                        className="text-slate-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-slate-600 space-y-1 bg-white/70 p-2 rounded">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>{b.date} ({b.timeSlot})</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{b.district}, {b.division}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-[11px] text-slate-500">Flat Visit Charge</span>
                      <span className="font-bold text-slate-900 tabular-nums">
                        {formatPrice(b.fee)}
                      </span>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Drawer Footer with Calculations & Checkout Button */}
          {totalLinesCount > 0 && (
            <div className="p-5 border-t border-slate-200 bg-[#FAF9F6] space-y-3">
              {/* Delivery Info row */}
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-700" />
                  Delivery to {selectedDivision}:
                </span>
                <span className="font-mono">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-700 font-semibold">FREE</span>
                  ) : (
                    formatPrice(deliveryFee)
                  )}
                </span>
              </div>

              {/* Subtotal */}
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>Subtotal:</span>
                <span className="font-mono tabular-nums">{formatPrice(cartSubtotal)}</span>
              </div>

              {/* Total */}
              <div className="flex items-baseline justify-between pt-2 border-t border-slate-200">
                <span className="font-serif-luxury text-base font-bold text-slate-900">
                  Estimated Total:
                </span>
                <span className="text-xl font-bold text-slate-900 tabular-nums">
                  {formatPrice(cartTotal)}
                </span>
              </div>

              {/* Guest Checkout Trust Note */}
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Instant Guest Checkout · Cash on Delivery & bKash Accepted</span>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
