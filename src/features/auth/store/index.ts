import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/shared/types';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  phone: string | null;
  isAuthenticated: boolean;
  hasSeenOnboarding: boolean;
  hasHydrated: boolean; // 👈 Tracks localStorage hydration state

  // Actions
  setPhone: (phone: string) => void;
  setTokens: (access: string, refresh: string) => void;
  setUser: (user: User) => void;
  completeOnboarding: () => void;
  logout: () => void;
  setHasHydrated: (state: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      phone: null,
      isAuthenticated: false,
      hasSeenOnboarding: false,
      hasHydrated: false,

      setPhone: (phone) => set({ phone }),

      setTokens: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken, isAuthenticated: true }),

      setUser: (user) => set({ user }),

      completeOnboarding: () => set({ hasSeenOnboarding: true }),

      setHasHydrated: (hasHydrated) => set({ hasHydrated }),

      logout: () =>
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          phone: null,
        }),
    }),
    {
      name: 'brewfit-auth',
      onRehydrateStorage: () => (state) => {
        // 👈 Flips flag to true as soon as storage reads complete
        state?.setHasHydrated(true);
      },
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
        phone: state.phone, // 👈 Persisted phone so /otp survives reloads
        isAuthenticated: state.isAuthenticated,
        hasSeenOnboarding: state.hasSeenOnboarding,
      }),
    },
  ),
);