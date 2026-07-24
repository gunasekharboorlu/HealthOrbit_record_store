import { api } from '../api';

export const doctorService = {
  async getDashboard() {
    return api.getDoctorDashboard();
  },

  async searchPatient(patientId: string) {
    return api.searchPatient(patientId);
  },

  async searchPatientByQuery(query: string) {
    return api.searchPatientByQuery(query);
  },

  async updateProfile(profileData: Record<string, any>) {
    return api.updateDoctorProfile(profileData);
  },

  async requestAccess(patientId: string, recordId: string) {
    return api.requestAccess(patientId, recordId);
  },

  async addPrescription(data: {
    patientId: string;
    diagnosis: string;
    medications: Array<{
      name: string;
      dosage: string;
      frequency: string;
      duration: string;
    }>;
  }) {
    return api.addPrescription(data);
  },

  async logAuditAction(action: string, details: string) {
    return api.logAction(action, details);
  },
};
