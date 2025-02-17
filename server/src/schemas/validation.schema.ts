import { z } from 'zod'

export const createTontineSchema = z.object({
  body: z.object({
    name: z.string().min(3),
    description: z.string().optional(),
    amount: z.number().min(1000),
    frequency: z.enum(['DAILY', 'WEEKLY', 'MONTHLY']),
    membersCount: z.number().min(2),
    startDate: z.string().transform(str => new Date(str)),
    totalRounds: z.number().min(1)
  })
})

export const updateTontineSchema = z.object({
  params: z.object({
    id: z.string().uuid()
  }),
  body: createTontineSchema.shape.body.partial()
})

export const paymentSchema = z.object({
  body: z.object({
    amount: z.number().positive(),
    method: z.enum(['MOBILE_MONEY', 'BANK_TRANSFER', 'CASH']),
    tontineId: z.string().uuid(),
    roundNumber: z.number().min(1)
  })
})