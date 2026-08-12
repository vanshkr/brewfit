import { useQuery } from '@tanstack/react-query';
import type { Category } from '@/shared/types';
import { mockCategories } from '@/mocks';

// Replace with real API call when backend is ready
const fetchCategories = async (): Promise<Category[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockCategories;
};

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}
