import React from 'react';
import {
  Wrench,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
  MapPin,
  ArrowRight,
} from 'lucide-react';
import { SETTING_SERVICES, ASSET_IMAGES } from '../data/catalog';
import { SettingService } from '../types';
import { useStore } from '../context/StoreContext';

export const SettingServicesSection: React.FC = () => {
  const { setActiveBookingService, formatPrice, selectedDivision } = useStore();

  return (
    <section id="services-section" className="py-20 bg-[#F4F1EA] border-b border-[#E3DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-800 font-semibold mb-2">
              <Wrench className="w-3.5 h-3.5" />
              <span>The Setting Atelier · Doorstep Service</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-900 tracking-tight leading-tight">
              White-Glove Device Calibration & Setup Visits
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 font-light leading-relaxed">
              We believe purchasing refined hardware is only half the craft. Our certified engineers travel to your residence, boutique, or studio across Bangladesh to migrate data, tune audio acoustics, and deploy retail terminals.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs bg-white/80 backdrop-blur-sm p-3.5 rounded-lg border border-[#DDD9CE]">
            <div className="flex items-center gap-1.5 text-slate-700">
              <MapPin className="w-4 h-4 text-amber-700" />
              <span>Active in <strong>{selectedDivision}</strong></span>
            </div>
            <span className="text-slate-300">·</span>
            <div className="flex items-center gap-1.5 text-slate-700">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Police-verified certified engineers</span>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SETTING_SERVICES.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl border border-[#E0DCD2] hover:border-slate-400 p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-all"
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-900 bg-amber-50 border border-amber-200/60 px-2.5 py-1 rounded">
                    {service.badge}
                  </span>
                  <div className="text-right">
                    <span className="text-xl sm:text-2xl font-bold text-slate-900 tabular-nums">
                      {formatPrice(service.price)}
                    </span>
                    <span className="block text-[11px] text-slate-500">Flat Visit Fee</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mb-5 leading-relaxed">
                  {service.subtitle}
                </p>

                {/* Deliverables Checklist */}
                <div className="space-y-2 mb-6">
                  {service.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer: Metadata and Booking Button */}
              <div className="pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {service.duration}
                  </span>
                  <span>·</span>
                  <span className="font-medium text-slate-700">
                    {service.technicianTier}
                  </span>
                </div>

                <button
                  onClick={() => setActiveBookingService(service)}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>Schedule Setting Visit</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Setting Protocol Assurance */}
        <div className="mt-12 bg-white rounded-xl border border-[#E0DCD2] p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-amber-50 rounded-lg text-amber-800 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1">
                Zero Cloud Exposure
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct cable-to-cable air-gapped device transfers. Your photos, private documents, and biometric records never touch external cloud servers.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-amber-50 rounded-lg text-amber-800 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1">
                Punctual Time Windows
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Choose morning, afternoon, or evening slots. You receive live SMS updates and the technician's photo ID before arrival.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-amber-50 rounded-lg text-amber-800 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1">
                30-Day Follow-Up Guarantee
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct WhatsApp contact with your assigned technician for any questions or re-calibrations within 30 days of the visit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
