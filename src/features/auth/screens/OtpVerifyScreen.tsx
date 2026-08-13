import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { Button } from '@/shared/components/Button';
import { OtpInput } from '@/shared/components/OtpInput';
import { PageTransition } from '@/shared/components/PageTransition';
import { OTP_LENGTH, OTP_RESEND_SECONDS } from '@/shared/constants';
import { useVerifyOtp, useSendOtp } from '../hooks/useAuth';
import { useCountdown } from '../hooks/useCountdown';
import { useAuthStore } from '../store';

export function OtpVerifyScreen() {
  const [otp, setOtp] = useState('');
  const phone = useAuthStore((s) => s.phone);
  const navigate = useNavigate();
  const verifyOtp = useVerifyOtp();
  const resendOtp = useSendOtp();
  const countdown = useCountdown(OTP_RESEND_SECONDS);

  // 1. SAFELY HANDLE MISSING PHONE
  useEffect(() => {
    if (!phone) {
      navigate('/login', { replace: true });
    }
  }, [phone, navigate]);

  // 2. SAFE AUTO-SUBMIT (Only fires when digits are fresh and no error)
  useEffect(() => {
    if (
      otp.length === OTP_LENGTH &&
      phone &&
      !verifyOtp.isPending &&
      !verifyOtp.isError
    ) {
      verifyOtp.mutate({ phone, countryCode: '+91', otp });
    }
  }, [otp, phone, verifyOtp.isPending, verifyOtp.isError]);

  if (!phone) return null;

  const maskedPhone = `+91 ${phone.slice(0, 2)}****${phone.slice(-2)}`;

  const handleOtpChange = (value: string) => {
    if (verifyOtp.isError) verifyOtp.reset(); // Resets error flag so user can re-submit
    setOtp(value);
  };

  const handleVerify = () => {
    if (otp.length !== OTP_LENGTH) return;
    verifyOtp.mutate({ phone, countryCode: '+91', otp });
  };

  const handleResend = () => {
    if (!countdown.isComplete) return;
    setOtp('');
    verifyOtp.reset();
    countdown.restart();
    resendOtp.mutate({ phone, countryCode: '+91' });
  };

  const handleChangeNumber = () => {
    navigate('/login', { replace: true });
  };

  return (
    <PageTransition className="flex h-full flex-col bg-white px-6 pb-10 pt-16">
      {/* Back + Header */}
      <div className="mb-10">
        <button
          onClick={handleChangeNumber}
          className="mb-6 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-secondary transition-colors hover:bg-gray-200"
          aria-label="Go back"
        >
          ←
        </button>

        <h1 className="text-3xl font-bold text-secondary">Verify OTP</h1>
        <p className="mt-2 text-base text-muted">
          We sent a 6-digit code to{' '}
          <span className="font-semibold text-secondary">{maskedPhone}</span>
        </p>
      </div>

      {/* OTP Input */}
      <div className="space-y-4">
        <OtpInput
          value={otp}
          onChange={handleOtpChange}
          error={verifyOtp.isError}
          disabled={verifyOtp.isPending}
        />

        {/* Error Message */}
        {verifyOtp.isError && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-sm text-red-500"
            role="alert"
          >
            {verifyOtp.error?.message || 'Invalid OTP. Please try again.'}
          </motion.p>
        )}
      </div>

      {/* Resend */}
      <div className="mt-8 text-center">
        {countdown.isComplete ? (
          <button
            onClick={handleResend}
            disabled={resendOtp.isPending}
            className="text-sm font-semibold text-primary transition-colors hover:text-primary-dark disabled:opacity-50"
          >
            {resendOtp.isPending ? 'Sending...' : 'Resend OTP'}
          </button>
        ) : (
          <p className="text-sm text-muted">
            Resend code in{' '}
            <span className="font-semibold text-secondary">{countdown.formatted}</span>
          </p>
        )}
      </div>

      {/* Change Number */}
      <button
        onClick={handleChangeNumber}
        className="mt-4 text-center text-sm font-medium text-muted underline transition-colors hover:text-secondary"
      >
        Change phone number
      </button>

      {/* Verify Button */}
      <div className="mt-auto pt-8">
        <Button
          onClick={handleVerify}
          fullWidth
          size="lg"
          isLoading={verifyOtp.isPending}
          disabled={otp.length !== OTP_LENGTH}
        >
          Verify & Continue
        </Button>
      </div>
    </PageTransition>
  );
}