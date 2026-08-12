import { cn } from '@/shared/utils/cn';

interface QuantityPickerProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
}

export function QuantityPicker({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  max = 10,
}: QuantityPickerProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onDecrease}
        disabled={quantity <= min}
        className={cn(
          'w-9 h-9 rounded-full flex items-center justify-center text-lg font-bold transition-all',
          quantity <= min
            ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
            : 'bg-green-50 text-green-600 hover:bg-green-100 active:scale-90'
        )}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span
        className="text-lg font-bold text-gray-800 w-8 text-center"
        aria-live="polite"
        aria-label={`Quantity: ${quantity}`}
      >
        {quantity}
      </span>
      <button
        onClick={onIncrease}
        disabled={quantity >= max}
        className={cn(
          'w-9 h-9 rounded-full flex items-center justify-center text-lg font-bold transition-all',
          quantity >= max
            ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
            : 'bg-green-50 text-green-600 hover:bg-green-100 active:scale-90'
        )}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
