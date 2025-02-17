export type Status = 'PENDING' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';

export type Frequency = 'DAILY' | 'WEEKLY' | 'MONTHLY';

export interface PaginationParams {
  page: number;
  limit: number;
  total: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
  pagination?: PaginationParams;
}