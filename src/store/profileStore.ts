import { create } from "zustand";

import { Profile } from "@models/profile";
import {
  getProfile,
  updateProfile as updateProfileService,
  uploadImage,
} from "@services/profileService";

interface ProfileState {
  profile: Profile | null;
  isLoadingProfile: boolean;
  isUpdatingProfile: boolean;
  isUploadingMedia: boolean;
  error: string | null;
  fetchProfile: (userId: string) => Promise<void>;
  updateProfile: (
    userId: string,
    updates: Partial<Omit<Profile, "id">>,
  ) => Promise<boolean>;
  uploadProfileImage: (
    userId: string,
    imageUri: string,
    type: "avatar" | "cover",
  ) => Promise<boolean>;
}

export const useProfileStore = create<ProfileState>()((set, get) => ({
  profile: null,
  isLoadingProfile: false,
  isUpdatingProfile: false,
  isUploadingMedia: false,
  error: null,

  fetchProfile: async (userId) => {
    set({ isLoadingProfile: true, error: null });
    try {
      const profile = await getProfile(userId);
      set({ profile, isLoadingProfile: false });
    } catch (e) {
      set({ error: (e as Error).message, isLoadingProfile: false });
    }
  },

  updateProfile: async (userId, updates) => {
    set({ isUpdatingProfile: true, error: null });
    try {
      await updateProfileService(userId, updates);
      set((state) => ({
        profile: state.profile
          ? { ...state.profile, ...updates }
          : state.profile,
        isUpdatingProfile: false,
      }));
      return true;
    } catch (e) {
      set({ error: (e as Error).message, isUpdatingProfile: false });
      return false;
    }
  },

  uploadProfileImage: async (userId, imageUri, type) => {
    set({ isUploadingMedia: true, error: null });
    try {
      const column = type === "avatar" ? "avatar_url" : "cover_url";
      const oldUrl = get().profile?.[column];

      const publicUrl = await uploadImage(userId, imageUri, type, oldUrl);

      set((state) => ({
        profile: state.profile
          ? { ...state.profile, [column]: publicUrl }
          : state.profile,
        isUploadingMedia: false,
      }));
      return true;
    } catch (e) {
      set({ error: (e as Error).message, isUploadingMedia: false });
      return false;
    }
  },
}));
