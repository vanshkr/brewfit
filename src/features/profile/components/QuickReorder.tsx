import { memo, useCallback } from 'react';
import { cn } from '../../../shared/utils/cn';
import { useReorder } from '../hooks/useReorder';
import { mockOrderHistory } from '../data/mock-profile';

export const QuickReorder = memo(function QuickReorder() {
  const { reorder } = useReorder();

  // Get the last delivered order
  const lastOrder = mockOrderHistory.find((o) => o.status === 'delivered');

  const handleReorder = useCallback(() => {
    if (lastOrder) {
      reorder(lastOrder);
    }
  }, [lastOrder, reorder]);

  if (!lastOrder) return null;

  const itemNames = lastOrder.items.map((i) => i.name).join(', ');
  const totalItems = lastOrder.items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div
      className={cn(
        'mx-4 p-4 rounded-2xl',
        'bg-gradient-to-r from-emerald-50 to-emerald-100/50',
        'border border-emerald-200'
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-emerald-700 mb-0.5">
            🔄 Reorder your last order
          </p>
          <p className="text-sm font-semibold text-gray-900 truncate">{itemNames}</p>
          <p className="text-xs text-gray-500 mt-0.5">
            {totalItems} item{totalItems > 1 ? 's' : ''} • ₹{lastOrder.finalAmount}
          </p>
        </div>

        <button
          onClick={handleReorder}
          className={cn(
            'ml-3 px-4 py-2 rounded-xl',
            'bg-emerald-600 text-white text-xs font-semibold',
            'hover:bg-emerald-700 active:scale-95',
            'transition-all duration-150',
            'shadow-md shadow-emerald-200'
          )}
          aria-label={`Reorder: ${itemNames}`}
        >
          Reorder
        </button>
      </div>
    </div>
  );
});
