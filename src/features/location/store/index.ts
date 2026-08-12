import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { DeliveryMode, LocationInfo } from '@/shared/types';

interface LocationState {
  deliveryMode: DeliveryMode;
  selectedLocation: LocationInfo | null;
  setDeliveryMode: (mode: DeliveryMode) => void;
  setLocation: (location: LocationInfo) => void;
  clearLocation: () => void;
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      deliveryMode: 'delivery',
      selectedLocation: null,

      setDeliveryMode: (mode) => set({ deliveryMode: mode }),

      setLocation: (location) => set({ selectedLocation: location }),

      clearLocation: () => set({ selectedLocation: null }),
    }),
    {
      name: 'brewfit-location',
    }
  )
)