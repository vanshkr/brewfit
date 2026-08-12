import { memo } from 'react';
import { useCountdown } from '../hooks/useCountdown';
import { cn } from '@/shared/utils/cn';

interface ETABannerProps {
  estimatedTime: string | null;
  estimatedMinutes: number;
  status: string;
}

export const ETABanner = memo(function ETABanner({
  estimatedTime,
  estimatedMinutes,
  status,
}: ETABannerProps) {
  const { formatted, isExpired } = useCountdown({
    targetTime: estimatedTime,
  });

  const isDelivered = status === 'delivered';

  return (
    <div
      className={cn(
        'rounded-2xl p-5 text-center transition-all duration-500',
        isDelivered
          ? 'bg-green-50 border border-green-200'
          : 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg shadow-green-200'
      )}
      role="status"
      aria-live="polite"
      aria-label={
        isDelivered
          ? 'Order delivered'
          : `Estimated delivery in ${estimatedMinutes} minutes`
      }
    >
      {isDelivered ? (
        <div className="space-y-1">
          <div className="text-3xl">🎉</div>
          <p className="text-lg font-bold text-green-700">Order Delivered!</p>
          <p className="text-sm text-green-600">Enjoy your meal</p>
        </div>
      ) : (
        <div className="space-y-1">
          <p className="text-sm text-green-100 font-medium">Arriving in</p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-4xl font-bold tracking-tight">
              {isExpired ? `~${estimatedMinutes}` : formatted}
            </span>
            <span className="text-sm text-green-100">
              {isExpired ? 'min' : 'min'}
            </span>
          </div>
          <p className="text-xs text-green-100 mt-1">
            {status === 'preparing' && 'Your order is being freshly prepared'}
            {status === 'ready' && 'Waiting for rider to pick up'}
            {status === 'picked_up' && 'Rider has your order'}
            {status === 'on_the_way' && 'On the way to you'}
            {status === 'arriving' && 'Almost there!'}
            {status === 'confirmed' && 'Order confirmed by store'}
          </p>
        </div>
      )}
    </div>
  );
});
