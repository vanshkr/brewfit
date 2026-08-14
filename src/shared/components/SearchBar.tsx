import { useState } from 'react';
import { cn } from '@/shared/utils/cn';

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  className?: string;
}

export function SearchBar({
  placeholder = 'Search coffee, food, drinks...',
  onSearch,
  className,
}: SearchBarProps) {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setValue(query);
    onSearch(query);
  };

  const handleClear = () => {
    setValue('');
    onSearch('');
  };

  return (
    <div className={cn('relative', className)}>
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
        🔍
      </span>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-3 bg-gray-50 rounded-xl text-sm text-gray-800 placeholder:text-gray-400 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 transition-all"
        aria-label="Search"
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm p-1"
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}