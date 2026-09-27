import React from 'react';
import { ArrowRight, Smartphone, Headphones, Keyboard, Building2, Wrench } from 'lucide-react';
import { ASSET_IMAGES } from '../data/catalog';

interface CategoryCarouselProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onSelectServiceTab: () => void;
}

export const CategoryCarousel: React.FC<CategoryCarouselProps> = ({
  selectedCategory,
  onSelectCategory,
  onSelectServiceTab,
}) => {
  const categories = [
    {
      id: 'all',
      title: 'Full House Catalog',
      subtitle: '12 Flagship Artifacts',
      image: ASSET_IMAGES.hero,
      icon: null,
      type: 'product',
    },
    {
      id: 'phones',
      title: 'iPhones & Handhelds',
      subtitle: 'iPhone 16 Pro & Pulse 12',
      image: ASSET_IMAGES.iphone16ProMax,
      icon: Smartphone,
      type: 'product',
    },
    {
      id: 'audio',
      title: 'Acoustics & Sound',
      subtitle: 'Field One & Studio Pairs',
      image: ASSET_IMAGES.lookbookArtisan,
      icon: Headphones,
      type: 'product',
    },
    {
      id: 'desk',
      title: 'Desk & Workstation',
      subtitle: 'Brass Keyboards & Stylus',
      image: ASSET_IMAGES.lookbookCraft,
      icon: Keyboard,
      type: 'product',
    },
    {
      id: 'business',
      title: 'Business & POS',
      subtitle: 'Dual-Screen Terminals',
      image: ASSET_IMAGES.technicianService,
      icon: Building2,
      type: 'product',
    },
    {
      id: 'services',
      title: 'Setting Visits',
      subtitle: 'Doorstep Technicians',
      image: ASSET_IMAGES.technicianService,
      icon: Wrench,
      type: 'service',
    },
  ];

  return (
    <section className="py-12 bg-[#FAF9F6] border-b border-[#EBE8DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-slate-500 font-medium mb-1">
              Curated House Modules
            </div>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
              Explore by Atelier Department
            </h2>
          </div>
          <div className="text-xs text-slate-500">
            Handcrafted hardware & certified technician support
          </div>
        </div>

        {/* Categories Row / Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  if (cat.type === 'service') {
                    onSelectServiceTab();
                  } else {
                    onSelectCategory(cat.id);
                  }
                }}
                className={`group relative overflow-hidden rounded-lg p-3 text-left transition-all border cursor-pointer ${
                  isSelected
                    ? 'border-slate-900 bg-white shadow-md ring-1 ring-slate-900'
                    : 'border-[#E6E3D8] bg-[#F4F1EA] hover:border-slate-400 hover:bg-white'
                }`}
              >
                {/* Thumbnail Image */}
                <div className="relative aspect-[4/3] w-full rounded overflow-hidden mb-3 bg-slate-200">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  {cat.icon && (
                    <div className="absolute top-1.5 right-1.5 p-1 bg-white/90 backdrop-blur-sm rounded shadow-sm text-slate-800">
                      <cat.icon className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>

                <div className="font-medium text-xs text-slate-900 line-clamp-1 group-hover:text-amber-800 transition-colors">
                  {cat.title}
                </div>
                <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                  {cat.subtitle}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
