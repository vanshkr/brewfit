import { api } from '@/lib/axios';
import type { AuthTokens, User } from '@/shared/types';

interface SendOtpPayload {
  phone: string;
  countryCode: string;
}

interface VerifyOtpPayload {
  phone: string;
  countryCode: string;
  otp: string;
}

interface VerifyOtpResponse {
  user: User;
  tokens: AuthTokens;
  isNewUser: boolean;
}

export const authApi = {
  sendOtp: async (payload: SendOtpPayload): Promise<{ success: boolean }> => {
    const { data } = await api.post('/auth/send-otp', payload);
    return data;
  },

  verifyOtp: async (payload: VerifyOtpPayload): Promise<VerifyOtpResponse> => {
    const { data } = await api.post('/auth/verify-otp', payload);
    return data;
  },

  getProfile: async (): Promise<User> => {
    const { data } = await api.get('/auth/me');
    return data;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },
};
