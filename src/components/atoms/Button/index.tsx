import { useMemo } from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

import { useAppTheme } from "@theme/ThemeContext";
import { createStyles } from "./styles";

interface ButtonProps extends TouchableOpacityProps {
  onPress: () => void;
  label: string;
  loading?: boolean;
  theme?: "primary" | "secondary";
}

export function Button({
  onPress,
  label,
  loading = false,
  theme = "primary",
  ...rest
}: ButtonProps) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const variants = {
    primary: colors.primary,
    secondary: colors.secondary,
  };

  const buttonStyles = [
    styles.container,
    { backgroundColor: variants[theme], opacity: loading ? 0.5 : 1 },
  ];

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      style={buttonStyles}
      disabled={loading}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator size="small" color={colors.surface} />
      ) : (
        <Text style={styles.label}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}
