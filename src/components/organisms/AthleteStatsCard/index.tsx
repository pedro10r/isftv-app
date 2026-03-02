import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

import { theme } from "@theme";
import { styles } from "./styles";
import { strings } from "./strings";
import { MOCK_STATS } from "./mocks";

export type DominantFoot = "Destro" | "Canhoto" | "Ambidestro";

export interface AthleteStatsProps {
  level: string;
  height: string;
  weight: string;
  dominantFoot: DominantFoot;
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
  level = MOCK_STATS.level,
  height = MOCK_STATS.height,
  weight = MOCK_STATS.weight,
  dominantFoot = MOCK_STATS.dominantFoot,
}: Partial<AthleteStatsProps>) {
  const items: StatsItem[] = [
    { icon: "award", value: level, label: strings.labels.level },
    { icon: "maximize", value: height, label: strings.labels.height },
    { icon: "activity", value: weight, label: strings.labels.weight },
    { icon: "user", value: dominantFoot, label: strings.labels.dominantFoot },
  ];

  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <StatItem key={index} item={item} />
      ))}
    </View>
  );
}
