import { useCallback } from "react";
import { Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useShallow } from "zustand/shallow";

import { useProfileNavigation } from "@navigation/appNavigation";
import { NAV } from "@navigation/routes";
import { useAuthStore } from "@store/authStore";
import { useProfileStore } from "@store/profileStore";
import { pickImage } from "@utils/pickImage";

import { strings } from "./strings";

export const useProfile = () => {
  const { navigate } = useProfileNavigation();

  const session = useAuthStore((state) => state.session);

  const {
    profile,
    isLoadingProfile,
    isUploadingMedia,
    fetchProfile,
    uploadProfileImage,
  } = useProfileStore(
    useShallow((state) => ({
      profile: state.profile,
      isLoadingProfile: state.isLoadingProfile,
      isUploadingMedia: state.isUploadingMedia,
      fetchProfile: state.fetchProfile,
      uploadProfileImage: state.uploadProfileImage,
    })),
  );

  useFocusEffect(
    useCallback(() => {
      if (session?.user.id) {
        fetchProfile(session.user.id);
      }
    }, [session?.user.id, fetchProfile]),
  );

  const handlePickAvatar = async () => {
    if (!session?.user.id) return;
    const uri = await pickImage([1, 1]);
    if (!uri) return;

    const success = await uploadProfileImage(session.user.id, uri, "avatar");
    if (!success) {
      Alert.alert(strings.upload.errorTitle, strings.upload.errorMessage);
    }
  };

  const handlePickCover = async () => {
    if (!session?.user.id) return;
    const uri = await pickImage([16, 9]);
    if (!uri) return;

    const success = await uploadProfileImage(session.user.id, uri, "cover");
    if (!success) {
      Alert.alert(strings.upload.errorTitle, strings.upload.errorMessage);
    }
  };

  const handleEditProfile = () => navigate(NAV.PROFILE_STACK.EDIT_PROFILE);

  const handleSettings = () => navigate(NAV.PROFILE_STACK.SETTINGS);

  return {
    session,
    profile,
    isLoadingProfile,
    isUploadingMedia,
    avatarUrl: profile?.avatar_url ?? undefined,
    coverUrl: profile?.cover_url ?? undefined,
    handlePickAvatar,
    handlePickCover,
    handleEditProfile,
    handleSettings,
  };
};
