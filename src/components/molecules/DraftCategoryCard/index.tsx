import { useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";

import { DatePickerInput, TimePickerInput } from "@components/atoms";
import { useAppTheme } from "@theme/ThemeContext";

import { createStyles } from "./styles";

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

  return (
    <View style={styles.card}>
      <View style={styles.bottomRow}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>

        <TouchableOpacity
          style={styles.trashButton}
          onPress={onRemove}
          activeOpacity={0.7}
        >
          <Feather name="trash-2" size={18} color={colors.error} />
        </TouchableOpacity>
      </View>

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
    </View>
  );
}
