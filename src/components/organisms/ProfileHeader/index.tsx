import { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";

import { theme } from "@theme";
import { styles } from "./styles";
import { strings } from "./strings";

export type PlayingPosition = "Direita" | "Esquerda" | "Ambos";

export interface ProfileHeaderProps {
  name: string;
  username: string;
  avatarUrl?: string;
  playingPosition: PlayingPosition;
  onAvatarChange: (uri: string) => void;
}

const POSITION_COLORS: Record<PlayingPosition, string> = {
  Direita: theme.colors.primary,
  Esquerda: theme.colors.secondary,
  Ambos: theme.colors.purple,
};

export function ProfileHeader({
  name,
  username,
  avatarUrl,
  playingPosition,
  onAvatarChange,
}: ProfileHeaderProps) {
  const getInitials = (fullName: string): string => {
    const parts = fullName.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return fullName.slice(0, 2).toUpperCase();
  };

  const handlePickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        onAvatarChange(result.assets[0].uri);
      }
    } catch {
      Alert.alert(
        strings.avatarPicker.errorTitle,
        strings.avatarPicker.errorMessage,
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        {avatarUrl ? (
          <Image
            source={{ uri: avatarUrl }}
            style={styles.avatar}
            contentFit="cover"
            transition={200}
          />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarInitials}>{getInitials(name)}</Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.editButton}
          onPress={handlePickImage}
          activeOpacity={0.7}
        >
          <Feather name="camera" size={16} color={theme.colors.white} />
        </TouchableOpacity>
      </View>

      <Text style={styles.name}>{name}</Text>
      <Text style={styles.username}>{username}</Text>

      <View
        style={[
          styles.positionBadge,
          { backgroundColor: POSITION_COLORS[playingPosition] + "20" },
        ]}
      >
        <Text
          style={[
            styles.positionText,
            { color: POSITION_COLORS[playingPosition] },
          ]}
        >
          {playingPosition}
        </Text>
      </View>
    </View>
  );
}
