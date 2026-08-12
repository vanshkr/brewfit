import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router'; // ✅ FIXED: Changed react-router-dom to react-router
import { useCartStore } from '@/features/cart/store';

export function FloatingCartButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const getItemCount = useCartStore((s) => s.getItemCount);
  const getSummary = useCartStore((s) => s.getSummary);

  const count = getItemCount();
  const summary = getSummary();

  const hiddenRoutes = ['/cart', '/checkout', '/payment', '/product'];
  const shouldHide = hiddenRoutes.some((route) => location.pathname.startsWith(route));

  if (shouldHide) return null;

  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.button
          key="floating-cart-btn"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/cart')}
          className="fixed bottom-20 left-4 right-4 z-30 flex items-center justify-between px-5 py-3.5 bg-emerald-500 text-white rounded-2xl shadow-xl shadow-emerald-500/30"
        >
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            <span className="font-semibold text-sm">
              {count} item{count > 1 ? 's' : ''}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-bold">₹{summary.total}</span>
            <motion.span
              animate={{ x: [0, 3, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-lg"
            >
              →
            </motion.span>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}