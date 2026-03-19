import { useMemo } from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";

import { useAppTheme } from "@theme/ThemeContext";
import { TournamentCategory, Prizes } from "@models/tournament";
import { formatPrizes } from "@screens/TournamentDetails/hooks";

import { createStyles } from "./styles";

const PRIZE_COLOR_KEYS = [
  "first_place",
  "second_place",
  "third_place",
  "fourth_place",
] as const;

interface TournamentCategoryCardProps {
  category: TournamentCategory;
}

export function TournamentCategoryCard({
  category,
}: TournamentCategoryCardProps) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const prizeColorMap = {
    first_place: { bg: `${colors.prizeGold}22`, icon: colors.prizeGold },
    second_place: { bg: `${colors.prizeSilver}22`, icon: colors.prizeSilver },
    third_place: { bg: `${colors.prizeBronze}22`, icon: colors.prizeBronze },
    fourth_place: {
      bg: `${colors.textSecondary}22`,
      icon: colors.textSecondary,
    },
  };

  const prizeLines = formatPrizes(category.prizes ?? ({} as Prizes));

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.name}>{category.name}</Text>

        {category.start_time ? (
          <View style={styles.timePill}>
            <Feather name="clock" size={14} color={colors.textSecondary} />
            <Text style={styles.timeText}>{category.start_time}</Text>
          </View>
        ) : null}
      </View>

      {prizeLines.length > 0 && (
        <>
          <View style={styles.prizesContainer}>
            {prizeLines.map((line, index) => {
              const colorKey = PRIZE_COLOR_KEYS[index] ?? "fourth_place";
              const { bg, icon } = prizeColorMap[colorKey];

              return (
                <View
                  key={line.label}
                  style={[styles.prizeRow, index > 0 && styles.prizeRowBorder]}
                >
                  <View
                    style={[styles.prizeIconWrapper, { backgroundColor: bg }]}
                  >
                    <Ionicons name="trophy-outline" size={16} color={icon} />
                  </View>
                  <Text style={styles.prizePlaceText}>{line.label}</Text>
                  <Text style={styles.prizeValueText}>{line.value}</Text>
                </View>
              );
            })}
          </View>
        </>
      )}
    </View>
  );
}
