import { useMemo } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

import { useAppTheme } from "@theme/ThemeContext";

import { createStyles } from "./styles";

interface OutlineButtonProps extends TouchableOpacityProps {
  label: string;
  onPress: () => void;
}

export function OutlineButton({ label, onPress, ...rest }: OutlineButtonProps) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.button}
      {...rest}
    >
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}
