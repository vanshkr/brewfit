import { motion } from 'framer-motion';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useCartStore } from '../store';
import { CartItemCard } from '../components/CartItemCard';
import { PromoCodeInput } from '../components/PromoCodeInput';
import { PriceBreakdown } from '../components/PriceBreakdown';
import { EmptyCart } from '../components/EmptyCart';

export function CartScreen() {
  const navigate = useNavigate();
  const { items, appliedPromo, updateQuantity, removeItem, clearCart, applyPromo, removePromo, getSummary } =
    useCartStore();

  const summary = getSummary();

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-32 overflow-y-auto flex-1 h-full w-full">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 active:scale-90 transition-all"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>

          <h1 className="text-lg font-bold text-gray-900">
            Cart ({summary.itemCount})
          </h1>

          <button
            onClick={clearCart}
            className="p-2 -mr-2 rounded-full hover:bg-red-50 active:scale-90 transition-all"
            aria-label="Clear cart"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
        </div>
      </div>

      {/* Cart Items */}
      <div className="px-4 pt-4 space-y-3">
        <motion.div layout className="space-y-3">
          {items.map((item) => (
            <CartItemCard
              key={item.id}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeItem}
            />
          ))}
        </motion.div>

        {/* Add more items */}
        <button
          onClick={() => navigate('/')}
          className="w-full py-2.5 text-sm font-medium text-emerald-600 border border-dashed border-emerald-300 rounded-xl hover:bg-emerald-50 transition-colors"
        >
          + Add more items
        </button>
      </div>

      {/* Promo Code */}
      <div className="px-4 mt-6">
        <PromoCodeInput
          appliedPromo={appliedPromo}
          subtotal={summary.subtotal}
          onApply={applyPromo}
          onRemove={removePromo}
        />
      </div>

      {/* Price Breakdown */}
      <div className="px-4 mt-6">
        <PriceBreakdown summary={summary} />
      </div>

      {/* Checkout CTA — Fixed Bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-20">
        <div className="w-full px-4 pb-4 pt-2 bg-linear-to-t from-white via-white to-transparent">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/checkout')}
            className="w-full py-4 bg-emerald-500 text-white font-bold text-base rounded-2xl shadow-xl shadow-emerald-500/30 flex items-center justify-center gap-2 active:bg-emerald-600 transition-colors"
          >
            <span>Proceed to Checkout</span>
            <span className="px-2 py-0.5 bg-white/20 rounded-lg text-sm">₹{summary.total}</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
