import { StyleSheet } from "react-native";
import { theme, Colors } from "@theme";

const { spacing, typography } = theme;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    menuItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: spacing.m,
      paddingHorizontal: spacing.m,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    leftContent: {
      flexDirection: "row",
      alignItems: "center",
    },
    icon: {
      marginRight: spacing.m,
    },
    title: {
      fontSize: 16,
      fontFamily: typography.fontFamily.medium,
      color: colors.textPrimary,
    },
    destructive: {
      color: colors.error,
    },
  });
