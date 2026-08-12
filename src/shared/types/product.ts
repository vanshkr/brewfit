export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
  calories?: number;
}

export interface ProductSize {
  id: string;
  label: string;
  price: number;
  volume?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  categoryId: string;
  sizes: ProductSize[];
  addOns: AddOn[];
  nutrition: NutritionInfo;
  rating: number;
  reviewCount: number;
  isPopular?: boolean;
  isFeatured?: boolean;
  tags?: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image: string;
  productCount: number;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  bgColor: string;
  link?: string;
}
