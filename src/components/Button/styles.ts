import { theme } from "@theme";
import { StyleSheet } from "react-native";

const { colors, spacing, radii, typography } = theme;

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    borderRadius: radii.m,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    color: colors.textOnPrimary,
    fontFamily: typography.fontFamily.medium,
  },
});
