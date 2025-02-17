import { PaymentFrequency, TontineStatus } from '@/types';

export class PaymentService {
  static calculatePaymentSchedule(
    startDate: Date,
    frequency: PaymentFrequency,
    amount: number,
    totalRounds: number
  ): Date[] {
    const schedule: Date[] = [];
    let currentDate = new Date(startDate);

    for (let i = 0; i < totalRounds; i++) {
      schedule.push(new Date(currentDate));
      
      switch (frequency) {
        case PaymentFrequency.DAILY:
          currentDate.setDate(currentDate.getDate() + 1);
          break;
        case PaymentFrequency.WEEKLY:
          currentDate.setDate(currentDate.getDate() + 7);
          break;
        case PaymentFrequency.MONTHLY:
          currentDate.setMonth(currentDate.getMonth() + 1);
          break;
      }
    }

    return schedule;
  }

  static async validatePayment(
    tontineId: string,
    memberId: string,
    amount: number
  ): Promise<boolean> {
    const member = await prisma.tontineMember.findFirst({
      where: {
        id: memberId,
        tontineId,
        status: 'ACTIVE'
      },
      include: {
        tontine: true
      }
    });

    if (!member) return false;
    if (member.tontine.amount !== amount) return false;
    if (!member.nextPaymentDate) return false;

    const now = new Date();
    const paymentDue = new Date(member.nextPaymentDate);
    
    return now >= paymentDue;
  }
}