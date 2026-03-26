import { useState } from "react";
import { Alert } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useAuthNavigation } from "@navigation/appNavigation";
import { supabase } from "@services/supabase";
import { useAuthStore } from "@store/authStore";

import {
  step1Schema,
  step2Schema,
  Step1FormValues,
  Step2FormValues,
} from "./schemas";
import { strings } from "./strings";

export const useForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");

  const { goBack } = useAuthNavigation();

  const step1Form = useForm<Step1FormValues>({
    resolver: zodResolver(step1Schema),
    defaultValues: { email: "" },
  });

  const step2Form = useForm<Step2FormValues>({
    resolver: zodResolver(step2Schema),
    defaultValues: { otp: "", newPassword: "", confirmPassword: "" },
  });

  const onSubmitStep1 = async (data: Step1FormValues) => {
    try {
      setIsLoading(true);

      const { error } = await supabase.auth.resetPasswordForEmail(data.email);

      if (error) {
        return Alert.alert(strings.auth.errorTitle, strings.auth.errorSendCode);
      }

      setEmail(data.email);
      setStep(2);
    } catch {
      Alert.alert(strings.auth.errorTitle, strings.auth.errorSendCode);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitStep2 = async (data: Step2FormValues) => {
    try {
      setIsLoading(true);

      useAuthStore.getState().setIsRecoveringPassword(true);

      const { error: otpError } = await supabase.auth.verifyOtp({
        email,
        token: data.otp,
        type: "recovery",
      });

      if (otpError) {
        return Alert.alert(
          strings.auth.errorTitle,
          strings.auth.errorInvalidOtp,
        );
      }

      const { error: updateError } = await supabase.auth.updateUser({
        password: data.newPassword,
      });

      if (updateError) {
        return Alert.alert(
          strings.auth.errorTitle,
          strings.auth.errorResetPassword,
        );
      }

      await supabase.auth.signOut();

      Alert.alert(strings.auth.successTitle, strings.auth.successMessage, [
        { text: "OK", onPress: () => goBack() },
      ]);
    } catch {
      useAuthStore.getState().setIsRecoveringPassword(false);
      Alert.alert(strings.auth.errorTitle, strings.auth.errorResetPassword);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => goBack();

  return {
    step,
    isLoading,
    handleGoBack,
    step1: {
      control: step1Form.control,
      handleSubmit: step1Form.handleSubmit,
      onSubmit: onSubmitStep1,
    },
    step2: {
      control: step2Form.control,
      handleSubmit: step2Form.handleSubmit,
      onSubmit: onSubmitStep2,
    },
  };
};
