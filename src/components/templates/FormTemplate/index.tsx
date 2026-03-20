import { ReactNode, useMemo } from "react";
import { KeyboardAvoidingView, Platform, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

import { useAppTheme } from "@theme/ThemeContext";
import { createStyles } from "./styles";

interface FormTemplateProps {
  children: ReactNode;
  showBackButton?: boolean;
  onBack?: () => void;
}

export function FormTemplate({
  children,
  showBackButton,
  onBack,
}: FormTemplateProps) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {showBackButton && (
          <View style={styles.header}>
            <Pressable onPress={onBack}>
              <Feather name="arrow-left" size={24} color={colors.textPrimary} />
            </Pressable>
          </View>
        )}
        {children}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
