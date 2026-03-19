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
import { SafeAreaView } from "react-native-safe-area-context";

import { MetaRow } from "@components/molecules";
import { TournamentCategoryCard } from "@components/organisms";
import { useAppTheme } from "@theme/ThemeContext";
import { formatCurrency, formatDateRange } from "@utils";

import { createStyles } from "./styles";
import { useTournamentDetails } from "./hooks";
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
  } = useTournamentDetails();

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (isError || !tournament) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Feather name="alert-circle" size={32} color={colors.error} />
        <Text style={styles.errorText}>{strings.error.message}</Text>

        <Pressable onPress={handleGoBack} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>{strings.error.back}</Text>
        </Pressable>
      </View>
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
            <MetaRow
              icon="map-pin"
              text={
                tournament.city
                  ? `${tournament.venue_name} — ${tournament.city}`
                  : tournament.venue_name
              }
            />

            <MetaRow
              icon="calendar"
              text={formatDateRange(tournament.start_date, tournament.end_date)}
            />

            {tournament.profiles?.full_name && (
              <MetaRow icon="user" text={tournament.profiles.full_name} />
            )}

            <MetaRow
              icon="tag"
              text={formatCurrency(tournament.registration_fee)}
            />
          </View>

          {tournament.tournament_categories.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                {strings.sections.categories}
              </Text>

              {tournament.tournament_categories.map((category) => (
                <TournamentCategoryCard key={category.id} category={category} />
              ))}
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
