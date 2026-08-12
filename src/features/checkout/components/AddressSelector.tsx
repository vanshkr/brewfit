import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Home, Briefcase, Heart, ChevronDown, Check } from 'lucide-react';
import { cn } from '@/shared/utils/cn';
import { savedAddresses } from '../data';
import type { SavedAddress } from '../types';

interface AddressSelectorProps {
  selected: SavedAddress | null;
  onSelect: (address: SavedAddress) => void;
}

const typeIcons = {
  home: Home,
  work: Briefcase,
  other: Heart,
};

export function AddressSelector({ selected, onSelect }: AddressSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-gray-900 flex items-center gap-1.5">
        <MapPin className="w-4 h-4 text-emerald-500" />
        Deliver to
      </label>

      {/* Selected Address */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl hover:border-emerald-300 transition-colors text-left"
      >
        {selected ? (
          <>
            <div className="w-9 h-9 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0">
              {(() => {
                const Icon = typeIcons[selected.type];
                return <Icon className="w-4 h-4 text-emerald-600" />;
              })()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900">{selected.label}</p>
              <p className="text-xs text-gray-500 truncate">{selected.fullAddress}</p>
            </div>
          </>
        ) : (
          <p className="text-sm text-gray-400">Select delivery address</p>
        )}
        <ChevronDown
          className={cn(
            'w-4 h-4 text-gray-400 transition-transform shrink-0',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {/* Address List */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="space-y-2 pt-1">
              {savedAddresses.map((address) => {
                const Icon = typeIcons[address.type];
                const isSelected = selected?.id === address.id;

                return (
                  <button
                    key={address.id}
                    onClick={() => {
                      onSelect(address);
                      setIsOpen(false);
                    }}
                    className={cn(
                      'w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left',
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-100 bg-white hover:border-gray-200'
                    )}
                  >
                    <div
                      className={cn(
                        'w-9 h-9 rounded-lg flex items-center justify-center shrink-0',
                        isSelected ? 'bg-emerald-100' : 'bg-gray-100'
                      )}
                    >
                      <Icon
                        className={cn(
                          'w-4 h-4',
                          isSelected ? 'text-emerald-600' : 'text-gray-500'
                        )}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900">{address.label}</p>
                      <p className="text-xs text-gray-500 truncate">{address.fullAddress}</p>
                      {address.landmark && (
                        <p className="text-xs text-gray-400 truncate">{address.landmark}</p>
                      )}
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-emerald-500 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
