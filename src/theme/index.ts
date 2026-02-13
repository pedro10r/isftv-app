const colors = {
  primary: "#6200ee",
  primaryDark: "#3700b3",
  secondary: "#03dac6",
  error: "#b00020",
  background: "#ffffff",
  surface: "#ffffff",
  surfaceDark: "#1C1C1E",
  surfaceDarkVariant: "#3A3A3C",
  input: "#F4F4F9",
  border: "#dddddd",
  textPrimary: "#000000",
  textSecondary: "#888888",
  white: "#ffffff",
  black: "#000000",
};

const spacing = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 40,
};

const radii = {
  s: 4,
  m: 8,
  l: 16,
  xl: 24,
};

const typography = {
  fontSizes: {
    h1: 32,
    h2: 24,
    h3: 20,
    body: 16,
    regular: 14,
    caption: 12,
  },
  fontFamily: {
    regular: "Inter_400Regular",
    bold: "Inter_700Bold",
    medium: "Inter_500Medium",
    light: "Inter_300Light",
  },
};

export const theme = {
  colors,
  spacing,
  radii,
  typography,
};

export type AppTheme = typeof theme;
