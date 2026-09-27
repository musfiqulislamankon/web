import React, { useState } from 'react';
import {
  ChevronDown,
  MapPin,
  Truck,
  Phone,
  Compass,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { DIVISIONS_INFO } from '../data/catalog';
import { Division } from '../types';

export const UtilityBar: React.FC = () => {
  const {
    selectedDivision,
    setSelectedDivision,
    currency,
    setCurrency,
    setIsLocationsModalOpen,
    setIsTrackOrderModalOpen,
  } = useStore();

  const [isDivisionDropdownOpen, setIsDivisionDropdownOpen] = useState(false);

  const divisionsList: Division[] = [
    'Dhaka',
    'Chattogram',
    'Sylhet',
    'Rajshahi',
    'Khulna',
    'Barishal',
    'Rangpur',
    'Mymensingh',
  ];

  return (
    <div className="bg-[#101828] text-[#E2E8F0] text-xs font-normal border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-y-2">
        {/* Left: Deliver To Selector */}
        <div className="relative flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-[#EAB308] shrink-0" />
          <span className="text-slate-400">Deliver to:</span>
          <button
            onClick={() => setIsDivisionDropdownOpen(!isDivisionDropdownOpen)}
            className="flex items-center gap-1 font-medium text-white hover:text-[#F3E8D6] transition-colors focus:outline-none cursor-pointer"
          >
            <span>{selectedDivision}</span>
            <span className="text-slate-400 text-[11px] hidden sm:inline">
              ({DIVISIONS_INFO[selectedDivision].fee === 0 ? 'Free' : `৳${DIVISIONS_INFO[selectedDivision].fee}`})
            </span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {/* Division Dropdown */}
          {isDivisionDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={() => setIsDivisionDropdownOpen(false)}
              />
              <div className="absolute top-full left-0 mt-1.5 w-64 bg-white text-slate-900 rounded-md shadow-xl border border-slate-200 py-2 z-40">
                <div className="px-3 py-1.5 border-b border-slate-100 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                  Select Delivery Division
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {divisionsList.map((div) => {
                    const info = DIVISIONS_INFO[div];
                    const isSelected = selectedDivision === div;
                    return (
                      <button
                        key={div}
                        onClick={() => {
                          setSelectedDivision(div);
                          setIsDivisionDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'bg-amber-50 text-slate-900 font-semibold'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div>
                          <div className="text-slate-900">{div}</div>
                          <div className="text-[10px] text-slate-500 font-normal">
                            {info.estimatedDelivery}
                          </div>
                        </div>
                        <span className="text-[11px] text-slate-600 font-mono">
                          ৳{info.fee}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Center: Editorial Bulletin */}
        <div className="hidden lg:flex items-center gap-2 text-slate-300">
          <Truck className="w-3.5 h-3.5 text-[#EAB308]" />
          <span>Next-day Dhaka delivery & on-site technician visits</span>
          <span className="text-slate-500">·</span>
          <span>BTRC registered with official 2-year warranty</span>
        </div>

        {/* Right: Quick Links & Actions */}
        <div className="flex items-center gap-4 text-[11px]">
          <button
            onClick={() => setIsLocationsModalOpen(true)}
            className="flex items-center gap-1 hover:text-white text-slate-300 transition-colors cursor-pointer"
          >
            <Compass className="w-3 h-3 text-slate-400" />
            <span>Atelier Locations</span>
          </button>

          <span className="text-slate-700">|</span>

          <button
            onClick={() => setIsTrackOrderModalOpen(true)}
            className="hover:text-white text-slate-300 transition-colors cursor-pointer"
          >
            Track Order
          </button>

          <span className="text-slate-700">|</span>

          {/* Currency Toggle */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrency('BDT')}
              className={`px-1 rounded transition-colors ${
                currency === 'BDT' ? 'text-[#EAB308] font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              ৳ BDT
            </button>
            <span className="text-slate-700">/</span>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-1 rounded transition-colors ${
                currency === 'USD' ? 'text-[#EAB308] font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              $ USD
            </button>
          </div>

          <span className="text-slate-700 hidden sm:inline">|</span>

          {/* Hotline */}
          <a
            href="tel:16255"
            className="hidden sm:flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
          >
            <Phone className="w-3 h-3 text-[#EAB308]" />
            <span className="font-mono">16255</span>
          </a>
        </div>
      </div>
    </div>
  );
};
