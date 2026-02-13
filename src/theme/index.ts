const colors = {
  primary: "#445cfc",
  primaryDark: "#2a3eb1",
  secondary: "#03dac6",
  error: "#ed4956",

  background: "#101414",
  surface: "#161b1e",
  surfaceDark: "#1c2225",
  surfaceDarkVariant: "#2a3135",

  input: "#161b1e",
  border: "#363636",
  placeholder: "#5c666f",

  textPrimary: "#f5f5f5",
  textSecondary: "#a8a8a8",

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
