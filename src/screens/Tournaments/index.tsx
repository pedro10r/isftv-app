import { useMemo } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

import Feather from "@expo/vector-icons/Feather";

import { FilterPill } from "@components/atoms";
import { EmptyListState } from "@components/molecules";
import { ScreenTemplate } from "@components/templates";
import { TournamentCard } from "@components/organisms";
import { useAppTheme } from "@theme/ThemeContext";

import { createStyles } from "./styles";
import { useTournaments } from "./hooks";
import { strings } from "./strings";

export function Tournaments() {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const {
    activeFilter,
    filteredTournaments,
    handleFilterPress,
    handleCardPress,
    handleAddPress,
  } = useTournaments();

  return (
    <ScreenTemplate>
      <View style={styles.header}>
        <Text style={styles.title}>{strings.title}</Text>
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
        data={strings.filters}
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
        ListEmptyComponent={
          <EmptyListState icon="inbox" message={strings.emptyState} />
        }
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
