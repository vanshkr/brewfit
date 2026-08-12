import { useRef, useCallback, type KeyboardEvent, type ClipboardEvent } from 'react';
import { cn } from '@/shared/utils/cn';
import { OTP_LENGTH } from '@/shared/constants';

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  disabled?: boolean;
}

export function OtpInput({ value, onChange, error = false, disabled = false }: OtpInputProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const focusInput = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, OTP_LENGTH - 1));
    inputsRef.current[clamped]?.focus();
  }, []);

  const handleChange = useCallback(
    (index: number, digit: string) => {
      if (!/^\d?$/.test(digit)) return;

      const arr = value.split('');
      arr[index] = digit;
      const newValue = arr.join('').slice(0, OTP_LENGTH);
      onChange(newValue);

      if (digit && index < OTP_LENGTH - 1) {
        focusInput(index + 1);
      }
    },
    [value, onChange, focusInput],
  );

  const handleKeyDown = useCallback(
    (index: number, e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace' && !value[index] && index > 0) {
        focusInput(index - 1);
      }
      if (e.key === 'ArrowLeft') focusInput(index - 1);
      if (e.key === 'ArrowRight') focusInput(index + 1);
    },
    [value, focusInput],
  );

  const handlePaste = useCallback(
    (e: ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
      if (pasted) {
        onChange(pasted);
        focusInput(pasted.length - 1);
      }
    },
    [onChange, focusInput],
  );

  return (
    <div className="flex items-center justify-center gap-3" role="group" aria-label="OTP input">
      {Array.from({ length: OTP_LENGTH }).map((_, i) => (
        <input
          key={i}
          ref={(el) => { inputsRef.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] || ''}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          disabled={disabled}
          aria-label={`Digit ${i + 1}`}
          className={cn(
            'h-14 w-12 rounded-xl border-2 text-center text-xl font-bold transition-all duration-150',
            'focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20',
            error
              ? 'border-red-400 bg-red-50 text-red-600 animate-shake'
              : value[i]
                ? 'border-primary bg-primary-light text-secondary'
                : 'border-gray-200 bg-gray-50 text-secondary',
            disabled && 'opacity-50',
          )}
        />
      ))}
    </div>
  );
}
