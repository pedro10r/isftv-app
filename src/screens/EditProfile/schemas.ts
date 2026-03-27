import { z } from "zod";

export const editProfileSchema = z.object({
  full_name: z
    .string()
    .min(2, "Nome deve ter ao menos 2 caracteres")
    .nonempty("O nome é obrigatório"),
  bio: z
    .string()
    .max(200, "A bio pode ter no máximo 200 caracteres")
    .optional()
    .or(z.literal("")),
  height: z.string().optional().or(z.literal("")),
  city: z.string().optional().or(z.literal("")),
  uf: z
    .string()
    .max(2, "UF deve ter no máximo 2 caracteres")
    .optional()
    .or(z.literal("")),
  whatsapp: z.string().optional().or(z.literal("")),
});

export type EditProfileFormValues = z.infer<typeof editProfileSchema>;
