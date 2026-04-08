import { useEffect, useState } from "react";
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

const ANIMATION_DURATION = 250;

export function usePickerAnimation(visible: boolean) {
  const [mounted, setMounted] = useState(visible);
  const overlayOpacity = useSharedValue(0);
  const contentTranslateY = useSharedValue(300);

  useEffect(() => {
    const config = {
      duration: ANIMATION_DURATION,
      easing: Easing.out(Easing.ease),
    };

    if (!visible) {
      overlayOpacity.value = withTiming(0, config);
      contentTranslateY.value = withTiming(300, config);

      const timer = setTimeout(() => setMounted(false), ANIMATION_DURATION);
      return () => clearTimeout(timer);
    }

    setMounted(true);

    overlayOpacity.value = withTiming(1, config);
    contentTranslateY.value = withTiming(0, config);
  }, [visible]);

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }));

  const contentStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: contentTranslateY.value }],
  }));

  return { overlayStyle, contentStyle, mounted };
}
