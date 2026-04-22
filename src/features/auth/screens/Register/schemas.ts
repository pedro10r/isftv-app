import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().nonempty("O nome é obrigatório"),
    email: z
      .string()
      .email("E-mail inválido")
      .nonempty("O e-mail é obrigatório"),
    password: z.string().min(6, "A senha precisa ter no mínimo 6 caracteres"),
    confirmPassword: z.string().min(6, "A confirmação de senha é obrigatória"),
    role: z.enum(["player", "organizer"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
