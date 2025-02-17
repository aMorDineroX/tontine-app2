export class NotificationService {
  static async createNotification({
    userId,
    type,
    title,
    message,
    data,
    priority = 'NORMAL'
  }: CreateNotificationDto) {
    const notification = await prisma.notification.create({
      data: {
        userId,
        type,
        title,
        message,
        data,
        priority,
        status: 'UNREAD'
      }
    });

    // Envoyer via différents canaux selon les préférences
    await this.dispatchNotification(notification);

    return notification;
  }

  static async dispatchNotification(notification: Notification) {
    const userPreferences = await this.getUserNotificationPreferences(notification.userId);

    if (userPreferences.email) {
      await EmailService.sendNotificationEmail(notification);
    }

    if (userPreferences.sms && notification.priority === 'HIGH') {
      await SmsService.sendNotificationSms(notification);
    }

    if (userPreferences.push) {
      await PushNotificationService.sendPushNotification(notification);
    }
  }

  static async getUnreadNotifications(userId: string) {
    return await prisma.notification.findMany({
      where: {
        userId,
        status: 'UNREAD'
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }
}