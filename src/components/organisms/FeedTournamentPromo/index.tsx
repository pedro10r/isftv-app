import { useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

import { TournamentPromo } from "@models/feed";
import { useAppTheme } from "@theme/ThemeContext";

import { strings } from "./strings";
import { createStyles } from "./styles";

interface FeedTournamentPromoProps {
  data: TournamentPromo;
  onPress: () => void;
}

export function FeedTournamentPromo({
  data,
  onPress,
}: FeedTournamentPromoProps) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Feather name="award" size={16} color={colors.primary} />

        <Text style={styles.eyebrow}>{strings.title}</Text>
      </View>

      <Text style={styles.title}>{data.title}</Text>

      <Text style={styles.message}>{data.message}</Text>

      <TouchableOpacity
        style={styles.cta}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <Text style={styles.ctaLabel}>{strings.buttonText}</Text>

        <Feather name="arrow-right" size={16} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
}
