import { StyleSheet } from "react-native";

import { theme, Colors } from "@theme";

const { spacing, typography } = theme;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-between",
      alignItems: "center",
      padding: spacing.l,
      backgroundColor: colors.background,
    },
    content: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      gap: spacing.s,
    },
    title: {
      fontSize: typography.fontSizes.h3,
      fontFamily: typography.fontFamily.bold,
      color: colors.textPrimary,
      textAlign: "center",
    },
    message: {
      fontSize: typography.fontSizes.regular,
      fontFamily: typography.fontFamily.regular,
      color: colors.textSecondary,
      textAlign: "center",
    },
    footer: {
      paddingBottom: theme.spacing.s,
      width: "100%",
    },
  });
