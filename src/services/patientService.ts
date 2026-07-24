import { api } from '../api';

export const patientService = {
  async getDashboard() {
    return api.getPatientDashboard();
  },

  async updateProfile(profileData: Record<string, any>) {
    return api.updateProfile(profileData);
  },

  async uploadRecord(recordData: {
    title: string;
    description: string;
    category: string;
    fileName: string;
    fileSize: string;
    fileContent: string;
    isSensitive?: boolean;
    targetPatientId?: string;
  }) {
    return api.uploadRecord(recordData);
  },

  async deleteRecord(recordId: string) {
    return api.deleteRecord(recordId);
  },

  async respondAccess(requestId: string, status: 'approved' | 'rejected') {
    return api.respondAccess(requestId, status);
  },

  async getAccessHistory() {
    return api.getAccessHistory();
  },

  async getEmergencyProfile(patientId: string) {
    return api.getEmergencyProfile(patientId);
  },
};
