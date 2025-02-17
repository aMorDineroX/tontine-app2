import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class TontineController {
  async getAllTontines(req: Request, res: Response) {
    try {
      const tontines = await prisma.tontine.findMany({
        include: { members: true }
      });
      res.json(tontines);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch tontines' });
    }
  }

  async createTontine(req: Request, res: Response) {
    try {
      const tontine = await prisma.tontine.create({
        data: {
          ...req.body,
          createdBy: req.user.id
        },
        include: { members: true }
      });
      res.status(201).json(tontine);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create tontine' });
    }
  }

  async getTontineById(req: Request, res: Response) {
    try {
      const tontine = await prisma.tontine.findUnique({
        where: { id: req.params.id },
        include: { members: true, payments: true }
      });
      if (!tontine) {
        return res.status(404).json({ error: 'Tontine not found' });
      }
      res.json(tontine);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch tontine' });
    }
  }

  async processPayment(req: Request, res: Response) {
    try {
      const payment = await prisma.payment.create({
        data: {
          ...req.body,
          tontineId: req.params.id,
          userId: req.user.id
        }
      });
      res.status(201).json(payment);
    } catch (error) {
      res.status(500).json({ error: 'Failed to process payment' });
    }
  }
}
