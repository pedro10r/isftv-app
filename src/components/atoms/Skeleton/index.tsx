import { useEffect } from "react";
import { DimensionValue } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";

import { useAppTheme } from "@theme/ThemeContext";
import { theme } from "@theme";

interface SkeletonProps {
  width: DimensionValue;
  height: DimensionValue;
  borderRadius?: number;
}

export function Skeleton({
  width,
  height,
  borderRadius = theme.radii.s,
}: SkeletonProps) {
  const { colors } = useAppTheme();
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0.4, { duration: 800, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View
      style={[
        animatedStyle,
        { width, height, borderRadius, backgroundColor: colors.border },
      ]}
    />
  );
}
