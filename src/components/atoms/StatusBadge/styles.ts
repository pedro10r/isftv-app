import { StyleSheet } from "react-native";
import { Colors, theme } from "@theme";

const { spacing, radii, typography } = theme;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    badge: {
      alignSelf: "flex-start",
      borderRadius: radii.xl,
      paddingHorizontal: spacing.s,
      paddingVertical: spacing.xs,
    },
    label: {
      fontSize: typography.fontSizes.caption,
      fontFamily: typography.fontFamily.medium,
    },
  });
