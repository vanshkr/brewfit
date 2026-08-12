import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/shared/components/Button';
import { PhoneInput } from '@/shared/components/PhoneInput';
import { PageTransition } from '@/shared/components/PageTransition';
import { useSendOtp } from '../hooks/useAuth';

const loginSchema = z.object({
  phone: z
    .string()
    .min(10, 'Enter a valid 10-digit phone number')
    .max(10, 'Enter a valid 10-digit phone number')
    .regex(/^\d{10}$/, 'Enter a valid 10-digit phone number'),
});

type LoginForm = z.infer<typeof loginSchema>;

export function LoginScreen() {
  const [phone, setPhone] = useState('');
  const sendOtp = useSendOtp();

  const {
    handleSubmit,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { phone: '' },
  });

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    setValue('phone', value);
    if (errors.phone) trigger('phone');
  };

  const onSubmit = (data: LoginForm) => {
    sendOtp.mutate({ phone: data.phone, countryCode: '+91' });
  };

  return (
    <PageTransition className="flex h-full flex-col bg-white px-6 pb-10 pt-16">
      {/* Header */}
      <div className="mb-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-light"
        >
          <span className="text-3xl">📱</span>
        </motion.div>

        <h1 className="text-3xl font-bold text-secondary">Welcome back!</h1>
        <p className="mt-2 text-base text-muted">
          Enter your phone number to continue
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 flex-col">
        <div className="space-y-4">
          <PhoneInput
            value={phone}
            onChange={handlePhoneChange}
            error={errors.phone?.message}
            autoFocus
          />
        </div>

        {/* API Error */}
        {sendOtp.isError && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 text-sm text-red-500"
            role="alert"
          >
            {sendOtp.error.message}
          </motion.p>
        )}

        {/* Terms */}
        <p className="mt-6 text-center text-xs leading-relaxed text-muted">
          By continuing, you agree to our{' '}
          <a href="#" className="font-medium text-primary underline">Terms of Service</a>{' '}
          and{' '}
          <a href="#" className="font-medium text-primary underline">Privacy Policy</a>
        </p>

        {/* Submit */}
        <div className="mt-auto pt-8">
          <Button
            type="submit"
            fullWidth
            size="lg"
            isLoading={sendOtp.isPending}
            disabled={phone.length !== 10}
          >
            Send OTP
          </Button>
        </div>
      </form>
    </PageTransition>
  );
}
