import { memo, useCallback, useState } from 'react';
import { cn } from '../../../shared/utils/cn';
import { useOrderHistoryStore } from '../store/useOrderHistoryStore';
import { OrderStatusBadge } from './OrderStatusBadge';
import { useReorder } from '../hooks/useReorder';

export const OrderDetailModal = memo(function OrderDetailModal() {
  const selectedOrder = useOrderHistoryStore((s) => s.selectedOrder);
  const isDetailOpen = useOrderHistoryStore((s) => s.isDetailOpen);
  const closeDetail = useOrderHistoryStore((s) => s.closeDetail);
  const rateOrder = useOrderHistoryStore((s) => s.rateOrder);
  const { reorder, reorderSingleItem } = useReorder();

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [showRating, setShowRating] = useState(false);

  const handleRate = useCallback(() => {
    if (!selectedOrder || rating === 0) return;
    rateOrder(selectedOrder.id, rating, review || undefined);
    setShowRating(false);
    setRating(0);
    setReview('');
  }, [selectedOrder, rating, review, rateOrder]);

  if (!isDetailOpen || !selectedOrder) return null;

  const formattedDate = new Date(selectedOrder.placedAt).toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Order details"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeDetail}
      />

      {/* Modal */}
      <div
        className={cn(
          'relative w-full',
          'bg-white rounded-t-3xl',
          'animate-slide-up max-h-[90vh] overflow-y-auto'
        )}
      >
        {/* Handle */}
        <div className="sticky top-0 bg-white pt-4 pb-2 px-6 border-b border-gray-100 rounded-t-3xl">
          <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-3" />
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">{selectedOrder.orderNumber}</h2>
              <p className="text-xs text-gray-500 mt-0.5">{formattedDate}</p>
            </div>
            <OrderStatusBadge status={selectedOrder.status} />
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Items list */}
          <section>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Items Ordered</h3>
            <div className="space-y-3">
              {selectedOrder.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-xl flex-shrink-0">
                    ☕
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {item.size} • Qty: {item.quantity}
                    </p>
                    {item.addOns.length > 0 && (
                      <p className="text-xs text-emerald-600 mt-0.5">
                        + {item.addOns.join(', ')}
                      </p>
                    )}
                    {item.customizations.length > 0 && (
                      <p className="text-xs text-gray-400 mt-0.5">
                        {item.customizations.join(', ')}
                      </p>
                    )}
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-semibold text-gray-900">
                      ₹{item.price * item.quantity}
                    </p>
                    {selectedOrder.status === 'delivered' && (
                      <button
                        onClick={() => reorderSingleItem(item)}
                        className="text-xs text-emerald-600 font-medium mt-1 hover:underline"
                      >
                        Reorder
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Price breakdown */}
          <section className="bg-gray-50 rounded-xl p-4 space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span>₹{selectedOrder.totalAmount}</span>
            </div>
            {selectedOrder.discount > 0 && (
              <div className="flex justify-between text-sm text-emerald-600">
                <span>Discount</span>
                <span>-₹{selectedOrder.discount}</span>
              </div>
            )}
            <div className="flex justify-between text-sm text-gray-600">
              <span>Delivery Fee</span>
              <span>{selectedOrder.deliveryFee === 0 ? 'FREE' : `₹${selectedOrder.deliveryFee}`}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-gray-900 pt-2 border-t border-gray-200">
              <span>Total Paid</span>
              <span>₹{selectedOrder.finalAmount}</span>
            </div>
          </section>

          {/* Delivery info */}
          <section>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">
              {selectedOrder.deliveryMode === 'delivery' ? '🛵 Delivery' : '🏪 Pickup'}
            </h3>
            <p className="text-sm text-gray-600">
              {selectedOrder.deliveryMode === 'delivery'
                ? selectedOrder.deliveryAddress
                : selectedOrder.pickupStore}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Payment: {selectedOrder.paymentMethod}
            </p>
          </section>

          {/* Rating section */}
          {selectedOrder.status === 'delivered' && !selectedOrder.rating && (
            <section>
              {!showRating ? (
                <button
                  onClick={() => setShowRating(true)}
                  className={cn(
                    'w-full py-3 rounded-xl border border-amber-200',
                    'bg-amber-50 text-amber-700 text-sm font-medium',
                    'hover:bg-amber-100 active:scale-[0.98] transition-all'
                  )}
                >
                  ⭐ Rate this Order
                </button>
              ) : (
                <div className="bg-amber-50 rounded-xl p-4 space-y-3">
                  <p className="text-sm font-medium text-gray-900">How was your order?</p>
                  <div className="flex gap-2 justify-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className={cn(
                          'text-2xl transition-transform',
                          star <= rating ? 'text-amber-400 scale-110' : 'text-gray-300',
                          'hover:scale-125 active:scale-90'
                        )}
                        aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Share your experience (optional)"
                    className={cn(
                      'w-full px-3 py-2 rounded-lg border border-gray-200',
                      'text-sm text-gray-700 placeholder-gray-400 resize-none',
                      'focus:outline-none focus:ring-2 focus:ring-amber-400'
                    )}
                    rows={2}
                    maxLength={200}
                  />
                  <button
                    onClick={handleRate}
                    disabled={rating === 0}
                    className={cn(
                      'w-full py-2.5 rounded-xl text-sm font-medium',
                      'bg-amber-500 text-white',
                      'hover:bg-amber-600 active:scale-[0.98] transition-all',
                      'disabled:opacity-50 disabled:cursor-not-allowed'
                    )}
                  >
                    Submit Rating
                  </button>
                </div>
              )}
            </section>
          )}

          {/* Reorder full order button */}
          {selectedOrder.status === 'delivered' && (
            <button
              onClick={() => reorder(selectedOrder)}
              className={cn(
                'w-full py-3.5 rounded-xl text-sm font-semibold',
                'bg-emerald-600 text-white',
                'hover:bg-emerald-700 active:scale-[0.98]',
                'transition-all duration-150 shadow-lg shadow-emerald-200'
              )}
            >
              🔄 Reorder All Items
            </button>
          )}
        </div>
      </div>
    </div>
  );
});
