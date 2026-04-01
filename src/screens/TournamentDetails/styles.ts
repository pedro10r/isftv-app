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
    error: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      gap: spacing.l,
    },
    scrollContent: {
      paddingBottom: FOOTER_HEIGHT + spacing.m,
    },
    heroImage: {
      width: "100%",
      height: HERO_HEIGHT,
    },
    heroPlaceholder: {
      backgroundColor: colors.surface,
    },
    body: {
      paddingHorizontal: spacing.m,
      paddingTop: spacing.l,
      gap: spacing.l,
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
    section: {
      gap: spacing.m,
    },
    sectionTitle: {
      fontSize: typography.fontSizes.body,
      fontFamily: typography.fontFamily.medium,
      color: colors.textPrimary,
    },
    descriptionText: {
      fontSize: typography.fontSizes.regular,
      fontFamily: typography.fontFamily.regular,
      color: colors.textSecondary,
      lineHeight: typography.fontSizes.regular * 1.6,
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
      marginHorizontal: spacing.xxl,
      paddingVertical: spacing.s,
      borderRadius: radii.xl,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: "center",
    },
    retryButtonText: {
      fontSize: typography.fontSizes.regular,
      fontFamily: typography.fontFamily.medium,
      color: colors.textPrimary,
    },
  });
