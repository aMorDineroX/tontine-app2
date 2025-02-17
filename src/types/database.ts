// Modèles principaux de la base de données

interface UserModel {
  id: string;
  name: string;
  email: string;
  password: string; // Hashed
  phone: string;
  avatar?: string;
  rating: number;
  joinedAt: Date;
  role: 'ADMIN' | 'MEMBER';
}

interface TontineModel {
  id: string;
  name: string;
  description?: string;
  createdById: string;
  startDate: Date;
  endDate: Date;
  amount: number;
  frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY';
  membersCount: number;
  currentRound: number;
  totalRounds: number;
  status: 'PENDING' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
}

interface TontineMemberModel {
  id: string;
  tontineId: string;
  userId: string;
  joinedAt: Date;
  position: number;
  status: 'PENDING' | 'ACTIVE' | 'SUSPENDED';
  paymentStatus: 'UP_TO_DATE' | 'LATE' | 'DEFAULTED';
  nextPaymentDate: Date;
  totalContributed: number;
  receivedPayout: boolean;
  payoutDate?: Date;
}

export type { UserModel, TontineModel, TontineMemberModel };
