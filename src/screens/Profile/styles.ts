import { StyleSheet } from "react-native";
import { theme, Colors } from "@theme";

const { spacing } = theme;

const TAB_BAR_OFFSET = 96;

export const createStyles = (_colors: Colors) =>
  StyleSheet.create({
    scrollContent: {
      paddingBottom: TAB_BAR_OFFSET,
      gap: spacing.l,
    },
  });
