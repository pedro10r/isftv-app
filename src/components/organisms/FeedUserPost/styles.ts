import { StyleSheet } from "react-native";

import { theme, Colors } from "@theme";

const { spacing, typography, radii } = theme;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.surface,
      paddingHorizontal: spacing.m,
      paddingVertical: spacing.m,
      borderRadius: radii.m,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: spacing.s,
    },
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: colors.border,
    },
    authorInfo: {
      marginLeft: spacing.s,
      flex: 1,
    },
    authorName: {
      fontSize: typography.fontSizes.regular,
      fontFamily: typography.fontFamily.bold,
      color: colors.textPrimary,
    },
    timeAgo: {
      fontSize: typography.fontSizes.caption,
      fontFamily: typography.fontFamily.regular,
      color: colors.textSecondary,
      marginTop: 2,
    },
    content: {
      fontSize: typography.fontSizes.body,
      fontFamily: typography.fontFamily.regular,
      color: colors.textPrimary,
      lineHeight: typography.fontSizes.body * 1.5,
      marginBottom: spacing.s,
    },
    mediaWrapper: {
      width: "100%",
      aspectRatio: 4 / 5,
      borderRadius: radii.m,
      overflow: "hidden",
      marginBottom: spacing.s,
    },
    media: {
      width: "100%",
      height: "100%",
    },
    playOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0,0,0,0.35)",
      alignItems: "center",
      justifyContent: "center",
    },
    footer: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.l,
      paddingTop: spacing.xs,
    },
    actionButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.xs,
    },
    actionCount: {
      fontSize: typography.fontSizes.regular,
      fontFamily: typography.fontFamily.regular,
      color: colors.textSecondary,
    },
  });
