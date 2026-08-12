import { memo } from 'react';
import type { TrackingOrderItem } from '../types';

interface OrderItemsSummaryProps {
  items: TrackingOrderItem[];
  orderNumber: string;
}

export const OrderItemsSummary = memo(function OrderItemsSummary({
  items,
  orderNumber,
}: OrderItemsSummaryProps) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-gray-900">Order Summary</h3>
        <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
          {orderNumber}
        </span>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-green-100 text-green-700 text-xs font-bold flex items-center justify-center">
                {item.quantity}
              </span>
              <span className="text-gray-700">{item.name}</span>
            </div>
            <span className="text-xs text-gray-400">{item.size}</span>
          </div>
        ))}
      </div>
    </div>
  );
});
