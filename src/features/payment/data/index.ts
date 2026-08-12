import type { PaymentMethod, UPIApp, SavedCard, WalletOption } from '../types';

export const paymentMethods: PaymentMethod[] = [
  {
    id: 'upi',
    type: 'upi',
    label: 'UPI',
    sublabel: 'GPay, PhonePe, Paytm',
    icon: '📱',
  },
  {
    id: 'card',
    type: 'card',
    label: 'Credit / Debit Card',
    sublabel: 'Visa, Mastercard, RuPay',
    icon: '💳',
  },
  {
    id: 'wallet',
    type: 'wallet',
    label: 'Wallet',
    sublabel: 'Paytm, Amazon Pay',
    icon: '👛',
  },
  {
    id: 'cod',
    type: 'cod',
    label: 'Cash on Delivery',
    sublabel: 'Pay when you receive',
    icon: '💵',
  },
];

export const upiApps: UPIApp[] = [
  { id: 'gpay', name: 'Google Pay', icon: '🟢' },
  { id: 'phonepe', name: 'PhonePe', icon: '🟣' },
  { id: 'paytm', name: 'Paytm', icon: '🔵' },
  { id: 'other', name: 'Other UPI', icon: '📲' },
];

export const savedCards: SavedCard[] = [
  {
    id: 'card-1',
    last4: '4242',
    brand: 'visa',
    expiryMonth: 12,
    expiryYear: 2028,
    cardholderName: 'Vansh Kumar',
  },
  {
    id: 'card-2',
    last4: '8910',
    brand: 'mastercard',
    expiryMonth: 6,
    expiryYear: 2027,
    cardholderName: 'Vansh Kumar',
  },
];

export const walletOptions: WalletOption[] = [
  { id: 'paytm-wallet', name: 'Paytm Wallet', balance: 1250, icon: '🔵' },
  { id: 'amazon-pay', name: 'Amazon Pay', balance: 800, icon: '🟠' },
];
