import { useNavigate } from 'react-router';
import { cn } from '@/shared/utils/cn';
import type { Product } from '@/shared/types';

interface ProductCardProps {
  product: Product;
  variant?: 'grid' | 'horizontal';
  className?: string;
}

export function ProductCard({ product, variant = 'grid', className }: ProductCardProps) {
  const navigate = useNavigate();
  const basePrice = product.sizes[0]?.price ?? 0;

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  if (variant === 'horizontal') {
    return (
      <button
        onClick={handleClick}
        className={cn(
          'flex items-center gap-3 p-3 bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-shadow w-full text-left',
          className
        )}
      >
        <div className="w-16 h-16 rounded-xl bg-gray-100 flex-shrink-0 overflow-hidden">
          <div className="w-full h-full flex items-center justify-center text-2xl bg-green-50">
            ☕
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-800 truncate">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            {product.nutrition.calories} kcal • {product.nutrition.protein}g protein
          </p>
          <p className="text-sm font-bold text-green-600 mt-1">₹{basePrice}</p>
        </div>
        <div className="flex-shrink-0">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-600 text-white text-lg font-bold">
            +
          </span>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        'flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow text-left',
        className
      )}
    >
      <div className="relative w-full aspect-square bg-gray-50 flex items-center justify-center">
        <span className="text-4xl">☕</span>
        {product.isPopular && (
          <span className="absolute top-2 left-2 px-2 py-0.5 bg-green-600 text-white text-[10px] font-bold rounded-full">
            POPULAR
          </span>
        )}
        <div className="absolute top-2 right-2 flex items-center gap-0.5 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded-full">
          <span className="text-[10px]">⭐</span>
          <span className="text-[10px] font-semibold">{product.rating}</span>
        </div>
      </div>
      <div className="p-3 flex-1 flex flex-col">
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-[11px] text-gray-500 mt-0.5">
          {product.nutrition.calories} kcal • {product.nutrition.protein}g protein
        </p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm font-bold text-green-600">₹{basePrice}</span>
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-600 text-white text-sm font-bold">
            +
          </span>
        </div>
      </div>
    </button>
  );
}
