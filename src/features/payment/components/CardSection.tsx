import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Check } from 'lucide-react';
import { cn } from '@/shared/utils/cn';
import { savedCards } from '../data';

interface CardSectionProps {
  onSelect: (cardId: string) => void;
}

const brandLogos = {
  visa: '🅥',
  mastercard: '🅜',
  rupay: '🅡',
};

export function CardSection({ onSelect }: CardSectionProps) {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="overflow-hidden"
    >
      <div className="pt-3 space-y-2">
        {/* Saved Cards */}
        {savedCards.map((card) => {
          const isSelected = selectedCard === card.id;
          return (
            <button
              key={card.id}
              onClick={() => {
                setSelectedCard(card.id);
                onSelect(card.id);
              }}
              className={cn(
                'w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left',
                isSelected
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-gray-100 bg-gray-50 hover:border-gray-200'
              )}
            >
              <div className="w-10 h-7 bg-white rounded border border-gray-200 flex items-center justify-center text-lg">
                {brandLogos[card.brand]}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  •••• •••• •••• {card.last4}
                </p>
                <p className="text-xs text-gray-500">
                  Expires {String(card.expiryMonth).padStart(2, '0')}/{card.expiryYear}
                </p>
              </div>
              {isSelected && <Check className="w-4 h-4 text-emerald-500" />}
            </button>
          );
        })}

        {/* Add new card */}
        <button className="w-full flex items-center gap-3 p-3 rounded-xl border border-dashed border-gray-300 hover:border-emerald-400 hover:bg-emerald-50/50 transition-all text-left">
          <CreditCard className="w-5 h-5 text-gray-400" />
          <span className="text-sm font-medium text-gray-600">Add new card</span>
        </button>
      </div>
    </motion.div>
  );
}
