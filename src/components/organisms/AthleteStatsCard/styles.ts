import { StyleSheet } from "react-native";
import { theme } from "@theme";

const { colors, spacing, radii, typography } = theme;

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: spacing.m,
  },
  statCard: {
    width: "47%",
    backgroundColor: colors.surfaceDarkVariant,
    borderRadius: radii.l,
    padding: spacing.m,
    alignItems: "center",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    marginBottom: spacing.s,
  },
  value: {
    fontSize: 18,
    fontFamily: typography.fontFamily.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  label: {
    fontSize: typography.fontSizes.caption,
    fontFamily: typography.fontFamily.medium,
    color: colors.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});
