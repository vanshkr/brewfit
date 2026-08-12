import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/shared/utils/cn';
import { walletOptions } from '../data';

interface WalletSectionProps {
  totalAmount: number;
  onSelect: (walletId: string) => void;
}

export function WalletSection({ totalAmount, onSelect }: WalletSectionProps) {
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="overflow-hidden"
    >
      <div className="pt-3 space-y-2">
        {walletOptions.map((wallet) => {
          const isSelected = selectedWallet === wallet.id;
          const hasBalance = wallet.balance >= totalAmount;

          return (
            <button
              key={wallet.id}
              onClick={() => {
                if (hasBalance) {
                  setSelectedWallet(wallet.id);
                  onSelect(wallet.id);
                }
              }}
              disabled={!hasBalance}
              className={cn(
                'w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left',
                isSelected
                  ? 'border-emerald-500 bg-emerald-50'
                  : hasBalance
                  ? 'border-gray-100 bg-gray-50 hover:border-gray-200'
                  : 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed'
              )}
            >
              <span className="text-xl">{wallet.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{wallet.name}</p>
                <p className={cn('text-xs', hasBalance ? 'text-gray-500' : 'text-red-500')}>
                  Balance: ₹{wallet.balance}
                  {!hasBalance && ' (Insufficient)'}
                </p>
              </div>
              {isSelected && <Check className="w-4 h-4 text-emerald-500" />}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
