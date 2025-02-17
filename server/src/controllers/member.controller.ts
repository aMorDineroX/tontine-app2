import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { NotificationService } from '../services/notification.service';

const prisma = new PrismaClient();

export class MemberController {
  async addMember(req: Request, res: Response) {
    try {
      const { tontineId, userId, position } = req.body;
      
      const member = await prisma.tontineMember.create({
        data: {
          tontineId,
          userId,
          position,
          status: 'PENDING',
          paymentStatus: 'PENDING'
        },
        include: { user: true }
      });

      await NotificationService.createNotification({
        userId,
        type: 'MEMBER_ADDED',
        title: 'Nouvelle invitation',
        message: 'Vous avez été invité à rejoindre une tontine'
      });

      res.status(201).json(member);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add member' });
    }
  }

  async updateMemberStatus(req: Request, res: Response) {
    try {
      const { memberId } = req.params;
      const { status } = req.body;

      const member = await prisma.tontineMember.update({
        where: { id: memberId },
        data: { status },
        include: { user: true }
      });

      res.json(member);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update member status' });
    }
  }
}