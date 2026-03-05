import { StyleSheet } from "react-native";
import { Colors, theme } from "@theme";

const { spacing, radii, typography } = theme;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    pill: {
      borderRadius: radii.xl,
      paddingHorizontal: spacing.m,
      paddingVertical: spacing.s,
      alignItems: "center",
      justifyContent: "center",
    },
    active: {
      backgroundColor: colors.primary,
    },
    inactive: {
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: colors.border,
    },
    activeLabel: {
      fontSize: typography.fontSizes.regular,
      fontFamily: typography.fontFamily.medium,
      color: colors.white,
    },
    inactiveLabel: {
      fontSize: typography.fontSizes.regular,
      fontFamily: typography.fontFamily.regular,
      color: colors.textSecondary,
    },
  });
