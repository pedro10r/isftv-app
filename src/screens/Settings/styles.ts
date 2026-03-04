import { StyleSheet } from "react-native";

import { theme, Colors } from "@theme";

const { spacing, typography } = theme;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    scrollContent: {
      paddingBottom: spacing.xxl,
      gap: spacing.l,
    },
    section: {
      gap: spacing.s,
    },
    sectionTitle: {
      fontSize: typography.fontSizes.caption,
      fontFamily: typography.fontFamily.medium,
      color: colors.textSecondary,
      textTransform: "uppercase",
      letterSpacing: 0.5,
      paddingHorizontal: spacing.s,
    },
    card: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      overflow: "hidden",
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: spacing.m,
      paddingHorizontal: spacing.m,
    },
    rowLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.m,
      flex: 1,
    },
    iconContainer: {
      width: 32,
      height: 32,
      borderRadius: spacing.s,
      backgroundColor: colors.primary,
      alignItems: "center",
      justifyContent: "center",
    },
    rowLabel: {
      fontSize: typography.fontSizes.body,
      fontFamily: typography.fontFamily.medium,
      color: colors.textPrimary,
    },
  });
