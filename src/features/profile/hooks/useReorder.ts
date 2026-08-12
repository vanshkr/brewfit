import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useCartStore } from '@/features/cart/store';
import type { OrderHistoryItem } from '../types';

export const useReorder = () => {
  const addItem = useCartStore((s) => s.addItem);
  const navigate = useNavigate();

  const reorder = useCallback(
    (order: OrderHistoryItem) => {
      // Add all items from the past order to cart
      order.items.forEach((item) => {
        addItem({
          id: `reorder-${item.productId}-${Date.now()}`,
          productId: item.productId,
          name: item.name,
          image: item.image,
          size: item.size,
          quantity: item.quantity,
          unitPrice: item.price,
          totalPrice: item.price * item.quantity,
          addOns: item.addOns.map((name, idx) => ({
            id: `addon-${idx}`,
            name,
            price: 0, // Price included in base
          })),
          specialInstructions: item.customizations || (item as any).specialInstructions || (item as any).instructions,
        });
      });

      // Navigate to cart
      navigate('/cart');
    },
    [addItem, navigate]
  );

  const reorderSingleItem = useCallback(
    (item: OrderHistoryItem['items'][0]) => {
      addItem({
        id: `reorder-${item.productId}-${Date.now()}`,
        productId: item.productId,
        name: item.name,
        image: item.image,
        size: item.size,
        quantity: item.quantity,
        unitPrice: item.price,
        totalPrice: item.price * item.quantity,
        addOns: item.addOns.map((name, idx) => ({
          id: `addon-${idx}`,
          name,
          price: 0,
        })),
        specialInstructions: item.customizations || (item as any).specialInstructions || (item as any).instructions,
      });

      navigate('/cart');
    },
    [addItem, navigate]
  );

  return { reorder, reorderSingleItem };
};
