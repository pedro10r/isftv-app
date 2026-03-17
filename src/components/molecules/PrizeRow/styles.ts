import { StyleSheet } from "react-native";

import { theme, Colors } from "@theme";

const { spacing, radii, typography } = theme;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    placeBlock: {
      gap: spacing.s,
    },
    placeLabel: {
      fontSize: typography.fontSizes.caption,
      fontFamily: typography.fontFamily.medium,
      color: colors.textSecondary,
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    placeRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.m,
    },
    cashInput: {
      flex: 1,
      borderRadius: radii.m,
      paddingHorizontal: spacing.m,
      paddingVertical: spacing.s,
      fontSize: typography.fontSizes.body,
      backgroundColor: colors.input,
      color: colors.textPrimary,
    },
    fullWidth: {
      width: "100%",
    },
    toggleItem: {
      alignItems: "center",
      gap: spacing.xs,
    },
    toggleLabel: {
      fontSize: typography.fontSizes.caption,
      fontFamily: typography.fontFamily.regular,
      color: colors.textSecondary,
    },
  });
