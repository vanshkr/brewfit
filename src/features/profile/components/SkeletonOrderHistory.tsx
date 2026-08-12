import { memo } from 'react';

export const SkeletonOrderHistory = memo(function SkeletonOrderHistory() {
  return (
    <div className="animate-pulse space-y-4 px-4" aria-label="Loading orders">
      {/* Filter bar skeleton */}
      <div className="flex gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-8 w-20 bg-gray-200 rounded-full" />
        ))}
      </div>

      {/* Order cards skeleton */}
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl p-4 space-y-3 border border-gray-100">
          <div className="flex justify-between">
            <div className="space-y-1">
              <div className="h-4 w-28 bg-gray-200 rounded" />
              <div className="h-3 w-36 bg-gray-200 rounded" />
            </div>
            <div className="h-6 w-20 bg-gray-200 rounded-full" />
          </div>
          <div className="flex gap-3 items-center">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 rounded-xl bg-gray-200" />
              <div className="w-10 h-10 rounded-xl bg-gray-200" />
            </div>
            <div className="space-y-1 flex-1">
              <div className="h-3.5 w-full bg-gray-200 rounded" />
              <div className="h-3 w-24 bg-gray-200 rounded" />
            </div>
          </div>
          <div className="flex justify-between pt-2 border-t border-gray-100">
            <div className="h-5 w-16 bg-gray-200 rounded" />
            <div className="flex gap-2">
              <div className="h-8 w-16 bg-gray-200 rounded-lg" />
              <div className="h-8 w-16 bg-gray-200 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});
