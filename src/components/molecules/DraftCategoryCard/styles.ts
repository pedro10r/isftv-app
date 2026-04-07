import { StyleSheet } from "react-native";

import { theme, Colors } from "@theme";

const { spacing, radii, typography } = theme;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    swipeContainer: {
      position: "relative",
    },
    card: {
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
      justifyContent: "space-evenly",
      backgroundColor: colors.surfaceDarkVariant,
      borderRadius: radii.m,
      paddingVertical: spacing.s,
    },
    pillGroup: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.xs,
    },
  });
