import { StyleSheet } from "react-native";

import { Colors } from "@theme";

export const GAP = 1;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background,
    },
    item: {
      padding: GAP / 2,
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
      paddingVertical: 32,
    },
  });
