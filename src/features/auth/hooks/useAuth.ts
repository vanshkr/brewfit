import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { authApi } from '../api/authApi';
import { useAuthStore } from '../store';

export function useSendOtp() {
  const setPhone = useAuthStore((s) => s.setPhone);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.sendOtp,
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
    mutationFn: authApi.verifyOtp,
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
