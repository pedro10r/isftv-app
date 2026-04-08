import { useMemo } from "react";
import { View, Text, TouchableOpacity, Pressable } from "react-native";
import { Image } from "expo-image";
import { Feather, FontAwesome } from "@expo/vector-icons";

import { UserPost } from "@models/feed";
import { formatTimeAgo } from "@utils";
import { getInitials } from "@utils/getInitials";
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
        {data.author.avatarUrl ? (
          <Image
            source={{ uri: data.author.avatarUrl }}
            style={styles.avatar}
            contentFit="cover"
          />
        ) : (
          <View style={[styles.avatar, styles.avatarInitials]}>
            <Text style={styles.avatarInitialsText}>
              {getInitials(data.author.name)}
            </Text>
          </View>
        )}

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
            contentFit="cover"
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
          <FontAwesome
            name={data.isLiked ? "heart" : "heart-o"}
            size={22}
            color={data.isLiked ? colors.error : colors.textSecondary}
          />
          <Text style={styles.actionCount}>{data.likes}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
          <FontAwesome
            name="comment-o"
            size={22}
            color={colors.textSecondary}
          />
          <Text style={styles.actionCount}>{data.comments}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
