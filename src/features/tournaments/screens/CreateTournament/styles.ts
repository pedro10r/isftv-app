import { StyleSheet } from "react-native";

import { theme, Colors } from "@theme";

const { spacing, radii, typography } = theme;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: spacing.m,
    },
    backButton: {
      width: spacing.xxl,
      alignItems: "flex-start",
    },
    headerCenter: {
      flex: 1,
      alignItems: "center",
      gap: spacing.xs,
    },
    headerTitle: {
      fontSize: typography.fontSizes.body,
      fontFamily: typography.fontFamily.medium,
      color: colors.textPrimary,
    },
    stepIndicator: {
      fontSize: typography.fontSizes.caption,
      fontFamily: typography.fontFamily.regular,
      color: colors.textSecondary,
    },
    progressTrack: {
      height: spacing.xs,
      backgroundColor: colors.border,
      borderRadius: radii.s,
      marginBottom: spacing.m,
      overflow: "hidden",
    },
    progressFill: {
      height: "100%",
      backgroundColor: colors.primary,
      borderRadius: radii.s,
    },
    content: {
      flex: 1,
    },
    contentContainer: {
      // flexGrow: 1,
      // paddingBottom: 120,
    },
    footer: {
      paddingTop: spacing.m,
      backgroundColor: colors.background,
    },
  });
