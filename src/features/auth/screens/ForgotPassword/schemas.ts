import { z } from "zod";

export const step1Schema = z.object({
  email: z.string().email("E-mail inválido").nonempty("O e-mail é obrigatório"),
});

export const step2Schema = z
  .object({
    otp: z.string().length(8, "O código deve ter exatamente 8 dígitos"),
    newPassword: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z
      .string()
      .min(6, "A senha deve ter no mínimo 6 caracteres"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type Step1FormValues = z.infer<typeof step1Schema>;
export type Step2FormValues = z.infer<typeof step2Schema>;
