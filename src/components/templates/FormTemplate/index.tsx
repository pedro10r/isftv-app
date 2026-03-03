import { ReactNode } from "react";
import {
  Keyboard,
  TouchableWithoutFeedback,
  View,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

import { theme } from "@theme";
import { styles } from "./styles";

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
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        {showBackButton && (
          <View style={styles.header}>
            <Pressable onPress={onBack}>
              <Feather
                name="arrow-left"
                size={24}
                color={theme.colors.textPrimary}
              />
            </Pressable>
          </View>
        )}
        {children}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
