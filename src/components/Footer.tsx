import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Truck,
  Wrench,
  Clock,
  ArrowRight,
  Heart,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection }) => {
  const {
    setIsLocationsModalOpen,
    setIsHowToOrderModalOpen,
    setIsTrackOrderModalOpen,
    setIsWishlistOpen,
    selectedDivision,
  } = useStore();

  return (
    <footer className="bg-[#0D1117] text-white border-t border-slate-800">
      {/* Upper Newsletter / Value Proposition Band */}
      <div className="border-b border-slate-800/80 bg-[#12161F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex items-start gap-3.5">
              <Truck className="w-5 h-5 text-amber-400 shrink-0 mt-1" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                  Nationwide Express
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Next-day delivery in Dhaka; 48 to 72 hours across all 8 divisions of Bangladesh.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-1" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                  BTRC Verified Official
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Every handheld carries official Bangladesh telecommunication registration and a 2-year warranty.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <Wrench className="w-5 h-5 text-amber-400 shrink-0 mt-1" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                  White-Glove Setting
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Police-verified hardware engineers visit your home or boutique for on-site device calibration.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-1" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                  Helpline 16255
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Saturday through Friday dedicated support for enterprise and retail clients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-serif-luxury text-3xl font-bold tracking-tight text-white">
              NEXARA
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm font-light">
              The premier gadget house and device setting atelier in Bangladesh, modeled on Aarong's editorial rhythm and craft values. We unite flagship mobile architecture, acoustics, and mechanical desk gear with doorstep technician visits.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>House 42, Road 27 (Old), Dhanmondi, Dhaka 1209</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-mono">16255 / +880 9612-639272</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>concierge@nexaragadget.com.bd</span>
              </div>
            </div>
          </div>

          {/* Department Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200">
              Maison Departments
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigateSection('products-section')}
                  className="hover:text-white transition-colors"
                >
                  Phones & Smart Handhelds
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('products-section')}
                  className="hover:text-white transition-colors"
                >
                  Studio Acoustic Monitors
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('products-section')}
                  className="hover:text-white transition-colors"
                >
                  Milled Brass Keyboards
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('products-section')}
                  className="hover:text-white transition-colors"
                >
                  Dual-Screen Cloud POS
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('services-section')}
                  className="hover:text-white transition-colors text-amber-300 font-medium"
                >
                  Doorstep Setting Visits
                </button>
              </li>
            </ul>
          </div>

          {/* House Brands */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200">
              House Brands
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigateSection('brands-section')}
                  className="hover:text-white transition-colors"
                >
                  Pulse (Handhelds & Folds)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('brands-section')}
                  className="hover:text-white transition-colors"
                >
                  Field (Studio Sound & ANC)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('brands-section')}
                  className="hover:text-white transition-colors"
                >
                  Loom (Desk Architecture)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('brands-section')}
                  className="hover:text-white transition-colors"
                >
                  Sitara (Haptic Paper Stylus)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('brands-section')}
                  className="hover:text-white transition-colors"
                >
                  ShopTap (Retail POS Terminals)
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care & Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200">
              Client Concierge
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => setIsHowToOrderModalOpen(true)}
                  className="hover:text-white transition-colors"
                >
                  How to Order & Delivery FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsTrackOrderModalOpen(true)}
                  className="hover:text-white transition-colors"
                >
                  Track Order & Dispatch
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsLocationsModalOpen(true)}
                  className="hover:text-white transition-colors"
                >
                  Dhanmondi, Gulshan & Uttara Maisons
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsWishlistOpen(true)}
                  className="hover:text-white transition-colors"
                >
                  Saved Wishlist on This Device
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('lookbook-section')}
                  className="hover:text-white transition-colors"
                >
                  Lookbook Vol IV: Autumn
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="mt-14 pt-8 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span>© 2026 Nexara Gadget House & Atelier Ltd. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Dhaka</span>
            <span>·</span>
            <span>Chattogram</span>
            <span>·</span>
            <span>Sylhet</span>
            <span>·</span>
            <span>Official Bangladesh BTRC Authorized</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
