import { useNavigate } from 'react-router';
import type { Category } from '@/shared/types';
import { Skeleton } from '@/shared/components/Skeleton';

interface CategoryGridProps {
  categories: Category[];
  isLoading?: boolean;
}

export function CategoryGrid({ categories, isLoading }: CategoryGridProps) {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-2xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => navigate(`/category/${category.id}`)}
          className="flex flex-col items-center gap-1.5 p-3 bg-white rounded-2xl border border-gray-100 hover:shadow-md hover:border-green-200 transition-all active:scale-95"
        >
          <span className="text-2xl" aria-hidden="true">
            {category.icon}
          </span>
          <span className="text-xs font-medium text-gray-700 text-center leading-tight">
            {category.name}
          </span>
          <span className="text-[10px] text-gray-400">
            {category.productCount} items
          </span>
        </button>
      ))}
    </div>
  );
}
