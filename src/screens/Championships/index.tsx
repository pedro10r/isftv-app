import { useCallback, useMemo, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

import Feather from "@expo/vector-icons/Feather";

import { FilterPill, StatusBadge } from "@components/atoms";
import { ScreenTemplate } from "@components/templates";
import { TournamentCard } from "@components/organisms";
import { TOURNAMENTS_MOCK } from "@mocks/tournaments";
import { Category } from "@models/tournament";
import { useAppTheme } from "@theme/ThemeContext";

import { createStyles } from "./styles";

const FILTER_OPTIONS: string[] = [
  "Todos",
  "Iniciante",
  "Série C",
  "Série B",
  "Série A",
  "Open",
  "Misto",
];

type EmptyStateProps = { styles: ReturnType<typeof createStyles> };

function EmptyState({ styles }: EmptyStateProps) {
  const { colors } = useAppTheme();
  return (
    <View style={styles.emptyState}>
      <Feather name="inbox" size={48} color={colors.textSecondary} />
      <Text style={styles.emptyText}>
        Nenhum campeonato encontrado{"\n"}para esta categoria.
      </Text>
    </View>
  );
}

export function Championships() {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const [activeFilter, setActiveFilter] = useState("Todos");

  const filteredTournaments = useMemo(() => {
    if (activeFilter === "Todos") return TOURNAMENTS_MOCK;
    return TOURNAMENTS_MOCK.filter((t) =>
      t.categories.includes(activeFilter as Category),
    );
  }, [activeFilter]);

  const handleFilterPress = useCallback((filter: string) => {
    setActiveFilter(filter);
  }, []);

  const handleCardPress = useCallback((id: string) => {
    console.log("Navegar para detalhe:", id);
  }, []);

  const handleAddPress = useCallback(() => {
    console.log("Navegar para criação");
  }, []);

  return (
    <ScreenTemplate>
      <View style={styles.header}>
        <Text style={styles.title}>Campeonatos</Text>
        <Pressable
          onPress={handleAddPress}
          style={styles.addButton}
          hitSlop={8}
        >
          <Feather name="plus" size={24} color={colors.textPrimary} />
        </Pressable>
      </View>

      <FlatList
        horizontal
        data={FILTER_OPTIONS}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        style={styles.filterList}
        contentContainerStyle={styles.filterContent}
        renderItem={({ item }) => (
          <FilterPill
            label={item}
            isActive={activeFilter === item}
            onPress={() => handleFilterPress(item)}
          />
        )}
      />

      <FlatList
        style={styles.cardList}
        data={filteredTournaments}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={<EmptyState styles={styles} />}
        renderItem={({ item }) => (
          <TournamentCard
            data={item}
            onPress={() => handleCardPress(item.id)}
          />
        )}
      />
    </ScreenTemplate>
  );
}
