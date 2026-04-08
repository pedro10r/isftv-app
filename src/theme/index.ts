const darkColors = {
  primary: "#445cfc",
  primaryDark: "#2a3eb1",
  secondary: "#03dac6",
  error: "#ed4956",
  purple: "#9c27b0",

  background: "#101414",
  surface: "#161b1e",
  surfaceDark: "#1c2225",
  surfaceDarkVariant: "#2a3135",

  input: "#161b1e",
  border: "#363636",
  placeholder: "#5c666f",

  textPrimary: "#f5f5f5",
  textSecondary: "#a8a8a8",

  success: "#34C759",
  warning: "#FF9500",
  switchTrackOff: "#3a3a3c",
  overlay: "rgba(0,0,0,0.5)",
  overlayLight: "rgba(0,0,0,0.3)",

  tabBarBackground: "#1c2225",
  tabBarIndicator: "#2a3135",

  prizeGold: "#FFD700",
  prizeSilver: "#C0C0C0",
  prizeBronze: "#CD7F32",

  white: "#ffffff",
  black: "#000000",
  whatsapp_green: "#25D366",
};

const lightColors = {
  primary: "#445cfc",
  primaryDark: "#2a3eb1",
  secondary: "#03dac6",
  error: "#ed4956",
  purple: "#9c27b0",

  background: "#f2f2f7",
  surface: "#ffffff",
  surfaceDark: "#e5e5ea",
  surfaceDarkVariant: "#e5e5ea",

  input: "#ffffff",
  border: "#c6c6c8",
  placeholder: "#8e8e93",

  textPrimary: "#000000",
  textSecondary: "#6c6c70",

  success: "#34C759",
  warning: "#FF9500",
  switchTrackOff: "#e5e5ea",
  overlay: "rgba(0,0,0,0.5)",
  overlayLight: "rgba(0,0,0,0.3)",

  tabBarBackground: "#ffffff",
  tabBarIndicator: "#e5e5ea",

  prizeGold: "#FFD700",
  prizeSilver: "#C0C0C0",
  prizeBronze: "#CD7F32",

  white: "#ffffff",
  black: "#000000",
  whatsapp_green: "#25D366",
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

export type Colors = typeof darkColors;

export const theme = {
  darkColors,
  lightColors,
  spacing,
  radii,
  typography,
};
