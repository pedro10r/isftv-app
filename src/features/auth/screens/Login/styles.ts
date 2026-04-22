import { theme, Colors } from "@theme";
import { StyleSheet } from "react-native";

const { typography, spacing, radii } = theme;

// Compensates for the absence of the back button header.
const HEADER_DISTANCE = spacing.xxl + spacing.l + spacing.m * 2;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    flexContainer: {
      flex: 1,
    },
    container: {
      paddingTop: HEADER_DISTANCE,
      gap: spacing.l,
    },
    header: {
      alignItems: "center",
      marginBottom: spacing.xxl,
      gap: spacing.s,
    },
    title: {
      fontSize: typography.fontSizes.h1,
      fontFamily: typography.fontFamily.medium,
      color: colors.textPrimary,
    },
    subtitle: {
      fontSize: typography.fontSizes.caption,
      fontFamily: typography.fontFamily.light,
      color: colors.textSecondary,
    },
    text: {
      color: colors.textPrimary,
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
      color: colors.white,
      fontFamily: typography.fontFamily.medium,
    },
    footer: {
      gap: spacing.m,
      paddingTop: spacing.m,
      alignItems: "center",
    },
    footerLink: {
      flexDirection: "row",
      justifyContent: "center",
      gap: spacing.xs,
    },
    biometricIcon: {
      marginRight: spacing.s,
    },
    biometricRow: {
      borderTopWidth: 1,
      borderColor: colors.border,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: spacing.m,
      marginTop: spacing.m,
    },
    biometricLabel: {
      fontSize: typography.fontSizes.regular,
      fontFamily: typography.fontFamily.light,
      color: colors.textPrimary,
      flex: 1,
    },
    signUpButtonText: {
      color: colors.primary,
      fontFamily: typography.fontFamily.regular,
    },
  });
