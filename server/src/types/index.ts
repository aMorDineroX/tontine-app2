export enum TontineStatus {
    PENDING = 'PENDING',
    ACTIVE = 'ACTIVE',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED'
  }
  
  export enum PaymentFrequency {
    DAILY = 'DAILY',
    WEEKLY = 'WEEKLY',
    MONTHLY = 'MONTHLY'
  }
  
  export interface TontineCreateInput {
    name: string;
    description?: string;
    amount: number;
    frequency: PaymentFrequency;
    membersCount: number;
    startDate: Date;
    endDate: Date;
  }

  export interface PaymentSchedule {
    memberId: string;
    userId: string;
    userName: string;
    nextPaymentDate: Date;
    amount: number;
    status: PaymentStatus;
  }

  export enum PaymentStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    LATE = 'LATE',
    FAILED = 'FAILED'
  }

  export interface RoundInfo {
    roundNumber: number;
    currentMember: {
      id: string;
      userId: string;
      name: string;
    };
    startDate: Date;
    endDate: Date;
    totalAmount: number;
    status: RoundStatus;
  }

  export enum RoundStatus {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED'
  }
  
