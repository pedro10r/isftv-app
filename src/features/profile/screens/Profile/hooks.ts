import { useState } from "react";
import { Alert } from "react-native";
import { useQueryClient } from "@tanstack/react-query";

import { useProfileNavigation } from "@navigation/appNavigation";
import { NAV } from "@navigation/routes";
import { useAuthStore } from "@features/auth/store";
import {
  useProfile as useProfileQuery,
  useUploadProfileImage,
} from "@features/profile/queries";
import { pickImage } from "@utils/pickImage";

import { strings } from "./strings";

export const useProfile = () => {
  const { navigate } = useProfileNavigation();
  const queryClient = useQueryClient();

  const session = useAuthStore((state) => state.session);
  const userId = session?.user.id;

  const [isRefreshing, setIsRefreshing] = useState(false);

  const { data: profile, isLoading: isLoadingProfile, refetch } =
    useProfileQuery(userId);
  const { mutateAsync: uploadImage, isPending: isUploadingMedia } =
    useUploadProfileImage();

  const handlePickAvatar = async () => {
    if (!userId) return;
    const uri = await pickImage([1, 1]);
    if (!uri) return;

    try {
      await uploadImage({
        userId,
        imageUri: uri,
        type: "avatar",
        oldUrl: profile?.avatar_url,
      });
    } catch {
      Alert.alert(strings.upload.errorTitle, strings.upload.errorMessage);
    }
  };

  const handlePickCover = async () => {
    if (!userId) return;
    const uri = await pickImage([16, 9]);
    if (!uri) return;

    try {
      await uploadImage({
        userId,
        imageUri: uri,
        type: "cover",
        oldUrl: profile?.cover_url,
      });
    } catch {
      Alert.alert(strings.upload.errorTitle, strings.upload.errorMessage);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await Promise.all([
      refetch(),
      queryClient.invalidateQueries({ queryKey: ["user-posts", userId] }),
    ]);
    setIsRefreshing(false);
  };

  const handleNavigateEditProfile = () =>
    navigate(NAV.PROFILE_STACK.EDIT_PROFILE);

  const handleNavigateSettings = () => navigate(NAV.PROFILE_STACK.SETTINGS);

  const labels = {
    displayName:
      profile?.full_name ?? session?.user?.user_metadata?.full_name ?? "",
    displayUsername: profile?.username ?? strings.profile.noUsername,
    displayBio: profile?.bio ?? strings.profile.noBio,
    displayPosition: profile?.playing_position ?? "-",
    displayCity: profile?.city ?? "-",
    displayHeight: profile?.height ? `${profile.height} m` : "-",
    displayLocation:
      profile?.city && profile?.uf
        ? `${profile.city}, ${profile.uf}`
        : (profile?.city ?? "-"),
    displayWhatsApp: profile?.whatsapp ?? "-",
  };

  return {
    session,
    userId,
    profile,
    isLoadingProfile,
    isUploadingMedia,
    isRefreshing,
    avatarUrl: profile?.avatar_url ?? undefined,
    coverUrl: profile?.cover_url ?? undefined,
    labels,
    handleRefresh,
    handlePickAvatar,
    handlePickCover,
    handleNavigateEditProfile,
    handleNavigateSettings,
  };
};
