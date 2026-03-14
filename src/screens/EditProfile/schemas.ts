import { z } from "zod";

export const editProfileSchema = z.object({
  full_name: z
    .string()
    .min(2, "Nome deve ter ao menos 2 caracteres")
    .nonempty("O nome é obrigatório"),
  username: z.string().optional().or(z.literal("")),
  bio: z
    .string()
    .max(200, "A bio pode ter no máximo 200 caracteres")
    .optional()
    .or(z.literal("")),
  height: z.string().optional().or(z.literal("")),
  weight: z.string().optional().or(z.literal("")),
});

export type EditProfileFormValues = z.infer<typeof editProfileSchema>;
