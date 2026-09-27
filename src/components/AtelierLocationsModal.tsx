import React from 'react';
import { X, MapPin, Clock, Phone, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ATELIER_LOCATIONS } from '../data/catalog';

export const AtelierLocationsModal: React.FC = () => {
  const { isLocationsModalOpen, setIsLocationsModalOpen } = useStore();

  if (!isLocationsModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsLocationsModalOpen(false)}
      />

      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden z-10 border border-slate-200 animate-in fade-in zoom-in-95 duration-200 my-8">
        {/* Header */}
        <div className="p-6 bg-[#101828] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">
                Atelier Directory
              </div>
              <h3 className="font-serif-luxury text-2xl font-bold text-white">
                Visit Our Physical Maisons in Dhaka
              </h3>
            </div>
          </div>

          <button
            onClick={() => setIsLocationsModalOpen(false)}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {ATELIER_LOCATIONS.map((loc, idx) => (
            <div
              key={idx}
              className="p-5 bg-[#FAF9F6] rounded-xl border border-slate-200 space-y-3"
            >
              <h4 className="font-serif-luxury text-xl font-bold text-slate-900">
                {loc.name}
              </h4>

              <div className="space-y-1.5 text-xs text-slate-700">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span>{loc.address}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>{loc.hours}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span className="font-mono">{loc.phone}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200/60 flex flex-wrap gap-1.5">
                {loc.features.map((feat, fIdx) => (
                  <span
                    key={fIdx}
                    className="text-[11px] bg-white border border-slate-200 text-slate-600 px-2 py-0.5 rounded"
                  >
                    {feat}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
