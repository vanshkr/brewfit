export const APP_NAME = 'BrewFit';

export const OTP_LENGTH = 6;
export const OTP_RESEND_SECONDS = 30;

export const ONBOARDING_SLIDES = [
  {
    id: 1,
    title: 'Fuel Your Day, The Healthy Way',
    description: 'Discover coffee and meals crafted for your fitness goals — high protein, low sugar, all delicious.',
    emoji: '☕',
  },
  {
    id: 2,
    title: 'Track Every Sip & Bite',
    description: 'See calories, protein, and macros for every item. Your nutrition dashboard keeps you on track.',
    emoji: '📊',
  },
  {
    id: 3,
    title: 'Earn Rewards, Stay Consistent',
    description: 'Every order earns points. Hit streaks, unlock tiers, and get free items as you build healthy habits.',
    emoji: '🏆',
  },
] as const;
