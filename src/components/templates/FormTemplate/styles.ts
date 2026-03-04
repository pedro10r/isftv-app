import { StyleSheet } from "react-native";

import { theme, Colors } from "@theme";

const { spacing } = theme;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: spacing.l,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: spacing.m,
    },
  });
