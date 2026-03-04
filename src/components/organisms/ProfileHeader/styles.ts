import { StyleSheet } from "react-native";
import { theme, Colors } from "@theme";

const { spacing, radii, typography } = theme;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
    },
    avatarContainer: {
      width: 110,
      height: 110,
      position: "relative",
    },
    avatar: {
      width: 110,
      height: 110,
      borderRadius: 55,
      backgroundColor: colors.surfaceDarkVariant,
    },
    avatarPlaceholder: {
      width: 110,
      height: 110,
      borderRadius: 55,
      backgroundColor: colors.surfaceDarkVariant,
      justifyContent: "center",
      alignItems: "center",
    },
    avatarInitials: {
      fontSize: typography.fontSizes.h1,
      fontFamily: typography.fontFamily.bold,
      color: colors.textPrimary,
    },
    editButton: {
      position: "absolute",
      bottom: 0,
      right: 0,
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: colors.primary,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 3,
      borderColor: colors.background,
    },
    name: {
      fontSize: 22,
      fontFamily: typography.fontFamily.bold,
      color: colors.textPrimary,
      marginTop: spacing.m,
    },
    username: {
      fontSize: typography.fontSizes.body,
      fontFamily: typography.fontFamily.regular,
      color: colors.textSecondary,
      marginTop: spacing.xs,
    },
    positionBadge: {
      marginTop: spacing.m,
      paddingHorizontal: spacing.m,
      paddingVertical: spacing.s,
      borderRadius: radii.xl,
      backgroundColor: colors.primary + "20",
    },
    positionText: {
      fontSize: typography.fontSizes.regular,
      fontFamily: typography.fontFamily.medium,
      color: colors.primary,
    },
  });
