import { useMemo } from "react";
import { Pressable, StyleProp, View, ViewStyle } from "react-native";
import Feather from "@expo/vector-icons/Feather";

import { useAppTheme } from "@theme/ThemeContext";

import { createStyles } from "./styles";

interface BackButtonFloaterProps {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export function BackButtonFloater({ onPress, style }: BackButtonFloaterProps) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <Pressable onPress={onPress} style={[styles.button, style]}>
      <View style={styles.inner}>
        <Feather name="chevron-left" size={24} color={colors.white} />
      </View>
    </Pressable>
  );
}
