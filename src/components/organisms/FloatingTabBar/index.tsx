import { useEffect, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector, Pressable } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

import { useAppTheme } from "@theme/ThemeContext";
import { createStyles, TAB_WIDTH } from "./styles";

type TabBarProps = any;

const FADE_CONFIG = {
  duration: 200,
};

const HIDE_TRANSLATE_Y = 100;

const TAB_ICONS: Record<string, { focused: string; unfocused: string }> = {
  HomeStack: {
    focused: "home",
    unfocused: "home-outline",
  },
  ChampionshipsStack: {
    focused: "trophy",
    unfocused: "trophy-outline",
  },
  ProfileStack: {
    focused: "person",
    unfocused: "person-outline",
  },
};

export function FloatingTabBar({
  state,
  descriptors,
  navigation,
}: TabBarProps) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const barOpacity = useSharedValue(1);

  const activeRoute = state.routes[state.index];
  const isInChildScreen = (activeRoute.state?.index ?? 0) > 0;

  useEffect(() => {
    translateX.value = withTiming(state.index * TAB_WIDTH, FADE_CONFIG);
  }, [state.index, translateX]);

  useEffect(() => {
    translateY.value = withTiming(isInChildScreen ? HIDE_TRANSLATE_Y : 0, FADE_CONFIG);
    barOpacity.value = withTiming(isInChildScreen ? 0 : 1, FADE_CONFIG);
  }, [isInChildScreen, translateY, barOpacity]);

  const animatedIndicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: barOpacity.value,
  }));

  const swipeGesture = Gesture.Pan()
    .activeOffsetX([-20, 20])
    .failOffsetY([-15, 15])
    .runOnJS(true)
    .onEnd((event) => {
      const SWIPE_THRESHOLD = 50;
      if (event.translationX < -SWIPE_THRESHOLD) {
        const nextIndex = Math.min(state.index + 1, state.routes.length - 1);
        navigation.navigate(state.routes[nextIndex].name);
      } else if (event.translationX > SWIPE_THRESHOLD) {
        const prevIndex = Math.max(state.index - 1, 0);
        navigation.navigate(state.routes[prevIndex].name);
      }
    });

  return (
    <>
      {!isInChildScreen && (
        <GestureDetector gesture={swipeGesture}>
          <View style={StyleSheet.absoluteFill} />
        </GestureDetector>
      )}
      <Animated.View
        style={[styles.container, animatedContainerStyle]}
        pointerEvents={isInChildScreen ? "none" : "auto"}
      >
        <View style={styles.tabBar}>
          <Animated.View style={[styles.indicator, animatedIndicatorStyle]} />

          {state.routes.map((route: any, index: number) => {
            const { options } = descriptors[route.key];
            const label = route.name as string;
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: "tabLongPress",
                target: route.key,
              });
            };

            const icons = TAB_ICONS[label] || TAB_ICONS.HomeStack;
            const iconName = isFocused ? icons.focused : icons.unfocused;

            return (
              <Pressable
                key={route.key}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options?.tabBarAccessibilityLabel}
                onPress={onPress}
                onLongPress={onLongPress}
                style={styles.tab}
              >
                <TabIcon name={iconName} isFocused={isFocused} />
              </Pressable>
            );
          })}
        </View>
      </Animated.View>
    </>
  );
}

function TabIcon({ name, isFocused }: { name: string; isFocused: boolean }) {
  const { colors } = useAppTheme();
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.6);

  useEffect(() => {
    scale.value = withTiming(isFocused ? 1.1 : 1, FADE_CONFIG);
    opacity.value = withTiming(isFocused ? 1 : 0.6, FADE_CONFIG);
  }, [isFocused, scale, opacity]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <Ionicons name={name as any} size={26} color={colors.textPrimary} />
    </Animated.View>
  );
}
