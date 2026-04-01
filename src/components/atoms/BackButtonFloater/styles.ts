import { StyleSheet } from "react-native";

import { Colors, theme } from "@theme";

const { spacing } = theme;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    button: {
      position: "absolute",
      top: spacing.xxl + spacing.s,
      left: spacing.m,
      zIndex: 10,
    },
    inner: {
      width: spacing.xxl,
      height: spacing.xxl,
      borderRadius: spacing.xxl / 2,
      backgroundColor: colors.overlay,
      alignItems: "center",
      justifyContent: "center",
    },
  });
