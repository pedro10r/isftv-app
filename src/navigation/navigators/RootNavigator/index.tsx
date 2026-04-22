import { ActivityIndicator, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NAV } from "@navigation/routes";
import { RootStackParamList } from "@navigation/types";
import { AuthStackNavigator } from "@navigation/stacks/AuthStackNavigator";
import { useAuthStore } from "@features/auth/store";
import { TabNavigator } from "../TabNavigator";

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const session = useAuthStore((state) => state.session);
  const isLoading = useAuthStore((state) => state.isLoading);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const isAuthenticated = !!session;

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Screen name={NAV.ROOT.TABS} component={TabNavigator} />
      ) : (
        <Screen name={NAV.ROOT.AUTH_STACK} component={AuthStackNavigator} />
      )}
    </Navigator>
  );
}
