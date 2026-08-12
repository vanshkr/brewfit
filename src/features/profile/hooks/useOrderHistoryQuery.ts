import { useQuery } from '@tanstack/react-query';
import { mockOrderHistory } from '../data/mock-profile';
import { useOrderHistoryStore } from '../store/useOrderHistoryStore';
import type { OrderFilter, OrderHistoryItem } from '../types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchOrders = async (filter: OrderFilter): Promise<OrderHistoryItem[]> => {
  await delay(700);

  let filtered = [...mockOrderHistory];

  // Filter by status
  if (filter.status && filter.status !== 'all') {
    filtered = filtered.filter((o) => o.status === filter.status);
  }

  // Filter by date range
  if (filter.dateRange && filter.dateRange !== 'all') {
    const now = new Date();
    let cutoff: Date;

    switch (filter.dateRange) {
      case 'last7days':
        cutoff = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'last30days':
        cutoff = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case 'last3months':
        cutoff = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      default:
        cutoff = new Date(0);
    }

    filtered = filtered.filter((o) => new Date(o.placedAt) >= cutoff);
  }

  // Sort
  switch (filter.sortBy) {
    case 'oldest':
      filtered.sort((a, b) => new Date(a.placedAt).getTime() - new Date(b.placedAt).getTime());
      break;
    case 'amount_high':
      filtered.sort((a, b) => b.finalAmount - a.finalAmount);
      break;
    case 'amount_low':
      filtered.sort((a, b) => a.finalAmount - b.finalAmount);
      break;
    case 'newest':
    default:
      filtered.sort((a, b) => new Date(b.placedAt).getTime() - new Date(a.placedAt).getTime());
      break;
  }

  return filtered;
};

export const useOrderHistoryQuery = () => {
  const filter = useOrderHistoryStore((s) => s.filter);
  const setOrders = useOrderHistoryStore((s) => s.setOrders);

  return useQuery({
    queryKey: ['orders', filter],
    queryFn: () => fetchOrders(filter),
    staleTime: 2 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    select: (data) => {
      setOrders(data);
      return data;
    },
  });
};
