import { View, Text, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";

import { theme } from "@theme";
import { styles } from "./styles";
import { strings } from "./strings";

interface MenuItem {
  icon: keyof typeof Feather.glyphMap;
  title: string;
  onPress: () => void;
  isDestructive?: boolean;
}

interface MenuItemComponentProps extends MenuItem {
  isLast: boolean;
}

const MenuItemComponent = ({
  icon,
  title,
  onPress,
  isDestructive,
  isLast,
}: MenuItemComponentProps) => (
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
        size={20}
        color={isDestructive ? theme.colors.error : theme.colors.textPrimary}
        style={styles.icon}
      />

      <Text style={[styles.title, isDestructive && styles.destructive]}>
        {title}
      </Text>
    </View>

    {!isDestructive && (
      <Feather
        name="chevron-right"
        size={20}
        color={theme.colors.textSecondary}
      />
    )}
  </Pressable>
);

export interface ProfileMenuProps {
  onLogout?: () => void;
}

export function ProfileMenu({ onLogout }: ProfileMenuProps) {
  const getMenuItems = (onLogout?: () => void): MenuItem[] => [
    { icon: "user", title: strings.menu.editProfile, onPress: () => {} },
    {
      icon: "bar-chart-2",
      title: strings.menu.detailedStats,
      onPress: () => {},
    },
    { icon: "settings", title: strings.menu.settings, onPress: () => {} },
    {
      icon: "log-out",
      title: strings.menu.logout,
      onPress: onLogout || (() => {}),
      isDestructive: true,
    },
  ];

  const menuItems = getMenuItems(onLogout);

  return (
    <View style={styles.container}>
      {menuItems.map((item, index) => (
        <MenuItemComponent
          key={item.title}
          {...item}
          isLast={index === menuItems.length - 1}
        />
      ))}
    </View>
  );
}
