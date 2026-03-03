import { NavigationContainer } from "@react-navigation/native";
import { AppTheme } from "@theme/navigationTheme";
import { RootNavigator } from "./navigators/RootNavigator";
import { navigationRef } from "./appNavigation";

export function RootNavigation() {
  return (
    <NavigationContainer ref={navigationRef} theme={AppTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}
