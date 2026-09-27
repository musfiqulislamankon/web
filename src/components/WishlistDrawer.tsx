import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/catalog';

export const WishlistDrawer: React.FC = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    toggleWishlist,
    formatPrice,
    addToCart,
    setQuickViewProduct,
  } = useStore();

  if (!isWishlistOpen) return null;

  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-slate-200 animate-in slide-in-from-right duration-200">
          {/* Header */}
          <div className="p-5 border-b border-slate-200 bg-[#FAF9F6] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-600 fill-current" />
              <h2 className="font-serif-luxury text-xl font-bold text-slate-900">
                Saved Wishlist
              </h2>
              <span className="text-xs font-mono text-slate-500">
                ({savedProducts.length})
              </span>
            </div>

            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {savedProducts.length === 0 ? (
              <div className="text-center py-16 px-4 space-y-3">
                <Heart className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="font-serif-luxury text-xl font-medium text-slate-800">
                  Your wishlist is empty
                </h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Click the heart icon on any device card to curate your personal collection.
                </p>
              </div>
            ) : (
              savedProducts.map((product) => (
                <div
                  key={product.id}
                  className="p-3 bg-white rounded-lg border border-slate-200 hover:border-slate-300 transition-all flex items-center gap-3"
                >
                  <div
                    onClick={() => {
                      setIsWishlistOpen(false);
                      setQuickViewProduct(product);
                    }}
                    className="w-16 h-16 rounded overflow-hidden bg-slate-100 shrink-0 cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4
                      onClick={() => {
                        setIsWishlistOpen(false);
                        setQuickViewProduct(product);
                      }}
                      className="text-xs font-semibold text-slate-900 truncate hover:underline cursor-pointer"
                    >
                      {product.name}
                    </h4>
                    <span className="text-[11px] text-slate-500 block">
                      {product.brand} · {product.categoryName}
                    </span>
                    <span className="text-xs font-bold text-slate-900 font-mono mt-1 block">
                      {formatPrice(product.price)}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5 shrink-0">
                    <button
                      onClick={() => {
                        addToCart(product, product.colors[0], product.storageOptions?.[0], 1, false);
                      }}
                      className="p-2 bg-slate-900 text-white rounded hover:bg-slate-800 transition-colors"
                      title="Add to bag"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="p-2 text-slate-400 hover:text-red-600 rounded transition-colors"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
