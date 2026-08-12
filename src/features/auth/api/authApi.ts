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
// Parse dev numbers from .env
const DEV_PHONE_NUMBERS = (import.meta.env.VITE_DEV_PHONE_NUMBERS || '9999999999,9876543210,0000000000')
  .split(',')
  .map((num: string) => num.trim().replace(/\D/g, '')) // Sanitize digits only
  .filter(Boolean);

const DEV_BYPASS_OTP = import.meta.env.VITE_DEV_BYPASS_OTP || '123456';

// Helper delay to simulate real network latency
const mockDelay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

export const authApi = {
  sendOtp: async (payload: SendOtpPayload): Promise<{ success: boolean }> => {
    // Sanitize input phone number
    const cleanPhone = payload.phone.replace(/\D/g, '');

    // ALWAYS bypass backend in DEV mode if phone is in dev list OR if backend is offline
    if (import.meta.env.DEV) {
      await mockDelay(600); // Simulate network wait
      console.log(`[DEV MODE] Mocking sendOtp for: ${cleanPhone}`);
      return { success: true };
    }

    // Only attempts real HTTP post in production builds
    const { data } = await api.post('/auth/send-otp', payload);
    return data;
  },

  verifyOtp: async (payload: VerifyOtpPayload): Promise<VerifyOtpResponse> => {
    const cleanPhone = payload.phone.replace(/\D/g, '');
    const isDevOtp = payload.otp === DEV_BYPASS_OTP;

    if (import.meta.env.DEV) {
      await mockDelay(600);

      // If wrong OTP typed during dev testing
      if (!isDevOtp) {
        throw new Error('Invalid OTP! (Use 123456 in dev mode)');
      }

      console.log(`[DEV MODE] Mocking verifyOtp success for: ${cleanPhone}`);
      return {
        user: {
          id: 'user-001',
          phone: payload.phone,
          name: 'Vansh Kumar',
          email: 'vansh.kumar@email.com',
          avatarUrl: null,
          createdAt: new Date().toISOString(),
        },
        tokens: {
          accessToken: 'mock-access-token-123456',
          refreshToken: 'mock-refresh-token-123456',
        },
        isNewUser: false,
      };
    }

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
