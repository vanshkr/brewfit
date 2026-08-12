import type { Product } from '@/shared/types';
import { ProductCard } from '@/shared/components/ProductCard';
import { ProductCardSkeleton } from '@/shared/components/Skeleton';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  viewMode?: 'grid' | 'list';
}

export function ProductGrid({ products, isLoading, viewMode = 'grid' }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className={viewMode === 'grid' ? 'grid grid-cols-2 gap-3' : 'space-y-3'}>
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <span className="text-4xl mb-3">🔍</span>
        <p className="text-sm font-medium text-gray-600">No items found</p>
        <p className="text-xs text-gray-400 mt-1">
          Try a different category or filter
        </p>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} variant="horizontal" />
        ))}
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
