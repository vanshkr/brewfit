import { Home, Briefcase, MapPin } from 'lucide-react';
import { cn } from '@/shared/utils/cn';
import type { Address } from '../types';

interface AddressCardProps {
  address: Address;
  isSelected?: boolean;
  onSelect: (address: Address) => void;
}

const typeIcons = {
  home: Home,
  work: Briefcase,
  other: MapPin,
};

export function AddressCard({ address, isSelected, onSelect }: AddressCardProps) {
  const Icon = typeIcons[address.type];

  return (
    <button
      onClick={() => onSelect(address)}
      className={cn(
        'flex items-start gap-3 w-full p-4 rounded-xl border transition-colors text-left',
        isSelected
          ? 'border-emerald-500 bg-emerald-50'
          : 'border-gray-200 bg-white hover:border-gray-300'
      )}
    >
      <div
        className={cn(
          'w-9 h-9 rounded-full flex items-center justify-center shrink-0',
          isSelected ? 'bg-emerald-500' : 'bg-gray-100'
        )}
      >
        <Icon className={cn('w-4 h-4', isSelected ? 'text-white' : 'text-gray-500')} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900">{address.label}</p>
        <p className="text-xs text-gray-500 truncate mt-0.5">
          {address.line1}{address.line2 ? `, ${address.line2}` : ''}
        </p>
        <p className="text-xs text-gray-400 mt-0.5">{address.city} — {address.pincode}</p>
      </div>
    </button>
  );
}
