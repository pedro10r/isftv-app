import { Dimensions } from "react-native";
import * as Haptics from "expo-haptics";
import { Gesture } from "react-native-gesture-handler";
import {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  type SharedValue,
} from "react-native-reanimated";

const SCREEN_WIDTH = Dimensions.get("window").width;
const TIMING = { duration: 250, easing: Easing.out(Easing.cubic) };

interface UseSwipeToDeleteOptions {
  onDelete: () => void;
  /** Width of the revealed action button. Default: 80 */
  actionWidth?: number;
  /** Screen width ratio that triggers haptic and auto-delete on release. Default: 0.65 */
  thresholdRatio?: number;
}

interface UseSwipeToDeleteReturn {
  gesture: ReturnType<typeof Gesture.Pan>;
  animatedStyle: ReturnType<typeof useAnimatedStyle>;
  /** translateX SharedValue — use it to animate a custom delete action */
  translateX: SharedValue<number>;
}

export function useSwipeToDelete({
  onDelete,
  actionWidth = 80,
  thresholdRatio = 0.65,
}: UseSwipeToDeleteOptions): UseSwipeToDeleteReturn {
  const translateX = useSharedValue(0);
  const startX = useSharedValue(0);
  const hapticFired = useSharedValue(false);
  const deleteThreshold = SCREEN_WIDTH * thresholdRatio;

  const triggerHaptic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const gesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .failOffsetY([-10, 10])
    .onBegin(() => {
      startX.value = translateX.value;
    })
    .onUpdate((e) => {
      translateX.value = Math.min(0, startX.value + e.translationX);

      if (-translateX.value >= deleteThreshold && !hapticFired.value) {
        hapticFired.value = true;
        runOnJS(triggerHaptic)();
      } else if (-translateX.value < deleteThreshold) {
        hapticFired.value = false;
      }
    })
    .onEnd((e) => {
      const currentX = startX.value + e.translationX;
      const pastThreshold = currentX < -deleteThreshold;
      const shouldOpen =
        !pastThreshold && (currentX < -actionWidth / 2 || e.velocityX < -500);

      if (pastThreshold) return runOnJS(onDelete)();

      translateX.value = withTiming(shouldOpen ? -actionWidth : 0, TIMING);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return { gesture, animatedStyle, translateX };
}
