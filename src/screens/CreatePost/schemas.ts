import { z } from "zod";

export const createPostSchema = z.object({
  content: z
    .string()
    .min(1, "A resenha não pode ser vazia")
    .max(500, "Máximo de 500 caracteres"),
  mediaUrl: z.string().optional(),
  isVideo: z.boolean(),
});

export type CreatePostFormValues = z.infer<typeof createPostSchema>;
