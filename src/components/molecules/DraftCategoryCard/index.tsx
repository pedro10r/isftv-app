import { useMemo } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";

import { useAppTheme } from "@theme/ThemeContext";
import { maskDate, maskTime } from "@utils";

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

  const handleChangeDate = (text: string) => {
    if (text.length < date.length) {
      const prevDigits = date.replace(/\D/g, "");
      onDateChange(maskDate(prevDigits.slice(0, -1)));
      return;
    }
    onDateChange(maskDate(text));
  };

  const handleChangeTime = (text: string) => {
    if (text.length < startTime.length) {
      const prevDigits = startTime.replace(/\D/g, "");
      onTimeChange(maskTime(prevDigits.slice(0, -1)));
      return;
    }
    onTimeChange(maskTime(text));
  };

  return (
    <View style={styles.card}>
      <Text style={styles.name} numberOfLines={1}>
        {name}
      </Text>

      <View style={styles.bottomRow}>
        <View style={styles.pill}>
          <View style={styles.pillGroup}>
            <Feather name="calendar" size={13} color={colors.textSecondary} />
            <TextInput
              style={[styles.pillInput, styles.dateInput]}
              value={date}
              onChangeText={handleChangeDate}
              keyboardType="numeric"
              maxLength={10}
              placeholder="DD/MM/AAAA"
              placeholderTextColor={colors.placeholder}
            />
          </View>

          <View style={styles.pillGroup}>
            <Feather name="clock" size={13} color={colors.textSecondary} />
            <TextInput
              style={[styles.pillInput, styles.timeInput]}
              value={startTime}
              onChangeText={handleChangeTime}
              keyboardType="numeric"
              maxLength={5}
              placeholder="00:00"
              placeholderTextColor={colors.placeholder}
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.trashButton}
          onPress={onRemove}
          activeOpacity={0.7}
        >
          <Feather name="trash-2" size={18} color={colors.error} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
