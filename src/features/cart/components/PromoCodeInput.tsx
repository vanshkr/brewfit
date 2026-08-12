import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, X, Check, AlertCircle } from 'lucide-react';
import { cn } from '@/shared/utils/cn';
import { availablePromoCodes } from '../data';
import type { PromoCode } from '../types';

interface PromoCodeInputProps {
  appliedPromo: PromoCode | null;
  subtotal: number;
  onApply: (promo: PromoCode) => void;
  onRemove: () => void;
}

export function PromoCodeInput({ appliedPromo, subtotal, onApply, onRemove }: PromoCodeInputProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleApply = () => {
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) return;

    const promo = availablePromoCodes.find((p) => p.code === trimmed);

    if (!promo) {
      setError('Invalid promo code');
      return;
    }

    if (subtotal < promo.minOrderValue) {
      setError(`Minimum order ₹${promo.minOrderValue} required`);
      return;
    }

    setError('');
    setCode('');
    setIsExpanded(false);
    onApply(promo);
  };

  if (appliedPromo) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-xl"
      >
        <div className="flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span className="text-sm font-semibold text-emerald-700">{appliedPromo.code}</span>
          <span className="text-xs text-emerald-600">applied</span>
        </div>
        <button
          onClick={onRemove}
          className="p-1 rounded-full hover:bg-emerald-100 transition-colors"
          aria-label="Remove promo code"
        >
          <X className="w-4 h-4 text-emerald-600" />
        </button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-2">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
      >
        <Tag className="w-4 h-4" />
        <span>Apply promo code</span>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value.toUpperCase());
                  setError('');
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleApply()}
                placeholder="Enter code"
                className={cn(
                  'flex-1 px-3 py-2 text-sm border rounded-lg outline-none transition-colors',
                  'focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500',
                  error ? 'border-red-300' : 'border-gray-200'
                )}
                maxLength={15}
                autoCapitalize="characters"
              />
              <button
                onClick={handleApply}
                disabled={!code.trim()}
                className="px-4 py-2 text-sm font-semibold text-white bg-emerald-500 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-all"
              >
                Apply
              </button>
            </div>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-1 mt-1.5 text-xs text-red-500"
                >
                  <AlertCircle className="w-3 h-3" />
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Available codes hint */}
            <div className="mt-2 flex flex-wrap gap-1.5">
              {availablePromoCodes.map((promo) => (
                <button
                  key={promo.code}
                  onClick={() => {
                    setCode(promo.code);
                    setError('');
                  }}
                  className="px-2 py-0.5 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full hover:bg-emerald-100 transition-colors"
                >
                  {promo.code}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
