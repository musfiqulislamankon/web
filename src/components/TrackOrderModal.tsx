import React, { useState } from 'react';
import { X, Search, Package, Clock, CheckCircle2, Truck, AlertCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Order } from '../types';

export const TrackOrderModal: React.FC = () => {
  const {
    isTrackOrderModalOpen,
    setIsTrackOrderModalOpen,
    placedOrders,
    formatPrice,
  } = useStore();

  const [searchRef, setSearchRef] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  if (!isTrackOrderModalOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const cleaned = searchRef.trim().toUpperCase();
    const found = placedOrders.find(
      (o) => o.id.toUpperCase() === cleaned || o.customer.phone.includes(searchRef.trim())
    );
    setSearchedOrder(found || null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsTrackOrderModalOpen(false)}
      />

      <div className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl overflow-hidden z-10 border border-slate-200 animate-in fade-in zoom-in-95 duration-200 my-8">
        <div className="p-5 sm:p-6 bg-[#101828] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Package className="w-5 h-5 text-amber-400" />
            <h3 className="font-serif-luxury text-2xl font-bold text-white">
              Track Order & Technician Visit
            </h3>
          </div>
          <button
            onClick={() => setIsTrackOrderModalOpen(false)}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              placeholder="Enter Order ID (e.g. NX-12345) or Phone"
              value={searchRef}
              onChange={(e) => setSearchRef(e.target.value)}
              className="flex-1 px-3 py-2 border border-slate-300 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Track</span>
            </button>
          </form>

          {/* Searched Order Details */}
          {hasSearched && (
            <div>
              {searchedOrder ? (
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-4 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <div>
                      <span className="text-[10px] uppercase font-mono text-slate-400 block">
                        Order Identifier
                      </span>
                      <span className="font-bold text-slate-900 font-mono text-sm">
                        {searchedOrder.id}
                      </span>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-semibold rounded text-[11px]">
                      {searchedOrder.status}
                    </span>
                  </div>

                  <div className="space-y-1 text-slate-600">
                    <div>Recipient: <strong>{searchedOrder.customer.name}</strong> ({searchedOrder.customer.phone})</div>
                    <div>Destination: <strong>{searchedOrder.customer.address}, {searchedOrder.customer.division}</strong></div>
                    <div>Delivery Window: <strong>{searchedOrder.estimatedArrival}</strong></div>
                    <div>Payment Method: <strong className="uppercase">{searchedOrder.paymentMethod}</strong> ({formatPrice(searchedOrder.total)})</div>
                  </div>

                  {/* Items */}
                  <div className="pt-2 border-t border-slate-200 space-y-1">
                    <span className="text-[10px] font-semibold uppercase text-slate-400">Order Items:</span>
                    {searchedOrder.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between text-slate-700">
                        <span>{it.product.name} ({it.selectedColor.name}) x{it.quantity}</span>
                        <span className="font-mono">{formatPrice(it.unitPrice * it.quantity)}</span>
                      </div>
                    ))}
                    {searchedOrder.serviceBookings.map((b, idx) => (
                      <div key={idx} className="flex justify-between text-amber-800 font-medium">
                        <span>Visit: {b.service.title} ({b.date})</span>
                        <span className="font-mono">{formatPrice(b.fee)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>No orders found matching "{searchRef}". Please check the ID or contact 16255.</span>
                </div>
              )}
            </div>
          )}

          {/* Recent Orders in this device session */}
          {!hasSearched && placedOrders.length > 0 && (
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                Recent Orders On This Device
              </span>
              <div className="space-y-2">
                {placedOrders.map((o) => (
                  <div
                    key={o.id}
                    onClick={() => {
                      setSearchRef(o.id);
                      setSearchedOrder(o);
                      setHasSearched(true);
                    }}
                    className="p-3 rounded-lg border border-slate-200 hover:border-slate-400 flex items-center justify-between cursor-pointer transition-colors bg-[#FAF9F6]"
                  >
                    <div>
                      <div className="font-mono font-bold text-xs text-slate-900">{o.id}</div>
                      <div className="text-[11px] text-slate-500">{o.date} · {o.items.length} items</div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-slate-900 block font-mono">
                        {formatPrice(o.total)}
                      </span>
                      <span className="text-[10px] text-emerald-700 font-medium">
                        {o.status}
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
