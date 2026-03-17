import { useMemo } from "react";
import { Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";

import { useAppTheme } from "@theme/ThemeContext";

import { createStyles } from "./styles";

interface MetaRowProps {
  icon: React.ComponentProps<typeof Feather>["name"];
  text: string;
}

export function MetaRow({ icon, text }: MetaRowProps) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.row}>
      <Feather name={icon} size={16} color={colors.textSecondary} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}
