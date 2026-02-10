import { theme } from "@theme";
import { StyleSheet } from "react-native";

const { colors, typography, spacing, radii } = theme;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.l,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    gap: spacing.l,
  },
  header: {
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: typography.fontSizes.h2,
    fontFamily: typography.fontFamily.medium,
    marginBottom: spacing.s,
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
  forgetPasswordButton: {
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
  biometryButton: {
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
