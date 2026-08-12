import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import type { PaymentStatus } from '../types';

interface ProcessingOverlayProps {
  status: PaymentStatus;
}

export function ProcessingOverlay({ status }: ProcessingOverlayProps) {
  if (status === 'idle') return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 mx-6 text-center shadow-2xl max-w-[300px] w-full"
      >
        {status === 'processing' && (
          <>
            {/* Animated spinner */}
            <div className="relative w-16 h-16 mx-auto mb-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                className="w-16 h-16 border-4 border-gray-200 border-t-emerald-500 rounded-full"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-emerald-500" />
              </div>
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1">Processing Payment</h3>
            <p className="text-sm text-gray-500">Please don't close the app...</p>
          </>
        )}

        {status === 'failed' && (
          <>
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-3xl">✕</span>
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1">Payment Failed</h3>
            <p className="text-sm text-gray-500">Please try again or use a different method</p>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
