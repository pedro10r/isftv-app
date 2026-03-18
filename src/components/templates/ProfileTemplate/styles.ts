import { StyleSheet } from "react-native";

import { theme, Colors } from "@theme";
import { TAB_BAR_OFFSET } from "@constants/layout";

const { spacing, typography } = theme;

const COVER_HEIGHT = 180;
const AVATAR_SIZE = spacing.xxl * 2;
const AVATAR_BORDER = spacing.xs / 2;
const FLOAT_BUTTON_SIZE = spacing.xl;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      paddingBottom: TAB_BAR_OFFSET,
    },
    coverWrapper: {
      position: "relative",
    },
    coverImage: {
      width: "100%",
      height: COVER_HEIGHT,
      backgroundColor: colors.border,
    },
    coverActionButton: {
      position: "absolute",
      bottom: spacing.m,
      right: spacing.m,
      width: FLOAT_BUTTON_SIZE,
      height: FLOAT_BUTTON_SIZE,
      borderRadius: FLOAT_BUTTON_SIZE / 2,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.surface,
      elevation: 2,
    },
    avatarWrapper: {
      alignItems: "center",
      marginTop: -(AVATAR_SIZE / 2),
      marginBottom: spacing.s,
    },
    avatarRelative: {
      width: AVATAR_SIZE,
      height: AVATAR_SIZE,
      position: "relative",
    },
    avatarOuter: {
      width: AVATAR_SIZE,
      height: AVATAR_SIZE,
      borderRadius: 999,
      borderWidth: AVATAR_BORDER,
      borderColor: colors.background,
      backgroundColor: colors.surface,
      overflow: "hidden",
    },
    avatarImage: {
      width: "100%",
      height: "100%",
    },
    avatarInitials: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    avatarInitialsText: {
      fontSize: typography.fontSizes.h2,
      fontFamily: typography.fontFamily.bold,
      color: colors.textPrimary,
    },
    avatarEditButton: {
      position: "absolute",
      bottom: 0,
      right: -spacing.xs,
      width: FLOAT_BUTTON_SIZE,
      height: FLOAT_BUTTON_SIZE,
      borderRadius: FLOAT_BUTTON_SIZE / 2,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.textPrimary,
      elevation: 2,
    },
    profileInfoContainer: {
      alignItems: "center",
      paddingHorizontal: spacing.l,
      gap: spacing.xs,
      marginBottom: spacing.m,
    },
    profileName: {
      fontSize: typography.fontSizes.h2,
      fontFamily: typography.fontFamily.bold,
      color: colors.textPrimary,
    },
    profileUsername: {
      fontSize: typography.fontSizes.regular,
      fontFamily: typography.fontFamily.regular,
      color: colors.textSecondary,
    },
    profileBio: {
      marginTop: spacing.s,
      fontSize: typography.fontSizes.body,
      fontFamily: typography.fontFamily.regular,
      color: colors.textSecondary,
      textAlign: "center",
      lineHeight: spacing.l,
    },
    actionsRow: {
      flexDirection: "row",
      gap: spacing.s,
      paddingHorizontal: spacing.m,
      marginTop: spacing.m,
      marginBottom: spacing.l,
    },
    sectionContainer: {
      paddingHorizontal: spacing.m,
      marginTop: spacing.s,
    },
    sectionTitle: {
      fontSize: typography.fontSizes.h3,
      fontFamily: typography.fontFamily.bold,
      color: colors.textPrimary,
      marginBottom: spacing.m,
    },
    emptyStateWrapper: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: spacing.xl,
    },
  });
