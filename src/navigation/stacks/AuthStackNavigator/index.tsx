import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthStackParamList } from "@navigation/types";
import { NAV } from "@navigation/routes";

import { Login } from "@features/auth/screens/Login";
import { Register } from "@features/auth/screens/Register";
import { ForgotPassword } from "@features/auth/screens/ForgotPassword";

const { Navigator, Screen } = createNativeStackNavigator<AuthStackParamList>();

export function AuthStackNavigator() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name={NAV.AUTH_STACK.LOGIN} component={Login} />
      <Screen name={NAV.AUTH_STACK.REGISTER} component={Register} />
      <Screen name={NAV.AUTH_STACK.FORGOT_PASSWORD} component={ForgotPassword} />
    </Navigator>
  );
}
