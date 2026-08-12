import { memo } from 'react';
import { cn } from '@/shared/utils/cn';

interface LiveIndicatorProps {
  isConnected: boolean;
}

export const LiveIndicator = memo(function LiveIndicator({
  isConnected,
}: LiveIndicatorProps) {
  return (
    <div
      className="flex items-center gap-1.5"
      role="status"
      aria-label={isConnected ? 'Live tracking active' : 'Reconnecting'}
    >
      <div className="relative">
        <div
          className={cn(
            'w-2 h-2 rounded-full',
            isConnected ? 'bg-green-500' : 'bg-yellow-500'
          )}
        />
        {isConnected && (
          <div className="absolute inset-0 w-2 h-2 rounded-full bg-green-500 animate-ping opacity-75" />
        )}
      </div>
      <span
        className={cn(
          'text-xs font-medium',
          isConnected ? 'text-green-600' : 'text-yellow-600'
        )}
      >
        {isConnected ? 'Live' : 'Reconnecting...'}
      </span>
    </div>
  );
});
