import { memo, useEffect, useState } from 'react';
import { cn } from '../../../shared/utils/cn';

interface ReorderToastProps {
  message: string;
  visible: boolean;
  onDismiss: () => void;
}

export const ReorderToast = memo(function ReorderToast({
  message,
  visible,
  onDismiss,
}: ReorderToastProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(onDismiss, 300);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, onDismiss]);

  if (!visible && !show) return null;

  return (
    <div
      className={cn(
        'fixed bottom-24 left-1/2 -translate-x-1/2 z-50',
        'px-5 py-3 rounded-2xl',
        'bg-gray-900 text-white text-sm font-medium',
        'shadow-xl shadow-black/20',
        'flex items-center gap-2',
        'transition-all duration-300',
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      )}
      role="alert"
      aria-live="polite"
    >
      <span className="text-emerald-400">✓</span>
      {message}
    </div>
  );
});
