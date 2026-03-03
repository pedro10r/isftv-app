import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NAV } from "@navigation/routes";
import { RootStackParamList } from "@navigation/types";
import { AuthStackNavigator } from "@navigation/stacks/AuthStackNavigator";
import { useAuthStore } from "@store/authStore";
import { TabNavigator } from "../TabNavigator";

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const token = useAuthStore((state) => state.token);

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      {token ? (
        <Screen name={NAV.ROOT.TABS} component={TabNavigator} />
      ) : (
        <Screen name={NAV.ROOT.AUTH_STACK} component={AuthStackNavigator} />
      )}
    </Navigator>
  );
}
