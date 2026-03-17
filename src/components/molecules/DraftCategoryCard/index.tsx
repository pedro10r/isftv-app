import { useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";

import { useAppTheme } from "@theme/ThemeContext";

import { createStyles } from "./styles";

interface DraftCategoryCardProps {
  name: string;
  fee: string;
  onRemove: () => void;
}

export function DraftCategoryCard({
  name,
  fee,
  onRemove,
}: DraftCategoryCardProps) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.fee}>{fee}</Text>
      </View>

      <TouchableOpacity
        style={styles.trashButton}
        onPress={onRemove}
        activeOpacity={0.7}
      >
        <Feather name="trash" size={18} color={colors.error} />
      </TouchableOpacity>
    </View>
  );
}
