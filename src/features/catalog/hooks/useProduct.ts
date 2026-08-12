import { useQuery } from '@tanstack/react-query';
import type { Product } from '@/shared/types';
import { mockProducts } from '@/mocks';

const fetchProduct = async (productId: string): Promise<Product | null> => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return mockProducts.find((p) => p.id === productId) ?? null;
};

export function useProduct(productId: string) {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProduct(productId),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000,
  });
}
