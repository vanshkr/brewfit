import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { cn } from '../../../shared/utils/cn';
import { useOrderHistoryQuery } from '../hooks/useOrderHistoryQuery';
import { useOrderHistoryStore } from '../store/useOrderHistoryStore';
import { useReorder } from '../hooks/useReorder';
import { OrderFilterBar } from '../components/OrderFilterBar';
import { OrderCard } from '../components/OrderCard';
import { OrderDetailModal } from '../components/OrderDetailModal';
import { SkeletonOrderHistory } from '../components/SkeletonOrderHistory';
import type { OrderHistoryItem } from '../types';

export const OrderHistoryScreen = memo(function OrderHistoryScreen() {
  const { data: orders, isLoading, isError } = useOrderHistoryQuery();
  const selectOrder = useOrderHistoryStore((s) => s.selectOrder);
  const { reorder } = useReorder();
  const navigate = useNavigate();

  const handleView = useCallback(
    (order: OrderHistoryItem) => {
      selectOrder(order);
    },
    [selectOrder]
  );

  const handleReorder = useCallback(
    (order: OrderHistoryItem) => {
      reorder(order);
    },
    [reorder]
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            onClick={() => navigate('/profile')}
            className="p-2 -ml-2 rounded-xl hover:bg-gray-100 active:scale-95 transition-all"
            aria-label="Go back"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-bold text-gray-900">Order History</h1>
        </div>
      </div>

      {/* Filters */}
      <div className="py-4">
        <OrderFilterBar />
      </div>

      {/* Content */}
      {isLoading ? (
        <SkeletonOrderHistory />
      ) : isError ? (
        <div className="flex flex-col items-center justify-center h-[40vh] px-4">
          <span className="text-4xl mb-3">😕</span>
          <p className="text-gray-600 text-sm text-center">Failed to load orders</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-medium"
          >
            Retry
          </button>
        </div>
      ) : orders && orders.length > 0 ? (
        <div className="px-4 space-y-3">
          {/* Order count */}
          <p className="text-xs text-gray-500">
            {orders.length} order{orders.length > 1 ? 's' : ''} found
          </p>

          {/* Order list */}
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onView={handleView}
              onReorder={handleReorder}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[40vh] px-4">
          <span className="text-5xl mb-4">📋</span>
          <p className="text-gray-900 font-medium">No orders found</p>
          <p className="text-sm text-gray-500 mt-1 text-center">
            Try adjusting your filters or place your first order!
          </p>
          <button
            onClick={() => navigate('/home')}
            className={cn(
              'mt-4 px-6 py-2.5 rounded-xl text-sm font-medium',
              'bg-emerald-600 text-white',
              'hover:bg-emerald-700 active:scale-95 transition-all'
            )}
          >
            Browse Menu
          </button>
        </div>
      )}

      {/* Order detail modal */}
      <OrderDetailModal />
    </div>
  );
});
