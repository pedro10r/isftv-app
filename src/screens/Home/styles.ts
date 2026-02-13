import { StyleSheet } from "react-native";
import { theme } from "@theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.fontSizes.h2,
  },
});
