import { Text, TouchableOpacity, View } from "react-native";
import { theme } from "@theme";

import { styles } from "./styles";

interface SimpleButtonProps {
  label: string;
  onPress: () => void;
  size?: "small" | "medium";
}

export function SimpleButton({
  label,
  onPress,
  size = "medium",
}: SimpleButtonProps) {
  const { typography } = theme;

  const styleFontSizeButton = {
    fontSize:
      size === "small"
        ? typography.fontSizes.caption
        : typography.fontSizes.regular,
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
      <View style={styles.decoration}>
        <Text style={[styles.buttonText, styleFontSizeButton]}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}
