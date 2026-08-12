import type { PromoCode } from '../types';

export const availablePromoCodes: PromoCode[] = [
  {
    code: 'BREW20',
    discountType: 'percentage',
    discountValue: 20,
    minOrderValue: 200,
    maxDiscount: 100,
  },
  {
    code: 'FIRST50',
    discountType: 'flat',
    discountValue: 50,
    minOrderValue: 150,
  },
  {
    code: 'HEALTHY10',
    discountType: 'percentage',
    discountValue: 10,
    minOrderValue: 100,
    maxDiscount: 75,
  },
];
