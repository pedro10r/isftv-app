import { StyleSheet } from "react-native";

import { theme, Colors } from "@theme";

const { spacing, typography } = theme;

const TAB_BAR_OFFSET = 96;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: spacing.m,
    },
    title: {
      fontSize: typography.fontSizes.h1,
      fontFamily: typography.fontFamily.bold,
      color: colors.textPrimary,
    },
    addButton: {
      padding: spacing.s,
    },
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
    separator: {
      height: spacing.m,
    },
    emptyState: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingTop: spacing.xxl,
      gap: spacing.m,
    },
    emptyText: {
      fontSize: typography.fontSizes.body,
      fontFamily: typography.fontFamily.regular,
      color: colors.textSecondary,
      textAlign: "center",
      lineHeight: 24,
    },
  });
