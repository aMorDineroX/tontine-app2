import { z } from 'zod';

export const createTontineSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  description: z.string().optional(),
  amount: z.number().positive("Le montant doit être positif"),
  frequency: z.enum(["DAILY", "WEEKLY", "MONTHLY"], {
    errorMap: () => ({ message: "La fréquence doit être DAILY, WEEKLY ou MONTHLY" })
  }),
  membersCount: z.number().int().positive("Le nombre de membres doit être positif"),
  startDate: z.string().or(z.date()),
  endDate: z.string().or(z.date())
});

export const updateTontineSchema = createTontineSchema.partial();

export type CreateTontineInput = z.infer<typeof createTontineSchema>;
export type UpdateTontineInput = z.infer<typeof updateTontineSchema>;