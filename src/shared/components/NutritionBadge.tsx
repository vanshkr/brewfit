import { cn } from '@/shared/utils/cn';
import type { NutritionInfo } from '@/shared/types';

interface NutritionBadgeProps {
  nutrition: NutritionInfo;
  variant?: 'compact' | 'full';
  className?: string;
}

export function NutritionBadge({
  nutrition,
  variant = 'compact',
  className,
}: NutritionBadgeProps) {
  if (variant === 'compact') {
    return (
      <div
        className={cn(
          'inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full',
          className
        )}
      >
        <span className="text-xs font-medium text-green-700">
          🔥 {nutrition.calories} kcal
        </span>
        <span className="w-px h-3 bg-green-200" />
        <span className="text-xs font-medium text-green-700">
          💪 {nutrition.protein}g protein
        </span>
      </div>
    );
  }

  const items = [
    { label: 'Calories', value: `${nutrition.calories}`, unit: 'kcal', icon: '🔥' },
    { label: 'Protein', value: `${nutrition.protein}`, unit: 'g', icon: '💪' },
    { label: 'Carbs', value: `${nutrition.carbs}`, unit: 'g', icon: '🌾' },
    { label: 'Fat', value: `${nutrition.fat}`, unit: 'g', icon: '🥑' },
  ];

  return (
    <div className={cn('grid grid-cols-4 gap-2', className)}>
      {items.map((item) => (
        <div
          key={item.label}
          className="flex flex-col items-center p-2 bg-green-50 rounded-xl"
        >
          <span className="text-base" aria-hidden="true">
            {item.icon}
          </span>
          <span className="text-sm font-bold text-gray-800 mt-1">
            {item.value}
            <span className="text-[10px] text-gray-500">{item.unit}</span>
          </span>
          <span className="text-[10px] text-gray-500">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
