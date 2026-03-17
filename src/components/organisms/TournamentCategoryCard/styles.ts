import { StyleSheet } from "react-native";

import { theme, Colors } from "@theme";

const { spacing, radii, typography } = theme;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    card: {
      borderRadius: radii.m,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: "hidden",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: spacing.m,
      paddingVertical: spacing.m,
      backgroundColor: colors.surface,
    },
    name: {
      fontSize: typography.fontSizes.regular,
      fontFamily: typography.fontFamily.medium,
      color: colors.textPrimary,
    },
    fee: {
      fontSize: typography.fontSizes.regular,
      fontFamily: typography.fontFamily.bold,
      color: colors.primary,
    },
    prizesContainer: {
      backgroundColor: colors.background,
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
      width: 36,
      height: 36,
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
