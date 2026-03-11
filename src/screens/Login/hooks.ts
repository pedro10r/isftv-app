import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as LocalAuthentication from "expo-local-authentication";

import { useAuthNavigation } from "@navigation/appNavigation";
import { NAV } from "@navigation/routes";
import { AUTH_STORAGE_KEYS } from "@constants/auth";
import { storage } from "@lib/storage";
import { verifyToken } from "@lib/jwt";
import { useAuthStore } from "@store/authStore";

import { LoginFormValues, loginSchema } from "./schemas";
import { strings } from "./strings";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);

  const login = useAuthStore((state) => state.login);
  const isBiometricEnabled = useAuthStore((state) => state.isBiometricEnabled);
  const skipBiometricPrompt = useAuthStore(
    (state) => state.skipBiometricPrompt,
  );

  const setBiometricEnabled = useAuthStore(
    (state) => state.setBiometricEnabled,
  );

  const { control, handleSubmit } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const { navigate } = useAuthNavigation();

  // Check for hardware support and auto-trigger biometric if applicable.
  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const hasRecords = await LocalAuthentication.isEnrolledAsync();
      const supported = compatible && hasRecords;

      setIsBiometricSupported(supported);

      if (supported && isBiometricEnabled && !skipBiometricPrompt) {
        handleToggleBiometric(true);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // MANUAL LOGIN (Email and Password).
  const onSubmit = async (data: LoginFormValues) => {
    try {
      setIsLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const savedSession = storage.getString(AUTH_STORAGE_KEYS.USER_SESSION);

      if (!savedSession) {
        return Alert.alert(strings.auth.errorTitle, strings.auth.errorMessage);
      }

      const { user, token } = JSON.parse(savedSession);

      const isValidToken = verifyToken(token);

      if (user.email !== data.email || !isValidToken) {
        return Alert.alert(strings.auth.errorTitle, strings.auth.errorMessage);
      }

      return login(user, token);
    } catch (error) {
      Alert.alert(strings.auth.errorTitle, strings.auth.genericError);
    } finally {
      setIsLoading(false);
    }
  };

  // BIOMETRIC LOGIN — handles both toggle activation and auto-trigger on mount.
  const handleToggleBiometric = async (value: boolean) => {
    if (!value) {
      setBiometricEnabled(false);
      return;
    }

    const savedSession = storage.getString(AUTH_STORAGE_KEYS.USER_SESSION);
    if (!savedSession) {
      return Alert.alert(
        strings.auth.config.requiredTitle,
        strings.auth.config.requiredMessage,
      );
    }

    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: strings.auth.biometrics.prompt,
      fallbackLabel: strings.auth.biometrics.fallback,
      disableDeviceFallback: false,
    });

    if (auth.success) {
      setBiometricEnabled(true);

      const { user, token } = JSON.parse(savedSession);
      const isValidToken = verifyToken(token);

      if (!isValidToken) {
        return Alert.alert(strings.auth.errorTitle, strings.auth.errorMessage);
      }

      login(user, token);
    }
  };

  const handleSignUpNavigation = () => {
    navigate(NAV.AUTH_STACK.REGISTER);
  };

  const handleForgotPasswordNavigation = () => {
    navigate(NAV.AUTH_STACK.FORGOT_PASSWORD);
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    isLoading,
    isBiometricSupported,
    isBiometricEnabled,
    handleToggleBiometric,
    handleSignUpNavigation,
    handleForgotPasswordNavigation,
  };
};
