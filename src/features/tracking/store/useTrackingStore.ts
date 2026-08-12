import { create } from 'zustand';
import type {
  OrderTrackingData,
  OrderTrackingStatus,
  RiderLocation,
  TrackingStep,
} from '../types';
import { generateTrackingSteps } from '../data/mock-tracking';

interface TrackingState {
  // Data
  activeOrder: OrderTrackingData | null;
  isLoading: boolean;
  error: string | null;
  isConnected: boolean;

  // Actions
  setActiveOrder: (order: OrderTrackingData) => void;
  updateStatus: (status: OrderTrackingStatus) => void;
  updateRiderLocation: (location: RiderLocation) => void;
  updateETA: (minutes: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setConnected: (connected: boolean) => void;
  clearTracking: () => void;
}

export const useTrackingStore = create<TrackingState>((set, get) => ({
  activeOrder: null,
  isLoading: false,
  error: null,
  isConnected: false,

  setActiveOrder: (order) => set({ activeOrder: order, error: null }),

  updateStatus: (status) => {
    const { activeOrder } = get();
    if (!activeOrder) return;

    const updatedSteps: TrackingStep[] = generateTrackingSteps(status);

    set({
      activeOrder: {
        ...activeOrder,
        status,
        steps: updatedSteps,
        canCancel: status === 'confirmed' || status === 'preparing',
      },
    });
  },

  updateRiderLocation: (location) => {
    const { activeOrder } = get();
    if (!activeOrder) return;

    set({
      activeOrder: {
        ...activeOrder,
        riderLocation: location,
      },
    });
  },

  updateETA: (minutes) => {
    const { activeOrder } = get();
    if (!activeOrder) return;

    set({
      activeOrder: {
        ...activeOrder,
        estimatedMinutes: minutes,
        estimatedDeliveryTime: new Date(
          Date.now() + minutes * 60000
        ).toISOString(),
      },
    });
  },

  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setConnected: (connected) => set({ isConnected: connected }),

  clearTracking: () =>
    set({
      activeOrder: null,
      isLoading: false,
      error: null,
      isConnected: false,
    }),
}));
