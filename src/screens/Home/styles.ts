import { StyleSheet } from "react-native";

import { theme, Colors } from "@theme";

const { typography } = theme;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    text: {
      color: colors.textPrimary,
      fontSize: typography.fontSizes.h2,
    },
  });
