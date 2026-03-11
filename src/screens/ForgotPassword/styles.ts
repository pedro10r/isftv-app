import { StyleSheet } from "react-native";
import { theme, Colors } from "@theme";

const { spacing, typography } = theme;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    flexContainer: {
      flex: 1,
    },
    container: {
      paddingTop: spacing.xxl,
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
      textAlign: "center",
    },
    inputContainer: {
      width: "100%",
      gap: spacing.m,
    },
    buttonContainer: {
      width: "100%",
      marginTop: spacing.m,
    },
    footer: {
      gap: spacing.m,
      paddingTop: spacing.m,
    },
    footerLink: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: spacing.xs,
    },
    text: {
      color: colors.textPrimary,
      fontFamily: typography.fontFamily.light,
    },
  });
