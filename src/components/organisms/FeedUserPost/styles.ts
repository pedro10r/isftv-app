import { StyleSheet } from "react-native";

import { theme, Colors } from "@theme";

const AVATAR_SIZE = 48;

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
      width: AVATAR_SIZE,
      height: AVATAR_SIZE,
      borderRadius: radii.xl,
      backgroundColor: colors.border,
    },
    avatarInitials: {
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.surfaceDarkVariant,
    },
    avatarInitialsText: {
      fontSize: typography.fontSizes.regular,
      fontFamily: typography.fontFamily.bold,
      color: colors.textPrimary,
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
      marginTop: spacing.xs,
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
      backgroundColor: colors.overlay,
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
