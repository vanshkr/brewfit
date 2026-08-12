import { memo } from 'react';
import type { TrackingStep } from '../types';
import { TimelineStep } from './TimelineStep';

interface StatusTimelineProps {
  steps: TrackingStep[];
}

export const StatusTimeline = memo(function StatusTimeline({
  steps,
}: StatusTimelineProps) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <h3 className="text-sm font-bold text-gray-900 mb-4">Order Status</h3>
      <div role="list" aria-label="Order tracking timeline">
        {steps.map((step, index) => (
          <TimelineStep
            key={step.id}
            step={step}
            isLast={index === steps.length - 1}
          />
        ))}
      </div>
    </div>
  );
});
