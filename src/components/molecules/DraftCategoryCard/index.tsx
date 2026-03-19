import { useMemo } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";

import { useAppTheme } from "@theme/ThemeContext";
import { maskTime } from "@utils";

import { createStyles } from "./styles";

interface DraftCategoryCardProps {
  name: string;
  startTime: string;
  onTimeChange: (time: string) => void;
  onRemove: () => void;
}

export function DraftCategoryCard({
  name,
  startTime,
  onTimeChange,
  onRemove,
}: DraftCategoryCardProps) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

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

      <View style={styles.controls}>
        <TextInput
          style={styles.timeInput}
          value={startTime}
          onChangeText={handleChangeTime}
          keyboardType="numeric"
          maxLength={5}
          placeholder="00:00"
          placeholderTextColor={colors.placeholder}
        />

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
