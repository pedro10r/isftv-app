import { useProfileNavigation } from "@navigation/appNavigation";
import { useThemeStore } from "@store/themeStore";

export const useSettings = () => {
  const { goBack } = useProfileNavigation();
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const setIsDarkMode = useThemeStore((state) => state.setIsDarkMode);

  const handleToggleDarkMode = (value: boolean) => {
    setIsDarkMode(value);
  };

  return {
    isDarkMode,
    handleToggleDarkMode,
    goBack,
  };
};
