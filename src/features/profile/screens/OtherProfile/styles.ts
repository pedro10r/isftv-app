import { StyleSheet } from "react-native";

import { Colors } from "@theme";

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
    },
  });
