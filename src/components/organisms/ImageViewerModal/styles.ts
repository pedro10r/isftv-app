import { StyleSheet } from "react-native";

import { Colors, theme } from "@theme";

const { spacing } = theme;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: "center",
      alignItems: "center",
    },
    closeButton: {
      position: "absolute",
      zIndex: 10,
      right: spacing.m,
      padding: spacing.s,
    },
    closeIcon: {
      color: colors.textPrimary,
    },
  });
