import React, { useState } from 'react';
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ArrowRight,
  Wrench,
  Smartphone,
  Headphones,
  Keyboard,
  Building2,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { HOUSE_BRANDS, SETTING_SERVICES } from '../data/catalog';

interface HeaderProps {
  onNavigateSection: (sectionId: string) => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavigateSection, activeSection }) => {
  const {
    cartCount,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsSearchOpen,
    setActiveBookingService,
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHoverMenu, setActiveHoverMenu] = useState<string | null>(null);

  const navItems = [
    { id: 'phones', label: 'iPhones & Handhelds', section: 'products-section', category: 'phones' },
    { id: 'audio', label: 'Audio & Sound', section: 'products-section', category: 'audio' },
    { id: 'desk', label: 'Desk & Craft', section: 'products-section', category: 'desk' },
    { id: 'services', label: 'Setting Services', section: 'services-section' },
    { id: 'brands', label: 'House Brands', section: 'brands-section' },
    { id: 'lookbook', label: 'Lookbook', section: 'lookbook-section' },
  ];

  const handleNavClick = (sectionId: string) => {
    onNavigateSection(sectionId);
    setIsMobileMenuOpen(false);
    setActiveHoverMenu(null);
  };

  return (
    <header className="sticky top-0 z-30 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#E6E4DD] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-800 hover:text-black focus:outline-none"
              aria-label="Open mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('top');
              }}
              className="font-serif-luxury text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1A1A] hover:text-[#0F172A] transition-colors"
            >
              NEXARA
            </a>
          </div>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700">
            {navItems.map((item) => (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => (item.id === 'services' || item.id === 'brands' ? setActiveHoverMenu(item.id) : null)}
                onMouseLeave={() => setActiveHoverMenu(null)}
              >
                <button
                  onClick={() => handleNavClick(item.section)}
                  className={`py-2 border-b-2 text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                    activeSection === item.id
                      ? 'border-slate-900 text-slate-900 font-semibold'
                      : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                  }`}
                >
                  {item.label}
                </button>

                {/* Services Mega Dropdown */}
                {activeHoverMenu === 'services' && item.id === 'services' && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[480px]">
                    <div className="bg-white rounded-lg shadow-xl border border-slate-200 p-5 grid grid-cols-1 gap-3">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                          White-Glove Device Setting Services
                        </span>
                        <span className="text-[11px] text-amber-700 font-medium">Doorstep Visits</span>
                      </div>
                      <div className="space-y-2">
                        {SETTING_SERVICES.map((srv) => (
                          <div
                            key={srv.id}
                            onClick={() => {
                              setActiveBookingService(srv);
                              setActiveHoverMenu(null);
                            }}
                            className="p-2.5 rounded-md hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all cursor-pointer flex items-start gap-3"
                          >
                            <div className="p-2 bg-slate-100 rounded text-slate-800 shrink-0">
                              <Wrench className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="text-xs font-semibold text-slate-900 line-clamp-1">{srv.title}</h4>
                                <span className="text-xs font-mono font-medium text-slate-800">৳{srv.price}</span>
                              </div>
                              <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{srv.subtitle}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                        <span>Technicians dispatched from Dhanmondi & Gulshan</span>
                        <button
                          onClick={() => handleNavClick('services-section')}
                          className="font-medium text-slate-900 hover:underline flex items-center gap-1"
                        >
                          View All Setting Packages <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Brands Mega Dropdown */}
                {activeHoverMenu === 'brands' && item.id === 'brands' && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[460px]">
                    <div className="bg-white rounded-lg shadow-xl border border-slate-200 p-5">
                      <div className="border-b border-slate-100 pb-2 mb-3">
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Nexara Atelier House Brands
                        </span>
                      </div>
                      <div className="grid grid-cols-1 gap-2.5">
                        {HOUSE_BRANDS.map((hb) => (
                          <div
                            key={hb.id}
                            onClick={() => handleNavClick('brands-section')}
                            className="p-2 rounded hover:bg-slate-50 transition-colors cursor-pointer"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-slate-900">{hb.name}</span>
                              <span className="text-[10px] text-slate-500">{hb.craftSpecialty}</span>
                            </div>
                            <p className="text-[11px] text-slate-600 line-clamp-1 mt-0.5">{hb.tagline}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-slate-700 hover:text-slate-900 rounded-full hover:bg-slate-200/60 transition-colors cursor-pointer"
              aria-label="Search catalog"
              title="Search catalog"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Trigger */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2 text-slate-700 hover:text-slate-900 rounded-full hover:bg-slate-200/60 transition-colors cursor-pointer"
              aria-label="Wishlist"
              title="Saved items"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-slate-900 text-white text-[10px] font-mono rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3 py-2 text-slate-900 bg-[#EFECE6] hover:bg-[#E5E1D8] border border-[#DDD9CE] rounded-md transition-colors cursor-pointer"
              aria-label="Shopping bag"
            >
              <ShoppingBag className="w-5 h-5 text-slate-900" />
              <span className="text-xs font-semibold tracking-wide hidden sm:inline">Bag</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 bg-slate-900 text-white text-[11px] font-mono rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.section)}
                className="w-full text-left py-2.5 px-3 text-sm font-medium text-slate-800 hover:bg-slate-50 rounded-md transition-colors flex items-center justify-between"
              >
                <span>{item.label}</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onNavigateSection('services-section');
              }}
              className="p-3 bg-slate-50 hover:bg-slate-100 rounded-md text-left transition-colors"
            >
              <Wrench className="w-4 h-4 text-amber-600 mb-1" />
              <div className="font-semibold text-slate-900">Book Technician</div>
              <div className="text-[10px] text-slate-500">Dhaka & all divisions</div>
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onNavigateSection('lookbook-section');
              }}
              className="p-3 bg-slate-50 hover:bg-slate-100 rounded-md text-left transition-colors"
            >
              <Smartphone className="w-4 h-4 text-slate-700 mb-1" />
              <div className="font-semibold text-slate-900">Lookbook Vol IV</div>
              <div className="text-[10px] text-slate-500">Read editorial story</div>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
