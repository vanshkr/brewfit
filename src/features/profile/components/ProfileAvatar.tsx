import { memo } from 'react';
import { cn } from '../../../shared/utils/cn';

interface ProfileAvatarProps {
  name: string;
  avatar?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  editable?: boolean;
  onEdit?: () => void;
}

const sizeMap = {
  sm: 'w-10 h-10 text-sm',
  md: 'w-14 h-14 text-lg',
  lg: 'w-20 h-20 text-2xl',
  xl: 'w-28 h-28 text-4xl',
};

export const ProfileAvatar = memo(function ProfileAvatar({
  name,
  avatar,
  size = 'lg',
  className,
  editable = false,
  onEdit,
}: ProfileAvatarProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className={cn('relative inline-flex', className)}>
      {avatar ? (
        <img
          src={avatar}
          alt={`${name}'s avatar`}
          className={cn('rounded-full object-cover ring-4 ring-emerald-100', sizeMap[size])}
        />
      ) : (
        <div
          className={cn(
            'rounded-full flex items-center justify-center',
            'bg-gradient-to-br from-emerald-400 to-emerald-600',
            'text-white font-bold ring-4 ring-emerald-100',
            sizeMap[size]
          )}
          role="img"
          aria-label={`${name}'s avatar`}
        >
          {initials}
        </div>
      )}

      {editable && (
        <button
          onClick={onEdit}
          className={cn(
            'absolute bottom-0 right-0',
            'w-8 h-8 rounded-full',
            'bg-white shadow-md border border-gray-200',
            'flex items-center justify-center',
            'text-emerald-600 hover:bg-emerald-50',
            'transition-colors duration-150'
          )}
          aria-label="Edit profile photo"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      )}
    </div>
  );
});
