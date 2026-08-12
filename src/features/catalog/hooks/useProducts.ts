import { useQuery } from '@tanstack/react-query';
import type { Product } from '@/shared/types';
import { mockProducts } from '@/mocks';

interface UseProductsOptions {
  categoryId?: string;
  featured?: boolean;
  popular?: boolean;
  search?: string;
}

const fetchProducts = async (options: UseProductsOptions): Promise<Product[]> => {
  await new Promise((resolve) => setTimeout(resolve, 400));

  let filtered = [...mockProducts];

  if (options.categoryId) {
    filtered = filtered.filter((p) => p.categoryId === options.categoryId);
  }
  if (options.featured) {
    filtered = filtered.filter((p) => p.isFeatured);
  }
  if (options.popular) {
    filtered = filtered.filter((p) => p.isPopular);
  }
  if (options.search) {
    const query = options.search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.tags?.some((t) => t.includes(query))
    );
  }

  return filtered;
};

export function useProducts(options: UseProductsOptions = {}) {
  return useQuery({
    queryKey: ['products', options],
    queryFn: () => fetchProducts(options),
    staleTime: 3 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
