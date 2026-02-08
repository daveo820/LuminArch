export type ProductCategory =
  | 'tops'
  | 'bottoms'
  | 'dresses'
  | 'swimwear'
  | 'accessories'
  | 'outerwear';

export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'One Size';

export type ProductVibe =
  | 'beach-day'
  | 'sunset-drinks'
  | 'surf-session'
  | 'boardwalk'
  | 'brunch';

export interface ProductColor {
  name: string;
  value: string; // hex code
  image?: string; // alternate product image for this color
}

export interface ProductVariant {
  size: ProductSize;
  color: string; // color name
  sku: string;
  stock: number;
  price?: number; // optional override price
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription?: string;
  price: number;
  compareAtPrice?: number; // original price if on sale
  images: string[];
  category: ProductCategory;
  colors: ProductColor[];
  sizes: ProductSize[];
  variants: ProductVariant[];
  vibes: ProductVibe[];
  tags: string[];
  featured?: boolean;
  new?: boolean;
  bestseller?: boolean;
  details?: string[];
  careInstructions?: string;
  createdAt: number;
}

export interface CartItem {
  productId: string;
  variantSku: string;
  quantity: number;
  size: ProductSize;
  color: string;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  shipping: ShippingAddress;
  subtotal: number;
  shipping_cost: number;
  tax: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  stripePaymentIntentId?: string;
  createdAt: number;
}

export type SortOption =
  | 'featured'
  | 'newest'
  | 'price-asc'
  | 'price-desc'
  | 'bestselling';

export interface ProductFilters {
  category?: ProductCategory;
  sizes?: ProductSize[];
  colors?: string[];
  vibes?: ProductVibe[];
  priceMin?: number;
  priceMax?: number;
  onSale?: boolean;
}
