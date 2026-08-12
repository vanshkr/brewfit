import { cn } from '@/shared/utils/cn';

export type SortOption = 'popular' | 'price-low' | 'price-high' | 'rating' | 'protein';

interface SortFilterProps {
  activeSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'popular', label: 'Popular' },
  { value: 'price-low', label: 'Price ↑' },
  { value: 'price-high', label: 'Price ↓' },
  { value: 'rating', label: 'Rating' },
  { value: 'protein', label: 'Protein' },
];

export function SortFilter({ activeSort, onSortChange }: SortFilterProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
      {sortOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => onSortChange(option.value)}
          className={cn(
            'px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all',
            activeSort === option.value
              ? 'bg-green-600 text-white shadow-sm'
              : 'bg-white text-gray-600 border border-gray-200 hover:border-green-300'
          )}
          aria-pressed={activeSort === option.value}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
