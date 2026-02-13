import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ChampionshipsStackParamList } from "@navigation/types";
import { NAV } from "@navigation/routes";
import { Championships } from "@screens/Championships";

const { Navigator, Screen } =
  createNativeStackNavigator<ChampionshipsStackParamList>();

export function ChampionshipsStackNavigation() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name={NAV.CHAMPIONSHIPS_STACK.CHAMPIONSHIPS}
        component={Championships}
      />
    </Navigator>
  );
}
