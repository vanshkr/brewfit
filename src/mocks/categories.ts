import type { Category } from '@/shared/types';

export const mockCategories: Category[] = [
  {
    id: 'coffee',
    name: 'Coffee',
    icon: '☕',
    image: '/images/categories/coffee.webp',
    productCount: 12,
  },
  {
    id: 'smoothies',
    name: 'Smoothies',
    icon: '🥤',
    image: '/images/categories/smoothies.webp',
    productCount: 8,
  },
  {
    id: 'protein-shakes',
    name: 'Protein Shakes',
    icon: '💪',
    image: '/images/categories/protein.webp',
    productCount: 6,
  },
  {
    id: 'snacks',
    name: 'Snacks',
    icon: '🥪',
    image: '/images/categories/snacks.webp',
    productCount: 10,
  },
  {
    id: 'salads',
    name: 'Salads',
    icon: '🥗',
    image: '/images/categories/salads.webp',
    productCount: 7,
  },
  {
    id: 'desserts',
    name: 'Desserts',
    icon: '🍰',
    image: '/images/categories/desserts.webp',
    productCount: 5,
  },
];
