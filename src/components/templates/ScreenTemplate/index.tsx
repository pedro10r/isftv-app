import { ReactNode } from "react";
import { View, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { styles } from "./styles";

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
