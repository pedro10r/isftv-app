import { View } from "react-native";
import { useCallback, useMemo } from "react";
import { Feather } from "@expo/vector-icons";

import { MenuItem } from "@components/molecules";
import { useAppTheme } from "@theme/ThemeContext";
import { createStyles } from "./styles";
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
  onSettings?: () => void;
}

export function ProfileMenu({ onLogout, onEditProfile, onSettings }: ProfileMenuProps) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const getMenuItems = useCallback(
    (onLogout?: () => void, onEditProfile?: () => void, onSettings?: () => void): MenuItemTypeProps[] => [
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
      { icon: "settings", title: strings.menu.settings, onPress: onSettings || (() => {}) },
      {
        icon: "log-out",
        title: strings.menu.logout,
        onPress: onLogout || (() => {}),
        isDestructive: true,
      },
    ],
    [],
  );

  const menuItems: MenuItemTypeProps[] = getMenuItems(onLogout, onEditProfile, onSettings);

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
