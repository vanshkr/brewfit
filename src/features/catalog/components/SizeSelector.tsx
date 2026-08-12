import { cn } from '@/shared/utils/cn';
import type { ProductSize } from '@/shared/types';

interface SizeSelectorProps {
  sizes: ProductSize[];
  selectedSize: ProductSize;
  onSelect: (size: ProductSize) => void;
}

export function SizeSelector({ sizes, selectedSize, onSelect }: SizeSelectorProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-gray-800">Choose Size</h3>
      <div className="flex items-center gap-2">
        {sizes.map((size) => (
          <button
            key={size.id}
            onClick={() => onSelect(size)}
            className={cn(
              'flex-1 flex flex-col items-center gap-1 py-3 px-2 rounded-xl border-2 transition-all',
              selectedSize.id === size.id
                ? 'border-green-600 bg-green-50 shadow-sm'
                : 'border-gray-200 bg-white hover:border-green-300'
            )}
            aria-pressed={selectedSize.id === size.id}
          >
            <span className="text-xs font-medium text-gray-800">{size.label}</span>
            {size.volume && (
              <span className="text-[10px] text-gray-500">{size.volume}</span>
            )}
            <span
              className={cn(
                'text-sm font-bold',
                selectedSize.id === size.id ? 'text-green-600' : 'text-gray-700'
              )}
            >
              ₹{size.price}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
