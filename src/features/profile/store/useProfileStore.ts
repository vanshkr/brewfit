import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserProfile, UserPreferences, EditProfileForm } from '../types';

interface ProfileState {
  profile: UserProfile | null;
  isEditing: boolean;
  isLoading: boolean;

  // Actions
  setProfile: (profile: UserProfile) => void;
  updateProfile: (data: Partial<EditProfileForm>) => void;
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
  setEditing: (editing: boolean) => void;
  setLoading: (loading: boolean) => void;
  clearProfile: () => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: null,
      isEditing: false,
      isLoading: false,

      setProfile: (profile) => set({ profile }),

      updateProfile: (data) =>
        set((state) => {
          if (!state.profile) return state;
          return {
            profile: {
              ...state.profile,
              ...data,
              gender: data.gender ? (data.gender as UserProfile['gender']) : state.profile.gender,
            },
            isEditing: false,
          };
        }),

      updatePreferences: (prefs) =>
        set((state) => {
          if (!state.profile) return state;
          return {
            profile: {
              ...state.profile,
              preferences: {
                ...state.profile.preferences,
                ...prefs,
              },
            },
          };
        }),

      setEditing: (isEditing) => set({ isEditing }),
      setLoading: (isLoading) => set({ isLoading }),
      clearProfile: () => set({ profile: null, isEditing: false }),
    }),
    {
      name: 'brewfit-profile',
      partialize: (state) => ({ profile: state.profile }),
    }
  )
);
