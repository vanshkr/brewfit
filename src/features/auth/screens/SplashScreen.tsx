import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/';

export function SplashScreen() {
  const navigate = useNavigate();
  const { isAuthenticated, hasSeenOnboarding } = useAuthStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        navigate('/home', { replace: true });
      } else if (hasSeenOnboarding) {
        navigate('/login', { replace: true });
      } else {
        navigate('/onboarding', { replace: true });
      }
    }, 2200);

    return () => clearTimeout(timer);
  }, [isAuthenticated, hasSeenOnboarding, navigate]);

  return (
    <div className="flex h-full flex-col items-center justify-center bg-primary">
      {/* Logo Animation */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, duration: 0.8 }}
        className="mb-6"
      >
        <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-white shadow-xl">
          <span className="text-5xl">☕</span>
        </div>
      </motion.div>

      {/* Brand Name */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-4xl font-extrabold text-white"
      >
        BrewFit
      </motion.h1>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="mt-2 text-base font-medium text-white/80"
      >
        Fuel Your Day, The Healthy Way
      </motion.p>

      {/* Loading Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="mt-12"
      >
        <div className="h-1 w-16 overflow-hidden rounded-full bg-white/30">
          <motion.div
            className="h-full rounded-full bg-white"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ repeat: Infinity, duration: 1, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </div>
  );
}
