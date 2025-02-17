import { PrismaClient } from '@prisma/client';
import { AuditLogDto } from '../dto/audit.dto';

const prisma = new PrismaClient();

export class AuditService {
    static async logAction({
      userId,
      action,
      entityType,
      entityId,
      details,
      ip
    }: AuditLogDto) {
      return await prisma.auditLog.create({
        data: {
          userId,
          action,
          entityType,
          entityId,
          details,
          ip,
          timestamp: new Date()
        }
      });
    }
  
    static async getAuditTrail(filters: {
      entityType?: string;
      entityId?: string;
      userId?: string;
      startDate?: Date;
      endDate?: Date;
    }) {
      return await prisma.auditLog.findMany({
        where: filters,
        include: {
          user: {
            select: {
              id: true,
              name: true
            }
          }
        },
        orderBy: {
          timestamp: 'desc'
        }
      });
    }
  
    static async generateAuditReport(period: 'DAILY' | 'WEEKLY' | 'MONTHLY') {
      // Logique pour générer des rapports d'audit périodiques
    }
  }
