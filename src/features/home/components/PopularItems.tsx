import type { Product } from '@/shared/types';
import { ProductCard } from '@/shared/components/ProductCard';
import { ProductCardSkeleton } from '@/shared/components/Skeleton';

interface PopularItemsProps {
  products: Product[];
  isLoading?: boolean;
}

export function PopularItems({ products, isLoading }: PopularItemsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400 text-sm">
        No popular items right now
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} variant="grid" />
      ))}
    </div>
  );
}
