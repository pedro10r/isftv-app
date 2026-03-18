import { StyleSheet } from "react-native";

import { theme } from "@theme";

const { spacing, radii, typography } = theme;

export const createStyles = (color: string) =>
  StyleSheet.create({
    button: {
      flex: 1,
      paddingVertical: spacing.s,
      borderRadius: radii.m,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: color,
      backgroundColor: "transparent",
    },
    label: {
      fontSize: typography.fontSizes.regular,
      fontFamily: typography.fontFamily.medium,
      color,
    },
  });
