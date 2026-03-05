import { useMemo } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";

import { Tournament } from "@models/tournament";
import { StatusBadge } from "@components/atoms/StatusBadge";
import { useAppTheme } from "@theme/ThemeContext";
import { createStyles } from "./styles";

interface TournamentCardProps {
  data: Tournament;
  onPress: () => void;
}

const MONTHS = [
  "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
  "Jul", "Ago", "Set", "Out", "Nov", "Dez",
];

function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate + "T00:00:00");
  const end = new Date(endDate + "T00:00:00");

  const startStr = `${start.getDate()} ${MONTHS[start.getMonth()]}`;
  const endStr = `${end.getDate()} ${MONTHS[end.getMonth()]} ${end.getFullYear()}`;

  return `${startStr} – ${endStr}`;
}

export function TournamentCard({ data, onPress }: TournamentCardProps) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const dateRange = formatDateRange(data.startDate, data.endDate);

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.85 }]}
      onPress={onPress}
    >
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: data.posterUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.badgeWrapper}>
          <StatusBadge status={data.status} />
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={2}>
          {data.name}
        </Text>

        <View style={styles.infoRow}>
          <Feather name="map-pin" size={14} color={colors.textSecondary} />
          <Text style={styles.infoText} numberOfLines={1}>
            {data.venueName}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Feather name="calendar" size={14} color={colors.textSecondary} />
          <Text style={styles.infoText}>{dateRange}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        {data.categories.map((category) => (
          <View key={category} style={styles.categoryTag}>
            <Text style={styles.categoryLabel}>{category}</Text>
          </View>
        ))}
      </View>
    </Pressable>
  );
}
