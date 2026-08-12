import { Search, X } from 'lucide-react';
import { cn } from '@/shared/utils/cn';

interface LocationSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

export function LocationSearchBar({ value, onChange, onClear }: LocationSearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        placeholder="Search for area, street name..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          'w-full pl-10 pr-10 py-3 rounded-xl',
          'bg-gray-100 text-gray-900 placeholder:text-gray-400',
          'focus:outline-none focus:ring-2 focus:ring-emerald-500',
          'text-sm'
        )}
      />
      {value && (
        <button
          onClick={onClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-200"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      )}
    </div>
  );
}
