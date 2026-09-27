import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { DIVISIONS_INFO, PRODUCTS } from '../data/catalog';
import {
  CartItem,
  Division,
  LookbookStory,
  Order,
  Product,
  ProductColor,
  ServiceBooking,
  SettingService,
} from '../types';

interface StoreContextType {
  // Navigation & Region
  selectedDivision: Division;
  setSelectedDivision: (div: Division) => void;
  currency: 'BDT' | 'USD';
  setCurrency: (curr: 'BDT' | 'USD') => void;
  formatPrice: (amountInBDT: number) => string;

  // Cart State
  cart: CartItem[];
  addToCart: (
    product: Product,
    selectedColor: ProductColor,
    selectedStorage?: string,
    quantity?: number,
    includeSetupVisit?: boolean
  ) => void;
  updateCartQuantity: (lineId: string, delta: number) => void;
  removeFromCart: (lineId: string) => void;
  toggleItemSetup: (lineId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  deliveryFee: number;
  cartTotal: number;

  // Service Bookings
  serviceBookings: ServiceBooking[];
  addServiceBooking: (booking: Omit<ServiceBooking, 'id'>) => void;
  removeServiceBooking: (id: string) => void;
  clearServiceBookings: () => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Modals & Panels
  quickViewProduct: Product | null;
  setQuickViewProduct: (p: Product | null) => void;
  activeBookingService: SettingService | null;
  setActiveBookingService: (s: SettingService | null) => void;
  activeLookbookStory: LookbookStory | null;
  setActiveLookbookStory: (story: LookbookStory | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isLocationsModalOpen: boolean;
  setIsLocationsModalOpen: (open: boolean) => void;
  isHowToOrderModalOpen: boolean;
  setIsHowToOrderModalOpen: (open: boolean) => void;
  isTrackOrderModalOpen: boolean;
  setIsTrackOrderModalOpen: (open: boolean) => void;
  isCheckoutModalOpen: boolean;
  setIsCheckoutModalOpen: (open: boolean) => void;

  // Orders
  placedOrders: Order[];
  placeOrder: (customer: Order['customer'], paymentMethod: Order['paymentMethod']) => Order;

  // Transient Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Region
  const [selectedDivision, setSelectedDivisionState] = useState<Division>(() => {
    const saved = localStorage.getItem('nexara_division');
    return (saved as Division) || 'Dhaka';
  });

  const setSelectedDivision = (div: Division) => {
    setSelectedDivisionState(div);
    localStorage.setItem('nexara_division', div);
    showToast(`Delivery region set to ${div} (${DIVISIONS_INFO[div].estimatedDelivery})`);
  };

  // Currency
  const [currency, setCurrency] = useState<'BDT' | 'USD'>('BDT');

  const formatPrice = (amountInBDT: number): string => {
    if (currency === 'USD') {
      const usdVal = Math.round(amountInBDT / 120);
      return `$${usdVal.toLocaleString()}`;
    }
    return `৳${amountInBDT.toLocaleString('en-BD')}`;
  };

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('nexara_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('nexara_cart', JSON.stringify(cart));
  }, [cart]);

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('nexara_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('nexara_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Placed Orders
  const [placedOrders, setPlacedOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('nexara_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('nexara_orders', JSON.stringify(placedOrders));
  }, [placedOrders]);

  // Service Bookings in Current Session
  const [serviceBookings, setServiceBookings] = useState<ServiceBooking[]>([]);

  // Modals
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [activeBookingService, setActiveBookingService] = useState<SettingService | null>(null);
  const [activeLookbookStory, setActiveLookbookStory] = useState<LookbookStory | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLocationsModalOpen, setIsLocationsModalOpen] = useState(false);
  const [isHowToOrderModalOpen, setIsHowToOrderModalOpen] = useState(false);
  const [isTrackOrderModalOpen, setIsTrackOrderModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  const addToCart = (
    product: Product,
    selectedColor: ProductColor,
    selectedStorage?: string,
    quantity = 1,
    includeSetupVisit = false
  ) => {
    setCart((prev) => {
      const setupFee = includeSetupVisit && product.setupServiceCost ? product.setupServiceCost : 0;
      const lineId = `${product.id}-${selectedColor.name}-${selectedStorage || 'standard'}`;
      const existingIndex = prev.findIndex((item) => item.id === lineId);

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        if (includeSetupVisit) {
          updated[existingIndex].includeSetupVisit = true;
          updated[existingIndex].setupFee = product.setupServiceCost || 0;
        }
        return updated;
      }

      const newItem: CartItem = {
        id: lineId,
        product,
        selectedColor,
        selectedStorage,
        unitPrice: product.price,
        quantity,
        includeSetupVisit,
        setupFee,
      };

      return [...prev, newItem];
    });

    showToast(`${product.name} added to your bag.`);
    setIsCartOpen(true);
  };

  const updateCartQuantity = (lineId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === lineId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (lineId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== lineId));
    showToast('Item removed from bag.');
  };

  const toggleItemSetup = (lineId: string) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === lineId) {
          const nextState = !item.includeSetupVisit;
          const fee = nextState ? item.product.setupServiceCost || 1200 : 0;
          return {
            ...item,
            includeSetupVisit: nextState,
            setupFee: fee,
          };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const addServiceBooking = (bookingData: Omit<ServiceBooking, 'id'>) => {
    const newBooking: ServiceBooking = {
      ...bookingData,
      id: `SB-${Math.floor(100000 + Math.random() * 900000)}`,
    };
    setServiceBookings((prev) => [...prev, newBooking]);
    showToast(`Technician visit booked for ${newBooking.date} (${newBooking.timeSlot})`);
  };

  const removeServiceBooking = (id: string) => {
    setServiceBookings((prev) => prev.filter((b) => b.id !== id));
  };

  const clearServiceBookings = () => {
    setServiceBookings([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from wishlist.');
        return prev.filter((id) => id !== productId);
      } else {
        const prod = PRODUCTS.find((p) => p.id === productId);
        showToast(`Saved ${prod?.name || 'item'} to wishlist.`);
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Calculations
  const cartCount =
    cart.reduce((sum, item) => sum + item.quantity, 0) + serviceBookings.length;

  const itemsSubtotal = cart.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity + (item.includeSetupVisit ? item.setupFee : 0),
    0
  );

  const servicesSubtotal = serviceBookings.reduce((sum, b) => sum + b.fee, 0);

  const cartSubtotal = itemsSubtotal + servicesSubtotal;

  const deliveryFee =
    cart.length === 0 && serviceBookings.length > 0
      ? 0 // pure technician visit has no delivery courier fee
      : cartSubtotal >= 100000
      ? 0 // Free shipping for orders above ৳100,000
      : DIVISIONS_INFO[selectedDivision].fee;

  const cartTotal = cartSubtotal + deliveryFee;

  const placeOrder = (
    customer: Order['customer'],
    paymentMethod: Order['paymentMethod']
  ): Order => {
    const orderId = `NX-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: Order = {
      id: orderId,
      date: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      items: [...cart],
      serviceBookings: [...serviceBookings],
      customer,
      subtotal: cartSubtotal,
      deliveryFee,
      discount: 0,
      total: cartTotal,
      paymentMethod,
      status: 'Confirmed',
      estimatedArrival: DIVISIONS_INFO[customer.division || selectedDivision].estimatedDelivery,
    };

    setPlacedOrders((prev) => [newOrder, ...prev]);
    clearCart();
    clearServiceBookings();
    return newOrder;
  };

  return (
    <StoreContext.Provider
      value={{
        selectedDivision,
        setSelectedDivision,
        currency,
        setCurrency,
        formatPrice,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        toggleItemSetup,
        clearCart,
        cartCount,
        cartSubtotal,
        deliveryFee,
        cartTotal,
        serviceBookings,
        addServiceBooking,
        removeServiceBooking,
        clearServiceBookings,
        wishlist,
        toggleWishlist,
        isInWishlist,
        quickViewProduct,
        setQuickViewProduct,
        activeBookingService,
        setActiveBookingService,
        activeLookbookStory,
        setActiveLookbookStory,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isSearchOpen,
        setIsSearchOpen,
        isLocationsModalOpen,
        setIsLocationsModalOpen,
        isHowToOrderModalOpen,
        setIsHowToOrderModalOpen,
        isTrackOrderModalOpen,
        setIsTrackOrderModalOpen,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
        placedOrders,
        placeOrder,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
