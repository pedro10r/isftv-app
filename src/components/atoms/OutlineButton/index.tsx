import { useMemo } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

import { useAppTheme } from "@theme/ThemeContext";

import { createStyles } from "./styles";

interface OutlineButtonProps extends TouchableOpacityProps {
  label: string;
  onPress: () => void;
  color?: string;
}

export function OutlineButton({
  label,
  onPress,
  color,
  style,
  ...rest
}: OutlineButtonProps) {
  const { colors } = useAppTheme();
  const resolvedColor = color ?? colors.textPrimary;
  const styles = useMemo(() => createStyles(resolvedColor), [resolvedColor]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.button, style]}
      {...rest}
    >
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}
