import { StyleSheet } from "react-native";

import { theme, Colors } from "@theme";

const { spacing, typography, radii } = theme;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    card: {
      marginHorizontal: spacing.m,
      backgroundColor: `${colors.primary}1A`,
      borderLeftWidth: 3,
      borderLeftColor: colors.primary,
      borderRadius: radii.m,
      padding: spacing.m,
      gap: spacing.s,
    },
    topRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.xs,
    },
    eyebrow: {
      fontSize: typography.fontSizes.caption,
      fontFamily: typography.fontFamily.medium,
      color: colors.primary,
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    title: {
      fontSize: typography.fontSizes.h3,
      fontFamily: typography.fontFamily.bold,
      color: colors.textPrimary,
      lineHeight: typography.fontSizes.h3 * 1.3,
    },
    message: {
      fontSize: typography.fontSizes.body,
      fontFamily: typography.fontFamily.regular,
      color: colors.textSecondary,
      lineHeight: typography.fontSizes.body * 1.5,
    },
    cta: {
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "flex-start",
      backgroundColor: colors.primary,
      borderRadius: radii.m,
      paddingHorizontal: spacing.m,
      paddingVertical: spacing.s,
      gap: spacing.xs,
      marginTop: spacing.xs,
    },
    ctaLabel: {
      fontSize: typography.fontSizes.regular,
      fontFamily: typography.fontFamily.medium,
      color: colors.white,
    },
  });
