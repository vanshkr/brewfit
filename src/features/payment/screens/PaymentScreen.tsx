import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ShieldCheck, Lock } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useCartStore } from '@/features/cart/store';
import { useCheckoutStore } from '@/features/checkout/store';
import { paymentMethods } from '../data';
import { PaymentMethodCard } from '../components/PaymentMethodCard';
import { UPISection } from '../components/UPISection';
import { CardSection } from '../components/CardSection';
import { WalletSection } from '../components/WalletSection';
import { ProcessingOverlay } from '../components/ProcessingOverlay';
import type { PaymentMethodType, PaymentStatus } from '../types';

export function PaymentScreen() {
  const navigate = useNavigate();
  const { getSummary, clearCart } = useCartStore();
  const { tipAmount, selectedSlot, reset: resetCheckout } = useCheckoutStore();

  const cartSummary = getSummary();
  const slotSurcharge = selectedSlot?.surcharge || 0;
  const finalTotal = cartSummary.total + tipAmount + slotSurcharge;

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType | null>(null);
  const [paymentReady, setPaymentReady] = useState(false);
  const [status, setStatus] = useState<PaymentStatus>('idle');

  const handleSubMethodSelect = useCallback((_id: string) => {
    setPaymentReady(true);
  }, []);

  const handleCODSelect = useCallback(() => {
    setSelectedMethod('cod');
    setPaymentReady(true);
  }, []);

  const handlePay = async () => {
    if (!paymentReady) return;

    setStatus('processing');

    // Simulate payment processing (2-3 seconds)
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // Simulate 95% success rate
    const isSuccess = Math.random() > 0.05;

    if (isSuccess) {
      setStatus('success');
      // Clear cart and checkout state
      clearCart();
      resetCheckout();
      // Navigate to success screen
      setTimeout(() => {
        navigate('/order-success', { replace: true });
      }, 500);
    } else {
      setStatus('failed');
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-32 overflow-y-auto flex-1 h-full w-full">
      {/* Processing Overlay */}
      <ProcessingOverlay status={status} />

      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 active:scale-90 transition-all"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">Payment</h1>
          <div className="ml-auto flex items-center gap-1 text-xs text-gray-400">
            <Lock className="w-3 h-3" />
            <span>Secured</span>
          </div>
        </div>
      </div>

      {/* Amount Banner */}
      <div className="mx-4 mt-4 p-4 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl text-white">
        <p className="text-sm opacity-80">Amount to pay</p>
        <p className="text-2xl font-bold mt-0.5">₹{finalTotal}</p>
      </div>

      {/* Payment Methods */}
      <div className="px-4 mt-6 space-y-3">
        <h2 className="text-sm font-semibold text-gray-900">Choose payment method</h2>

        {paymentMethods.map((method) => (
          <div key={method.id}>
            <PaymentMethodCard
              method={method}
              isSelected={selectedMethod === method.type}
              onSelect={() => {
                setSelectedMethod(method.type);
                setPaymentReady(method.type === 'cod');
                if (method.type === 'cod') handleCODSelect();
              }}
            />

            {/* Expanded sub-sections */}
            <AnimatePresence>
              {selectedMethod === 'upi' && method.type === 'upi' && (
                <UPISection onSelect={handleSubMethodSelect} />
              )}
              {selectedMethod === 'card' && method.type === 'card' && (
                <CardSection onSelect={handleSubMethodSelect} />
              )}
              {selectedMethod === 'wallet' && method.type === 'wallet' && (
                <WalletSection totalAmount={finalTotal} onSelect={handleSubMethodSelect} />
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Security Info */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
          <ShieldCheck className="w-4 h-4" />
          <span>Your payment info is encrypted and secure</span>
        </div>
      </div>

      {/* Pay CTA — Fixed Bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-20">
        <div className="w-full px-4 pb-4 pt-2 bg-gradient-to-t from-white via-white to-transparent">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handlePay}
            disabled={!paymentReady || status === 'processing'}
            className="w-full py-4 bg-emerald-500 text-white font-bold text-base rounded-2xl shadow-xl shadow-emerald-500/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:bg-emerald-600 transition-colors"
          >
            {selectedMethod === 'cod' ? (
              <span>Place Order • ₹{finalTotal}</span>
            ) : (
              <span>Pay ₹{finalTotal}</span>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
