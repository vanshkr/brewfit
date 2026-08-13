export * from './product';
export * from './cart';
export * from './user';
export * from './order';
export * from './location';
import { User } from '@/shared/types';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
}

export interface SendOtpPayload {
  phone: string;
  countryCode: string;
}

export interface VerifyOtpPayload {
  phone: string;
  countryCode: string;
  otp: string;
}

export interface VerifyOtpResponse {
  user: User;
  tokens: AuthTokens;
  isNewUser: boolean;
}