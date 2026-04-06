import { StyleSheet } from "react-native";

import { theme, Colors } from "@theme";

const { spacing, radii, typography } = theme;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    scrollContent: {
      paddingTop: spacing.m,
      paddingBottom: spacing.xxl,
      gap: spacing.m,
    },
    posterContainer: {
      width: "100%",
      aspectRatio: 16 / 9,
      borderRadius: radii.l,
      borderWidth: 1.5,
      borderStyle: "dashed",
      borderColor: colors.border,
      backgroundColor: colors.surface,
      alignItems: "center",
      justifyContent: "center",
      gap: spacing.s,
      overflow: "hidden",
    },
    posterImage: {
      ...StyleSheet.absoluteFillObject,
      borderRadius: radii.s,
    },
    posterText: {
      fontSize: typography.fontSizes.regular,
      fontFamily: typography.fontFamily.medium,
      color: colors.textSecondary,
    },
    dateRow: {
      flexDirection: "row",
      gap: spacing.m,
    },
    dateField: {
      flex: 1,
    },
    cityRow: {
      flexDirection: "row",
      gap: spacing.m,
    },
    cityField: {
      flex: 3,
    },
    stateField: {
      flex: 1,
    },
  });
