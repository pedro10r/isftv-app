import { NavigationContainer } from "@react-navigation/native";
import { AppTheme } from "@theme/navigationTheme";
import { RootNavigator } from "./navigators/RootNavigator";

export function RootNavigation() {
  return (
    <NavigationContainer theme={AppTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}
