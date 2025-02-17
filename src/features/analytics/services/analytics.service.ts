import { PrismaClient } from '@prisma/client';
import { format, subMonths } from 'date-fns';

const prisma = new PrismaClient();

export class AnalyticsService {
  static async generateTontineStats(tontineId: string) {
    const tontine = await prisma.tontine.findUnique({
      where: { id: tontineId },
      include: {
        members: {
          include: {
            payments: true,
            penalties: true
          }
        }
      }
    });

    if (!tontine) throw new Error('Tontine not found');

    // Statistiques de participation
    const memberStats = tontine.members.map(member => ({
      userId: member.userId,
      totalPaid: member.payments.reduce((sum, p) => sum + p.amount, 0),
      paymentRate: (member.payments.length / tontine.totalRounds) * 100,
      penaltiesCount: member.penalties.length,
      totalPenalties: member.penalties.reduce((sum, p) => sum + p.amount, 0)
    }));

    // Statistiques globales
    const globalStats = {
      totalCollected: memberStats.reduce((sum, m) => sum + m.totalPaid, 0),
      expectedTotal: tontine.amount * tontine.members.length * tontine.totalRounds,
      completionRate: 0,
      totalPenalties: memberStats.reduce((sum, m) => sum + m.totalPenalties, 0),
      averagePaymentDelay: await this.calculateAveragePaymentDelay(tontineId)
    };

    globalStats.completionRate = (globalStats.totalCollected / globalStats.expectedTotal) * 100;

    return {
      globalStats,
      memberStats,
      roundStats: await this.generateRoundStats(tontineId)
    };
  }

  private static async calculateAveragePaymentDelay(tontineId: string) {
    const payments = await prisma.payment.findMany({
      where: { tontineId },
      include: { scheduledDate: true }
    });

    const delays = payments.map(payment => {
      const delay = payment.date.getTime() - payment.scheduledDate.getTime();
      return delay / (1000 * 60 * 60 * 24); // Convertir en jours
    });

    return delays.reduce((sum, delay) => sum + delay, 0) / delays.length;
  }

  static async generateGlobalStats() {
    const now = new Date();
    const sixMonthsAgo = subMonths(now, 6);

    const stats = await prisma.$transaction([
      // Statistiques globales
      prisma.tontine.count(),
      prisma.tontine.count({ where: { status: 'ACTIVE' } }),
      prisma.payment.aggregate({
        _sum: { amount: true },
        where: { date: { gte: sixMonthsAgo } }
      }),
      // Tendances mensuelles
      prisma.payment.groupBy({
        by: ['status'],
        _count: true,
        _sum: { amount: true }
      })
    ]);

    return {
      totalTontines: stats[0],
      activeTontines: stats[1],
      totalTransactions: stats[2]._sum.amount || 0,
      paymentStats: stats[3]
    };
  }

  private static generatePaymentHistory(payments: any[]) {
    return payments.reduce((acc, payment) => {
      const month = format(new Date(payment.date), 'MM/yyyy');
      if (!acc[month]) {
        acc[month] = {
          total: 0,
          count: 0
        };
      }
      acc[month].total += payment.amount;
      acc[month].count += 1;
      return acc;
    }, {});
  }
}
