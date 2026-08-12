import { memo } from 'react';

export const TrackingSkeleton = memo(function TrackingSkeleton() {
  return (
    <div className="space-y-4 animate-pulse" aria-label="Loading order tracking">
      {/* ETA Banner skeleton */}
      <div className="h-28 rounded-2xl bg-gray-200" />

      {/* Map skeleton */}
      <div className="h-48 rounded-2xl bg-gray-200" />

      {/* Rider card skeleton */}
      <div className="h-20 rounded-2xl bg-gray-100 flex items-center gap-3 p-4">
        <div className="w-12 h-12 rounded-full bg-gray-200" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-32 rounded bg-gray-200" />
          <div className="h-3 w-24 rounded bg-gray-200" />
        </div>
        <div className="w-11 h-11 rounded-full bg-gray-200" />
      </div>

      {/* Timeline skeleton */}
      <div className="rounded-2xl bg-gray-100 p-5 space-y-4">
        <div className="h-4 w-24 rounded bg-gray-200" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex gap-3">
            <div className="w-4 h-4 rounded-full bg-gray-200" />
            <div className="flex-1 space-y-1">
              <div className="h-3 w-28 rounded bg-gray-200" />
              <div className="h-2 w-40 rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
