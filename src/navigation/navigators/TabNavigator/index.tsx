import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { TabParamList } from "@navigation/types";
import { NAV } from "@navigation/routes";
import { HomeStackNavigation } from "@navigation/stacks/HomeStackNavigation";
import { ProfileStackNavigation } from "@navigation/stacks/ProfileStackNavigation";
import { ChampionshipsStackNavigation } from "@navigation/stacks/ChampionshipsStackNavigation";
import { FloatingTabBar } from "@components/organisms/FloatingTabBar";

const { Navigator, Screen } = createMaterialTopTabNavigator<TabParamList>();

export function TabNavigator() {
  return (
    <Navigator
      tabBarPosition="bottom"
      screenOptions={{
        swipeEnabled: true,
        animationEnabled: true,
      }}
      tabBar={(props) => <FloatingTabBar {...props} />}
    >
      <Screen
        name={NAV.TABS.HOME_STACK}
        component={HomeStackNavigation}
        options={{ title: "Home" }}
      />
      <Screen
        name={NAV.TABS.CHAMPIONSHIPS_STACK}
        component={ChampionshipsStackNavigation}
        options={{ title: "Campeonatos" }}
      />
      <Screen
        name={NAV.TABS.PROFILE_STACK}
        component={ProfileStackNavigation}
        options={{ title: "Perfil" }}
      />
    </Navigator>
  );
}
