import { StyleSheet } from "react-native";
import { theme } from "@theme";

const { colors, typography } = theme;

export const styles = StyleSheet.create({
  buttonText: {
    color: colors.primary,
    fontFamily: typography.fontFamily.regular,
  },
});
