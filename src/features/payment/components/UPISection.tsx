import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/shared/utils/cn';
import { upiApps } from '../data';

interface UPISectionProps {
  onSelect: (upiId: string) => void;
}

export function UPISection({ onSelect }: UPISectionProps) {
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [upiId, setUpiId] = useState('');

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="overflow-hidden"
    >
      <div className="pt-3 space-y-3">
        {/* UPI Apps */}
        <div className="grid grid-cols-4 gap-2">
          {upiApps.map((app) => (
            <button
              key={app.id}
              onClick={() => {
                setSelectedApp(app.id);
                if (app.id !== 'other') onSelect(app.id);
              }}
              className={cn(
                'flex flex-col items-center gap-1 p-2.5 rounded-xl border transition-all',
                selectedApp === app.id
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-gray-100 bg-gray-50 hover:border-gray-200'
              )}
            >
              <span className="text-xl">{app.icon}</span>
              <span className="text-[10px] font-medium text-gray-700 text-center leading-tight">
                {app.name}
              </span>
            </button>
          ))}
        </div>

        {/* UPI ID Input (for "Other") */}
        {selectedApp === 'other' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="yourname@upi"
              className="flex-1 px-3 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
              autoComplete="off"
              spellCheck={false}
            />
            <button
              onClick={() => upiId.includes('@') && onSelect(upiId)}
              disabled={!upiId.includes('@')}
              className="px-4 py-2.5 text-sm font-semibold text-white bg-emerald-500 rounded-lg disabled:opacity-50 active:scale-95 transition-all"
            >
              Verify
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
