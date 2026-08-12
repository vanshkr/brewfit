export * from './product';
export * from './cart';
export * from './user';
export * from './order';
export * from './location';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
}