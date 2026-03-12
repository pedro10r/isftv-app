import { StyleSheet } from "react-native";

import { theme, Colors } from "@theme";

const { spacing, radii, typography } = theme;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    keyboardView: {
      flex: 1,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: spacing.m,
    },
    title: {
      flex: 1,
      textAlign: "center",
      fontSize: typography.fontSizes.body,
      fontFamily: typography.fontFamily.medium,
      color: colors.textPrimary,
    },
    headerSpacer: {
      width: 40,
    },
    scrollContent: {
      flexGrow: 1,
      paddingTop: spacing.m,
      paddingBottom: spacing.xxl,
      gap: spacing.l,
    },
    posterContainer: {
      width: "100%",
      aspectRatio: 16 / 9,
      borderRadius: radii.l,
      borderWidth: 1.5,
      borderStyle: "dashed",
      borderColor: colors.border,
      backgroundColor: colors.surface,
      alignItems: "center",
      justifyContent: "center",
      gap: spacing.s,
      overflow: "hidden",
    },
    posterImage: {
      ...StyleSheet.absoluteFillObject,
      borderRadius: radii.l,
    },
    posterText: {
      fontSize: typography.fontSizes.regular,
      fontFamily: typography.fontFamily.medium,
      color: colors.textSecondary,
    },
    section: {
      gap: spacing.m,
    },
    sectionTitle: {
      fontSize: typography.fontSizes.body,
      fontFamily: typography.fontFamily.medium,
      color: colors.textPrimary,
    },
    row: {
      flexDirection: "row",
      gap: spacing.m,
    },
    rowItem: {
      flex: 1,
    },
    chipsRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: spacing.s,
    },
    chip: {
      paddingHorizontal: spacing.m,
      paddingVertical: spacing.s,
      borderRadius: radii.xl,
      borderWidth: 1,
      borderColor: colors.border,
    },
    chipActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    chipLabel: {
      fontSize: typography.fontSizes.regular,
      fontFamily: typography.fontFamily.medium,
      color: colors.textSecondary,
    },
    chipLabelActive: {
      color: colors.white,
    },
    categoriesError: {
      fontSize: typography.fontSizes.regular,
      fontFamily: typography.fontFamily.regular,
      color: colors.error,
      marginTop: -spacing.xs,
    },
    prizeGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: spacing.m,
    },
    prizeItem: {
      flex: 1,
      minWidth: "45%",
    },
    footer: {
      paddingTop: spacing.m,
      backgroundColor: colors.background,
    },
  });
