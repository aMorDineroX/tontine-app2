export interface AuditLogDto {
    userId: string;
    action: string;
    entityType: string;
    entityId: string;
    details?: Record<string, any>;
    ip: string;
  }