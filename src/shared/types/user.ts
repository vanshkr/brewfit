export type Gender = 'male' | 'female' | 'other' | 'prefer-not-to-say';

export type DietaryPreference =
  | 'vegetarian'
  | 'vegan'
  | 'gluten-free'
  | 'dairy-free'
  | 'nut-free'
  | 'low-calorie'
  | 'high-protein'
  | 'sugar-free';

export interface UserPreferences {
  notifications: boolean;
  emailUpdates: boolean;
  smsAlerts: boolean;
  darkMode: boolean;
  language: string;
  defaultPaymentMethod?: string;
  dietaryPreferences: DietaryPreference[];
}

export interface UserStats {
  totalOrders: number;
  totalSpent: number;
  averageOrderValue: number;
  favoriteCategory: string;
  memberSince: string;
  rewardsPoints: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  phone: string;
  avatarUrl?: string;
  dateOfBirth?: string;
  gender?: Gender;
  createdAt: string;
  preferences: UserPreferences;
  stats: UserStats;
}

export interface User {
  id: string;
  phone: string;
  name: string | null;
  email: string | null;
  avatarUrl: string | null;
  createdAt: string;
}
