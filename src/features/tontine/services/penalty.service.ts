export class PenaltyService {
    static async assessLatePayment(paymentId: string) {
      const payment = await prisma.payment.findUnique({
        where: { id: paymentId },
        include: {
          tontine: {
            include: { penaltyRules: true }
          }
        }
      });
  
      if (!payment) throw new Error('Payment not found');
  
      const { scheduledDate, date, tontine } = payment;
      const daysLate = Math.floor((date.getTime() - scheduledDate.getTime()) / (1000 * 60 * 60 * 24));
  
      if (daysLate <= 0) return null;
  
      // Calculer la pénalité selon les règles
      const penaltyAmount = this.calculatePenaltyAmount(daysLate, tontine.penaltyRules);
  
      // Créer la pénalité
      const penalty = await prisma.penalty.create({
        data: {
          tontineId: tontine.id,
          memberId: payment.memberId,
          amount: penaltyAmount,
          reason: 'LATE_PAYMENT',
          daysLate,
          status: 'PENDING'
        }
      });
  
      // Notifier le membre
      await NotificationService.notifyPenalty(penalty.id);
  
      return penalty;
    }
  
    static async applyAbsencePenalty(memberId: string, meetingId: string) {
      const meeting = await prisma.tontineMeeting.findUnique({
        where: { id: meetingId },
        include: { tontine: true }
      });
  
      if (!meeting) throw new Error('Meeting not found');
  
      const penalty = await prisma.penalty.create({
        data: {
          tontineId: meeting.tontineId,
          memberId,
          amount: meeting.tontine.absencePenaltyAmount,
          reason: 'ABSENCE',
          status: 'PENDING'
        }
      });
  
      await NotificationService.notifyPenalty(penalty.id);
      return penalty;
    }
  
    static async processPenaltyPayment(penaltyId: string, amount: number) {
      const penalty = await prisma.penalty.findUnique({
        where: { id: penaltyId }
      });
  
      if (!penalty || penalty.status !== 'PENDING') {
        throw new Error('Invalid penalty or already paid');
      }
  
      if (amount !== penalty.amount) {
        throw new Error('Invalid payment amount');
      }
  
      await prisma.penalty.update({
        where: { id: penaltyId },
        data: {
          status: 'PAID',
          paidDate: new Date()
        }
      });
  
      // Mettre à jour le pot commun de la tontine
      await this.updateTontinePot(penalty.tontineId, amount);
    }
  
    private static calculatePenaltyAmount(daysLate: number, rules: PenaltyRule[]) {
      // Logique de calcul des pénalités selon les règles définies
      // Retourne le montant de la pénalité
    }
  }