import { useMemo } from "react";
import { View, Text, Pressable } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Feather } from "@expo/vector-icons";

import { FeedData } from "@models/feed";
import { FeedTournamentPromo, FeedUserPost } from "@components";
import { ScreenTemplate } from "@components/templates";
import { EmptyListState } from "@components/molecules/EmptyListState";
import { useAppTheme } from "@theme/ThemeContext";

import { createStyles } from "./styles";
import { useHome } from "./hooks";
import { strings } from "./strings";

export function Home() {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const { feed, handleCreatePostPress } = useHome();

  const renderItem = ({ item }: { item: FeedData }) => {
    if (item.type === "USER_POST") {
      return <FeedUserPost data={item} />;
    }

    if (item.type === "TOURNAMENT_PROMO") {
      return <FeedTournamentPromo data={item} onPress={() => {}} />;
    }

    return null;
  };

  return (
    <ScreenTemplate>
      <View style={styles.header}>
        <Text style={styles.title}>{strings.title}</Text>
        <Pressable onPress={handleCreatePostPress} hitSlop={8}>
          <Feather name="plus" size={24} color={colors.textPrimary} />
        </Pressable>
      </View>

      <FlashList
        data={feed}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.listContent,
          !feed.length && styles.listContentEmpty,
        ]}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <EmptyListState
            icon="message-square"
            message={strings.emptyState.message}
          />
        }
      />
    </ScreenTemplate>
  );
}
