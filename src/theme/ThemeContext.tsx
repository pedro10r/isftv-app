import { createContext, useContext, ReactNode } from "react";

import { theme, Colors } from "./";
import { useThemeStore } from "@store/themeStore";

interface ThemeContextValue {
  colors: Colors;
  spacing: typeof theme.spacing;
  radii: typeof theme.radii;
  typography: typeof theme.typography;
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const colors = isDarkMode ? theme.darkColors : theme.lightColors;

  return (
    <ThemeContext.Provider
      value={{
        colors,
        spacing: theme.spacing,
        radii: theme.radii,
        typography: theme.typography,
        isDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useAppTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useAppTheme must be used within ThemeProvider");
  return ctx;
};
