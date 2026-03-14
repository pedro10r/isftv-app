import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email("E-mail inválido")
    .nonempty("O e-mail é obrigatório"),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
