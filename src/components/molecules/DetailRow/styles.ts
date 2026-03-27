import { StyleSheet } from "react-native";

import { theme, Colors } from "@theme";

const { spacing, typography } = theme;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      paddingVertical: spacing.m,
      gap: spacing.xs,
    },
    label: {
      fontSize: typography.fontSizes.caption,
      fontFamily: typography.fontFamily.medium,
      color: colors.textSecondary,
      textTransform: "uppercase",
      letterSpacing: 0.6,
    },
    value: {
      fontSize: typography.fontSizes.body,
      fontFamily: typography.fontFamily.regular,
      color: colors.textPrimary,
      lineHeight: typography.fontSizes.body * 1.5,
    },
  });
