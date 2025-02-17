import axios from 'axios';
import { TontineType, TontineMember, Payment } from '@/types/tontine';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const tontineApi = {
  async createTontine(data: Omit<TontineType, 'id' | 'status' | 'creatorId'>) {
    const response = await axios.post(`${API_URL}/tontines`, data);
    return response.data;
  },

  async getTontines() {
    const response = await axios.get(`${API_URL}/tontines`);
    return response.data;
  },

  async getTontineById(id: string) {
    const response = await axios.get(`${API_URL}/tontines/${id}`);
    return response.data;
  },

  async joinTontine(tontineId: string) {
    const response = await axios.post(`${API_URL}/tontines/${tontineId}/join`);
    return response.data;
  },

  async makePayment(tontineId: string, amount: number) {
    const response = await axios.post(`${API_URL}/tontines/${tontineId}/payments`, {
      amount
    });
    return response.data;
  },

  async getTontineMembers(tontineId: string) {
    const response = await axios.get(`${API_URL}/tontines/${tontineId}/members`);
    return response.data;
  },

  async getTontinePayments(tontineId: string) {
    const response = await axios.get(`${API_URL}/tontines/${tontineId}/payments`);
    return response.data;
  }
};