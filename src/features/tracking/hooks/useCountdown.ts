import { useState, useEffect, useRef } from 'react';

interface UseCountdownOptions {
  targetTime: string | null;
  onComplete?: () => void;
}

export function useCountdown({ targetTime, onComplete }: UseCountdownOptions) {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isExpired, setIsExpired] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!targetTime) {
      setMinutes(0);
      setSeconds(0);
      return;
    }

    const calculateRemaining = () => {
      const now = Date.now();
      const target = new Date(targetTime).getTime();
      const diff = Math.max(0, target - now);

      if (diff === 0) {
        setIsExpired(true);
        setMinutes(0);
        setSeconds(0);
        onCompleteRef.current?.();
        return false;
      }

      setMinutes(Math.floor(diff / 60000));
      setSeconds(Math.floor((diff % 60000) / 1000));
      setIsExpired(false);
      return true;
    };

    calculateRemaining();

    const interval = setInterval(() => {
      const shouldContinue = calculateRemaining();
      if (!shouldContinue) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  const formatted = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  return { minutes, seconds, formatted, isExpired };
}
