import { cn } from '@/shared/utils/cn';

interface CategoryPillProps {
  icon: string;
  name: string;
  isActive?: boolean;
  onClick: () => void;
}

export function CategoryPill({ icon, name, isActive, onClick }: CategoryPillProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all',
        isActive
          ? 'bg-green-600 text-white shadow-md shadow-green-200'
          : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-100'
      )}
      aria-pressed={isActive}
    >
      <span aria-hidden="true">{icon}</span>
      <span>{name}</span>
    </button>
  );
}
