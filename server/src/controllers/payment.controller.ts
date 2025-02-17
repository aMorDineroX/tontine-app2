import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { NotificationService } from '../services/notification.service';

const prisma = new PrismaClient();

export class PaymentController {
  async createPayment(req: Request, res: Response) {
    try {
      const { tontineId, amount, method } = req.body;
      const userId = req.user.id;

      const payment = await prisma.payment.create({
        data: {
          tontineId,
          userId,
          amount,
          method,
          status: 'PENDING'
        },
        include: { user: true }
      });

      await NotificationService.createNotification({
        userId: payment.userId,
        type: 'PAYMENT_RECEIVED',
        title: 'Paiement reçu',
        message: `Votre paiement de ${amount} FCFA a été reçu`
      });

      res.status(201).json(payment);
    } catch (error) {
      res.status(500).json({ error: 'Failed to process payment' });
    }
  }

  async validatePayment(req: Request, res: Response) {
    try {
      const { paymentId } = req.params;
      
      const payment = await prisma.payment.update({
        where: { id: paymentId },
        data: { status: 'COMPLETED' },
        include: { user: true, tontine: true }
      });

      await NotificationService.createNotification({
        userId: payment.userId,
        type: 'PAYMENT_VALIDATED',
        title: 'Paiement validé',
        message: 'Votre paiement a été validé avec succès'
      });

      res.json(payment);
    } catch (error) {
      res.status(500).json({ error: 'Failed to validate payment' });
    }
  }
}