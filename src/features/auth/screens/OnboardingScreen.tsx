import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/shared/components/Button';
import { PageTransition } from '@/shared/components/PageTransition';
import { ONBOARDING_SLIDES } from '@/shared/constants';
import { useAuthStore } from '../store';

export function OnboardingScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const completeOnboarding = useAuthStore((s) => s.completeOnboarding);

  const isLastSlide = currentSlide === ONBOARDING_SLIDES.length - 1;

  const handleFinish = () => {
    completeOnboarding();
    navigate('/login', { replace: true });
  };

  const handleNext = () => {
    if (isLastSlide) {
      handleFinish();
    } else {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const slide = ONBOARDING_SLIDES[currentSlide];

  return (
    <PageTransition className="flex h-full flex-col bg-white px-6 pb-10 pt-16">
      {/* Skip Button */}
      <div className="flex justify-end">
        <button
          onClick={handleFinish}
          className="text-sm font-medium text-muted transition-colors hover:text-secondary"
        >
          Skip
        </button>
      </div>

      {/* Slide Content with Swipe Gestures */}
      <div className="flex flex-1 flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.25 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -50 && !isLastSlide) {
                setCurrentSlide((prev) => prev + 1); // Swipe Left -> Next
              } else if (info.offset.x > 50 && currentSlide > 0) {
                setCurrentSlide((prev) => prev - 1); // Swipe Right -> Previous
              }
            }}
            className="flex w-full cursor-grab flex-col items-center text-center active:cursor-grabbing"
          >
            {/* Illustration Placeholder */}
            <div className="mb-10 flex h-52 w-52 items-center justify-center rounded-full bg-primary-light">
              <span className="text-8xl">{slide.emoji}</span>
            </div>

            <h2 className="text-2xl font-bold leading-tight text-secondary">
              {slide.title}
            </h2>
            <p className="mt-4 max-w-75 text-base leading-relaxed text-muted">
              {slide.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination Dots */}
      <div className="mb-8 flex items-center justify-center gap-2">
        {ONBOARDING_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === currentSlide ? 'step' : undefined}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === currentSlide ? 'w-8 bg-primary' : 'w-2 bg-gray-300'
            }`}
          />
        ))}
      </div>

      {/* CTA Button */}
      <Button onClick={handleNext} fullWidth size="lg">
        {isLastSlide ? 'Get Started' : 'Next'}
      </Button>
    </PageTransition>
  );
}