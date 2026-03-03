import { StyleSheet } from "react-native";

import { theme } from "@theme";

const { colors, spacing } = theme;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.l,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.m,
  },
  backButton: {
    padding: spacing.s,
    marginLeft: -spacing.s,
  },
});
