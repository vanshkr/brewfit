import { memo } from 'react';
import { cn } from '../../../shared/utils/cn';

interface StatCardProps {
  icon: string;
  label: string;
  value: string | number;
  suffix?: string;
  className?: string;
}

export const StatCard = memo(function StatCard({
  icon,
  label,
  value,
  suffix,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl p-4 shadow-sm border border-gray-100',
        'flex flex-col items-center gap-1 text-center',
        className
      )}
    >
      <span className="text-2xl" role="img" aria-hidden="true">
        {icon}
      </span>
      <span className="text-lg font-bold text-gray-900">
        {value}
        {suffix && <span className="text-sm text-gray-500 ml-0.5">{suffix}</span>}
      </span>
      <span className="text-xs text-gray-500">{label}</span>
    </div>
  );
});
