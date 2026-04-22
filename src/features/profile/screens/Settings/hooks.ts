import { useShallow } from "zustand/react/shallow";

import { useProfileNavigation } from "@navigation/appNavigation";
import { useAuthStore } from "@features/auth/store";
import { useThemeStore } from "@store/themeStore";

export const useSettings = () => {
  const { goBack } = useProfileNavigation();
  const { isDarkMode, setIsDarkMode } = useThemeStore(
    useShallow((state) => ({
      isDarkMode: state.isDarkMode,
      setIsDarkMode: state.setIsDarkMode,
    })),
  );
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
