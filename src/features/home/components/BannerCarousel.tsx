import { useState, useEffect, useCallback, useRef } from 'react';
import { cn } from '@/shared/utils/cn';
import type { Banner } from '@/shared/types';

interface BannerCarouselProps {
  banners: Banner[];
}

export function BannerCarousel({ banners }: BannerCarouselProps) {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const startAutoPlay = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);
  }, [banners.length]);

  const stopAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (banners.length > 1) {
      startAutoPlay();
    }
    return stopAutoPlay;
  }, [banners.length, startAutoPlay, stopAutoPlay]);

  const goTo = (index: number) => {
    setCurrent(index);
    stopAutoPlay();
    startAutoPlay();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;

    if (diff > threshold) {
      goTo((current + 1) % banners.length);
    } else if (diff < -threshold) {
      goTo((current - 1 + banners.length) % banners.length);
    }
  };

  if (banners.length === 0) return null;

  return (
    <div
      className="relative overflow-hidden rounded-2xl"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="Promotional banners"
      aria-roledescription="carousel"
    >
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="w-full shrink-0 p-5 rounded-2xl min-h-35 flex flex-col justify-center"
            style={{ backgroundColor: banner.bgColor }}
            role="group"
            aria-roledescription="slide"
            aria-label={banner.title}
          >
            <h3 className="text-lg font-bold text-gray-800">{banner.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{banner.subtitle}</p>
            <button className="mt-3 px-4 py-1.5 bg-green-600 text-white text-xs font-semibold rounded-full w-fit hover:bg-green-700 transition-colors">
              Order Now
            </button>
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      {banners.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={cn(
                'rounded-full transition-all',
                index === current
                  ? 'w-5 h-1.5 bg-green-600'
                  : 'w-1.5 h-1.5 bg-gray-400/50'
              )}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === current ? 'true' : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}
