import { useMemo } from "react";
import { Pressable } from "react-native";
import Animated from "react-native-reanimated";

import { useAppTheme } from "@theme/ThemeContext";
import { useSwitch } from "./hooks";
import { createStyles } from "./styles";

interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export function Switch({ value, onValueChange }: SwitchProps) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { animatedTrack, animatedThumb } = useSwitch(value);

  return (
    <Pressable onPress={() => onValueChange(!value)} hitSlop={8}>
      <Animated.View style={[styles.track, animatedTrack]}>
        <Animated.View style={[styles.thumb, animatedThumb]} />
      </Animated.View>
    </Pressable>
  );
}
