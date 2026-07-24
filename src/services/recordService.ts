import { patientService } from './patientService';
import { filterRecordsByCategory, searchRecords, sortRecordsByDate } from '../utils';
import { MedicalRecord } from '../types';

export const recordService = {
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
    return patientService.uploadRecord(recordData);
  },

  async deleteRecord(recordId: string) {
    return patientService.deleteRecord(recordId);
  },

  filterAndSortRecords(
    records: MedicalRecord[],
    query: string = '',
    category: string = 'All',
    sortOrder: 'asc' | 'desc' = 'desc'
  ): MedicalRecord[] {
    let result = searchRecords(records, query);
    result = filterRecordsByCategory(result, category);
    return sortRecordsByDate(result, sortOrder);
  },
};
