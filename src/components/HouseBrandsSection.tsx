import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { HOUSE_BRANDS } from '../data/catalog';
import { HouseBrand } from '../types';

interface HouseBrandsSectionProps {
  onSelectBrand: (brandName: string) => void;
}

export const HouseBrandsSection: React.FC<HouseBrandsSectionProps> = ({ onSelectBrand }) => {
  return (
    <section id="brands-section" className="py-20 bg-[#FAF9F6] border-b border-[#E6E3D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-2 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>The House Portfolio</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-900 tracking-tight">
            Five Dedicated Craft Maisons
          </h2>
          <p className="mt-3 text-sm text-slate-600 font-light leading-relaxed">
            Rather than generic white-label devices, every Nexara sub-line represents an intentional design philosophy engineered for high performance and tactile beauty.
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {HOUSE_BRANDS.map((brand) => (
            <div
              key={brand.id}
              onClick={() => onSelectBrand(brand.name.split(' ')[0])}
              className="bg-white rounded-xl border border-[#E3DFD5] hover:border-slate-400 p-6 sm:p-7 flex flex-col justify-between hover:shadow-md transition-all cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-serif-luxury text-2xl font-bold text-slate-900 group-hover:text-amber-900 transition-colors">
                    {brand.name}
                  </h3>
                  <span className="text-[10px] font-mono uppercase bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                    Maison
                  </span>
                </div>

                <div className="text-xs font-medium text-amber-800 mb-2">
                  {brand.tagline}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {brand.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2">
                <div className="text-[11px] text-slate-500">
                  <span className="font-medium text-slate-700">Specialty:</span> {brand.craftSpecialty}
                </div>
                <div className="flex items-center justify-between text-xs text-slate-800 pt-1">
                  <span className="text-[11px] text-slate-500 font-mono truncate max-w-[200px]">
                    {brand.flagshipDevice}
                  </span>
                  <span className="text-slate-900 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-semibold text-[11px] uppercase tracking-wider">
                    Browse <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
