import { StyleSheet } from "react-native";

import { Colors, theme } from "@theme";

const { spacing, typography } = theme;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      paddingTop: spacing.xxl,
      gap: spacing.m,
    },
    message: {
      fontSize: typography.fontSizes.body,
      fontFamily: typography.fontFamily.regular,
      color: colors.textSecondary,
      textAlign: "center",
      lineHeight: 24,
    },
  });
