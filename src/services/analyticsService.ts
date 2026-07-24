import { MedicalRecord, AuditLog } from '../types';

export const analyticsService = {
  calculateCategoryDistribution(records: MedicalRecord[]) {
    const distribution: Record<string, number> = {};
    records.forEach((r) => {
      distribution[r.category] = (distribution[r.category] || 0) + 1;
    });
    return Object.entries(distribution).map(([name, value]) => ({ name, value }));
  },

  calculateAuditActivitySummary(logs: AuditLog[]) {
    const totalLogs = logs.length;
    const actionsMap: Record<string, number> = {};
    logs.forEach((log) => {
      actionsMap[log.action] = (actionsMap[log.action] || 0) + 1;
    });
    return {
      totalLogs,
      actionsMap,
    };
  },
};
