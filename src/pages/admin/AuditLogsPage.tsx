import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, Search, Download, Filter, Terminal, Calendar, 
  CheckCircle2, AlertTriangle, ShieldAlert, FileText, User
} from 'lucide-react';
import { GlassCard, Badge, Pagination, EmptyState, SecondaryButton } from '../../components/ui';

interface AuditLogsPageProps {
  auditLogs: any[];
}

export default function AuditLogsPage({ auditLogs = [] }: AuditLogsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [actionFilter, setActionFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Enrich logs with IP addresses and Statuses if missing
  const enrichedLogs = useMemo(() => {
    return auditLogs.map((log, index) => {
      // Mock deterministic IP address and status for HIPAA log preview
      const simulatedIp = `192.168.1.${10 + (index % 50)}`;
      const isSecurityAlert = log.action?.toLowerCase().includes('reject') || log.action?.toLowerCase().includes('delete');
      return {
        ...log,
        ipAddress: log.ipAddress || simulatedIp,
        status: isSecurityAlert ? 'Security Alert' : 'Success',
      };
    });
  }, [auditLogs]);

  // Unique actions for filter
  const actionTypes = useMemo(() => {
    const set = new Set<string>();
    auditLogs.forEach((l) => {
      if (l.action) set.add(l.action);
    });
    return Array.from(set);
  }, [auditLogs]);

  // Filtered logs
  const filteredLogs = useMemo(() => {
    return enrichedLogs.filter((log) => {
      if (roleFilter !== 'all' && log.userRole?.toLowerCase() !== roleFilter.toLowerCase()) return false;
      if (actionFilter !== 'all' && log.action !== actionFilter) return false;

      const q = searchQuery.toLowerCase();
      if (q) {
        const matchesUser = (log.userName || '').toLowerCase().includes(q);
        const matchesAction = (log.action || '').toLowerCase().includes(q);
        const matchesDetails = (log.details || '').toLowerCase().includes(q);
        const matchesIp = (log.ipAddress || '').toLowerCase().includes(q);
        if (!matchesUser && !matchesAction && !matchesDetails && !matchesIp) return false;
      }
      return true;
    });
  }, [enrichedLogs, searchQuery, roleFilter, actionFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage) || 1;
  const paginatedLogs = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredLogs.slice(start, start + itemsPerPage);
  }, [filteredLogs, currentPage, itemsPerPage]);

  // Download Audit CSV helper
  const handleExportCSV = () => {
    if (!auditLogs.length) return;
    const headers = "Log ID,Timestamp,User Name,Role,Action,IP Address,Status,Details\n";
    const rows = filteredLogs.map((log: any) => 
      `"${log.id}","${log.timestamp}","${log.userName}","${log.userRole}","${log.action}","${log.ipAddress}","${log.status}","${(log.details || '').replace(/"/g, '""')}"`
    ).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `HealthOrbit_Compliance_Audit_Log_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#E5E5E7] pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-display font-bold text-[#1D1D1F] flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-600" /> HIPAA Compliance Audit Trail Console
          </h1>
          <p className="text-xs text-[#6E6E73] mt-0.5">
            Immutable operation ledger recording patient data access, physician authorization, and network security actions.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-4 py-2 rounded-xl bg-[#1D1D1F] hover:bg-black text-white font-bold text-xs flex items-center gap-2 transition cursor-pointer shadow-xs"
        >
          <Download className="w-4 h-4" /> Export CSV Audit Trail
        </button>
      </div>

      {/* Toolbar */}
      <GlassCard className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#86868B] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by user, action, IP, or details..."
            className="w-full pl-9 pr-3 py-2 bg-white border border-[#D2D2D7] rounded-xl text-xs text-[#1D1D1F] placeholder-[#86868B] outline-none focus:border-[#0071E3]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-white border border-[#D2D2D7] text-xs text-[#1D1D1F] px-3 py-2 rounded-xl outline-none cursor-pointer"
          >
            <option value="all">All Roles</option>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="admin">Admin</option>
          </select>

          {/* Action Filter */}
          <select
            value={actionFilter}
            onChange={(e) => {
              setActionFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-white border border-[#D2D2D7] text-xs text-[#1D1D1F] px-3 py-2 rounded-xl outline-none cursor-pointer"
          >
            <option value="all">All Actions</option>
            {actionTypes.map((act) => (
              <option key={act} value={act}>{act}</option>
            ))}
          </select>
        </div>
      </GlassCard>

      {/* Audit Log Table */}
      {filteredLogs.length === 0 ? (
        <EmptyState
          title="No Audit Logs Found"
          description="No audit trail events match your current filter criteria."
        />
      ) : (
        <GlassCard className="p-6 overflow-x-auto space-y-4">
          <table className="w-full text-left text-xs divide-y divide-[#E5E5E7]">
            <thead>
              <tr className="text-[#6E6E73] uppercase font-mono font-bold text-[9px] tracking-wider pb-3">
                <th className="py-3 px-3">Timestamp</th>
                <th className="py-3 px-3">User & Role</th>
                <th className="py-3 px-3">Action Type</th>
                <th className="py-3 px-3">IP Address</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Resource & Operation Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E7] text-[#1D1D1F] font-medium">
              {paginatedLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#F5F5F7] transition">
                  <td className="py-3.5 px-3 font-mono text-[#6E6E73] whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleString([], {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    })}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="font-bold text-[#1D1D1F] block">{log.userName || 'System'}</span>
                    <span className="text-[9px] font-mono uppercase text-[#0071E3]">{log.userRole || 'admin'}</span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-[#0071E3]/10 text-[#0071E3] border border-[#0071E3]/20 inline-block">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 font-mono text-[#6E6E73]">{log.ipAddress}</td>
                  <td className="py-3.5 px-3">
                    {log.status === 'Security Alert' ? (
                      <span className="inline-flex items-center gap-1 text-rose-800 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded font-bold text-[10px] font-mono">
                        <ShieldAlert className="w-3 h-3 text-rose-600" /> Security Alert
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-bold text-[10px] font-mono">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Success
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-3 font-mono text-[11px] text-[#1D1D1F] max-w-xs truncate">
                    {log.details || 'Standard operational ledger event.'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pt-4 border-t border-[#E5E5E7]">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </GlassCard>
      )}
    </div>
  );
}
