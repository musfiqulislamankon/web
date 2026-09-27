import React from 'react';
import { ArrowRight, ShieldCheck, Truck, Wrench } from 'lucide-react';
import { ASSET_IMAGES } from '../data/catalog';
import { useStore } from '../context/StoreContext';

interface HeroBannerProps {
  onExploreClick: () => void;
  onBookServiceClick: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreClick,
  onBookServiceClick,
}) => {
  const { selectedDivision } = useStore();

  return (
    <section className="relative w-full bg-[#12161A] text-white overflow-hidden">
      {/* Background Image Container with Measured Contrast Scrim */}
      <div className="relative w-full min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex items-center">
        <img
          src={ASSET_IMAGES.hero}
          alt="Nexara luxury gadget collection and setting atelier"
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.78]"
          referrerPolicy="no-referrer"
        />

        {/* Multi-stage Scrim for WCAG AA readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#12161A] via-transparent to-black/30" />

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-2xl">
            {/* Unboxed clean metadata kicker */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#EAB308] font-medium mb-4">
              <span>Autumn Atelier Collection</span>
              <span aria-hidden="true">·</span>
              <span>Volume IV</span>
              <span aria-hidden="true">·</span>
              <span>Dhanmondi, Dhaka</span>
            </div>

            {/* Headline with text-wrap: balance */}
            <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] tracking-tight text-white mb-6 text-balance">
              Rooted in Tactile Form. <br />
              <span className="italic font-normal text-[#F3E8D6]">Calibrated for Dhaka Life.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed mb-8 max-w-xl">
              A curated house of flagship smartphones, acoustic monitors, and brass-weighted desk instruments — accompanied by our signature white-glove on-site setting visits at your doorstep.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onExploreClick}
                className="px-6 py-3.5 bg-[#FAF9F6] text-slate-900 text-xs font-semibold uppercase tracking-wider rounded hover:bg-white transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore The Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onBookServiceClick}
                className="px-6 py-3.5 bg-transparent border border-slate-400 text-white text-xs font-semibold uppercase tracking-wider rounded hover:bg-white/10 hover:border-white transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Wrench className="w-4 h-4 text-[#EAB308]" />
                <span>Book Setting Technician</span>
              </button>
            </div>

            {/* Trust Markers Bar */}
            <div className="mt-12 pt-8 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-[#EAB308] shrink-0" />
                <span>
                  <strong className="text-white font-medium">To {selectedDivision}:</strong> Fast insured dispatch
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#EAB308] shrink-0" />
                <span>
                  <strong className="text-white font-medium">BTRC Approved:</strong> Official 2-year warranty
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Wrench className="w-4 h-4 text-[#EAB308] shrink-0" />
                <span>
                  <strong className="text-white font-medium">On-Site Setting:</strong> Doorstep technician visits
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
