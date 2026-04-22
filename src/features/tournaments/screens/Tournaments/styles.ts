import { StyleSheet } from "react-native";

import { theme, Colors } from "@theme";
import { TAB_BAR_OFFSET } from "@constants/layout";

const { spacing, typography } = theme;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
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
    addButton: {},
    filterList: {
      marginHorizontal: -spacing.l,
      flexGrow: 0,
      flexShrink: 0,
    },
    cardList: {
      flex: 1,
    },
    filterContent: {
      paddingHorizontal: spacing.l,
      paddingVertical: spacing.s,
      gap: spacing.xs,
    },
    listContent: {
      paddingTop: spacing.s,
      paddingBottom: TAB_BAR_OFFSET,
    },
    listContentEmpty: {
      flexGrow: 1,
    },
    separator: {
      height: spacing.m,
    },
  });
