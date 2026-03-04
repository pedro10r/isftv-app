import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ProfileStackParamList } from "@navigation/types";
import { NAV } from "@navigation/routes";

import { Profile } from "@screens/Profile";
import { EditProfile } from "@screens/EditProfile";
import { Settings } from "@screens/Settings";

const { Navigator, Screen } =
  createNativeStackNavigator<ProfileStackParamList>();

export function ProfileStackNavigation() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name={NAV.PROFILE_STACK.PROFILE} component={Profile} />
      <Screen name={NAV.PROFILE_STACK.EDIT_PROFILE} component={EditProfile} />
      <Screen name={NAV.PROFILE_STACK.SETTINGS} component={Settings} />
    </Navigator>
  );
}
