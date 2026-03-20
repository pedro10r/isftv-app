import { StyleSheet } from "react-native";

import { theme, Colors } from "@theme";

const { spacing, radii, typography } = theme;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    card: {
      flexDirection: "column",
      gap: spacing.m,
      paddingHorizontal: spacing.m,
      paddingVertical: spacing.s + spacing.xs,
      borderRadius: radii.l,
      backgroundColor: colors.surface,
    },
    name: {
      fontSize: typography.fontSizes.body,
      fontFamily: typography.fontFamily.medium,
      color: colors.textPrimary,
    },
    bottomRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    pill: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.surfaceDarkVariant,
      borderRadius: radii.m,
      paddingHorizontal: spacing.m,
      paddingVertical: spacing.s,
      gap: radii.xl + radii.m,
    },
    pillGroup: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.xs,
    },
    pillInput: {
      backgroundColor: "transparent",
      color: colors.textPrimary,
      fontFamily: typography.fontFamily.regular,
      fontSize: typography.fontSizes.regular,
      textAlign: "center",
    },
    dateInput: {
      width: 90, // fixed component dimension — no theme token for this specific layout width
    },
    timeInput: {
      width: 55, // fixed component dimension — no theme token for this specific layout width
    },
    trashButton: {
      padding: spacing.xs,
    },
  });
