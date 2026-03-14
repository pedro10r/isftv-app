import { useState } from "react";
import { Alert } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useAuthNavigation } from "@navigation/appNavigation";
import { supabase } from "@services/supabase";

import { ForgotPasswordFormValues, forgotPasswordSchema } from "./schemas";
import { strings } from "./strings";

export const useForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const { goBack } = useAuthNavigation();

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      setIsLoading(true);

      const { error } = await supabase.auth.resetPasswordForEmail(data.email);

      if (error) {
        return Alert.alert(strings.auth.errorTitle, error.message);
      }

      Alert.alert(strings.auth.successTitle, strings.auth.successMessage, [
        { text: "OK", onPress: () => goBack() },
      ]);
    } catch {
      Alert.alert(strings.auth.errorTitle, strings.auth.errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => goBack();

  return { control, handleSubmit, onSubmit, handleGoBack, isLoading };
};
