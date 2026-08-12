import { motion } from 'framer-motion';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useCartStore } from '@/features/cart/store';
import { useCheckoutStore } from '../store';
import { AddressSelector } from '../components/AddressSelector';
import { DeliverySlotSelector } from '../components/DeliverySlotSelector';
import { TipSelector } from '../components/TipSelector';
import { DeliveryInstructions } from '../components/DeliveryInstructions';

export function CheckoutScreen() {
  const navigate = useNavigate();
  const { getSummary } = useCartStore();
  const {
    selectedAddress,
    deliveryInstructions,
    selectedSlot,
    tipAmount,
    contactless,
    setAddress,
    setDeliveryInstructions,
    setSlot,
    setTip,
    toggleContactless,
  } = useCheckoutStore();

  const cartSummary = getSummary();
  const slotSurcharge = selectedSlot?.surcharge || 0;
  const finalTotal = cartSummary.total + tipAmount + slotSurcharge;

  return (
    <div className="min-h-screen bg-gray-50 pb-32 overflow-y-auto flex-1 h-full w-full">
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
          <h1 className="text-lg font-bold text-gray-900">Checkout</h1>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-6">
        {/* Address Selection */}
        <AddressSelector selected={selectedAddress} onSelect={setAddress} />

        {/* Delivery Time */}
        <DeliverySlotSelector selected={selectedSlot} onSelect={setSlot} />

        {/* Delivery Instructions */}
        <DeliveryInstructions
          instructions={deliveryInstructions}
          contactless={contactless}
          onInstructionsChange={setDeliveryInstructions}
          onToggleContactless={toggleContactless}
        />

        {/* Tip */}
        <TipSelector selectedTip={tipAmount} onSelect={setTip} />

        {/* Order Summary Mini */}
        <div className="p-4 bg-white rounded-xl border border-gray-100 space-y-2">
          <h3 className="text-sm font-semibold text-gray-900">Order Summary</h3>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Cart total</span>
            <span>₹{cartSummary.total}</span>
          </div>
          {slotSurcharge > 0 && (
            <div className="flex justify-between text-sm text-gray-600">
              <span>Express fee</span>
              <span>₹{slotSurcharge}</span>
            </div>
          )}
          {tipAmount > 0 && (
            <div className="flex justify-between text-sm text-gray-600">
              <span>Delivery tip</span>
              <span>₹{tipAmount}</span>
            </div>
          )}
          <div className="border-t border-gray-100 pt-2">
            <div className="flex justify-between text-base font-bold text-gray-900">
              <span>Total</span>
              <span>₹{finalTotal}</span>
            </div>
          </div>
        </div>

        {/* Security badge */}
        <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Secure checkout • 256-bit SSL encrypted</span>
        </div>
      </div>

      {/* Pay CTA — Fixed Bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-20">
        <div className="w-full px-4 pb-4 pt-2 bg-linear-to-t from-white via-white to-transparent">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/payment')}
            disabled={!selectedAddress}
            className="w-full py-4 bg-emerald-500 text-white font-bold text-base rounded-2xl shadow-xl shadow-emerald-500/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:bg-emerald-600 transition-colors"
          >
            <span>Select Payment</span>
            <span className="px-2 py-0.5 bg-white/20 rounded-lg text-sm">₹{finalTotal}</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
