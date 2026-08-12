import { memo, useCallback } from 'react';
import { cn } from '../../../shared/utils/cn';
import { useOrderHistoryStore } from '../store/useOrderHistoryStore';
import type { OrderFilter, OrderStatus } from '../types';

const statusOptions: { value: OrderStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'confirmed', label: 'Active' },
];

const dateOptions: { value: NonNullable<OrderFilter['dateRange']>; label: string }[] = [
  { value: 'all', label: 'All Time' },
  { value: 'last7days', label: '7 Days' },
  { value: 'last30days', label: '30 Days' },
  { value: 'last3months', label: '3 Months' },
];

const sortOptions: { value: NonNullable<OrderFilter['sortBy']>; label: string }[] = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'amount_high', label: 'Highest Amount' },
  { value: 'amount_low', label: 'Lowest Amount' },
];

export const OrderFilterBar = memo(function OrderFilterBar() {
  const filter = useOrderHistoryStore((s) => s.filter);
  const setFilter = useOrderHistoryStore((s) => s.setFilter);
  const resetFilter = useOrderHistoryStore((s) => s.resetFilter);

  const handleStatusChange = useCallback(
    (status: OrderStatus | 'all') => {
      setFilter({ status });
    },
    [setFilter]
  );

  const hasActiveFilter =
    filter.status !== 'all' || filter.dateRange !== 'all' || filter.sortBy !== 'newest';

  return (
    <div className="space-y-3 px-4">
      {/* Status pills */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {statusOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => handleStatusChange(option.value)}
            className={cn(
              'px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap',
              'border transition-all duration-150 active:scale-95',
              filter.status === option.value
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
            )}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Date & Sort row */}
      <div className="flex gap-2">
        <select
          value={filter.dateRange || 'all'}
          onChange={(e) => setFilter({ dateRange: e.target.value as OrderFilter['dateRange'] })}
          className={cn(
            'flex-1 px-3 py-2 rounded-xl border text-xs',
            'bg-white text-gray-700 border-gray-200',
            'focus:outline-none focus:ring-2 focus:ring-emerald-500'
          )}
          aria-label="Filter by date range"
        >
          {dateOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <select
          value={filter.sortBy || 'newest'}
          onChange={(e) => setFilter({ sortBy: e.target.value as OrderFilter['sortBy'] })}
          className={cn(
            'flex-1 px-3 py-2 rounded-xl border text-xs',
            'bg-white text-gray-700 border-gray-200',
            'focus:outline-none focus:ring-2 focus:ring-emerald-500'
          )}
          aria-label="Sort orders"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {hasActiveFilter && (
          <button
            onClick={resetFilter}
            className={cn(
              'px-3 py-2 rounded-xl text-xs font-medium',
              'bg-red-50 text-red-600 border border-red-200',
              'hover:bg-red-100 active:scale-95 transition-all'
            )}
            aria-label="Clear all filters"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
});
