import * as z from "zod";

export const createTournamentSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  arena: z.string().min(3, "Arena deve ter pelo menos 3 caracteres"),
  price: z.string().min(1, "Valor da inscrição é obrigatório"),
  startDate: z.string().min(1, "Data de início é obrigatória"),
  endDate: z.string().min(1, "Data de fim é obrigatória"),
  categories: z.array(z.string()).min(1, "Selecione pelo menos uma categoria"),
  imageUri: z.string().optional(),
  prizeFirst: z.string().optional(),
  prizeSecond: z.string().optional(),
  prizeThird: z.string().optional(),
  prizeFourth: z.string().optional(),
});

export type CreateTournamentFormData = z.infer<typeof createTournamentSchema>;
