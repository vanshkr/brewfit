import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router';

export function EmptyCart() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4"
      >
        <ShoppingBag className="w-10 h-10 text-gray-400" />
      </motion.div>

      <h2 className="text-lg font-bold text-gray-900 mb-1">Your cart is empty</h2>
      <p className="text-sm text-gray-500 mb-6 max-w-62.5">
        Looks like you haven't added anything yet. Explore our menu!
      </p>

      <button
        onClick={() => navigate('/')}
        className="px-6 py-3 bg-emerald-500 text-white font-semibold rounded-full shadow-lg shadow-emerald-500/25 active:scale-95 transition-transform"
      >
        Browse Menu
      </button>
    </motion.div>
  );
}
