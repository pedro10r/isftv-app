import { useMemo } from "react";
import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

import { PlayingPosition } from "@store/profileStore";
import { useAppTheme } from "@theme/ThemeContext";
import { Colors } from "@theme";

import { createStyles } from "./styles";
import { strings } from "./strings";

export interface AthleteStatsProps {
  city: string;
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
  styles: ReturnType<typeof createStyles>;
  iconColor: string;
}

const StatItem = ({ item, styles, iconColor }: StatItemProps) => (
  <View style={styles.statCard}>
    <View style={styles.iconContainer}>
      <Feather name={item.icon} size={20} color={iconColor} />
    </View>
    <Text style={styles.value}>{item.value}</Text>
    <Text style={styles.label}>{item.label}</Text>
  </View>
);

export function AthleteStatsCard({
  city,
  height,
  weight,
  playingPosition,
}: Partial<AthleteStatsProps>) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const items: StatsItem[] = [
    { icon: "map-pin", value: city || "-", label: strings.labels.city },
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
        <StatItem key={index} item={item} styles={styles} iconColor={colors.primary} />
      ))}
    </View>
  );
}
