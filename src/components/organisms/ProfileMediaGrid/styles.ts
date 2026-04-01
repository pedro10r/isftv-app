import { StyleSheet } from "react-native";

import { Colors, theme } from "@theme";

const { spacing } = theme;

export const GAP = 1;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      gap: GAP,
    },
    image: {
      width: "100%",
      height: "100%",
    },
    videoOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0,0,0,0.25)",
      alignItems: "center",
      justifyContent: "center",
    },
    emptyWrapper: {
      paddingVertical: spacing.xl,
    },
    skeletonContainer: {
      gap: 2,
      flexDirection: "row",
      flexWrap: "wrap",
    },
  });
