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

export interface TontineType {
  id: string;
  name: string;
  description?: string;
  amount: number;
  frequency: PaymentFrequency;
  membersCount: number;
  startDate: Date;
  endDate: Date;
  status: TontineStatus;
  creatorId: string;
  currentRound: number;
  totalRounds: number;
}

export interface TontineMember {
  id: string;
  userId: string;
  tontineId: string;
  joinedAt: Date;
  position: number;
  status: 'PENDING' | 'ACTIVE' | 'BLOCKED';
  receivedAmount?: boolean;
  nextPaymentDate?: Date;
}

export interface Payment {
  id: string;
  amount: number;
  memberId: string;
  tontineId: string;
  date: Date;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  round: number;
}