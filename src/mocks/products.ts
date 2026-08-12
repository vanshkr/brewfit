import type { Product } from '@/shared/types';

export const mockProducts: Product[] = [
  {
    id: 'prod-001',
    name: 'Green Protein Latte',
    description:
      'Matcha-infused latte with 20g plant protein, oat milk, and a hint of vanilla. Energize your morning the healthy way.',
    image: '/images/products/green-protein-latte.webp',
    categoryId: 'coffee',
    sizes: [
      { id: 'sm', label: 'Small', price: 249, volume: '250ml' },
      { id: 'md', label: 'Medium', price: 329, volume: '350ml' },
      { id: 'lg', label: 'Large', price: 399, volume: '450ml' },
    ],
    addOns: [
      { id: 'extra-shot', name: 'Extra Espresso Shot', price: 49, calories: 5 },
      { id: 'collagen', name: 'Collagen Boost', price: 79, calories: 35 },
      { id: 'honey', name: 'Organic Honey', price: 29, calories: 60 },
    ],
    nutrition: { calories: 180, protein: 20, carbs: 15, fat: 6, fiber: 2 },
    rating: 4.8,
    reviewCount: 234,
    isPopular: true,
    isFeatured: true,
    tags: ['high-protein', 'vegan', 'energizing'],
  },
  {
    id: 'prod-002',
    name: 'Cold Brew Black',
    description:
      'Slow-steeped 18-hour cold brew. Zero sugar, zero calories, maximum caffeine kick.',
    image: '/images/products/cold-brew-black.webp',
    categoryId: 'coffee',
    sizes: [
      { id: 'sm', label: 'Small', price: 199, volume: '250ml' },
      { id: 'md', label: 'Medium', price: 269, volume: '350ml' },
      { id: 'lg', label: 'Large', price: 329, volume: '450ml' },
    ],
    addOns: [
      { id: 'extra-shot', name: 'Extra Espresso Shot', price: 49, calories: 5 },
      { id: 'vanilla', name: 'Vanilla Syrup', price: 39, calories: 45 },
    ],
    nutrition: { calories: 5, protein: 0, carbs: 0, fat: 0 },
    rating: 4.6,
    reviewCount: 189,
    isPopular: true,
    tags: ['zero-cal', 'high-caffeine'],
  },
  {
    id: 'prod-003',
    name: 'Berry Blast Smoothie',
    description:
      'Mixed berries, Greek yogurt, chia seeds, and a scoop of whey protein. Post-workout perfection.',
    image: '/images/products/berry-blast.webp',
    categoryId: 'smoothies',
    sizes: [
      { id: 'md', label: 'Medium', price: 299, volume: '350ml' },
      { id: 'lg', label: 'Large', price: 379, volume: '500ml' },
    ],
    addOns: [
      { id: 'protein-scoop', name: 'Extra Protein Scoop', price: 69, calories: 120 },
      { id: 'peanut-butter', name: 'Peanut Butter', price: 49, calories: 95 },
      { id: 'flax-seeds', name: 'Flax Seeds', price: 29, calories: 37 },
    ],
    nutrition: { calories: 220, protein: 18, carbs: 28, fat: 4, fiber: 5 },
    rating: 4.9,
    reviewCount: 312,
    isPopular: true,
    isFeatured: true,
    tags: ['high-protein', 'post-workout', 'antioxidants'],
  },
  {
    id: 'prod-004',
    name: 'Peanut Power Shake',
    description:
      'Peanut butter, banana, whey protein, and almond milk. 35g protein per serving for serious gains.',
    image: '/images/products/peanut-power.webp',
    categoryId: 'protein-shakes',
    sizes: [
      { id: 'md', label: 'Medium', price: 349, volume: '400ml' },
      { id: 'lg', label: 'Large', price: 429, volume: '550ml' },
    ],
    addOns: [
      { id: 'creatine', name: 'Creatine 5g', price: 59, calories: 0 },
      { id: 'banana', name: 'Extra Banana', price: 29, calories: 89 },
    ],
    nutrition: { calories: 380, protein: 35, carbs: 30, fat: 14, fiber: 4 },
    rating: 4.7,
    reviewCount: 156,
    isPopular: true,
    tags: ['high-protein', 'muscle-building', 'filling'],
  },
  {
    id: 'prod-005',
    name: 'Avocado Toast Plate',
    description:
      'Sourdough toast with smashed avocado, cherry tomatoes, microgreens, and everything bagel seasoning.',
    image: '/images/products/avocado-toast.webp',
    categoryId: 'snacks',
    sizes: [
      { id: 'single', label: 'Single', price: 229 },
      { id: 'double', label: 'Double', price: 379 },
    ],
    addOns: [
      { id: 'egg', name: 'Poached Egg', price: 49, calories: 72 },
      { id: 'feta', name: 'Feta Crumble', price: 39, calories: 50 },
      { id: 'salmon', name: 'Smoked Salmon', price: 99, calories: 80 },
    ],
    nutrition: { calories: 280, protein: 8, carbs: 24, fat: 18, fiber: 7 },
    rating: 4.5,
    reviewCount: 98,
    tags: ['healthy-fats', 'fiber-rich'],
  },
  {
    id: 'prod-006',
    name: 'Quinoa Power Bowl',
    description:
      'Quinoa, roasted chickpeas, kale, avocado, tahini dressing. Complete plant-based nutrition.',
    image: '/images/products/quinoa-bowl.webp',
    categoryId: 'salads',
    sizes: [
      { id: 'regular', label: 'Regular', price: 329 },
      { id: 'large', label: 'Large', price: 429 },
    ],
    addOns: [
      { id: 'chicken', name: 'Grilled Chicken', price: 89, calories: 165 },
      { id: 'tofu', name: 'Crispy Tofu', price: 69, calories: 90 },
    ],
    nutrition: { calories: 340, protein: 14, carbs: 42, fat: 12, fiber: 9 },
    rating: 4.6,
    reviewCount: 87,
    isFeatured: true,
    tags: ['vegan', 'complete-meal', 'fiber-rich'],
  },
];
