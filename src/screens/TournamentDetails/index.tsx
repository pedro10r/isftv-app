import { useMemo } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Feather from "@expo/vector-icons/Feather";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { StatusBadge } from "@components/atoms/StatusBadge";
import { useAppTheme } from "@theme/ThemeContext";
import { formatDateRange, formatCurrency } from "@utils";

import { createStyles } from "./styles";
import { useTournamentDetails } from "./hooks";
import { strings } from "./strings";

export function TournamentDetails() {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const { tournament, prizes, handleGoBack, handleEnroll, getPrizeColors } =
    useTournamentDetails();

  if (!tournament) return null;

  const prizeColors = getPrizeColors(colors);

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <Pressable style={styles.backButton} onPress={handleGoBack}>
        <View style={styles.backButtonInner}>
          <Feather name="chevron-left" size={24} color={colors.white} />
        </View>
      </Pressable>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Image
          source={{ uri: tournament.posterUrl }}
          style={styles.heroImage}
          resizeMode="cover"
        />

        <View style={styles.body}>
          <View style={styles.statusRow}>
            <StatusBadge status={tournament.status} />
          </View>

          <Text style={styles.titleText}>{tournament.name}</Text>

          <View style={styles.metaGroup}>
            <View style={styles.metaRow}>
              <Feather name="map-pin" size={16} color={colors.textSecondary} />
              <Text style={styles.metaText}>
                {tournament.city
                  ? `${tournament.venueName} - ${tournament.city}`
                  : tournament.venueName}
              </Text>
            </View>

            <View style={styles.metaRow}>
              <Feather name="calendar" size={16} color={colors.textSecondary} />
              <Text style={styles.metaText}>
                {formatDateRange(tournament.startDate, tournament.endDate)}
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {strings.sections.categories}
            </Text>

            <View style={styles.chipsRow}>
              {tournament.categories.map((cat) => (
                <View key={cat} style={styles.chip}>
                  <Text style={styles.chipLabel}>{cat}</Text>
                </View>
              ))}
            </View>
          </View>

          {prizes.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{strings.sections.prizes}</Text>
              <View style={styles.prizeCard}>
                {prizes.map(({ place, value }, index) => {
                  const palette =
                    prizeColors[place as keyof typeof prizeColors];
                  return (
                    <View
                      key={place}
                      style={[
                        styles.prizeRow,
                        index > 0 && styles.prizeRowBorder,
                      ]}
                    >
                      <View
                        style={[
                          styles.prizeIconWrapper,
                          { backgroundColor: palette.bg },
                        ]}
                      >
                        <Ionicons
                          name={place <= 3 ? "trophy-outline" : "star-outline"}
                          size={18}
                          color={palette.icon}
                        />
                      </View>
                      <Text style={styles.prizePlaceText}>
                        {strings.prizeLabels[place]}
                      </Text>
                      <Text style={styles.prizeValueText}>{value}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View>
          <Text style={styles.feeLabel}>{strings.footer.feeLabel}</Text>

          <Text style={styles.feeValue}>
            {formatCurrency(tournament.registrationFee)}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.enrollButton}
          activeOpacity={0.8}
          onPress={handleEnroll}
        >
          <Text style={styles.enrollButtonText}>
            {strings.footer.enrollButton}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
