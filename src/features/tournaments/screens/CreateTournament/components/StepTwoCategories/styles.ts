import { StyleSheet } from "react-native";

import { theme, Colors } from "@theme";

const { spacing, radii, typography } = theme;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    scrollContent: {
      paddingTop: spacing.m,
      paddingBottom: spacing.xxl,
      gap: spacing.l,
    },
    section: {
      gap: spacing.m,
    },
    sectionTitle: {
      fontSize: typography.fontSizes.regular,
      fontFamily: typography.fontFamily.medium,
      color: colors.textPrimary,
    },
    feeInput: {
      borderRadius: radii.m,
      paddingHorizontal: spacing.m,
      paddingVertical: spacing.m,
      fontSize: typography.fontSizes.body,
      backgroundColor: colors.input,
      color: colors.textPrimary,
    },
    chipsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: spacing.s,
    },
    customRow: {
      flexDirection: "row",
      gap: spacing.s,
      alignItems: "flex-start",
    },
    customInput: {
      flex: 1,
      borderRadius: radii.m,
      paddingHorizontal: spacing.m,
      paddingVertical: spacing.m,
      fontSize: typography.fontSizes.body,
      backgroundColor: colors.input,
      color: colors.textPrimary,
    },
    addButton: {
      paddingHorizontal: spacing.m,
      paddingVertical: spacing.m,
      borderRadius: radii.m,
      borderWidth: 1,
      borderColor: colors.primary,
      alignItems: "center",
      justifyContent: "center",
    },
    addButtonLabel: {
      fontSize: typography.fontSizes.regular,
      fontFamily: typography.fontFamily.medium,
      color: colors.primary,
    },
    emptyState: {
      fontSize: typography.fontSizes.regular,
      fontFamily: typography.fontFamily.regular,
      color: colors.textSecondary,
      fontStyle: "italic",
    },
  });
