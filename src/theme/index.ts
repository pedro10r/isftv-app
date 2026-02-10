const colors = {
  primary: "#6200ee",
  primaryVariant: "#3700b3",
  secondary: "#03dac6",
  background: "#ffffff",
  surface: "#ffffff",
  error: "#b00020",
  textOnPrimary: "#ffffff",
  textOnBackground: "#000000",
  textHint: "#888888",
  border: "#dddddd",
  input: "#F4F4F9",
};

const spacing = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 40,
};

const radii = {
  s: 4,
  m: 8,
  l: 16,
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
