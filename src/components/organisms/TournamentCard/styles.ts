import { StyleSheet } from "react-native";
import { Colors, theme } from "@theme";

const { spacing, radii, typography } = theme;

const IMAGE_HEIGHT = 180;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.surface,
      borderRadius: radii.l,
      overflow: "hidden",
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
      elevation: 4,
    },
    imageWrapper: {
      position: "relative",
    },
    image: {
      width: "100%",
      height: IMAGE_HEIGHT,
    },
    imagePlaceholder: {
      backgroundColor: colors.surfaceDark,
      alignItems: "center",
      justifyContent: "center",
    },
    badgeWrapper: {
      position: "absolute",
      top: spacing.s,
      right: spacing.s,
    },
    body: {
      padding: spacing.m,
      gap: spacing.xs,
    },
    title: {
      fontSize: typography.fontSizes.h3,
      fontFamily: typography.fontFamily.bold,
      color: colors.textPrimary,
      marginBottom: spacing.xs,
    },
    infoRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.xs,
    },
    infoText: {
      fontSize: typography.fontSizes.regular,
      fontFamily: typography.fontFamily.regular,
      color: colors.textSecondary,
      flexShrink: 1,
    },
    footer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: spacing.xs,
      paddingHorizontal: spacing.m,
      paddingBottom: spacing.m,
    },
    categoryTag: {
      backgroundColor: colors.surfaceDarkVariant,
      borderRadius: radii.m,
      paddingHorizontal: spacing.s,
      paddingVertical: 2,
    },
    categoryLabel: {
      fontSize: typography.fontSizes.caption,
      fontFamily: typography.fontFamily.regular,
      color: colors.textSecondary,
    },
  });
