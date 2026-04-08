import { StyleSheet } from "react-native";

import { Colors } from "@theme";

export const createStyles = (colors: Colors, borderRadius: number) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.border,
      overflow: "hidden",
    },
    shimmer: {
      width: "100%",
      height: "100%",
    },
    gradient: {
      flex: 1,
    },
  });
