export type PaymentMethodType = 'upi' | 'card' | 'wallet' | 'cod';

export interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  label: string;
  sublabel: string;
  icon: string;
  disabled?: boolean;
}

export interface UPIApp {
  id: string;
  name: string;
  icon: string;
}

export interface SavedCard {
  id: string;
  last4: string;
  brand: 'visa' | 'mastercard' | 'rupay';
  expiryMonth: number;
  expiryYear: number;
  cardholderName: string;
}

export interface WalletOption {
  id: string;
  name: string;
  balance: number;
  icon: string;
}

export type PaymentStatus = 'idle' | 'processing' | 'success' | 'failed';
