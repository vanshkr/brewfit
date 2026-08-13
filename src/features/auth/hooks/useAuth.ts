import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { authApi } from '../api/authApi';
import { useAuthStore } from '../store';
import { SendOtpPayload, VerifyOtpPayload } from '@/shared/types';
export function useSendOtp() {
  const setPhone = useAuthStore((s) => s.setPhone);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: SendOtpPayload) => authApi.sendOtp(payload),
    onSuccess: (_, variables) => {
      setPhone(variables.phone);
      navigate('/verify-otp');
    },
  });
}

export function useVerifyOtp() {
  const { setTokens, setUser } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: VerifyOtpPayload) => authApi.verifyOtp(payload),
    onSuccess: (data) => {
      setTokens(data.tokens.accessToken, data.tokens.refreshToken);
      setUser(data.user);
      navigate('/home', { replace: true });
    },
  });
}

export function useLogout() {
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.logout,
    onSettled: () => {
      logout();
      navigate('/login', { replace: true });
    },
  });
}
