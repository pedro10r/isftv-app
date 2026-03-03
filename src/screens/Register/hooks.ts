import { useState } from "react";
import { Alert } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useAuthNavigation } from "@navigation/appNavigation";
import { AUTH_STORAGE_KEYS } from "@constants/auth";
import { storage } from "@lib/storage";
import { createToken } from "@lib/jwt";

import { RegisterFormValues, registerSchema } from "./schemas";
import { strings } from "./strings";

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const { goBack } = useAuthNavigation();

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      setIsLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const user = {
        name: data.name,
        email: data.email,
      };

      const token = createToken(data.email, data.name);

      storage.set(
        AUTH_STORAGE_KEYS.USER_SESSION,
        JSON.stringify({ user, token }),
      );

      Alert.alert(strings.auth.successTitle, strings.auth.successMessage, [
        {
          text: "OK",
          onPress: () => goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert(strings.auth.errorTitle, strings.auth.errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    goBack();
  };

  return { control, handleSubmit, onSubmit, handleGoBack, isLoading };
};
