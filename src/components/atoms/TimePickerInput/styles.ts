import { StyleSheet } from "react-native";
import { theme, Colors } from "@theme";

const { spacing, radii, typography } = theme;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    fieldName: {
      marginBottom: spacing.s,
      fontSize: typography.fontSizes.caption,
      fontFamily: typography.fontFamily.light,
      color: colors.textPrimary,
    },
    inputWrapper: {
      width: "100%",
    },
    input: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderRadius: radii.m,
      paddingHorizontal: spacing.m,
      paddingVertical: spacing.m,
      backgroundColor: colors.input,
    },
    inputCompact: {
      paddingVertical: spacing.xs,
      gap: spacing.s,
    },
    inputError: {
      borderColor: colors.error,
      borderWidth: 0.5,
    },
    valueText: {
      fontSize: typography.fontSizes.body,
      color: colors.textPrimary,
    },
    placeholderText: {
      fontSize: typography.fontSizes.body,
      color: colors.placeholder,
    },
    errorText: {
      color: colors.error,
      marginTop: spacing.s,
      fontSize: typography.fontSizes.caption,
      fontFamily: typography.fontFamily.regular,
    },
    modalOverlay: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: colors.overlay,
    },
    modalContent: {
      backgroundColor: colors.surfaceDark,
      borderTopLeftRadius: radii.xl,
      borderTopRightRadius: radii.xl,
      paddingBottom: spacing.xl,
    },
    modalHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: spacing.l,
      paddingVertical: spacing.m,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
    },
    modalCancel: {
      fontSize: typography.fontSizes.body,
      fontFamily: typography.fontFamily.medium,
      color: colors.textSecondary,
    },
    modalConfirm: {
      fontSize: typography.fontSizes.body,
      fontFamily: typography.fontFamily.medium,
      color: colors.primary,
    },
    picker: {
      width: "100%",
    },
  });
