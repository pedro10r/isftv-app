import { ReactNode } from "react";
import { View, ViewStyle, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

import { theme } from "@theme";
import { styles } from "./styles";

interface ScreenTemplateProps {
  children: ReactNode;
  style?: ViewStyle;
  showBackButton?: boolean;
  onBack?: () => void;
}

export function ScreenTemplate({
  children,
  style,
  showBackButton,
  onBack,
}: ScreenTemplateProps) {
  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      {showBackButton && (
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={onBack}>
            <Feather
              name="arrow-left"
              size={24}
              color={theme.colors.textPrimary}
            />
          </Pressable>
        </View>
      )}
      <View style={[styles.content, style]}>{children}</View>
    </SafeAreaView>
  );
}
