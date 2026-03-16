import { useMemo } from "react";
import {
  ActivityIndicator,
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

import { useAppTheme } from "@theme/ThemeContext";
import { formatCurrency, formatDateRange } from "@utils";
import { Prizes } from "@models/tournament";

import { createStyles } from "./styles";
import { useTournamentDetails, formatPrizes } from "./hooks";
import { strings } from "./strings";

export function TournamentDetails() {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const {
    tournament,
    isLoading,
    isError,
    handleGoBack,
    handleContactOrganizer,
    getPrizeColors,
  } = useTournamentDetails();

  const prizeColors = getPrizeColors(colors);

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  if (isError || !tournament) {
    return (
      <SafeAreaView style={[styles.container, styles.centered]}>
        <Feather name="alert-circle" size={32} color={colors.error} />
        <Text style={styles.errorText}>
          Não foi possível carregar o campeonato.
        </Text>
        <Pressable onPress={handleGoBack} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Voltar</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

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
        {tournament.poster_url ? (
          <Image
            source={{ uri: tournament.poster_url }}
            style={styles.heroImage}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.heroImage, styles.heroPlaceholder]} />
        )}

        <View style={styles.body}>
          <Text style={styles.titleText}>{tournament.name}</Text>

          <View style={styles.metaGroup}>
            <View style={styles.metaRow}>
              <Feather name="map-pin" size={16} color={colors.textSecondary} />
              <Text style={styles.metaText}>
                {tournament.city
                  ? `${tournament.venue_name} — ${tournament.city}`
                  : tournament.venue_name}
              </Text>
            </View>

            <View style={styles.metaRow}>
              <Feather name="calendar" size={16} color={colors.textSecondary} />
              <Text style={styles.metaText}>
                {formatDateRange(tournament.start_date, tournament.end_date)}
              </Text>
            </View>

            {tournament.profiles?.full_name && (
              <View style={styles.metaRow}>
                <Feather name="user" size={16} color={colors.textSecondary} />
                <Text style={styles.metaText}>
                  {tournament.profiles.full_name}
                </Text>
              </View>
            )}
          </View>

          {tournament.tournament_categories.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                {strings.sections.categories}
              </Text>

              {tournament.tournament_categories.map((category) => {
                const prizeLines = formatPrizes(
                  category.prizes ?? ({} as Prizes),
                );

                return (
                  <View key={category.id} style={styles.categoryCard}>
                    <View style={styles.categoryHeader}>
                      <Text style={styles.categoryName}>{category.name}</Text>
                      <Text style={styles.categoryFee}>
                        {formatCurrency(category.registration_fee)}
                      </Text>
                    </View>

                    {prizeLines.length > 0 && (
                      <View style={styles.prizesContainer}>
                        {prizeLines.map((line, index) => (
                          <View
                            key={line.label}
                            style={[
                              styles.prizeRow,
                              index > 0 && styles.prizeRowBorder,
                            ]}
                          >
                            <View
                              style={[
                                styles.prizeIconWrapper,
                                {
                                  backgroundColor:
                                    prizeColors[
                                      index === 0
                                        ? "first_place"
                                        : index === 1
                                          ? "second_place"
                                          : "third_place"
                                    ].bg,
                                },
                              ]}
                            >
                              <Ionicons
                                name="trophy-outline"
                                size={16}
                                color={
                                  prizeColors[
                                    index === 0
                                      ? "first_place"
                                      : index === 1
                                        ? "second_place"
                                        : "third_place"
                                  ].icon
                                }
                              />
                            </View>
                            <Text style={styles.prizePlaceText}>
                              {line.label}
                            </Text>
                            <Text style={styles.prizeValueText}>
                              {line.value}
                            </Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.contactButton}
          activeOpacity={0.8}
          onPress={handleContactOrganizer}
        >
          <Feather name="message-circle" size={18} color={colors.white} />
          <Text style={styles.contactButtonText}>
            {strings.footer.contactButton}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
