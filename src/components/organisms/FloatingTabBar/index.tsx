/**
 * FloatingTabBar — custom tab bar for createMaterialTopTabNavigator.
 *
 * Uses two animation systems intentionally:
 * - RNAnimated: drives indicator and icons via `position.interpolate()`, which
 *   is a native Animated.Value updated frame-by-frame by the pager engine.
 * - Reanimated: drives the container hide/show when entering child screens.
 *
 * TabIcon lives here because it's tightly coupled to `position` and has no
 * use outside this component. Its inline styles are fixed layout values for
 * the cross-fade container, not theme-dependent, so they stay out of styles.ts.
 */

import { useEffect, useMemo } from "react";
import { View, Animated as RNAnimated } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import { Pressable } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

import { useAppTheme } from "@theme/ThemeContext";
import { createStyles, TAB_WIDTH } from "./styles";

const FADE_CONFIG = { duration: 200 };
const HIDE_TRANSLATE_Y = 100;

const TAB_ICONS: Record<string, { focused: string; unfocused: string }> = {
  HomeStack: { focused: "home", unfocused: "home-outline" },
  TournamentsStack: { focused: "trophy", unfocused: "trophy-outline" },
  ProfileStack: { focused: "person", unfocused: "person-outline" },
};

export function FloatingTabBar({
  state,
  descriptors,
  navigation,
  position,
}: MaterialTopTabBarProps) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const translateY = useSharedValue(0);
  const barOpacity = useSharedValue(1);

  const activeRoute = state.routes[state.index];
  const isInChildScreen = (activeRoute.state?.index ?? 0) > 0;

  useEffect(() => {
    translateY.value = withTiming(
      isInChildScreen ? HIDE_TRANSLATE_Y : 0,
      FADE_CONFIG,
    );
    barOpacity.value = withTiming(isInChildScreen ? 0 : 1, FADE_CONFIG);
  }, [isInChildScreen, translateY, barOpacity]);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: barOpacity.value,
  }));

  const indicatorTranslateX = position?.interpolate({
    inputRange: state.routes.map((_: any, i: number) => i),
    outputRange: state.routes.map((_: any, i: number) => i * TAB_WIDTH),
    extrapolate: "clamp",
  });

  const indicatorScaleX = position?.interpolate({
    inputRange: [0, 0.5, 1, 1.5, 2],
    outputRange: [1, 1.15, 1, 1.15, 1],
    extrapolate: "clamp",
  });

  const indicatorScaleY = position?.interpolate({
    inputRange: [0, 0.5, 1, 1.5, 2],
    outputRange: [1, 0.98, 1, 0.98, 1],
    extrapolate: "clamp",
  });

  return (
    <>
      <Animated.View
        style={[styles.container, animatedContainerStyle]}
        pointerEvents={isInChildScreen ? "none" : "auto"}
      >
        <View style={styles.tabBar}>
          <RNAnimated.View
            style={[
              styles.indicator,
              {
                transform: [
                  { translateX: indicatorTranslateX ?? 0 },
                  { scaleX: indicatorScaleX ?? 1 },
                  { scaleY: indicatorScaleY ?? 1 },
                ],
              },
            ]}
          />

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
                <TabIcon icons={icons} index={index} position={position} />
              </Pressable>
            );
          })}
        </View>
      </Animated.View>
    </>
  );
}

function TabIcon({
  icons,
  index,
  position,
}: {
  icons: { focused: string; unfocused: string };
  index: number;
  position: any;
}) {
  const { colors } = useAppTheme();

  const scale = position?.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [1, 1.1, 1],
    extrapolate: "clamp",
  });

  const focusedOpacity = position?.interpolate({
    inputRange: [index - 0.51, index - 0.5, index + 0.5, index + 0.51],
    outputRange: [0, 1, 1, 0],
    extrapolate: "clamp",
  });

  const unfocusedOpacity = position?.interpolate({
    inputRange: [index - 0.51, index - 0.5, index + 0.5, index + 0.51],
    outputRange: [1, 0, 0, 1],
    extrapolate: "clamp",
  });

  return (
    <RNAnimated.View
      style={{
        transform: [{ scale: scale ?? 1 }],
        alignItems: "center",
        justifyContent: "center",
        width: 26,
        height: 26,
      }}
    >
      <RNAnimated.View
        style={{ position: "absolute", opacity: unfocusedOpacity }}
      >
        <Ionicons
          name={icons.unfocused as any}
          size={26}
          color={colors.textPrimary}
        />
      </RNAnimated.View>

      <RNAnimated.View
        style={{ position: "absolute", opacity: focusedOpacity }}
      >
        <Ionicons
          name={icons.focused as any}
          size={26}
          color={colors.textPrimary}
        />
      </RNAnimated.View>
    </RNAnimated.View>
  );
}
