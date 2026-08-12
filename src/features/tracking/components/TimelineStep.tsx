import { memo } from 'react';
import { cn } from '@/shared/utils/cn';
import type { TrackingStep } from '../types';

interface TimelineStepProps {
  step: TrackingStep;
  isLast: boolean;
}

export const TimelineStep = memo(function TimelineStep({
  step,
  isLast,
}: TimelineStepProps) {
  const formatTime = (timestamp: string | null) => {
    if (!timestamp) return '';
    return new Date(timestamp).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="flex gap-3" role="listitem">
      {/* Timeline indicator */}
      <div className="flex flex-col items-center">
        {/* Dot */}
        <div
          className={cn(
            'w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-500',
            step.isCompleted && 'bg-green-500 border-green-500',
            step.isActive && 'border-green-500 bg-white',
            !step.isCompleted && !step.isActive && 'border-gray-300 bg-white'
          )}
        >
          {step.isCompleted && (
            <svg
              className="w-2.5 h-2.5 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
          {step.isActive && (
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          )}
        </div>

        {/* Connector line */}
        {!isLast && (
          <div
            className={cn(
              'w-0.5 flex-1 min-h-[32px] transition-all duration-500',
              step.isCompleted ? 'bg-green-500' : 'bg-gray-200'
            )}
          />
        )}
      </div>

      {/* Content */}
      <div className={cn('pb-6', isLast && 'pb-0')}>
        <div className="flex items-center gap-2">
          <p
            className={cn(
              'text-sm font-semibold transition-colors',
              step.isCompleted || step.isActive
                ? 'text-gray-900'
                : 'text-gray-400'
            )}
          >
            {step.label}
          </p>
          {step.isActive && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
              Now
            </span>
          )}
        </div>
        <p
          className={cn(
            'text-xs mt-0.5',
            step.isCompleted || step.isActive
              ? 'text-gray-500'
              : 'text-gray-300'
          )}
        >
          {step.description}
        </p>
        {step.timestamp && (
          <p className="text-xs text-gray-400 mt-1">
            {formatTime(step.timestamp)}
          </p>
        )}
      </div>
    </div>
  );
});
