import { PrismaClient } from '@prisma/client';
import { NotificationService } from '@/features/notifications/services/notification.service';

const prisma = new PrismaClient();

export class RoundService {
  static async startNewRound(tontineId: string) {
    const tontine = await prisma.tontine.findUnique({
      where: { id: tontineId },
      include: {
        members: true
      }
    });

    if (!tontine || tontine.currentRound >= tontine.totalRounds) {
      throw new Error('Tour invalide ou tontine terminée');
    }

    // Déterminer le membre qui reçoit le montant
    const currentMember = tontine.members.find(m => 
      m.position === tontine.currentRound && !m.receivedAmount
    );

    if (!currentMember) {
      throw new Error('Membre non trouvé pour ce tour');
    }

    // Mettre à jour le statut du membre
    await prisma.tontineMember.update({
      where: { id: currentMember.id },
      data: { receivedAmount: true }
    });

    // Incrémenter le tour
    await prisma.tontine.update({
      where: { id: tontineId },
      data: { 
        currentRound: tontine.currentRound + 1,
        status: tontine.currentRound + 1 >= tontine.totalRounds ? 'COMPLETED' : 'ACTIVE'
      }
    });

    // Notifier les membres
    await NotificationService.notifyNewRound(tontineId);

    return { success: true };
  }

  static async calculateNextPayments(tontineId: string) {
    const tontine = await prisma.tontine.findUnique({
      where: { id: tontineId },
      include: {
        members: {
          include: {
            payments: true
          }
        }
      }
    });

    if (!tontine) throw new Error('Tontine non trouvée');

    // Calculer les prochains paiements pour chaque membre
    const nextPayments = tontine.members.map(member => {
      const paidAmount = member.payments.reduce((sum, p) => sum + p.amount, 0);
      const remainingAmount = (tontine.amount * tontine.totalRounds) - paidAmount;

      return {
        memberId: member.id,
        remainingAmount,
        nextPaymentDate: this.calculateNextPaymentDate(tontine.frequency)
      };
    });

    return nextPayments;
  }

  private static calculateNextPaymentDate(frequency: string): Date {
    const today = new Date();
    switch (frequency) {
      case 'DAILY':
        return new Date(today.setDate(today.getDate() + 1));
      case 'WEEKLY':
        return new Date(today.setDate(today.getDate() + 7));
      case 'MONTHLY':
        return new Date(today.setMonth(today.getMonth() + 1));
      default:
        return today;
    }
  }
}