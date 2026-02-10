import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RegisterFormValues, registerSchema } from "./schemas";
import { useNavigation } from "@react-navigation/native";

export const useRegister = () => {
  const { control, handleSubmit } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const { goBack } = useNavigation();

  const onSubmit = (data: RegisterFormValues) => {
    return;
  };

  const handleGoBack = () => {
    goBack();
  };

  return { control, handleSubmit, onSubmit, handleGoBack };
};
