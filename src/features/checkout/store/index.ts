import { create } from 'zustand';
import type { SavedAddress, DeliverySlot, CheckoutState } from '../types';
import { savedAddresses, deliverySlots } from '../data';

interface CheckoutStore extends CheckoutState {
  setAddress: (address: SavedAddress) => void;
  setDeliveryInstructions: (instructions: string) => void;
  setSlot: (slot: DeliverySlot) => void;
  setTip: (amount: number) => void;
  toggleContactless: () => void;
  reset: () => void;
}

const initialState: CheckoutState = {
  selectedAddress: savedAddresses.find((a) => a.isDefault) || null,
  deliveryInstructions: '',
  selectedSlot: deliverySlots[1], // Standard by default
  tipAmount: 0,
  contactless: false,
};

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  ...initialState,

  setAddress: (address) => set({ selectedAddress: address }),

  setDeliveryInstructions: (instructions) =>
    set({ deliveryInstructions: instructions.slice(0, 150) }),

  setSlot: (slot) => set({ selectedSlot: slot }),

  setTip: (amount) => set({ tipAmount: amount }),

  toggleContactless: () => set((state) => ({ contactless: !state.contactless })),

  reset: () => set(initialState),
}));
