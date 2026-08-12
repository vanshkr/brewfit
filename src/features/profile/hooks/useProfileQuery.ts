import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mockUserProfile } from '../data/mock-profile';
import { useProfileStore } from '../store/useProfileStore';
import type { EditProfileForm, UserPreferences } from '../types';

// Simulated API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Fetch profile
const fetchProfile = async () => {
  await delay(600);
  return mockUserProfile;
};

// Update profile API
const updateProfileApi = async (data: Partial<EditProfileForm>) => {
  await delay(800);
  return { ...mockUserProfile, ...data };
};

// Update preferences API
const updatePreferencesApi = async (prefs: Partial<UserPreferences>) => {
  await delay(500);
  return { ...mockUserProfile.preferences, ...prefs };
};

export const useProfileQuery = () => {
  const setProfile = useProfileStore((s) => s.setProfile);

  return useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes cache
    refetchOnWindowFocus: false,
    select: (data) => {
      setProfile(data);
      return data;
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const updateProfile = useProfileStore((s) => s.updateProfile);

  return useMutation({
    mutationFn: updateProfileApi,
    onSuccess: (_, variables) => {
      updateProfile(variables);
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};

export const useUpdatePreferences = () => {
  const queryClient = useQueryClient();
  const updatePreferences = useProfileStore((s) => s.updatePreferences);

  return useMutation({
    mutationFn: updatePreferencesApi,
    onMutate: async (newPrefs) => {
      // Optimistic update
      updatePreferences(newPrefs);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};
