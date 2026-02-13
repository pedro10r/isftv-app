import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { TabParamList } from "@navigation/types";
import { NAV } from "@navigation/routes";
import { HomeStackNavigation } from "@navigation/stacks/HomeStackNavigation";
import { ProfileStackNavigation } from "@navigation/stacks/ProfileStackNavigation";
import { ChampionshipsStackNavigation } from "@navigation/stacks/ChampionshipsStackNavigation";
import { FloatingTabBar } from "@components/organisms/FloatingTabBar";

const { Navigator, Screen } = createBottomTabNavigator<TabParamList>();

export function TabNavigator() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        animation: "shift",
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
        options={{ title: "Championships" }}
      />
      <Screen
        name={NAV.TABS.PROFILE_STACK}
        component={ProfileStackNavigation}
        options={{ title: "Profile" }}
      />
    </Navigator>
  );
}
