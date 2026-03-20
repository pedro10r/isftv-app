import { useMemo } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { FlashList } from "@shopify/flash-list";

import Feather from "@expo/vector-icons/Feather";

import { FilterPill } from "@components/atoms";
import { EmptyListState } from "@components/molecules";
import { ScreenTemplate } from "@components/templates";
import { TournamentCard } from "@components/organisms";
import { useAppTheme } from "@theme/ThemeContext";

import { useTournaments } from "./hooks";
import { strings } from "./strings";
import { createStyles } from "./styles";

export function Tournaments() {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const {
    isLoading,
    isManualRefreshing,
    activeFilter,
    filteredTournaments,
    handleFilterPress,
    handleCardPress,
    handleAddPress,
    handleRefresh,
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

      <FlashList
        style={styles.cardList}
        data={filteredTournaments}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isManualRefreshing}
            onRefresh={handleRefresh}
            tintColor={colors.textPrimary}
          />
        }
        contentContainerStyle={[
          styles.listContent,
          !filteredTournaments.length && styles.listContentEmpty,
        ]}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator style={{ marginTop: 40 }} />
          ) : (
            <EmptyListState icon="inbox" message={strings.emptyState} />
          )
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
