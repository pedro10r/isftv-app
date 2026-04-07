import { StyleSheet } from "react-native";
import { theme, Colors } from "@theme";
import { TAB_BAR_OFFSET } from "@constants/layout";

const { spacing, typography, radii } = theme;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    flexContainer: {
      flex: 1,
    },
    container: {
      flex: 1,
      justifyContent: "center",
      gap: spacing.l,
    },
    scrollContent: {
      paddingTop: spacing.xxl,
      paddingBottom: TAB_BAR_OFFSET,
      gap: spacing.l,
    },
    header: {
      alignItems: "center",
      marginBottom: spacing.xxl,
      gap: spacing.s,
    },
    title: {
      fontSize: typography.fontSizes.h1,
      fontFamily: typography.fontFamily.medium,
      color: colors.textPrimary,
    },
    subtitle: {
      fontSize: typography.fontSizes.caption,
      fontFamily: typography.fontFamily.light,
      color: colors.textSecondary,
      textAlign: "center",
    },
    row: {
      flexDirection: "row",
      gap: spacing.m,
    },
    ufContainer: {
      width: spacing.xxl * 2.2,
    },
    label: {
      fontSize: typography.fontSizes.caption,
      fontFamily: typography.fontFamily.light,
      color: colors.textPrimary,
      marginBottom: spacing.s,
    },
    readOnlyInput: {
      borderRadius: radii.m,
      paddingHorizontal: spacing.m,
      paddingVertical: spacing.m,
      backgroundColor: colors.input,
      opacity: 0.7,
    },
    readOnlyText: {
      fontSize: typography.fontSizes.body,
      color: colors.textSecondary,
    },
    footer: {
      paddingTop: spacing.m,
    },
  });
