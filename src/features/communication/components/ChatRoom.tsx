import prisma from '@/lib/prisma';
import { NotificationService } from '@/features/notifications/services/notification.service';

export class MessagingService {
    static async sendMessage(data: {
      senderId: string;
      receiverId: string;
      tontineId: string;
      content: string;
      type: 'DIRECT' | 'GROUP' | 'ANNOUNCEMENT'
    }) {
      const message = await prisma.message.create({
        data: {
          ...data,
          status: 'SENT',
          readAt: null
        }
      });
  
      // Notification en temps réel via WebSocket
      await NotificationService.createNotification({
        userId: data.receiverId,
        type: 'MESSAGE',
        title: 'Nouveau message',
        message: data.content,
        data: { messageId: message.id, tontineId: data.tontineId },
        priority: 'NORMAL'
      });
      
      return message;
    }
  
    static async getConversation(userId: string, tontineId: string) {
      return await prisma.message.findMany({
        where: {
          tontineId,
          OR: [
            { senderId: userId },
            { receiverId: userId }
          ]
        },
        include: {
          sender: {
            select: {
              id: true,
              name: true,
              avatar: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
    }
  
    static async markAsRead(messageId: string, userId: string) {
      return await prisma.message.update({
        where: {
          id: messageId,
          receiverId: userId
        },
        data: {
          readAt: new Date()
        }
      });
    }
  }
