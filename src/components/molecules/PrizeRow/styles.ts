import { StyleSheet } from "react-native";

import { theme, Colors } from "@theme";

const { spacing, radii, typography } = theme;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    placeRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: spacing.m,
      gap: spacing.m,
    },
    placeLabel: {
      fontSize: typography.fontSizes.caption,
      fontFamily: typography.fontFamily.medium,
      color: colors.textSecondary,
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    cashInput: {
      flex: 1,
      height: spacing.xxl,
      borderRadius: radii.m,
      paddingHorizontal: spacing.m,
      fontSize: typography.fontSizes.regular,
      fontFamily: typography.fontFamily.regular,
      backgroundColor: colors.surfaceDark,
      color: colors.textPrimary,
      textAlign: "right",
    },
    toggleItem: {
      alignItems: "center",
      gap: spacing.xs,
    },
    toggleLabel: {
      color: colors.textSecondary,
      fontSize: typography.fontSizes.caption,
      fontFamily: typography.fontFamily.medium,
    },
  });
