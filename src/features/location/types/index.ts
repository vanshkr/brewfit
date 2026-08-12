export interface Address {
  id: string;
  label: string;
  type: 'home' | 'work' | 'other';
  line1: string;
  line2?: string;
  city: string;
  pincode: string;
  lat: number;
  lng: number;
}

export interface LocationState {
  selectedAddress: Address | null;
  savedAddresses: Address[];
  searchQuery: string;
}
