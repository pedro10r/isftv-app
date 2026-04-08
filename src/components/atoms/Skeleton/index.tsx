import { useEffect, useMemo } from "react";
import { DimensionValue, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

import { useAppTheme } from "@theme/ThemeContext";
import { theme } from "@theme";

import { createStyles } from "./styles";

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
  const styles = useMemo(
    () => createStyles(colors, borderRadius),
    [colors, borderRadius],
  );

  const translateX = useSharedValue(-1);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(1, { duration: 1600, easing: Easing.inOut(Easing.ease) }),
      -1,
      false,
    );
  }, []);

  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: `${translateX.value * 100}%` as any }],
  }));

  return (
    <View style={[styles.container, { width, height, borderRadius }]}>
      <Animated.View style={[styles.shimmer, shimmerStyle]}>
        <LinearGradient
          colors={["transparent", `${colors.textPrimary}18`, "transparent"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        />
      </Animated.View>
    </View>
  );
}
