import { create } from 'zustand';
import type { OrderFilter, OrderHistoryItem } from '../types';

interface OrderHistoryState {
  orders: OrderHistoryItem[];
  filter: OrderFilter;
  selectedOrder: OrderHistoryItem | null;
  isDetailOpen: boolean;

  // Actions
  setOrders: (orders: OrderHistoryItem[]) => void;
  setFilter: (filter: Partial<OrderFilter>) => void;
  resetFilter: () => void;
  selectOrder: (order: OrderHistoryItem) => void;
  closeDetail: () => void;
  rateOrder: (orderId: string, rating: number, review?: string) => void;
}

const defaultFilter: OrderFilter = {
  status: 'all',
  dateRange: 'all',
  sortBy: 'newest',
};

export const useOrderHistoryStore = create<OrderHistoryState>()((set) => ({
  orders: [],
  filter: defaultFilter,
  selectedOrder: null,
  isDetailOpen: false,

  setOrders: (orders) => set({ orders }),

  setFilter: (filter) =>
    set((state) => ({
      filter: { ...state.filter, ...filter },
    })),

  resetFilter: () => set({ filter: defaultFilter }),

  selectOrder: (order) => set({ selectedOrder: order, isDetailOpen: true }),

  closeDetail: () => set({ selectedOrder: null, isDetailOpen: false }),

  rateOrder: (orderId, rating, review) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId ? { ...order, rating, review } : order
      ),
    })),
}));
