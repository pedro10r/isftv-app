import { useMemo } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

import { Tournament } from "@models/tournament";
import { StatusBadge } from "@components/atoms/StatusBadge";
import { useAppTheme } from "@theme/ThemeContext";
import { formatDateRange } from "@utils";

import { createStyles } from "./styles";

interface TournamentCardProps {
  data: Tournament;
  onPress: () => void;
}

export function TournamentCard({ data, onPress }: TournamentCardProps) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const dateRange = formatDateRange(data.start_date, data.end_date);

  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.card} onPress={onPress}>
      <View style={styles.imageWrapper}>
        {data.poster_url ? (
          <Image
            source={{ uri: data.poster_url }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.image, styles.imagePlaceholder]}>
            <Feather name="image" size={32} color={colors.placeholder} />
          </View>
        )}

        <View style={styles.badgeWrapper}>
          <StatusBadge status={data.status!} />
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={2}>
          {data.name}
        </Text>

        <View style={styles.infoRow}>
          <Feather name="map-pin" size={14} color={colors.textSecondary} />
          <Text style={styles.infoText} numberOfLines={1}>
            {data.venue_name}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Feather name="calendar" size={14} color={colors.textSecondary} />
          <Text style={styles.infoText}>{dateRange}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        {data.tournament_categories.map((category) => (
          <View key={category.id} style={styles.categoryTag}>
            <Text style={styles.categoryLabel}>{category.name}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
}
