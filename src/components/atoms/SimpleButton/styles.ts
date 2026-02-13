import { StyleSheet } from "react-native";
import { theme } from "@theme";

const { colors, typography } = theme;

export const styles = StyleSheet.create({
  decoration: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.primary,
    paddingBottom: 1.5,
  },
  buttonText: {
    color: colors.primary,
    fontFamily: typography.fontFamily.regular,
  },
});
