import { useEffect } from "react";
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from "react-native-reanimated";

import { useAppTheme } from "@theme/ThemeContext";
import { ANIMATION_DURATION, THUMB_OFFSET, THUMB_ON_X } from "./styles";

export const useSwitch = (value: boolean) => {
  const { colors } = useAppTheme();
  const progress = useSharedValue(value ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(value ? 1 : 0, {
      duration: ANIMATION_DURATION,
    });
  }, [value, progress]);

  const animatedTrack = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [colors.switchTrackOff, colors.success],
    ),
  }));

  const animatedThumb = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withTiming(value ? THUMB_ON_X : THUMB_OFFSET, {
          duration: ANIMATION_DURATION,
        }),
      },
    ],
  }));

  return { animatedTrack, animatedThumb };
};
