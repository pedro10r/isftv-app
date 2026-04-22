import { StyleSheet } from "react-native";

import { theme, Colors } from "@theme";

const { spacing, typography } = theme;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    scrollContent: {
      paddingTop: spacing.m,
      paddingBottom: spacing.xxl,
      gap: spacing.m,
    },
    description: {
      fontSize: typography.fontSizes.regular,
      fontFamily: typography.fontFamily.regular,
      color: colors.textSecondary,
    },

  });
