import { StyleSheet } from "react-native";
import { theme, Colors } from "@theme";

const { spacing } = theme;

export const createStyles = (_colors: Colors) =>
  StyleSheet.create({
    scrollContent: {
      paddingBottom: spacing.xxl,
      gap: spacing.l,
    },
  });
