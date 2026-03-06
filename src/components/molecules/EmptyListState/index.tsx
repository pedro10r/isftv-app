import { useMemo } from "react";
import { Text, View } from "react-native";

import Feather from "@expo/vector-icons/Feather";

import { useAppTheme } from "@theme/ThemeContext";

import { createStyles } from "./styles";

interface EmptyListStateProps {
  icon: React.ComponentProps<typeof Feather>["name"];
  message: string;
}

export function EmptyListState({ icon, message }: EmptyListStateProps) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      <Feather name={icon} size={48} color={colors.textSecondary} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}
