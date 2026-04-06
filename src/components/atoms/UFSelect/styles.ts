import { StyleSheet } from "react-native";

import { theme, Colors } from "@theme";

const { spacing, radii, typography } = theme;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      width: "100%",
    },
    label: {
      marginBottom: spacing.s,
      fontSize: typography.fontSizes.caption,
      fontFamily: typography.fontFamily.light,
      color: colors.textPrimary,
    },
    selectButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderRadius: radii.m,
      paddingHorizontal: spacing.m,
      paddingVertical: spacing.m,
      backgroundColor: colors.input,
    },
    selectText: {
      fontSize: typography.fontSizes.body,
      color: colors.textPrimary,
    },
    placeholder: {
      color: colors.placeholder,
    },
    errorText: {
      marginTop: spacing.xs,
      fontSize: typography.fontSizes.caption,
      color: colors.error,
    },
    modal: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: colors.overlay,
    },
    modalContent: {
      backgroundColor: colors.surface,
      borderRadius: radii.l,
      alignSelf: "flex-end",
      marginRight: spacing.xl,
      width: 100,
      overflow: "hidden",
      maxHeight: 550,
    },
    option: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: spacing.m,
      paddingVertical: spacing.m,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    optionText: {
      fontSize: typography.fontSizes.body,
      color: colors.textPrimary,
    },
    optionSelected: {
      color: colors.primary,
      fontFamily: typography.fontFamily.bold,
    },
  });
