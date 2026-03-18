import { StyleSheet } from "react-native";

import { theme, Colors } from "@theme";

const { spacing, radii, typography } = theme;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    button: {
      flex: 1,
      paddingVertical: spacing.s,
      borderRadius: radii.m,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: colors.textPrimary,
      backgroundColor: "transparent",
    },
    label: {
      fontSize: typography.fontSizes.regular,
      fontFamily: typography.fontFamily.medium,
      color: colors.textPrimary,
    },
  });
