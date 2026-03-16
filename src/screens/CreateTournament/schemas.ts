import * as z from "zod";

export const createTournamentSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  arena: z.string().min(3, "Arena deve ter pelo menos 3 caracteres"),
  city: z.string().min(1, "Cidade é obrigatória"),
  price: z.string().min(1, "Valor da inscrição é obrigatório"),
  startDate: z
    .string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Data inválida (DD/MM/AAAA)"),
  endDate: z
    .string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Data inválida (DD/MM/AAAA)"),
  categories: z.array(z.string()).min(1, "Selecione pelo menos uma categoria"),
  imageUri: z.string().optional(),
  prizeFirst: z.string().optional(),
  prizeSecond: z.string().optional(),
  prizeThird: z.string().optional(),
  prizeFourth: z.string().optional(),
});

export const stepOneSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  venue_name: z.string().min(3, "Local deve ter pelo menos 3 caracteres"),
  city: z.string().min(3, "Cidade deve ter pelo menos 3 caracteres"),
  start_date: z.string().min(10, "Data inválida (DD/MM/AAAA)"),
  end_date: z.string().min(10, "Data inválida (DD/MM/AAAA)"),
  contact_whatsapp: z
    .string()
    .min(10, "WhatsApp deve ter pelo menos 10 dígitos"),
});

export type CreateTournamentFormData = z.infer<typeof createTournamentSchema>;
export type StepOneFormData = z.infer<typeof stepOneSchema>;
