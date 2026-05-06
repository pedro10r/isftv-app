import { useMemo } from "react";
import { Modal, Pressable, useWindowDimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import Feather from "@expo/vector-icons/Feather";

import { useAppTheme } from "@theme/ThemeContext";

import { strings } from "./strings";
import { createStyles } from "./styles";

interface ImageViewerModalProps {
  visible: boolean;
  imageUrl: string | undefined;
  onClose: () => void;
  circular?: boolean;
}

export function ImageViewerModal({
  visible,
  imageUrl,
  onClose,
  circular = false,
}: ImageViewerModalProps) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const scale = useSharedValue(1);

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = Math.max(1, e.scale);
    })
    .onEnd(() => {
      scale.value = withSpring(1, { damping: 20 });
    });

  const imageSize = circular ? Math.min(width, height) * 0.85 : undefined;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <GestureHandlerRootView style={styles.backdrop}>
        <Pressable
          style={[styles.closeButton, { top: insets.top + 8 }]}
          onPress={onClose}
          accessibilityLabel={strings.accessibility.close}
          hitSlop={8}
        >
          <Feather name="x" size={24} color={colors.textPrimary} />
        </Pressable>

        <GestureDetector gesture={pinchGesture}>
          <Animated.View
            style={[
              circular
                ? {
                    width: imageSize,
                    height: imageSize,
                    borderRadius: imageSize! / 2,
                    overflow: "hidden",
                  }
                : { width, height },
              animatedStyle,
            ]}
          >
            <Image
              source={{ uri: imageUrl }}
              style={{ width: imageSize ?? width, height: imageSize ?? height }}
              contentFit="cover"
            />
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    </Modal>
  );
}
