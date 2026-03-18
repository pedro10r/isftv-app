import { useMemo } from "react";
import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";

import { UserPost } from "@models/feed";
import { formatTimeAgo } from "@utils";
import { useAppTheme } from "@theme/ThemeContext";

import { createStyles } from "./styles";

interface FeedUserPostProps {
  data: UserPost;
  onAuthorPress?: () => void;
}

export function FeedUserPost({ data, onAuthorPress }: FeedUserPostProps) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      <Pressable style={styles.header} onPress={onAuthorPress}>
        <Image
          source={{ uri: data.author.avatarUrl }}
          style={styles.avatar}
          resizeMode="cover"
        />

        <View style={styles.authorInfo}>
          <Text style={styles.authorName}>{data.author.name}</Text>
          <Text style={styles.timeAgo}>{formatTimeAgo(data.createdAt)}</Text>
        </View>
      </Pressable>

      <Text style={styles.content}>{data.content}</Text>

      {data.mediaUrl && (
        <View style={styles.mediaWrapper}>
          <Image
            source={{ uri: data.mediaUrl }}
            style={styles.media}
            resizeMode="cover"
          />

          {data.isVideo && (
            <View style={styles.playOverlay}>
              <Feather name="play-circle" size={56} color={colors.white} />
            </View>
          )}
        </View>
      )}

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.actionButton}
          activeOpacity={0.7}
          onPress={data.onLikePress}
        >
          <Feather
            name="heart"
            size={20}
            color={data.isLiked ? colors.error : colors.textSecondary}
          />
          <Text style={styles.actionCount}>{data.likes}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
          <Feather
            name="message-circle"
            size={20}
            color={colors.textSecondary}
          />
          <Text style={styles.actionCount}>{data.comments}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
          <Feather name="send" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
