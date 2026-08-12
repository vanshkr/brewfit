import type { Address } from '../types';

export const savedAddresses: Address[] = [
  {
    id: 'addr-1',
    label: 'Home',
    type: 'home',
    line1: '42, Green Valley Apartments',
    line2: 'Sector 15, Gurugram',
    city: 'Gurugram',
    pincode: '122001',
    lat: 28.4595,
    lng: 77.0266,
  },
  {
    id: 'addr-2',
    label: 'Office',
    type: 'work',
    line1: 'Tower B, Floor 4, Cyber Hub',
    line2: 'DLF Phase 2',
    city: 'Gurugram',
    pincode: '122002',
    lat: 28.4945,
    lng: 77.0887,
  },
  {
    id: 'addr-3',
    label: "Mom's Place",
    type: 'other',
    line1: '12, Model Town',
    line2: 'Near Central Park',
    city: 'Delhi',
    pincode: '110009',
    lat: 28.7172,
    lng: 77.1025,
  },
];

export const searchSuggestions = [
  'Connaught Place, New Delhi',
  'Cyber City, Gurugram',
  'Indiranagar, Bangalore',
  'Koramangala, Bangalore',
  'Bandra West, Mumbai',
];
