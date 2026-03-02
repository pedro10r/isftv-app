import { StyleSheet } from "react-native";
import { theme } from "@theme";

const { colors, spacing, radii, typography } = theme;

export const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  fieldName: {
    marginBottom: spacing.s,
    fontSize: typography.fontSizes.caption,
    fontFamily: typography.fontFamily.light,
    color: colors.textPrimary,
  },
  inputWrapper: {
    width: "100%",
    position: "relative",
  },
  input: {
    borderRadius: radii.m,
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.m,
    fontSize: typography.fontSizes.body,
    backgroundColor: colors.input,
    color: colors.textPrimary,
  },
  inputWithToggle: {
    paddingRight: spacing.xxl + spacing.s,
  },
  inputError: {
    borderColor: colors.error,
    borderWidth: 0.5,
  },
  toggleButton: {
    position: "absolute",
    right: spacing.m,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    paddingVertical: spacing.m,
  },
  errorText: {
    color: colors.error,
    marginTop: spacing.s,
    fontSize: typography.fontSizes.caption,
    fontFamily: typography.fontFamily.regular,
  },
});
