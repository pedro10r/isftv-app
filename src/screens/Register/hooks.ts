import { useState } from "react";
import { Alert } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useAuthNavigation } from "@navigation/appNavigation";
import { supabase } from "@services/supabase";

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

      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: { full_name: data.name },
        },
      });

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
