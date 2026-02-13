import { useState } from "react";
import { Alert } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import { storage } from "@lib/storage";
import { createToken } from "@lib/jwt";
import { AUTH_STORAGE_KEYS } from "@constants/auth";

import { ForgotPasswordFormValues, forgotPasswordSchema } from "./schemas";
import { strings } from "./strings";

export const useForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const { goBack } = useNavigation();

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      setIsLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const savedSession = storage.getString(AUTH_STORAGE_KEYS.USER_SESSION);

      if (!savedSession) {
        return Alert.alert(
          strings.auth.errorTitle,
          strings.auth.errorEmailNotFound,
        );
      }

      const { user } = JSON.parse(savedSession);

      if (user.email !== data.email) {
        return Alert.alert(
          strings.auth.errorTitle,
          strings.auth.errorEmailNotFound,
        );
      }

      const newUser = {
        ...user,
        name: user.name,
      };

      const newToken = createToken(data.email, newUser.name);

      storage.set(
        AUTH_STORAGE_KEYS.USER_SESSION,
        JSON.stringify({ user: newUser, token: newToken }),
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
