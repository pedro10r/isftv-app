import { useMemo } from "react";
import { Text, TouchableOpacity } from "react-native";

import { theme } from "@theme";
import { useAppTheme } from "@theme/ThemeContext";
import { createStyles } from "./styles";

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
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const { typography } = theme;

  const styleFontSizeButton = {
    fontSize:
      size === "small"
        ? typography.fontSizes.caption
        : typography.fontSizes.regular,
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
      <Text style={[styles.buttonText, styleFontSizeButton]}>{label}</Text>
    </TouchableOpacity>
  );
}
