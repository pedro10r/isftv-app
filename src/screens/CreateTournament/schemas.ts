import * as z from "zod";
import { parseBrDate } from "@utils";

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

export const stepOneSchema = z
  .object({
    name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
    venue_name: z.string().min(3, "Local deve ter pelo menos 3 caracteres"),
    city: z.string().min(3, "Cidade deve ter pelo menos 3 caracteres"),
    start_date: z
      .string()
      .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Data inválida (DD/MM/AAAA)")
      .refine((val) => parseBrDate(val) !== null, "Data inválida")
      .refine((val) => {
        const date = parseBrDate(val);
        if (!date) return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date >= today;
      }, "A data de início deve ser hoje ou no futuro"),
    end_date: z
      .string()
      .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Data inválida (DD/MM/AAAA)")
      .refine((val) => parseBrDate(val) !== null, "Data inválida"),
    contact_whatsapp: z
      .string()
      .regex(
        /^\(\d{2}\) \d{5}-\d{4}$/,
        "WhatsApp inválido — use (99) 99999-9999",
      ),
    description: z.string().optional(),
  })
  .refine(
    (data) => {
      const start = parseBrDate(data.start_date);
      const end = parseBrDate(data.end_date);

      if (!start || !end) return true;
      return end >= start;
    },
    {
      message: "Data de fim deve ser igual ou após a data de início",
      path: ["end_date"],
    },
  );

export type CreateTournamentFormData = z.infer<typeof createTournamentSchema>;
export type StepOneFormData = z.infer<typeof stepOneSchema>;
