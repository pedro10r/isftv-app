import { useMemo } from "react";
import { Text, View } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

import { DatePickerInput, TimePickerInput } from "@components/atoms";
import { useAppTheme } from "@theme/ThemeContext";

import { createStyles } from "./styles";
import { useSwipe } from "./useSwipe";

interface DraftCategoryCardProps {
  name: string;
  date: string;
  startTime: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  onRemove: () => void;
}

export function DraftCategoryCard({
  name,
  date,
  startTime,
  onDateChange,
  onTimeChange,
  onRemove,
}: DraftCategoryCardProps) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { gesture, cardAnimatedStyle, renderDeleteAction } = useSwipe(
    onRemove,
    colors,
  );

  return (
    <View style={styles.swipeContainer}>
      {renderDeleteAction()}

      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.card, cardAnimatedStyle]}>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>

          <View style={styles.pill}>
            <View style={styles.pillGroup}>
              <DatePickerInput
                value={date}
                onChange={onDateChange}
                placeholder="DD/MM/AAAA"
                size="compact"
              />
            </View>

            <View style={styles.pillGroup}>
              <TimePickerInput
                value={startTime}
                onChange={onTimeChange}
                placeholder="00:00"
                size="compact"
              />
            </View>
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}
