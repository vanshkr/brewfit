export interface SavedAddress {
  id: string;
  label: string;
  fullAddress: string;
  landmark?: string;
  type: 'home' | 'work' | 'other';
  isDefault: boolean;
  lat: number;
  lng: number;
}

export interface DeliverySlot {
  id: string;
  label: string;
  timeRange: string;
  estimatedMinutes: number;
  surcharge: number;
}

export interface TipOption {
  amount: number;
  label: string;
}

export interface CheckoutState {
  selectedAddress: SavedAddress | null;
  deliveryInstructions: string;
  selectedSlot: DeliverySlot | null;
  tipAmount: number;
  contactless: boolean;
}
