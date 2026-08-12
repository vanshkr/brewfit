import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { cn } from '../../../shared/utils/cn';
import type { ProfileMenuItem } from '../types';

interface ProfileMenuProps {
  items: ProfileMenuItem[];
}

export const ProfileMenu = memo(function ProfileMenu({ items }: ProfileMenuProps) {
  const navigate = useNavigate();

  const handleClick = useCallback(
    (item: ProfileMenuItem) => {
      if (item.action) {
        item.action();
      } else if (item.route) {
        navigate(item.route);
      }
    },
    [navigate]
  );

  return (
    <div className="px-4 space-y-2">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => handleClick(item)}
          className={cn(
            'w-full flex items-center gap-3 p-4',
            'bg-white rounded-2xl shadow-sm border border-gray-100',
            'hover:bg-gray-50 active:scale-[0.98]',
            'transition-all duration-150'
          )}
          aria-label={item.label}
        >
          <span className="text-xl w-8 text-center" role="img" aria-hidden="true">
            {item.icon}
          </span>

          <div className="flex-1 text-left">
            <p className="text-sm font-medium text-gray-900">{item.label}</p>
            {item.description && (
              <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
            )}
          </div>

          {item.badge && (
            <span className="px-2 py-0.5 text-xs font-medium bg-emerald-100 text-emerald-700 rounded-full">
              {item.badge}
            </span>
          )}

          {item.chevron !== false && (
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
        </button>
      ))}
    </div>
  );
});
