import { cn } from '@/shared/utils/cn';
import type { InputHTMLAttributes } from 'react';

interface PhoneInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  countryCode?: string;
}

export function PhoneInput({
  value,
  onChange,
  error,
  countryCode = '+91',
  className,
  ...props
}: PhoneInputProps) {
  const handleChange = (raw: string) => {
    const digits = raw.replace(/\D/g, '').slice(0, 10);
    onChange(digits);
  };

  return (
    <div className="space-y-1.5">
      <div
        className={cn(
          'flex items-center overflow-hidden rounded-xl border-2 bg-gray-50 transition-all',
          'focus-within:border-primary focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/20',
          error ? 'border-red-400 bg-red-50' : 'border-gray-200',
          className,
        )}
      >
        <span className="flex items-center gap-1 border-r border-gray-200 px-4 py-3.5 text-sm font-medium text-secondary">
          🇮🇳 {countryCode}
        </span>
        <input
          type="tel"
          inputMode="numeric"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Enter phone number"
          className="flex-1 bg-transparent px-4 py-3.5 text-base font-medium text-secondary outline-none placeholder:text-muted"
          aria-invalid={!!error}
          aria-describedby={error ? 'phone-error' : undefined}
          {...props}
        />
      </div>
      {error && (
        <p id="phone-error" className="px-1 text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
