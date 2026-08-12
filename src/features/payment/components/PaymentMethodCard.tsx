import { motion } from 'framer-motion';
import { ChevronRight, Check } from 'lucide-react';
import { cn } from '@/shared/utils/cn';
import type { PaymentMethod } from '../types';

interface PaymentMethodCardProps {
  method: PaymentMethod;
  isSelected: boolean;
  onSelect: () => void;
}

export function PaymentMethodCard({ method, isSelected, onSelect }: PaymentMethodCardProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      disabled={method.disabled}
      className={cn(
        'w-full flex items-center gap-3 p-4 rounded-xl border transition-all text-left',
        isSelected
          ? 'border-emerald-500 bg-emerald-50 shadow-sm'
          : 'border-gray-200 bg-white hover:border-gray-300',
        method.disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      <span className="text-2xl">{method.icon}</span>
      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-900">{method.label}</p>
        <p className="text-xs text-gray-500">{method.sublabel}</p>
      </div>
      {isSelected ? (
        <Check className="w-5 h-5 text-emerald-500" />
      ) : (
        <ChevronRight className="w-4 h-4 text-gray-400" />
      )}
    </motion.button>
  );
}
