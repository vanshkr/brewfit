import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, PromoCode, CartSummary } from '../types';

interface CartState {
  items: CartItem[];
  appliedPromo: PromoCode | null;
  deliveryFee: number;
  taxRate: number;

  // Actions
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  applyPromo: (promo: PromoCode) => void;
  removePromo: () => void;
  setDeliveryFee: (fee: number) => void;

  // Computed
  getSummary: () => CartSummary;
  getItemCount: () => number;
}

// ─── Normalization Helper ───────────────────────────────────────────────────
// Ensures every item entering the store has a valid `addons` array
const normalizeItem = (item: CartItem): CartItem => {
  const addOns = Array.isArray(item?.addOns) ? item.addOns : [];
  return {
    ...item,
    addOns,
  };
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      appliedPromo: null,
      deliveryFee: 30,
      taxRate: 0.05,

      addItem: (rawItem) => {
        // 1. Sanitize incoming item
        const item = normalizeItem(rawItem);

        set((state) => {
          const existingIndex = state.items.findIndex(
            (i) =>
              i.productId === item.productId &&
              i.size === item.size &&
              JSON.stringify(i.addOns) === JSON.stringify(item.addOns)
          );

          if (existingIndex > -1) {
            const updated = [...state.items];
            updated[existingIndex] = {
              ...updated[existingIndex],
              quantity: updated[existingIndex].quantity + item.quantity,
            };
            return { items: updated };
          }

          return { 
            items: [
              ...state.items, 
              { ...item, id: item.id || crypto.randomUUID() }
            ] 
          };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity < 1) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: Math.min(quantity, 10) } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [], appliedPromo: null });
      },

      applyPromo: (promo) => {
        set({ appliedPromo: promo });
      },

      removePromo: () => {
        set({ appliedPromo: null });
      },

      setDeliveryFee: (fee) => {
        set({ deliveryFee: fee });
      },

      getSummary: () => {
        const { items, appliedPromo, deliveryFee, taxRate } = get();

        // 2. Clean calculation without nested optional chaining hell
        const subtotal = items.reduce((sum, item) => {
          const addOns = item.addOns || [];
          const addonTotal = addOns.reduce((a, addon) => a + (addon.price || 0), 0);
          return sum + ((item.unitPrice || 0) + addonTotal) * item.quantity;
        }, 0);

        let discount = 0;
        if (appliedPromo && subtotal >= appliedPromo.minOrderValue) {
          if (appliedPromo.discountType === 'percentage') {
            discount = (subtotal * appliedPromo.discountValue) / 100;
            if (appliedPromo.maxDiscount) {
              discount = Math.min(discount, appliedPromo.maxDiscount);
            }
          } else {
            discount = appliedPromo.discountValue;
          }
        }

        const taxableAmount = Math.max(subtotal - discount, 0);
        const taxes = Math.round(taxableAmount * taxRate);
        const total = taxableAmount + taxes + deliveryFee;

        return {
          subtotal,
          discount,
          deliveryFee,
          taxes,
          total: Math.max(total, 0),
          itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
        };
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: 'brewfit-cart',
      partialize: (state) => ({
        items: state.items,
        appliedPromo: state.appliedPromo,
      }),
      // 3. Rehydration hook: sanitizes stale/malformed data saved in localStorage
      onRehydrateStorage: () => (state) => {
        if (state?.items) {
          state.items = state.items.map(normalizeItem);
        }
      },
    }
  )
);