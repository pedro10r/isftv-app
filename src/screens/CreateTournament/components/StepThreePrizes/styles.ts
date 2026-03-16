import { StyleSheet } from "react-native";

import { theme, Colors } from "@theme";

const { spacing, radii, typography } = theme;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    scrollContent: {
      paddingTop: spacing.m,
      paddingBottom: spacing.xxl,
      gap: spacing.m,
    },
    description: {
      fontSize: typography.fontSizes.regular,
      fontFamily: typography.fontFamily.regular,
      color: colors.textSecondary,
    },
    card: {
      borderRadius: radii.m,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: "hidden",
    },
    cardHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: spacing.m,
      paddingVertical: spacing.m,
      backgroundColor: colors.surface,
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
      paddingTop: spacing.s,
      paddingBottom: spacing.m,
      gap: spacing.m,
      backgroundColor: colors.background,
    },
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
    toggleGroup: {
      flexDirection: "row",
      gap: spacing.m,
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
    divider: {
      height: 1,
      backgroundColor: colors.border,
    },
    emptyState: {
      fontSize: typography.fontSizes.regular,
      fontFamily: typography.fontFamily.regular,
      color: colors.textSecondary,
      fontStyle: "italic",
      textAlign: "center",
      marginTop: spacing.xl,
    },
  });
