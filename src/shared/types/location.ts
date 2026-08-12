export interface Address {
  id: string;
  label?: string;
  type?: 'home' | 'work' | 'other';
  line1: string;
  line2?: string;
  city: string;
  zip?: string;
  pincode?: string;
  lat?: number;
  lng?: number;
  fullAddress?: string;
}


