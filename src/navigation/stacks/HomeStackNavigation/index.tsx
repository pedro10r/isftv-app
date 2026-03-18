import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeStackParamList } from "@navigation/types";
import { NAV } from "@navigation/routes";

import { Home } from "@screens/Home";
import { CreatePost } from "@screens/CreatePost";
import { OtherProfile } from "@screens/OtherProfile";
import { useNavigation } from "@react-navigation/native";

const { Navigator, Screen } = createNativeStackNavigator<HomeStackParamList>();

export function HomeStackNavigation() {
  const { setOptions } = useNavigation();

  return (
    <Navigator
      screenOptions={{ headerShown: false }}
      screenListeners={({ navigation: stackNav }) => ({
        focus: () => {
          setOptions({
            swipeEnabled: stackNav.getState().index === 0,
          });
        },
      })}
    >
      <Screen name={NAV.HOME_STACK.HOME} component={Home} />
      <Screen name={NAV.HOME_STACK.CREATE_POST} component={CreatePost} />
      <Screen name={NAV.HOME_STACK.OTHER_PROFILE} component={OtherProfile} />
    </Navigator>
  );
}
