import { useState } from "react";

import { useProfileNavigation } from "@navigation/appNavigation";
import { NAV } from "@navigation/routes";
import { useAuthStore } from "@store/authStore";
import { useProfileStore } from "@store/profileStore";
import { pickImage } from "@utils/pickImage";

export const useProfile = () => {
  const { navigate } = useProfileNavigation();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const profile = useProfileStore();

  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);
  const [coverUrl, setCoverUrl] = useState<string | undefined>(undefined);

  const handlePickAvatar = async () => {
    const uri = await pickImage([1, 1]);
    if (uri) setAvatarUrl(uri);
  };

  const handlePickCover = async () => {
    const uri = await pickImage([16, 9]);
    if (uri) setCoverUrl(uri);
  };

  const handleEditProfile = () => {
    navigate(NAV.PROFILE_STACK.EDIT_PROFILE);
  };

  const handleSettings = () => {
    navigate(NAV.PROFILE_STACK.SETTINGS);
  };

  return {
    user,
    profile,
    avatarUrl,
    coverUrl,
    handlePickAvatar,
    handlePickCover,
    logout,
    handleEditProfile,
    handleSettings,
  };
};
