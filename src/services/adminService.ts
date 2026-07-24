import { api } from '../api';

export const adminService = {
  async getDashboard() {
    return api.getAdminDashboard();
  },

  async verifyDoctor(userId: string, verify: boolean) {
    return api.verifyDoctor(userId, verify);
  },

  async addHospital(hospitalData: { name: string; address: string }) {
    return api.addHospital(hospitalData);
  },
};
