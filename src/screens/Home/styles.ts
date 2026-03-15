import { StyleSheet } from "react-native";

import { theme, Colors } from "@theme";

const { spacing, typography } = theme;

const TAB_BAR_OFFSET = 96;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    flexContainer: {
      flex: 1,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginVertical: spacing.m,
    },
    title: {
      fontSize: typography.fontSizes.h1,
      fontFamily: typography.fontFamily.bold,
      color: colors.textPrimary,
    },
    separator: {
      marginVertical: spacing.s,
    },
    listContent: {
      paddingBottom: TAB_BAR_OFFSET + spacing.m,
    },
    listContentEmpty: {
      flexGrow: 1,
    },
    footerPage: {
      paddingVertical: spacing.m,
    },
  });
