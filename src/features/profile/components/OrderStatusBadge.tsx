import { memo } from 'react';
import { cn } from '../../../shared/utils/cn';
import type { OrderStatus } from '../types';

interface OrderStatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

const statusConfig: Record<OrderStatus, { label: string; color: string; icon: string }> = {
  confirmed: {
    label: 'Confirmed',
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    icon: '✓',
  },
  preparing: {
    label: 'Preparing',
    color: 'bg-amber-50 text-amber-700 border-amber-200',
    icon: '👨‍🍳',
  },
  ready: {
    label: 'Ready',
    color: 'bg-purple-50 text-purple-700 border-purple-200',
    icon: '📦',
  },
  on_the_way: {
    label: 'On the Way',
    color: 'bg-orange-50 text-orange-700 border-orange-200',
    icon: '🛵',
  },
  delivered: {
    label: 'Delivered',
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    icon: '✅',
  },
  cancelled: {
    label: 'Cancelled',
    color: 'bg-red-50 text-red-700 border-red-200',
    icon: '✕',
  },
  refunded: {
    label: 'Refunded',
    color: 'bg-gray-50 text-gray-700 border-gray-200',
    icon: '↩',
  },
};

export const OrderStatusBadge = memo(function OrderStatusBadge({
  status,
  className,
}: OrderStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-1 rounded-full',
        'text-xs font-medium border',
        config.color,
        className
      )}
    >
      <span className="text-[10px]">{config.icon}</span>
      {config.label}
    </span>
  );
});
