import { StyleSheet } from "react-native";

import { theme, Colors } from "@theme";

const { spacing, radii, typography } = theme;

export const HERO_HEIGHT = 300;
export const FOOTER_HEIGHT = 88;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      paddingBottom: FOOTER_HEIGHT + spacing.m,
    },
    heroImage: {
      width: "100%",
      height: HERO_HEIGHT,
    },
    backButton: {
      position: "absolute",
      top: 50,
      left: spacing.m,
      zIndex: 10,
    },
    backButtonInner: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.overlay,
      alignItems: "center",
      justifyContent: "center",
    },
    body: {
      paddingHorizontal: spacing.m,
      paddingTop: spacing.l,
      gap: spacing.l,
    },
    statusRow: {
      flexDirection: "row",
    },
    titleText: {
      fontSize: typography.fontSizes.h2,
      fontFamily: typography.fontFamily.bold,
      color: colors.textPrimary,
      lineHeight: typography.fontSizes.h2 * 1.25,
    },
    metaGroup: {
      gap: spacing.s,
    },
    metaRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.s,
    },
    metaText: {
      fontSize: typography.fontSizes.regular,
      fontFamily: typography.fontFamily.regular,
      color: colors.textSecondary,
      flex: 1,
    },
    section: {
      gap: spacing.m,
    },
    sectionTitle: {
      fontSize: typography.fontSizes.body,
      fontFamily: typography.fontFamily.medium,
      color: colors.textPrimary,
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
      borderColor: colors.primary,
      backgroundColor: `${colors.primary}1A`,
    },
    chipLabel: {
      fontSize: typography.fontSizes.regular,
      fontFamily: typography.fontFamily.medium,
      color: colors.primary,
    },
    prizeCard: {
      backgroundColor: colors.surface,
      borderRadius: radii.l,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: `${colors.primary}22`,
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
    footer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: FOOTER_HEIGHT,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: spacing.m,
      backgroundColor: colors.surface,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors.border,
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.12,
      shadowRadius: 12,
      elevation: 8,
    },
    feeLabel: {
      fontSize: typography.fontSizes.caption,
      fontFamily: typography.fontFamily.regular,
      color: colors.textSecondary,
      marginBottom: 2,
    },
    feeValue: {
      fontSize: typography.fontSizes.h3,
      fontFamily: typography.fontFamily.bold,
      color: colors.textPrimary,
    },
    enrollButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: spacing.l,
      paddingVertical: spacing.m,
      borderRadius: radii.xl,
      alignItems: "center",
      justifyContent: "center",
    },
    enrollButtonText: {
      fontSize: typography.fontSizes.body,
      fontFamily: typography.fontFamily.bold,
      color: colors.white,
    },
    centered: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: spacing.m,
    },
    errorText: {
      fontSize: typography.fontSizes.regular,
      fontFamily: typography.fontFamily.regular,
      color: colors.textSecondary,
      textAlign: "center",
    },
    retryButton: {
      paddingHorizontal: spacing.l,
      paddingVertical: spacing.s,
      borderRadius: radii.xl,
      borderWidth: 1,
      borderColor: colors.border,
    },
    retryButtonText: {
      fontSize: typography.fontSizes.regular,
      fontFamily: typography.fontFamily.medium,
      color: colors.textPrimary,
    },
    heroPlaceholder: {
      backgroundColor: colors.surface,
    },
    categoryCard: {
      borderRadius: radii.m,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: "hidden",
    },
    categoryHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: spacing.m,
      paddingVertical: spacing.m,
      backgroundColor: colors.surface,
    },
    categoryName: {
      fontSize: typography.fontSizes.regular,
      fontFamily: typography.fontFamily.medium,
      color: colors.textPrimary,
    },
    categoryFee: {
      fontSize: typography.fontSizes.regular,
      fontFamily: typography.fontFamily.bold,
      color: colors.primary,
    },
    prizesContainer: {
      backgroundColor: colors.background,
    },
    contactButton: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: spacing.s,
      backgroundColor: colors.primary,
      paddingVertical: spacing.m,
      borderRadius: radii.xl,
    },
    contactButtonText: {
      fontSize: typography.fontSizes.body,
      fontFamily: typography.fontFamily.bold,
      color: colors.white,
    },
  });
