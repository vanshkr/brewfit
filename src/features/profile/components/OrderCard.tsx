import { memo, useCallback } from 'react';
import { cn } from '../../../shared/utils/cn';
import { OrderStatusBadge } from './OrderStatusBadge';
import type { OrderHistoryItem } from '../types';

interface OrderCardProps {
  order: OrderHistoryItem;
  onView: (order: OrderHistoryItem) => void;
  onReorder: (order: OrderHistoryItem) => void;
}

export const OrderCard = memo(function OrderCard({ order, onView, onReorder }: OrderCardProps) {
  const formattedDate = new Date(order.placedAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const itemsSummary =
    order.items.length > 2
      ? `${order.items[0].name}, ${order.items[1].name} +${order.items.length - 2} more`
      : order.items.map((i) => i.name).join(', ');

  const totalItems = order.items.reduce((sum, i) => sum + i.quantity, 0);

  const handleView = useCallback(() => onView(order), [order, onView]);
  const handleReorder = useCallback(() => onReorder(order), [order, onReorder]);

  return (
    <div
      className={cn(
        'bg-white rounded-2xl shadow-sm border border-gray-100',
        'p-4 space-y-3',
        'hover:shadow-md transition-shadow duration-200'
      )}
    >
      {/* Top row: Order number + status */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-900">{order.orderNumber}</p>
          <p className="text-xs text-gray-500 mt-0.5">{formattedDate}</p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      {/* Items summary */}
      <div className="flex items-center gap-3">
        {/* Item thumbnails */}
        <div className="flex -space-x-2">
          {order.items.slice(0, 3).map((item, idx) => (
            <div
              key={item.id}
              className={cn(
                'w-10 h-10 rounded-xl bg-emerald-50 border-2 border-white',
                'flex items-center justify-center text-lg',
                'shadow-sm'
              )}
              style={{ zIndex: 3 - idx }}
            >
              {idx === 0 ? '☕' : idx === 1 ? '🥐' : '🥗'}
            </div>
          ))}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-700 truncate">{itemsSummary}</p>
          <p className="text-xs text-gray-500">
            {totalItems} item{totalItems > 1 ? 's' : ''} •{' '}
            {order.deliveryMode === 'delivery' ? '🛵 Delivery' : '🏪 Pickup'}
          </p>
        </div>
      </div>

      {/* Bottom row: Amount + actions */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <div>
          <span className="text-base font-bold text-gray-900">₹{order.finalAmount}</span>
          {order.discount > 0 && (
            <span className="text-xs text-emerald-600 ml-2">Saved ₹{order.discount}</span>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleView}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-medium',
              'border border-gray-200 text-gray-700',
              'hover:bg-gray-50 active:scale-95',
              'transition-all duration-150'
            )}
          >
            Details
          </button>

          {order.status === 'delivered' && (
            <button
              onClick={handleReorder}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-medium',
                'bg-emerald-600 text-white',
                'hover:bg-emerald-700 active:scale-95',
                'transition-all duration-150'
              )}
            >
              Reorder
            </button>
          )}
        </div>
      </div>

      {/* Rating (if delivered and rated) */}
      {order.status === 'delivered' && order.rating && (
        <div className="flex items-center gap-1 pt-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={cn('text-sm', i < order.rating! ? 'text-amber-400' : 'text-gray-200')}
            >
              ★
            </span>
          ))}
          {order.review && (
            <span className="text-xs text-gray-500 ml-2 truncate">"{order.review}"</span>
          )}
        </div>
      )}
    </div>
  );
});
