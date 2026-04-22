import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Profile } from "@features/profile/types";
import {
  getProfile,
  updateProfile,
  uploadImage,
} from "@features/profile/services";
import { profileQueryKey } from "@shared/queryKeys";

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

export function useProfile(userId: string | undefined) {
  return useQuery({
    queryKey: profileQueryKey(userId ?? ""),
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
      queryClient.invalidateQueries({ queryKey: profileQueryKey(userId) });
    },
  });
}

export function useUploadProfileImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, imageUri, type, oldUrl }: UploadImageVariables) =>
      uploadImage(userId, imageUri, type, oldUrl),
    onSuccess: (_data, { userId }) => {
      queryClient.invalidateQueries({ queryKey: profileQueryKey(userId) });
    },
  });
}
