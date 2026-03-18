import { useMemo } from "react";
import { View, Text } from "react-native";

import { useAppTheme } from "@theme/ThemeContext";

import { createStyles } from "./styles";

export interface StatItem {
  value: string;
  label: string;
}

interface StatsCardProps {
  items: StatItem[];
}

export function StatsCard({ items }: StatsCardProps) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.card}>
      {items.map((item, index) => (
        <View
          key={item.label}
          style={[
            styles.item,
            index < items.length - 1 && styles.itemWithBorder,
          ]}
        >
          <Text style={styles.value}>{item.value}</Text>
          <Text style={styles.label}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
}
