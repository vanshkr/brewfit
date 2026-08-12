import { motion } from 'framer-motion';
import { Clock, Zap, Calendar } from 'lucide-react';
import { cn } from '@/shared/utils/cn';
import { deliverySlots } from '../data';
import type { DeliverySlot } from '../types';

interface DeliverySlotSelectorProps {
  selected: DeliverySlot | null;
  onSelect: (slot: DeliverySlot) => void;
}

const slotIcons = {
  'slot-express': Zap,
  'slot-standard': Clock,
  'slot-scheduled': Calendar,
};

export function DeliverySlotSelector({ selected, onSelect }: DeliverySlotSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-gray-900 flex items-center gap-1.5">
        <Clock className="w-4 h-4 text-emerald-500" />
        Delivery time
      </label>

      <div className="grid grid-cols-3 gap-2">
        {deliverySlots.map((slot) => {
          const Icon = slotIcons[slot.id as keyof typeof slotIcons] || Clock;
          const isSelected = selected?.id === slot.id;

          return (
            <motion.button
              key={slot.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(slot)}
              className={cn(
                'flex flex-col items-center gap-1 p-3 rounded-xl border transition-all',
                isSelected
                  ? 'border-emerald-500 bg-emerald-50 shadow-sm'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              )}
            >
              <Icon
                className={cn(
                  'w-5 h-5',
                  isSelected ? 'text-emerald-600' : 'text-gray-400'
                )}
              />
              <span
                className={cn(
                  'text-xs font-semibold',
                  isSelected ? 'text-emerald-700' : 'text-gray-700'
                )}
              >
                {slot.label}
              </span>
              <span className="text-[10px] text-gray-500">{slot.timeRange}</span>
              {slot.surcharge > 0 && (
                <span className="text-[10px] text-amber-600 font-medium">+₹{slot.surcharge}</span>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
