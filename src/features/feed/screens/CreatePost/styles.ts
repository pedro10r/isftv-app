import { StyleSheet } from "react-native";

import { theme, Colors } from "@theme";

const { spacing, typography, radii } = theme;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: spacing.m,
    },
    cancelButton: {
      fontSize: typography.fontSizes.body,
      fontFamily: typography.fontFamily.regular,
      color: colors.textSecondary,
    },
    headerTitle: {
      flex: 1,
      textAlign: "center",
      fontSize: typography.fontSizes.body,
      fontFamily: typography.fontFamily.medium,
      color: colors.textPrimary,
    },
    publishButton: {
      fontSize: typography.fontSizes.body,
      fontFamily: typography.fontFamily.bold,
      color: colors.primary,
    },
    publishButtonDisabled: {
      opacity: 0.35,
    },
    scroll: {
      flex: 1,
    },
    textArea: {
      minHeight: 150,
      paddingTop: spacing.s,
      fontSize: typography.fontSizes.body,
      fontFamily: typography.fontFamily.regular,
      color: colors.textPrimary,
      marginBottom: spacing.l,
    },
    mediaPreview: {
      aspectRatio: 4 / 5,
      borderRadius: radii.m,
      overflow: "hidden",
    },
    previewImage: {
      width: "100%",
      height: "100%",
    },
    videoOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0,0,0,0.35)",
      alignItems: "center",
      justifyContent: "center",
    },
    removeMedia: {
      position: "absolute",
      top: spacing.s,
      right: spacing.s,
      backgroundColor: "rgba(0,0,0,0.6)",
      borderRadius: 12,
      padding: spacing.xs,
    },
    toolbar: {
      flexDirection: "row",
      paddingVertical: spacing.m,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
  });
