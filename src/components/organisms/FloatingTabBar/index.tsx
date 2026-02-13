import { useEffect } from "react";
import { View, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

import { styles, TAB_WIDTH } from "./styles";

type TabBarProps = any;

const FADE_CONFIG = {
  duration: 200,
};

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
  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = withTiming(state.index * TAB_WIDTH, FADE_CONFIG);
  }, [state.index, translateX]);

  const animatedIndicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <View style={styles.container}>
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
    </View>
  );
}

function TabIcon({ name, isFocused }: { name: string; isFocused: boolean }) {
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
      <Ionicons name={name as any} size={26} color="white" />
    </Animated.View>
  );
}
