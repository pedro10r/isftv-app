import { StyleSheet } from "react-native";

import { theme, Colors } from "@theme";

const { spacing, radii, typography } = theme;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    card: {
      flexDirection: "row",
      marginHorizontal: spacing.m,
      paddingVertical: spacing.m,
      paddingHorizontal: spacing.l,
      borderRadius: radii.l,
      backgroundColor: colors.surface,
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: spacing.xs / 2 },
      shadowOpacity: 0.1,
      shadowRadius: radii.s,
      elevation: spacing.xs,
    },
    item: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: spacing.xs,
    },
    itemWithBorder: {
      borderRightWidth: StyleSheet.hairlineWidth,
      borderRightColor: colors.border,
    },
    value: {
      fontSize: typography.fontSizes.h3,
      fontFamily: typography.fontFamily.bold,
      color: colors.textPrimary,
    },
    label: {
      fontSize: typography.fontSizes.caption,
      fontFamily: typography.fontFamily.regular,
      color: colors.textSecondary,
    },
  });
