import { NavigationContainer } from "@react-navigation/native";
import { createNavTheme } from "@theme/navigationTheme";
import { useAppTheme } from "@theme/ThemeContext";
import { RootNavigator } from "./navigators/RootNavigator";
import { navigationRef } from "./appNavigation";

export function RootNavigation() {
  const { colors, isDarkMode } = useAppTheme();
  const navTheme = createNavTheme(isDarkMode, colors);

  return (
    <NavigationContainer ref={navigationRef} theme={navTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}
