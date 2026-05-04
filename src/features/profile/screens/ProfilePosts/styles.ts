import { StyleSheet } from "react-native";

import { Colors, theme } from "@theme";

const { spacing, typography } = theme;

const BACK_BUTTON_SIZE = spacing.xxl;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    contentContainer: {
      paddingHorizontal: spacing.m,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: spacing.s,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
    },
    backButton: {
      width: BACK_BUTTON_SIZE,
      height: BACK_BUTTON_SIZE,
      alignItems: "center",
      justifyContent: "center",
    },
    headerInfo: {
      flex: 1,
      alignItems: "center",
    },
    title: {
      fontSize: typography.fontSizes.body,
      fontFamily: typography.fontFamily.bold,
      color: colors.textPrimary,
    },
    username: {
      fontSize: typography.fontSizes.caption,
      fontFamily: typography.fontFamily.light,
      color: colors.textSecondary,
    },
    spacer: {
      width: BACK_BUTTON_SIZE,
    },
  });
