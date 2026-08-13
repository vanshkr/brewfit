import { useState, useEffect, useCallback, useRef } from 'react';

export function useCountdown(initialSeconds: number = 30) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Stop if not running
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          setIsRunning(false); // Stop countdown when reaching 0
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]); // 👈 Only depend on isRunning!

  const restart = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setSeconds(initialSeconds);
    setIsRunning(true);
  }, [initialSeconds]);

  const formatted = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(
    seconds % 60
  ).padStart(2, '0')}`;

  return {
    seconds,
    formatted,
    isRunning,
    isComplete: seconds === 0,
    restart,
  };
}