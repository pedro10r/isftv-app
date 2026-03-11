import { ReactNode, useMemo } from "react";
import { View, ViewStyle, Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

import { useAppTheme } from "@theme/ThemeContext";
import { createStyles } from "./styles";

interface ScreenTemplateProps {
  children: ReactNode;
  style?: ViewStyle;
  showBackButton?: boolean;
  onBack?: () => void;
  title?: string;
}

export function ScreenTemplate({
  children,
  style,
  showBackButton,
  onBack,
  title,
}: ScreenTemplateProps) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      {showBackButton && (
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={onBack}>
            <Feather
              name="arrow-left"
              size={24}
              color={colors.textPrimary}
            />
          </Pressable>
          {title && <Text style={styles.headerTitle}>{title}</Text>}
          {title && <View style={styles.headerSpacer} />}
        </View>
      )}
      <View style={[styles.content, style]}>{children}</View>
    </SafeAreaView>
  );
}
