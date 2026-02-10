import { theme } from "@theme";
import { StyleSheet } from "react-native";

const { colors, typography, spacing, radii } = theme;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    gap: spacing.l,
  },
  header: {
    alignItems: "center",
    marginBottom: spacing.xl,
    gap: spacing.s,
  },
  title: {
    fontSize: typography.fontSizes.h1,
    fontFamily: typography.fontFamily.medium,
  },
  subtitle: {
    fontSize: typography.fontSizes.caption,
    fontFamily: typography.fontFamily.light,
    color: colors.textHint,
  },
  text: {
    color: colors.textOnBackground,
    fontFamily: typography.fontFamily.light,
  },
  inputContainer: {
    width: "100%",
    gap: spacing.m,
  },
  forgetPasswordButtonContainer: {
    alignSelf: "flex-end",
  },
  forgetPasswordButtonText: {
    color: colors.primary,
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSizes.caption,
  },
  decoration: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.primary,
    paddingBottom: 1.5,
  },
  buttonContainer: {
    width: "100%",
    marginTop: spacing.s,
  },
  button: {
    width: "100%",
    padding: spacing.m,
    borderRadius: radii.m,
    backgroundColor: colors.primary,
    alignItems: "center",
  },
  buttonText: {
    color: colors.textOnPrimary,
    fontFamily: typography.fontFamily.medium,
  },
  footer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: spacing.xs,
    marginBottom: spacing.l,
  },
  biometryButtonContainer: {
    width: "100%",
    alignItems: "center",
  },
  signUpButton: {},
  biometryButtonText: {
    color: colors.primary,
    fontFamily: typography.fontFamily.regular,
  },
  signUpButtonText: {
    color: colors.primary,
    fontFamily: typography.fontFamily.regular,
  },
});
