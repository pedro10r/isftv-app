import { useAuthStore } from "@store/authStore";
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import * as LocalAuthentication from "expo-local-authentication";
import { Alert } from "react-native";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido").nonempty("O e-mail é obrigatório"),
  password: z.string().min(6, "A senha precisa ter no mínimo 6 caracteres"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);

  const login = useAuthStore((state) => state.login);
  const { control, handleSubmit } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  // Check for hardware support when assembling the screen
  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    })();
  }, []);

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const fakeResponse = {
        token: "token-jwt-manual-123",
        user: {
          name: "Usuário Teste",
          email: data.email,
        },
      };

      login(fakeResponse.user, fakeResponse.token);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível fazer login.");
    } finally {
      setIsLoading(false);
    }
  };

  // Login function with Biometry
  const handleBiometricLogin = async () => {
    try {
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!isEnrolled) {
        return Alert.alert(
          "Ops",
          "Nenhuma biometria cadastrada neste aparelho.",
        );
      }

      const auth = await LocalAuthentication.authenticateAsync({
        promptMessage: "Acesse com sua biometria",
        fallbackLabel: "Usar senha",
      });

      if (auth.success) {
        Alert.alert("Sucesso", "Biometria confirmada!");

        login(
          {
            name: "Usuário Biometria",
            email: "biometria@teste.com",
          },
          "token-jwt-biometrico-999",
        );
      }
    } catch (error) {
      Alert.alert("Erro", "Falha na autenticação biométrica");
    }
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    isLoading,
    isBiometricSupported,
    handleBiometricLogin,
  };
};
