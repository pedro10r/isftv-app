import { useState } from "react";

import { useProfileNavigation } from "@navigation/appNavigation";
import { NAV } from "@navigation/routes";
import { useAuthStore } from "@store/authStore";
import { useProfileStore } from "@store/profileStore";

export const useProfile = () => {
  const { navigate } = useProfileNavigation();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const profile = useProfileStore();

  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);

  const handleAvatarChange = (uri: string) => {
    setAvatarUrl(uri);
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
    handleAvatarChange,
    logout,
    handleEditProfile,
    handleSettings,
  };
};
