import { StyleSheet } from "react-native";

import { theme, Colors } from "@theme";

const { spacing } = theme;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      flex: 1,
      paddingHorizontal: spacing.l,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: spacing.l,
      paddingVertical: spacing.m,
    },
    backButton: {
      padding: spacing.s,
      marginLeft: -spacing.s,
    },
  });
