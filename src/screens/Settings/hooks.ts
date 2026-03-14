import { useProfileNavigation } from "@navigation/appNavigation";
import { useAuthStore } from "@store/authStore";
import { useThemeStore } from "@store/themeStore";

export const useSettings = () => {
  const { goBack } = useProfileNavigation();
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const setIsDarkMode = useThemeStore((state) => state.setIsDarkMode);
  const signOut = useAuthStore((state) => state.signOut);

  const handleToggleDarkMode = (value: boolean) => {
    setIsDarkMode(value);
  };

  const handleLogout = async () => {
    await signOut();
  };

  return {
    isDarkMode,
    handleToggleDarkMode,
    handleLogout,
    goBack,
  };
};
