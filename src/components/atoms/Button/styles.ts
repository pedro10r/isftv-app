import { theme, Colors } from "@theme";
import { StyleSheet } from "react-native";

const { radii, typography } = theme;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      width: "100%",
      height: 50,
      borderRadius: radii.m,
      alignItems: "center",
      justifyContent: "center",
    },
    label: {
      color: colors.white,
      fontFamily: typography.fontFamily.medium,
    },
  });
