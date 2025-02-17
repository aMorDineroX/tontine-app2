import { AxiosInstance } from 'axios';
import { ApiResponse } from '../../types/common';

export class BaseService {
  constructor(
    protected readonly http: AxiosInstance,
    protected readonly baseUrl: string
  ) {}

  protected async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    const { data } = await this.http.get<ApiResponse<T>>(`${this.baseUrl}${endpoint}`);
    return data;
  }

  protected async post<T, D>(endpoint: string, payload: D): Promise<ApiResponse<T>> {
    const { data } = await this.http.post<ApiResponse<T>>(`${this.baseUrl}${endpoint}`, payload);
    return data;
  }

  protected async put<T, D>(endpoint: string, payload: D): Promise<ApiResponse<T>> {
    const { data } = await this.http.put<ApiResponse<T>>(`${this.baseUrl}${endpoint}`, payload);
    return data;
  }

  protected async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    const { data } = await this.http.delete<ApiResponse<T>>(`${this.baseUrl}${endpoint}`);
    return data;
  }
}
