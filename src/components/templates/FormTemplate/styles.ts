import { StyleSheet } from "react-native";
import { theme } from "@theme";

const { colors, spacing } = theme;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.l,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.m,
  },
});
