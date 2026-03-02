import { View, Text, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";

import { theme } from "@theme";
import { styles } from "./styles";

export const MENU_ITEM_ICON_SIZE = 20;
export const MENU_ITEM_FONT_SIZE = 16;

export interface MenuItemProps {
  icon: keyof typeof Feather.glyphMap;
  title: string;
  onPress: () => void;
  isDestructive?: boolean;
  isLast?: boolean;
}

export function MenuItem({
  icon,
  title,
  onPress,
  isDestructive,
  isLast,
}: MenuItemProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.menuItem,
        isLast && { borderBottomWidth: 0 },
        pressed && { opacity: 0.7 },
      ]}
      onPress={onPress}
    >
      <View style={styles.leftContent}>
        <Feather
          name={icon}
          size={MENU_ITEM_ICON_SIZE}
          color={isDestructive ? styles.destructive.color : styles.title.color}
          style={styles.icon}
        />
        <Text style={[styles.title, isDestructive && styles.destructive]}>
          {title}
        </Text>
      </View>

      {!isDestructive && (
        <Feather
          name="chevron-right"
          size={MENU_ITEM_ICON_SIZE}
          color={theme.colors.textSecondary}
        />
      )}
    </Pressable>
  );
}
