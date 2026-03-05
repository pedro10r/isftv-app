import { useMemo } from "react";
import { Pressable, Text } from "react-native";

import { useAppTheme } from "@theme/ThemeContext";
import { createStyles } from "./styles";

interface FilterPillProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
}

export function FilterPill({ label, isActive, onPress }: FilterPillProps) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.pill,
        isActive ? styles.active : styles.inactive,
        pressed && { opacity: 0.7 },
      ]}
    >
      <Text style={isActive ? styles.activeLabel : styles.inactiveLabel}>
        {label}
      </Text>
    </Pressable>
  );
}
