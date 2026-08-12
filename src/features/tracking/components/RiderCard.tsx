import { memo } from 'react';
import { cn } from '@/shared/utils/cn';
import type { RiderInfo } from '../types';

interface RiderCardProps {
  rider: RiderInfo;
  onCall: () => void;
}

export const RiderCard = memo(function RiderCard({
  rider,
  onCall,
}: RiderCardProps) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="relative">
          <img
            src={rider.avatar}
            alt={rider.name}
            className="w-12 h-12 rounded-full bg-gray-100 object-cover"
            loading="lazy"
          />
          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-gray-900 truncate">
            {rider.name}
          </p>
          <div className="flex items-center gap-2 mt-0.5">
            <div className="flex items-center gap-0.5">
              <svg
                className="w-3.5 h-3.5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-xs font-medium text-gray-600">
                {rider.rating}
              </span>
            </div>
            <span className="text-gray-300">•</span>
            <span className="text-xs text-gray-500">
              {rider.totalDeliveries.toLocaleString()} deliveries
            </span>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-xs text-gray-400">
              {rider.vehicleType === 'bike' ? '🏍️' : rider.vehicleType === 'scooter' ? '🛵' : '🚲'}
            </span>
            <span className="text-xs text-gray-400 font-mono">
              {rider.vehicleNumber}
            </span>
          </div>
        </div>

        {/* Call button */}
        <button
          onClick={onCall}
          className={cn(
            'w-11 h-11 rounded-full flex items-center justify-center',
            'bg-green-50 text-green-600 border border-green-200',
            'hover:bg-green-100 active:scale-95 transition-all'
          )}
          aria-label={`Call rider ${rider.name}`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
});
