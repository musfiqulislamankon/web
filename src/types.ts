export type Division =
  | 'Dhaka'
  | 'Chattogram'
  | 'Sylhet'
  | 'Rajshahi'
  | 'Khulna'
  | 'Barishal'
  | 'Rangpur'
  | 'Mymensingh';

export interface DeliveryInfo {
  division: Division;
  fee: number;
  estimatedDelivery: string;
  leadTime: string;
}

export interface ProductVariant {
  storage?: string;
  priceModifier?: number;
}

export interface ProductColor {
  name: string;
  hex: string;
  label: string;
}

export interface Product {
  id: string;
  name: string;
  brand: 'Apple' | 'Pulse' | 'Field' | 'Loom' | 'Sitara' | 'ShopTap';
  category: 'phones' | 'audio' | 'desk' | 'business';
  categoryName: string;
  tagline: string;
  price: number;
  compareAtPrice?: number;
  description: string;
  features: string[];
  specs: Record<string, string>;
  image: string;
  colors: ProductColor[];
  storageOptions?: string[];
  stock: number;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  rating: number;
  reviewsCount: number;
  warranty: string;
  setupEligible: boolean;
  setupServiceCost?: number;
}

export interface SettingService {
  id: string;
  title: string;
  subtitle: string;
  category: 'mobile' | 'pos' | 'fleet' | 'studio';
  price: number;
  duration: string;
  badge: string;
  description: string;
  deliverables: string[];
  recommendedFor: string;
  technicianTier: 'Certified Field Specialist' | 'Master Hardware Engineer';
  image?: string;
}

export interface CartItem {
  id: string; // unique item line id
  product: Product;
  selectedColor: ProductColor;
  selectedStorage?: string;
  unitPrice: number;
  quantity: number;
  includeSetupVisit: boolean;
  setupFee: number;
}

export interface ServiceBooking {
  id: string;
  service: SettingService;
  date: string;
  timeSlot: string;
  division: Division;
  district: string;
  address: string;
  clientName: string;
  clientPhone: string;
  clientNotes?: string;
  technicianTier: string;
  fee: number;
}

export interface LookbookStory {
  id: string;
  title: string;
  subtitle: string;
  edition: string;
  season: string;
  coverImage: string;
  quote: string;
  narrative: string[];
  curatedProductIds: string[];
}

export interface HouseBrand {
  id: string;
  name: string;
  tagline: string;
  description: string;
  craftSpecialty: string;
  flagshipDevice: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  serviceBookings: ServiceBooking[];
  customer: {
    name: string;
    phone: string;
    email?: string;
    division: Division;
    district: string;
    address: string;
    deliveryNotes?: string;
  };
  deliveryFee: number;
  discount: number;
  subtotal: number;
  total: number;
  paymentMethod: 'cod' | 'bkash' | 'nagad' | 'card';
  status: 'Confirmed' | 'Atelier Packing' | 'Dispatched' | 'Delivered';
  estimatedArrival: string;
}
