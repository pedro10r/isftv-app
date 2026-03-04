import { StyleSheet } from "react-native";

import { theme, Colors } from "@theme";

const { typography } = theme;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    buttonText: {
      color: colors.primary,
      fontFamily: typography.fontFamily.regular,
    },
  });
