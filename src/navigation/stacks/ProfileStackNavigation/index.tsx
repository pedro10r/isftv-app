import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ProfileStackParamList } from "@navigation/types";
import { NAV } from "@navigation/routes";

import { Profile } from "@features/profile/screens/Profile";
import { EditProfile } from "@features/profile/screens/EditProfile";
import { Settings } from "@features/profile/screens/Settings";

const { Navigator, Screen } =
  createNativeStackNavigator<ProfileStackParamList>();

export function ProfileStackNavigation() {
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
      <Screen name={NAV.PROFILE_STACK.PROFILE} component={Profile} />
      <Screen name={NAV.PROFILE_STACK.EDIT_PROFILE} component={EditProfile} />
      <Screen name={NAV.PROFILE_STACK.SETTINGS} component={Settings} />
    </Navigator>
  );
}
