import { DarkTheme, DefaultTheme } from "@react-navigation/native";

import { theme, Colors } from "./";

export const createNavTheme = (isDarkMode: boolean, colors: Colors) => ({
  ...(isDarkMode ? DarkTheme : DefaultTheme),
  colors: {
    ...(isDarkMode ? DarkTheme.colors : DefaultTheme.colors),
    primary: colors.primary,
    background: colors.background,
    card: colors.surface,
    text: colors.textPrimary,
    border: colors.border,
    notification: theme.darkColors.error,
  },
});
