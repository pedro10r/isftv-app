import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Profile } from "@models/profile";
import {
  getProfile,
  updateProfile,
  uploadImage,
} from "@services/profileService";

type UpdateProfileVariables = {
  userId: string;
  updates: Partial<Omit<Profile, "id">>;
};

type UploadImageVariables = {
  userId: string;
  imageUri: string;
  type: "avatar" | "cover";
  oldUrl?: string | null;
};

export const PROFILE_QUERY_KEY = (userId: string) =>
  ["profile", userId] as const;

export function useProfile(userId: string | undefined) {
  return useQuery({
    queryKey: ["profile", userId],
    queryFn: () => getProfile(userId!),
    enabled: !!userId,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, updates }: UpdateProfileVariables) =>
      updateProfile(userId, updates),
    onSuccess: (_data, { userId }) => {
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY(userId) });
    },
  });
}

export function useUploadProfileImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, imageUri, type, oldUrl }: UploadImageVariables) =>
      uploadImage(userId, imageUri, type, oldUrl),
    onSuccess: (_data, { userId }) => {
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY(userId) });
    },
  });
}
