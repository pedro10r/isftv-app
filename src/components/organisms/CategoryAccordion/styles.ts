import { StyleSheet } from "react-native";

import { theme, Colors } from "@theme";

const { spacing, radii, typography } = theme;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    card: {
      borderRadius: radii.l,
      backgroundColor: colors.surface,
      overflow: "hidden",
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 6,
      elevation: 3,
    },
    cardHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: spacing.m,
      paddingVertical: spacing.m,
    },
    cardHeaderActive: {
      backgroundColor: colors.surfaceDark,
    },
    cardHeaderName: {
      fontSize: typography.fontSizes.regular,
      fontFamily: typography.fontFamily.medium,
      color: colors.textPrimary,
    },
    cardBody: {
      paddingHorizontal: spacing.m,
      paddingBottom: spacing.xs,
      backgroundColor: colors.surface,
    },
    animatedBody: {
      overflow: "hidden",
    },
    absoluteFullWidth: {
      position: "absolute",
      width: "100%",
      top: 0,
    },
    divider: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: colors.border,
    },
  });
