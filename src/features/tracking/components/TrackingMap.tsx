import { memo, useMemo } from 'react';
import { cn } from '@/shared/utils/cn';
import type { RiderLocation } from '../types';

interface TrackingMapProps {
  riderLocation: RiderLocation | null;
  storeLocation: { latitude: number; longitude: number; name: string };
  deliveryLocation: { latitude: number; longitude: number; address: string };
  status: string;
}

/**
 * Tracking Map Component
 *
 * Production: Replace with @react-google-maps/api or @vis.gl/react-google-maps
 * Current: Renders an interactive-looking map UI with animated rider position
 *
 * To integrate Google Maps:
 * 1. npm install @react-google-maps/api
 * 2. Replace the map div with <GoogleMap> component
 * 3. Use <Marker> for store, rider, delivery pins
 * 4. Use <Polyline> for route path
 */
export const TrackingMap = memo(function TrackingMap({
  riderLocation,
  storeLocation,
  deliveryLocation,
  status,
}: TrackingMapProps) {
  const isDelivered = status === 'delivered';

  // Calculate rider progress percentage (for visual indicator)
  const riderProgress = useMemo(() => {
    if (!riderLocation) return 0;

    const totalLat = Math.abs(
      deliveryLocation.latitude - storeLocation.latitude
    );
    const coveredLat = Math.abs(
      riderLocation.latitude - storeLocation.latitude
    );

    return Math.min(100, Math.round((coveredLat / totalLat) * 100));
  }, [riderLocation, storeLocation, deliveryLocation]);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
      {/* Map Container */}
      <div
        className={cn(
          'relative h-48 bg-gradient-to-br from-green-50 to-emerald-50 overflow-hidden',
          isDelivered && 'opacity-60'
        )}
        role="img"
        aria-label={`Delivery map showing rider ${riderProgress}% of the way to your location`}
      >
        {/* Simulated map grid lines */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute w-full h-px bg-gray-400"
              style={{ top: `${(i + 1) * 12.5}%` }}
            />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute h-full w-px bg-gray-400"
              style={{ left: `${(i + 1) * 12.5}%` }}
            />
          ))}
        </div>

        {/* Route path (dashed line from store to delivery) */}
        <div className="absolute top-1/2 left-[15%] right-[15%] h-0.5 -translate-y-1/2">
          <div className="w-full h-full border-t-2 border-dashed border-green-300" />
          {/* Completed portion */}
          <div
            className="absolute top-0 left-0 h-full border-t-2 border-green-500 transition-all duration-1000"
            style={{ width: `${riderProgress}%` }}
          />
        </div>

        {/* Store marker */}
        <div
          className="absolute top-1/2 left-[15%] -translate-x-1/2 -translate-y-1/2"
          aria-label={`Store: ${storeLocation.name}`}
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-white shadow-md border-2 border-green-500 flex items-center justify-center">
              <span className="text-sm">☕</span>
            </div>
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <span className="text-[10px] font-medium text-gray-600 bg-white/80 px-1 rounded">
                Store
              </span>
            </div>
          </div>
        </div>

        {/* Rider marker (animated) */}
        {riderLocation && !isDelivered && (
          <div
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-[2000ms] ease-linear"
            style={{ left: `${15 + riderProgress * 0.7}%` }}
            aria-label="Rider current position"
          >
            <div className="relative">
              {/* Pulse ring */}
              <div className="absolute inset-0 w-10 h-10 -m-1 rounded-full bg-green-400 animate-ping opacity-20" />
              {/* Rider icon */}
              <div className="w-8 h-8 rounded-full bg-green-500 shadow-lg border-2 border-white flex items-center justify-center z-10 relative">
                <span className="text-sm">🏍️</span>
              </div>
            </div>
          </div>
        )}

        {/* Delivery marker */}
        <div
          className="absolute top-1/2 right-[15%] translate-x-1/2 -translate-y-1/2"
          aria-label={`Delivery: ${deliveryLocation.address}`}
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-white shadow-md border-2 border-blue-500 flex items-center justify-center">
              <span className="text-sm">📍</span>
            </div>
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <span className="text-[10px] font-medium text-gray-600 bg-white/80 px-1 rounded">
                You
              </span>
            </div>
          </div>
        </div>

        {/* Delivered overlay */}
        {isDelivered && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm">
            <div className="text-center">
              <span className="text-4xl">✅</span>
              <p className="text-sm font-semibold text-green-700 mt-1">
                Delivered!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Progress bar at bottom of map */}
      <div className="h-1 bg-gray-100">
        <div
          className="h-full bg-green-500 transition-all duration-1000 ease-linear"
          style={{ width: `${riderProgress}%` }}
        />
      </div>
    </div>
  );
});
