// ============================================================
// Profile & Order History Types
// ============================================================

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  createdAt: string;
  preferences: UserPreferences;
  stats: UserStats;
}

export interface UserPreferences {
  notifications: boolean;
  emailUpdates: boolean;
  smsAlerts: boolean;
  darkMode: boolean;
  language: string;
  defaultPaymentMethod?: string;
  dietaryPreferences: DietaryPreference[];
}

export type DietaryPreference =
  | 'vegetarian'
  | 'vegan'
  | 'gluten-free'
  | 'dairy-free'
  | 'nut-free'
  | 'low-calorie'
  | 'high-protein'
  | 'sugar-free';

export interface UserStats {
  totalOrders: number;
  totalSpent: number;
  averageOrderValue: number;
  favoriteCategory: string;
  memberSince: string;
  rewardsPoints: number;
}

export interface OrderHistoryItem {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  items: OrderItemSummary[];
  totalAmount: number;
  discount: number;
  deliveryFee: number;
  finalAmount: number;
  paymentMethod: string;
  deliveryMode: 'delivery' | 'pickup';
  deliveryAddress?: string;
  pickupStore?: string;
  placedAt: string;
  completedAt?: string;
  estimatedDelivery?: string;
  rating?: number;
  review?: string;
}

export type OrderStatus =
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'on_the_way'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export interface OrderItemSummary {
  id: string;
  productId: string;
  name: string;
  image: string;
  quantity: number;
  size: string;
  price: number;
  addOns: string[];
  customizations: string[];
}

export interface OrderFilter {
  status?: OrderStatus | 'all';
  dateRange?: 'last7days' | 'last30days' | 'last3months' | 'all';
  sortBy?: 'newest' | 'oldest' | 'amount_high' | 'amount_low';
}

export interface ProfileMenuItem {
  id: string;
  icon: string;
  label: string;
  description?: string;
  route?: string;
  action?: () => void;
  badge?: string;
  chevron?: boolean;
}

export interface EditProfileForm {
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
}
