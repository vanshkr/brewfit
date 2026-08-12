import { cn } from '@/shared/utils/cn';

interface ViewToggleProps {
  viewMode: 'grid' | 'list';
  onToggle: (mode: 'grid' | 'list') => void;
}

export function ViewToggle({ viewMode, onToggle }: ViewToggleProps) {
  return (
    <div className="flex items-center bg-gray-100 rounded-lg p-0.5">
      <button
        onClick={() => onToggle('grid')}
        className={cn(
          'px-2.5 py-1.5 rounded-md text-xs font-medium transition-all',
          viewMode === 'grid'
            ? 'bg-white text-green-600 shadow-sm'
            : 'text-gray-500'
        )}
        aria-label="Grid view"
        aria-pressed={viewMode === 'grid'}
      >
        ▦
      </button>
      <button
        onClick={() => onToggle('list')}
        className={cn(
          'px-2.5 py-1.5 rounded-md text-xs font-medium transition-all',
          viewMode === 'list'
            ? 'bg-white text-green-600 shadow-sm'
            : 'text-gray-500'
        )}
        aria-label="List view"
        aria-pressed={viewMode === 'list'}
      >
        ☰
      </button>
    </div>
  );
}
