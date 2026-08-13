import { api } from '@/lib/axios';
import type { SendOtpPayload, VerifyOtpPayload, VerifyOtpResponse, User } from '@/shared/types';

// Parse dev numbers from .env
const DEV_PHONE = import.meta.env.VITE_DEV_PHONE;
const DEV_OTP = import.meta.env.VITE_DEV_OTP;

// Helper delay to simulate real network latency
const mockDelay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));
const sanitizePhone = (phone: unknown): string => String(phone || '').replace(/\D/g, '');

export const authApi = {
  sendOtp: async (payload: SendOtpPayload): Promise<{ success: boolean }> => {
    // Sanitize input phone number
    const cleanPhone = sanitizePhone(payload.phone);

    // ALWAYS bypass backend in DEV mode if phone matches DEV_PHONE
    if (import.meta.env.DEV) {
      await mockDelay(600);

      if (cleanPhone !== DEV_PHONE) {
        throw new Error(`[DEV] ${cleanPhone} is not a registered dev phone number in .env!`);
      }

      console.log(`[DEV MODE] OTP sent successfully to dev phone: ${cleanPhone}`);
      return { success: true };
    }

    // Only attempts real HTTP post in production builds
    const { data } = await api.post('/auth/send-otp', {
      ...payload,
      phone: cleanPhone,
    });
    return data;
  },

  verifyOtp: async (payload: VerifyOtpPayload): Promise<VerifyOtpResponse> => {
    const cleanPhone = sanitizePhone(payload.phone);

    if (import.meta.env.DEV) {
      await mockDelay(600);

      // Check BOTH dev phone and dev OTP match
      if (cleanPhone !== DEV_PHONE) {
        throw new Error('[DEV] Phone number mismatch!');
      }
      if (String(payload.otp) !== String(DEV_OTP)) {
        throw new Error(`[DEV] Invalid OTP!`);
      }

      console.log(`[DEV MODE] Mocking verifyOtp success for: ${cleanPhone}`);
      return {
        user: {
          id: 'dev-user',
          phone: payload.phone,
          name: 'Dev',
          email: 'dev@brewfit.com',
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

    const { data } = await api.post('/auth/verify-otp', {
      ...payload,
      phone: cleanPhone,
    });
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