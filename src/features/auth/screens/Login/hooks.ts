import { useState } from "react";
import { Alert } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuthNavigation } from "@navigation/appNavigation";
import { NAV } from "@navigation/routes";
import { supabase } from "@services/supabase";

import { LoginFormValues, loginSchema } from "./schemas";
import { strings } from "./strings";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const { navigate } = useAuthNavigation();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setIsLoading(true);

      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        Alert.alert(strings.auth.errorTitle, strings.auth.errorMessage);
      }
    } catch {
      Alert.alert(strings.auth.errorTitle, strings.auth.genericError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUpNavigation = () => navigate(NAV.AUTH_STACK.REGISTER);

  const handleForgotPasswordNavigation = () =>
    navigate(NAV.AUTH_STACK.FORGOT_PASSWORD);

  return {
    control,
    handleSubmit,
    onSubmit,
    isLoading,
    handleSignUpNavigation,
    handleForgotPasswordNavigation,
  };
};
