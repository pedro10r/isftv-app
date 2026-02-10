import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as LocalAuthentication from "expo-local-authentication";

import { storage } from "@lib/storage";
import { useAuthStore } from "@store/authStore";
import { AUTH_STORAGE_KEYS, AUTH_FAKE_DATA } from "@constants/auth";
import { LoginFormValues, loginSchema } from "./schemas";
import { strings } from "./strings";
import { useNavigation } from "@react-navigation/native";
import { NAV } from "@navigation/routes";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);

  const login = useAuthStore((state) => state.login);

  const { control, handleSubmit } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const { navigate } = useNavigation();

  // Check for hardware support when assembling the hook.
  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const hasRecords = await LocalAuthentication.isEnrolledAsync();
      setIsBiometricSupported(compatible && hasRecords);
    })();
  }, []);

  // MANUAL LOGIN (Email and Password).
  const onSubmit = async (data: LoginFormValues) => {
    try {
      setIsLoading(true);

      // API call simulation.
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (
        data.email !== AUTH_FAKE_DATA.TEST_EMAIL ||
        data.password !== AUTH_FAKE_DATA.TEST_PASSWORD
      ) {
        // Chaves atualizadas para o novo formato estruturado
        return Alert.alert(strings.auth.errorTitle, strings.auth.errorMessage);
      }

      const user = {
        name: AUTH_FAKE_DATA.DEFAULT_USER_NAME,
        email: data.email,
      };

      const token = AUTH_FAKE_DATA.DEFAULT_TOKEN;

      // SAVES TO MMKV: Since it's synchronous, it doesn't need await
      // The data will be encrypted as configured in storage/index.ts.
      storage.set(
        AUTH_STORAGE_KEYS.USER_SESSION,
        JSON.stringify({ user, token }),
      );

      return login(user, token);
    } catch (error) {
      Alert.alert(strings.auth.errorTitle, strings.auth.genericError);
    } finally {
      setIsLoading(false);
    }
  };

  // LOGIN WITH BIOMETRICS.
  const handleBiometricLogin = async () => {
    try {
      // 1. Hardware validation.
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) {
        return Alert.alert(
          strings.auth.biometrics.notEnrolledTitle,
          strings.auth.biometrics.notEnrolledMessage,
        );
      }

      // 2. Calls the sensor (Face ID/Fingerprint)
      // If the simulator fails, the "Try Again" button keeps the code locked here.
      const auth = await LocalAuthentication.authenticateAsync({
        promptMessage: strings.auth.biometrics.prompt,
        fallbackLabel: strings.auth.biometrics.fallback,
        disableDeviceFallback: false,
      });

      // 3. Early Return: If the user cancels or all attempts fail.
      if (!auth.success) return;

      // 4. Retrieve data from MMKV (Synchronous).
      const savedSession = storage.getString(AUTH_STORAGE_KEYS.USER_SESSION);

      if (!savedSession) {
        return Alert.alert(
          strings.auth.config.requiredTitle,
          strings.auth.config.requiredMessage,
        );
      }

      // 5. Complete the login with the actual data retrieved from the encrypted storage.
      const { user, token } = JSON.parse(savedSession);
      login(user, token);

      Alert.alert(
        strings.auth.success.title,
        strings.auth.success.welcome(user.name),
      );
    } catch (error) {
      console.error(error);
      Alert.alert(strings.auth.errorTitle, strings.auth.biometrics.failure);
    }
  };

  const handleSignUpNavigation = () => {
    navigate(NAV.ROOT.AUTH_STACK, {
      screen: NAV.AUTH_STACK.REGISTER,
    });
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    isLoading,
    isBiometricSupported,
    handleBiometricLogin,
    handleSignUpNavigation,
  };
};
