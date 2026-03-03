import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

import { theme } from "@theme";
import { styles } from "./styles";
import { strings } from "./strings";

export type PlayingPosition = "Direita" | "Esquerda" | "Ambos";

export interface AthleteStatsProps {
  height: string;
  weight: string;
  playingPosition: PlayingPosition;
}

export interface StatsItem {
  icon: keyof typeof Feather.glyphMap;
  value: string;
  label: string;
}

interface StatItemProps {
  item: StatsItem;
}

const StatItem = ({ item }: StatItemProps) => (
  <View style={styles.statCard}>
    <View style={styles.iconContainer}>
      <Feather name={item.icon} size={20} color={theme.colors.primary} />
    </View>
    <Text style={styles.value}>{item.value}</Text>
    <Text style={styles.label}>{item.label}</Text>
  </View>
);

export function AthleteStatsCard({
  height,
  weight,
  playingPosition,
}: Partial<AthleteStatsProps>) {
  const items: StatsItem[] = [
    { icon: "maximize", value: height || "-", label: strings.labels.height },
    { icon: "activity", value: weight || "-", label: strings.labels.weight },
    {
      icon: "user",
      value: playingPosition || "-",
      label: strings.labels.playingPosition,
    },
  ];

  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <StatItem key={index} item={item} />
      ))}
    </View>
  );
}
