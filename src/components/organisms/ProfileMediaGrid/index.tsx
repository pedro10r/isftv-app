import { useMemo } from "react";
import { View, Image, useWindowDimensions } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Feather } from "@expo/vector-icons";

import { Post } from "@models/feed";
import { EmptyListState } from "@components/molecules";
import { Skeleton } from "@components/atoms";
import { useAppTheme } from "@theme/ThemeContext";
import { useUserPosts } from "@hooks/queries/useFeedQueries";

import { GAP, createStyles } from "./styles";

interface ProfileMediaGridProps {
  userId: string;
}

const NUM_COLUMNS = 3;
const SKELETON_COUNT = 12;

export function ProfileMediaGrid({ userId }: ProfileMediaGridProps) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { width } = useWindowDimensions();

  const itemSize = Math.floor(width / NUM_COLUMNS);

  const { data: posts = [], isLoading } = useUserPosts(userId);

  const rowCount = Math.ceil(
    (isLoading ? SKELETON_COUNT : posts.length) / NUM_COLUMNS,
  );

  const containerHeight = rowCount * itemSize + GAP * rowCount;

  const renderItem = ({ item }: { item: Post }) => (
    <View style={{ width: itemSize, height: itemSize }}>
      <Image
        source={{ uri: item.media_url! }}
        style={styles.image}
        resizeMode="cover"
      />

      {item.is_video && (
        <View style={styles.videoOverlay}>
          <Feather name="play" size={28} color="white" />
        </View>
      )}
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.skeletonContainer}>
        {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
          <Skeleton
            key={index}
            width={"32.99%"}
            height={itemSize}
            borderRadius={0}
          />
        ))}
      </View>
    );
  }

  if (!posts.length) {
    return (
      <View style={styles.emptyWrapper}>
        <EmptyListState
          icon="camera"
          message="Nenhuma mídia publicada ainda."
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { height: containerHeight }]}>
      <FlashList
        data={posts}
        keyExtractor={(item) => item.id}
        numColumns={NUM_COLUMNS}
        renderItem={renderItem}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
