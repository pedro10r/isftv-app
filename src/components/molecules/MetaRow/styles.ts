import { StyleSheet } from "react-native";

import { theme, Colors } from "@theme";

const { spacing, typography } = theme;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.s,
    },
    text: {
      fontSize: typography.fontSizes.regular,
      fontFamily: typography.fontFamily.regular,
      color: colors.textSecondary,
      flex: 1,
    },
  });
