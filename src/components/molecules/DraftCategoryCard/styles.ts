import { StyleSheet } from "react-native";

import { theme, Colors } from "@theme";

const { spacing, radii, typography } = theme;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    card: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: spacing.m,
      paddingVertical: spacing.m,
      borderRadius: radii.m,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
    },
    info: {
      gap: spacing.xs,
    },
    name: {
      fontSize: typography.fontSizes.regular,
      fontFamily: typography.fontFamily.medium,
      color: colors.textPrimary,
    },
    fee: {
      fontSize: typography.fontSizes.caption,
      fontFamily: typography.fontFamily.regular,
      color: colors.textSecondary,
    },
    trashButton: {
      padding: spacing.s,
    },
  });
