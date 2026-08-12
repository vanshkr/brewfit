import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { cn } from '@/shared/utils/cn';
import { tipOptions } from '../data';

interface TipSelectorProps {
  selectedTip: number;
  onSelect: (amount: number) => void;
}

export function TipSelector({ selectedTip, onSelect }: TipSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-gray-900 flex items-center gap-1.5">
        <Heart className="w-4 h-4 text-pink-500" />
        Tip your delivery partner
      </label>
      <p className="text-xs text-gray-500">
        100% of the tip goes to your delivery partner
      </p>

      <div className="flex gap-2">
        {tipOptions.map((option) => {
          const isSelected = selectedTip === option.amount;

          return (
            <motion.button
              key={option.amount}
              whileTap={{ scale: 0.93 }}
              onClick={() => onSelect(option.amount)}
              className={cn(
                'flex-1 py-2.5 rounded-xl border text-sm font-medium transition-all',
                isSelected
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
              )}
            >
              {option.label}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
