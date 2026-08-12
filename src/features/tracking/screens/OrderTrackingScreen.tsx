import { useParams, useNavigate } from 'react-router';
import { useOrderTracking } from '../hooks/useOrderTracking';
import { ETABanner } from '../components/ETABanner';
import { TrackingMap } from '../components/TrackingMap';
import { RiderCard } from '../components/RiderCard';
import { StatusTimeline } from '../components/StatusTimeline';
import { OrderItemsSummary } from '../components/OrderItemsSummary';
import { DeliveryAddressCard } from '../components/DeliveryAddressCard';
import { LiveIndicator } from '../components/LiveIndicator';
import { SupportActions } from '../components/SupportActions';
import { TrackingSkeleton } from '../components/TrackingSkeleton';

export function OrderTrackingScreen() {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();

  const {
    order,
    isLoading,
    error,
    isConnected,
    cancelOrder,
    contactSupport,
    callRider,
  } = useOrderTracking({
    orderId: orderId || 'order-12345',
    simulateUpdates: true,
  });

  // Error state
  if (error && !order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <div className="text-4xl">😕</div>
          <p className="text-sm text-gray-600">{error}</p>
          <button
            onClick={() => navigate('/home')}
            className="px-6 py-2.5 bg-emerald-500 text-white text-sm font-semibold rounded-xl hover:bg-emerald-600 active:scale-95 transition-all"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-y-auto flex-1 h-full w-full">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="w-full px-4 h-14 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 active:scale-95 transition-all"
            aria-label="Go back"
          >
            <svg
              className="w-5 h-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold text-gray-900">
              Track Order
            </h1>
            {order && (
              <span className="text-xs text-gray-400 font-mono">
                {order.orderNumber}
              </span>
            )}
          </div>

          <LiveIndicator isConnected={isConnected} />
        </div>
      </header>

      {/* Content */}
      <main className="w-full px-4 py-4 pb-8 space-y-4">
        {isLoading || !order ? (
          <TrackingSkeleton />
        ) : (
          <>
            {/* ETA Banner */}
            <ETABanner
              estimatedTime={order.estimatedDeliveryTime}
              estimatedMinutes={order.estimatedMinutes}
              status={order.status}
            />

            {/* Live Map */}
            <TrackingMap
              riderLocation={order.riderLocation}
              storeLocation={order.storeLocation}
              deliveryLocation={order.deliveryLocation}
              status={order.status}
            />

            {/* Rider Card (shown after pickup) */}
            {order.rider &&
              ['picked_up', 'on_the_way', 'arriving'].includes(order.status) && (
                <RiderCard rider={order.rider} onCall={callRider} />
              )}

            {/* Delivery Address */}
            <DeliveryAddressCard
              storeName={order.storeLocation.name}
              storeAddress={order.storeLocation.address}
              deliveryAddress={order.deliveryLocation.address}
            />

            {/* Status Timeline */}
            <StatusTimeline steps={order.steps} />

            {/* Order Items */}
            <OrderItemsSummary
              items={order.items}
              orderNumber={order.orderNumber}
            />

            {/* Support Actions */}
            {order.status !== 'delivered' && (
              <SupportActions
                canCancel={order.canCancel}
                onCancel={cancelOrder}
                onSupport={contactSupport}
              />
            )}

            {/* Delivered — Rate & Reorder */}
            {order.status === 'delivered' && (
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/home')}
                  className="w-full py-3.5 rounded-xl bg-emerald-500 text-white text-sm font-bold hover:bg-emerald-600 active:scale-[0.98] transition-all shadow-md shadow-emerald-200"
                >
                  Order Again
                </button>
                <button
                  onClick={() => navigate('/home')}
                  className="w-full py-3 rounded-xl border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 active:scale-[0.98] transition-all"
                >
                  Back to Home
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
