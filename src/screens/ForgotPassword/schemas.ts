import { z } from "zod";

export const forgotPasswordSchema = z
  .object({
    email: z.string().email("E-mail inválido").nonempty("O e-mail é obrigatório"),
    newPassword: z.string().min(6, "A senha precisa ter no mínimo 6 caracteres"),
    confirmPassword: z.string().min(6, "A confirmação de senha é obrigatória"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
