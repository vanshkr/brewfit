import { motion } from 'framer-motion';
import type { CartSummary } from '../types';

interface PriceBreakdownProps {
  summary: CartSummary;
}

export function PriceBreakdown({ summary }: PriceBreakdownProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-2 p-4 bg-gray-50 rounded-xl"
    >
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Bill Details</h3>

      <div className="flex justify-between text-sm text-gray-600">
        <span>Item total ({summary.itemCount} item{summary.itemCount > 1 ? 's' : ''})</span>
        <span>₹{summary.subtotal}</span>
      </div>

      {summary.discount > 0 && (
        <div className="flex justify-between text-sm text-emerald-600">
          <span>Discount</span>
          <span>-₹{summary.discount}</span>
        </div>
      )}

      <div className="flex justify-between text-sm text-gray-600">
        <span>Delivery fee</span>
        {summary.deliveryFee === 0 ? (
          <span className="text-emerald-600 font-medium">FREE</span>
        ) : (
          <span>₹{summary.deliveryFee}</span>
        )}
      </div>

      <div className="flex justify-between text-sm text-gray-600">
        <span>Taxes & charges</span>
        <span>₹{summary.taxes}</span>
      </div>

      <div className="border-t border-gray-200 pt-2 mt-2">
        <div className="flex justify-between text-base font-bold text-gray-900">
          <span>To Pay</span>
          <span>₹{summary.total}</span>
        </div>
      </div>

      {summary.discount > 0 && (
        <p className="text-xs text-emerald-600 font-medium text-center pt-1">
          🎉 You're saving ₹{summary.discount} on this order!
        </p>
      )}
    </motion.div>
  );
}
