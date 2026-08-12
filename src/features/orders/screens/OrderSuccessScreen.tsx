import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, MapPin, Clock, Package } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Confetti } from '../components/Confetti';

export function OrderSuccessScreen() {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);

  // Generate mock order details
  const orderNumber = `BF${Date.now().toString().slice(-6)}`;
  const estimatedTime = '25-35 min';

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Confetti */}
      {showConfetti && <Confetti />}

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
          className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
          >
            <CheckCircle className="w-12 h-12 text-emerald-500" />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-2xl font-bold text-gray-900 mb-2"
        >
          Order Placed! 🎉
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-sm text-gray-500 mb-8 max-w-[280px]"
        >
          Your healthy brew is being prepared with love. Sit back and relax!
        </motion.p>

        {/* Order Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="w-full max-w-[320px] bg-gray-50 rounded-2xl p-5 space-y-4"
        >
          {/* Order Number */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
              <Package className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-left">
              <p className="text-xs text-gray-500">Order Number</p>
              <p className="text-sm font-bold text-gray-900">#{orderNumber}</p>
            </div>
          </div>

          {/* ETA */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div className="text-left">
              <p className="text-xs text-gray-500">Estimated Delivery</p>
              <p className="text-sm font-bold text-gray-900">{estimatedTime}</p>
            </div>
          </div>

          {/* Delivery */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-left">
              <p className="text-xs text-gray-500">Delivering to</p>
              <p className="text-sm font-bold text-gray-900">Home</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="px-6 pb-8 space-y-3"
      >
        <button
          onClick={() => navigate(`/track/${orderNumber}`)}
          className="w-full py-4 bg-emerald-500 text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/25 active:scale-[0.98] transition-transform"
        >
          Track Order
        </button>

        <button
          onClick={() => navigate('/', { replace: true })}
          className="w-full py-3 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
        >
          Back to Home
        </button>
      </motion.div>
    </div>
  );
}
