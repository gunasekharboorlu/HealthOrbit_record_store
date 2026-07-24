import { api } from '../api';
import { User } from '../types';

export const authService = {
  async register(data: {
    email: string;
    password: string;
    role: 'patient' | 'doctor' | 'admin';
    name: string;
    extraData?: Record<string, any>;
  }): Promise<{ user: User; token: string }> {
    return api.register(data);
  },

  async login(data: {
    email: string;
    password: string;
    role: 'patient' | 'doctor' | 'admin';
  }): Promise<{ user: User; token: string }> {
    return api.login(data);
  },

  async getCurrentUser(): Promise<User> {
    return api.me();
  },

  logout(): void {
    localStorage.removeItem('sihrms_token');
  },
};
