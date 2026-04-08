import { StyleSheet } from "react-native";

import { theme, Colors } from "@theme";

const { spacing } = theme;

const AVATAR_SIZE = spacing.xxl * 2.3;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    avatarWrapper: {
      paddingHorizontal: spacing.m,
      marginTop: -(AVATAR_SIZE / 2),
      marginBottom: spacing.s,
    },
    infoContainer: {
      paddingHorizontal: spacing.m,
      gap: spacing.s,
      marginBottom: spacing.m,
    },
    pillsRow: {
      flexDirection: "row",
      gap: spacing.s,
      paddingHorizontal: spacing.m,
      marginBottom: spacing.s,
    },
    actionsRow: {
      flexDirection: "row",
      gap: spacing.s,
      paddingHorizontal: spacing.m,
      marginTop: spacing.m,
      marginBottom: spacing.l,
    },
    mediaGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: spacing.xs,
      paddingHorizontal: spacing.m,
      marginTop: spacing.s,
    },
  });
