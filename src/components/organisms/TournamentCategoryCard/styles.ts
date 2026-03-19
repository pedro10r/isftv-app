import { StyleSheet } from "react-native";

import { theme, Colors } from "@theme";

const { spacing, radii, typography } = theme;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    card: {
      borderRadius: radii.l,
      backgroundColor: colors.surface,
      overflow: "hidden",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: spacing.m,
    },
    name: {
      flex: 1,
      fontSize: typography.fontSizes.regular,
      fontFamily: typography.fontFamily.medium,
      color: colors.textPrimary,
    },
    timePill: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.xs,
      backgroundColor: colors.surfaceDarkVariant,
      paddingHorizontal: spacing.s,
      paddingVertical: spacing.xs,
      borderRadius: radii.xl,
    },
    timeText: {
      fontSize: typography.fontSizes.caption,
      fontFamily: typography.fontFamily.medium,
      color: colors.textSecondary,
    },
    prizesContainer: {
      backgroundColor: colors.surfaceDark,
    },
    prizeRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: spacing.m,
      paddingVertical: spacing.m,
      gap: spacing.m,
    },
    prizeRowBorder: {
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors.border,
    },
    prizeIconWrapper: {
      width: spacing.xl + spacing.xs,
      height: spacing.xl + spacing.xs,
      borderRadius: 18,
      alignItems: "center",
      justifyContent: "center",
    },
    prizePlaceText: {
      flex: 1,
      fontSize: typography.fontSizes.regular,
      fontFamily: typography.fontFamily.medium,
      color: colors.textPrimary,
    },
    prizeValueText: {
      fontSize: typography.fontSizes.body,
      fontFamily: typography.fontFamily.bold,
      color: colors.textPrimary,
    },
  });
