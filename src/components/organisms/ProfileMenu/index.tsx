import { View } from "react-native";
import { useCallback } from "react";
import { Feather } from "@expo/vector-icons";

import { MenuItem } from "@components/molecules";
import { styles } from "./styles";
import { strings } from "./strings";

interface MenuItemTypeProps {
  icon: keyof typeof Feather.glyphMap;
  title: string;
  onPress: () => void;
  isDestructive?: boolean;
}

interface ProfileMenuProps {
  onLogout?: () => void;
  onEditProfile?: () => void;
}

export function ProfileMenu({ onLogout, onEditProfile }: ProfileMenuProps) {
  const getMenuItems = useCallback(
    (onLogout?: () => void, onEditProfile?: () => void): MenuItemTypeProps[] => [
      {
        icon: "user",
        title: strings.menu.editProfile,
        onPress: onEditProfile || (() => {}),
      },
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
    ],
    [],
  );

  const menuItems: MenuItemTypeProps[] = getMenuItems(onLogout, onEditProfile);

  return (
    <View style={styles.container}>
      {menuItems.map((item, index) => (
        <MenuItem
          key={item.title}
          icon={item.icon}
          title={item.title}
          onPress={item.onPress}
          isDestructive={item.isDestructive}
          isLast={index === menuItems.length - 1}
        />
      ))}
    </View>
  );
}
