import { theme } from "@theme";
import { StyleSheet } from "react-native";

const { colors, radii, typography } = theme;

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 54,
    borderRadius: radii.m,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    color: colors.white,
    fontFamily: typography.fontFamily.medium,
  },
});
