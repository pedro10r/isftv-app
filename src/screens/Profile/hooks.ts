import { Alert } from "react-native";

import { useProfileNavigation } from "@navigation/appNavigation";
import { NAV } from "@navigation/routes";
import { useAuthStore } from "@store/authStore";
import {
  useProfile as useProfileQuery,
  useUploadProfileImage,
} from "@hooks/queries/useProfileQueries";
import { pickImage } from "@utils/pickImage";

import { strings } from "./strings";

export const useProfile = () => {
  const { navigate } = useProfileNavigation();

  const session = useAuthStore((state) => state.session);
  const userId = session?.user.id;

  const { data: profile, isLoading: isLoadingProfile } =
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

  const handleNavigateEditProfile = () =>
    navigate(NAV.PROFILE_STACK.EDIT_PROFILE);

  const handleNavigateSettings = () => navigate(NAV.PROFILE_STACK.SETTINGS);

  const labels = {
    displayName:
      profile?.full_name ?? session?.user?.user_metadata?.full_name ?? "",
    displayUsername: profile?.username ?? strings.profile.noUsername,
    displayBio: profile?.bio ?? strings.profile.noBio,
    displayPosition: profile?.playing_position ?? "-",
    displayHeight: profile?.height ? `${profile.height}m` : "-",
    displayWeight: profile?.weight ? `${profile.weight}kg` : "-",
  };

  return {
    session,
    userId,
    profile,
    isLoadingProfile,
    isUploadingMedia,
    avatarUrl: profile?.avatar_url ?? undefined,
    coverUrl: profile?.cover_url ?? undefined,
    labels,
    handlePickAvatar,
    handlePickCover,
    handleNavigateEditProfile,
    handleNavigateSettings,
  };
};
