import { AddressCard } from './AddressCard';
import type { Address } from '../types';

interface SavedAddressListProps {
  addresses: Address[];
  selectedId: string | null;
  onSelect: (address: Address) => void;
}

export function SavedAddressList({ addresses, selectedId, onSelect }: SavedAddressListProps) {
  if (addresses.length === 0) {
    return (
      <p className="text-sm text-gray-400 text-center py-6">No saved addresses yet</p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {addresses.map((addr) => (
        <AddressCard
          key={addr.id}
          address={addr}
          isSelected={addr.id === selectedId}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
