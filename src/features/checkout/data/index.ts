import type { SavedAddress, DeliverySlot, TipOption } from '../types';

export const savedAddresses: SavedAddress[] = [
  {
    id: 'addr-1',
    label: 'Home',
    fullAddress: '42, Maple Street, Koramangala 4th Block, Bangalore 560034',
    landmark: 'Near Forum Mall',
    type: 'home',
    isDefault: true,
    lat: 12.9352,
    lng: 77.6245,
  },
  {
    id: 'addr-2',
    label: 'Office',
    fullAddress: 'Tower B, 5th Floor, Embassy Tech Village, Outer Ring Road, Bangalore 560103',
    type: 'work',
    isDefault: false,
    lat: 12.9279,
    lng: 77.6871,
  },
  {
    id: 'addr-3',
    label: "Mom's Place",
    fullAddress: '15, 2nd Cross, Indiranagar, Bangalore 560038',
    landmark: 'Opposite Toit Brewpub',
    type: 'other',
    isDefault: false,
    lat: 12.9784,
    lng: 77.6408,
  },
];

export const deliverySlots: DeliverySlot[] = [
  {
    id: 'slot-express',
    label: 'Express',
    timeRange: '15-20 min',
    estimatedMinutes: 18,
    surcharge: 20,
  },
  {
    id: 'slot-standard',
    label: 'Standard',
    timeRange: '25-35 min',
    estimatedMinutes: 30,
    surcharge: 0,
  },
  {
    id: 'slot-scheduled',
    label: 'Schedule',
    timeRange: 'Pick a time',
    estimatedMinutes: 60,
    surcharge: 0,
  },
];

export const tipOptions: TipOption[] = [
  { amount: 0, label: 'No tip' },
  { amount: 20, label: '₹20' },
  { amount: 30, label: '₹30' },
  { amount: 50, label: '₹50' },
];
