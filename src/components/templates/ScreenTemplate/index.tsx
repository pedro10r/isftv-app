import { ReactNode } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { theme } from "@theme";

interface ScreenTemplateProps {
  children: ReactNode;
  style?: ViewStyle;
}

export function ScreenTemplate({ children, style }: ScreenTemplateProps) {
  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={[styles.content, style]}>{children}</View>
    </SafeAreaView>
  );
}

const { colors, spacing } = theme;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.l,
  },
});
