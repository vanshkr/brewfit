export interface CartItemAddon {
  id: string;
  name: string;
  price: number;
}

export interface SizeOption {
  id: string;
  label: string;
  price?: number;
  volume?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  /** Size can be a plain label string or a full SizeOption object */
  size: string | SizeOption;
  quantity: number;
  unitPrice: number;            // (Size price + Addons sum)
  totalPrice: number;           // (unitPrice * quantity)
  addOns: CartItemAddon[];      // Consistent camelCase
  specialInstructions?: string;
}

export interface PromoCode {
  code: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
}

export interface CartSummary {
  subtotal: number;
  discount: number;
  deliveryFee: number;
  taxes: number;
  total: number;
  itemCount: number;
}