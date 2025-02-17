import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type NotificationType = 'PAYMENT_DUE' | 'BID_OUTBID' | 'ROUND_STARTED' | 'ROUND_ENDED';

interface NotificationData {
  type: NotificationType;
  title: string;
  message: string;
  recipientId: string;
  metadata?: Record<string, any>;
}

export class NotificationService {
  static async create(data: NotificationData) {
    return await prisma.notification.create({
      data: {
        type: data.type,
        title: data.title,
        message: data.message,
        userId: data.recipientId,
        metadata: data.metadata
      }
    });
  }

  static async markAsRead(notificationId: string) {
    return await prisma.notification.update({
      where: { id: notificationId },
      data: { readAt: new Date() }
    });
  }

  static async getUserNotifications(userId: string) {
    return await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
  }
}
