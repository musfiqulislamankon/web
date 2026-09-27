import React from 'react';
import { Eye, Heart, ShoppingBag, Wrench, Check } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    formatPrice,
    addToCart,
    setQuickViewProduct,
    isInWishlist,
    toggleWishlist,
  } = useStore();

  const isFavorited = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Default to first color and first storage option if available
    addToCart(product, product.colors[0], product.storageOptions?.[0], 1, false);
  };

  return (
    <div
      onClick={() => setQuickViewProduct(product)}
      className="group relative flex flex-col bg-white rounded-lg border border-[#E6E3D8] hover:border-slate-400 hover:shadow-lg transition-all duration-200 overflow-hidden cursor-pointer"
    >
      {/* Product Image Area */}
      <div className="relative aspect-[4/3] w-full bg-[#F5F4F0] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          referrerPolicy="no-referrer"
        />

        {/* Top Floating Actions: Wishlist */}
        <div className="absolute top-2.5 right-2.5 z-10 flex flex-col gap-1.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition-colors ${
              isFavorited
                ? 'bg-red-50 text-red-600 shadow'
                : 'bg-white/80 hover:bg-white text-slate-700 hover:text-black shadow-sm'
            }`}
            aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Unboxed Brand Label on top left */}
        <div className="absolute top-2.5 left-2.5 z-10">
          {product.isNewArrival && (
            <span className="text-[10px] tracking-wider uppercase font-semibold text-slate-900 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded shadow-xs">
              Atelier New
            </span>
          )}
        </div>

        {/* Quick View overlay button */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="px-3 py-1.5 bg-white text-slate-900 text-xs font-medium rounded shadow flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" />
            Quick Inspect
          </span>
        </div>
      </div>

      {/* Details Container */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata line (Unboxed text with dots) */}
          <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-1.5">
            <span className="font-semibold text-slate-700 tracking-wide uppercase">
              {product.brand}
            </span>
            <span aria-hidden="true">·</span>
            <span>{product.categoryName}</span>
            {product.setupEligible && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-amber-800 font-medium flex items-center gap-0.5">
                  <Wrench className="w-2.5 h-2.5" /> Setting visit eligible
                </span>
              </>
            )}
          </div>

          {/* Product Title */}
          <h3 className="font-medium text-sm sm:text-base text-slate-900 group-hover:text-amber-900 transition-colors line-clamp-1 mb-1">
            {product.name}
          </h3>

          {/* Tagline */}
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
            {product.tagline}
          </p>

          {/* Color swatches previews */}
          <div className="flex items-center gap-1.5 mb-3">
            {product.colors.map((c) => (
              <span
                key={c.name}
                className="w-3 h-3 rounded-full border border-slate-300 inline-block"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
            <span className="text-[11px] text-slate-400 ml-1">
              {product.colors.length} {product.colors.length === 1 ? 'shade' : 'shades'}
            </span>
          </div>
        </div>

        {/* Price & Action row */}
        <div className="pt-3 border-t border-[#F0EFE9] flex items-center justify-between gap-2">
          <div>
            <div className="text-sm sm:text-base font-semibold text-slate-900 tabular-nums">
              {formatPrice(product.price)}
            </div>
            {product.compareAtPrice && (
              <div className="text-[11px] text-slate-400 line-through tabular-nums">
                {formatPrice(product.compareAtPrice)}
              </div>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            className="px-3 py-1.5 bg-slate-900 text-white hover:bg-slate-800 text-xs font-medium rounded transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
            aria-label={`Add ${product.name} to bag`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Bag</span>
          </button>
        </div>
      </div>
    </div>
  );
};
