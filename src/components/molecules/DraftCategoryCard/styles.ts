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
      paddingVertical: spacing.s + spacing.xs,
      borderRadius: radii.l,
      backgroundColor: colors.surface,
    },
    name: {
      flex: 1,
      fontSize: typography.fontSizes.regular,
      fontFamily: typography.fontFamily.medium,
      color: colors.textPrimary,
    },
    controls: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.m,
    },
    timeInput: {
      width: 65, // fixed component dimension
      height: 36, // fixed component dimension
      borderRadius: radii.m,
      paddingHorizontal: spacing.xs,
      fontSize: typography.fontSizes.regular,
      fontFamily: typography.fontFamily.regular,
      backgroundColor: colors.surfaceDarkVariant,
      color: colors.textPrimary,
      textAlign: "center",
    },
    trashButton: {
      padding: spacing.xs,
    },
  });
