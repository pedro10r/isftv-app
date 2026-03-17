import { StyleSheet } from "react-native";

import { theme, Colors } from "@theme";

const { spacing, radii, typography } = theme;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    card: {
      borderRadius: radii.m,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: "hidden",
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 4,
      elevation: 2,
    },
    cardHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: spacing.m,
      paddingVertical: spacing.m,
      backgroundColor: colors.surface,
    },
    cardHeaderActive: {
      backgroundColor: colors.surfaceDark,
    },
    cardHeaderName: {
      fontSize: typography.fontSizes.regular,
      fontFamily: typography.fontFamily.medium,
      color: colors.textPrimary,
    },
    cardBody: {
      paddingHorizontal: spacing.m,
      paddingTop: spacing.s,
      paddingBottom: spacing.m,
      gap: spacing.m,
      backgroundColor: colors.background,
    },
    divider: {
      height: 1,
      backgroundColor: colors.border,
    },
  });
