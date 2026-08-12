import type { Banner } from '@/shared/types';

export const mockBanners: Banner[] = [
  {
    id: 'banner-1',
    title: '20g Protein Latte',
    subtitle: 'Fuel your morning — now 20% off',
    image: '/images/banners/protein-latte.webp',
    bgColor: '#dcfce7',
    link: '/product/prod-001',
  },
  {
    id: 'banner-2',
    title: 'New: Power Bowls',
    subtitle: 'Complete nutrition in every bite',
    image: '/images/banners/power-bowls.webp',
    bgColor: '#fef9c3',
    link: '/category/salads',
  },
  {
    id: 'banner-3',
    title: 'Free Delivery Week',
    subtitle: 'Orders above ₹299 — no delivery fee',
    image: '/images/banners/free-delivery.webp',
    bgColor: '#e0f2fe',
  },
];
