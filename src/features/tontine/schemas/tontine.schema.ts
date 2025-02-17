import { z } from 'zod'

export const tontineSchema = z.object({
  name: z.string().min(3, 'Le nom doit contenir au moins 3 caractères'),
  description: z.string().optional(),
  amount: z.number().min(1000, 'Le montant minimum est de 1000'),
  frequency: z.enum(['DAILY', 'WEEKLY', 'MONTHLY']),
  membersCount: z.number().min(2, 'Minimum 2 membres requis'),
  startDate: z.date().min(new Date(), 'La date de début doit être future'),
  totalRounds: z.number().min(1, 'Au moins 1 tour requis')
})

export const memberSchema = z.object({
  userId: z.string().uuid(),
  position: z.number().min(1),
  role: z.enum(['ADMIN', 'MEMBER'])
})

export const paymentSchema = z.object({
  amount: z.number().positive(),
  method: z.enum(['MOBILE_MONEY', 'BANK_TRANSFER', 'CASH']),
  roundNumber: z.number().min(1),
  proofOfPayment: z.string().optional()
})