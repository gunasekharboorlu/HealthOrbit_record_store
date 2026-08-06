import React, { useState, useMemo } from 'react';
import { 
  Search, Users, Eye, FileText, Heart, ShieldAlert, ShieldCheck, 
  User, Droplets, Calendar, Activity, Lock
} from 'lucide-react';
import { GlassCard, Badge, Modal, Pagination, EmptyState, SecondaryButton } from '../../components/ui';

interface PatientManagementPageProps {
  patients: any[];
  users: any[];
  auditLogs?: any[];
}

export default function PatientManagementPage({
  patients = [],
  users = [],
  auditLogs = [],
}: PatientManagementPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [bloodFilter, setBloodFilter] = useState('all');
  const [emergencyFilter, setEmergencyFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Selected patient for modal inspection
  const [inspectPatient, setInspectPatient] = useState<any | null>(null);
  const [recordsModalPatient, setRecordsModalPatient] = useState<any | null>(null);

  // Combine patient details with user account
  const enrichedPatients = useMemo(() => {
    return patients.map((p) => {
      const userAcc = users.find((u) => u.id === p.userId) || {};
      const patientLogs = auditLogs.filter((l) => l.userId === p.userId);
      return {
        ...p,
        userName: userAcc.name || 'Unknown Patient',
        userEmail: userAcc.email || 'N/A',
        createdAt: userAcc.createdAt || new Date().toISOString(),
        activityCount: patientLogs.length,
      };
    });
  }, [patients, users, auditLogs]);

  // Filtered patients
  const filteredPatients = useMemo(() => {
    return enrichedPatients.filter((p) => {
      if (bloodFilter !== 'all' && p.bloodGroup !== bloodFilter) return false;
      if (emergencyFilter === 'complete' && !p.isEmergencyProfileComplete) return false;
      if (emergencyFilter === 'incomplete' && p.isEmergencyProfileComplete) return false;

      const q = searchQuery.toLowerCase();
      if (q) {
        const matchesName = p.userName.toLowerCase().includes(q);
        const matchesId = (p.patientId || '').toLowerCase().includes(q);
        const matchesEmail = p.userEmail.toLowerCase().includes(q);
        const matchesBlood = (p.bloodGroup || '').toLowerCase().includes(q);
        if (!matchesName && !matchesId && !matchesEmail && !matchesBlood) return false;
      }
      return true;
    });
  }, [enrichedPatients, searchQuery, bloodFilter, emergencyFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage) || 1;
  const paginatedPatients = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredPatients.slice(start, start + itemsPerPage);
  }, [filteredPatients, currentPage, itemsPerPage]);

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#E5E5E7] pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-display font-bold text-[#1D1D1F] flex items-center gap-2">
            <Users className="w-6 h-6 text-emerald-600" /> Decentralized Patient Directory
          </h1>
          <p className="text-xs text-[#6E6E73] mt-0.5">
            Monitor patient accounts, emergency contact readiness, and HIPAA vault security governance.
          </p>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
          Total Patient Vaults: {enrichedPatients.length}
        </span>
      </div>

      {/* Toolbar: Search & Filters */}
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
            placeholder="Search patient name, ID, email..."
            className="w-full pl-9 pr-3 py-2 bg-white border border-[#D2D2D7] rounded-xl text-xs text-[#1D1D1F] placeholder-[#86868B] outline-none focus:border-[#0071E3]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Blood group dropdown */}
          <select
            value={bloodFilter}
            onChange={(e) => {
              setBloodFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-white border border-[#D2D2D7] text-xs text-[#1D1D1F] px-3 py-2 rounded-xl outline-none cursor-pointer"
          >
            <option value="all">All Blood Groups</option>
            <option value="O-Positive">O-Positive</option>
            <option value="O-Negative">O-Negative</option>
            <option value="A-Positive">A-Positive</option>
            <option value="B-Positive">B-Positive</option>
            <option value="AB-Positive">AB-Positive</option>
          </select>

          {/* Emergency Card status */}
          <select
            value={emergencyFilter}
            onChange={(e) => {
              setEmergencyFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-white border border-[#D2D2D7] text-xs text-[#1D1D1F] px-3 py-2 rounded-xl outline-none cursor-pointer"
          >
            <option value="all">All Emergency Statuses</option>
            <option value="complete">Emergency Profile Ready</option>
            <option value="incomplete">Awaiting Emergency Setup</option>
          </select>
        </div>
      </GlassCard>

      {/* Patient Table */}
      {filteredPatients.length === 0 ? (
        <EmptyState
          title="No Patients Found"
          description="No patient accounts match the filter criteria."
        />
      ) : (
        <GlassCard className="p-6 overflow-x-auto space-y-4">
          <table className="w-full text-left text-xs divide-y divide-[#E5E5E7]">
            <thead>
              <tr className="text-[#6E6E73] uppercase font-mono font-bold text-[9px] tracking-wider pb-3">
                <th className="py-3 px-3">Patient Registry ID</th>
                <th className="py-3 px-3">Name</th>
                <th className="py-3 px-3">Birth Date / Gender</th>
                <th className="py-3 px-3">Blood Group</th>
                <th className="py-3 px-3">Emergency Status</th>
                <th className="py-3 px-3">Account Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E7] text-[#1D1D1F] font-medium">
              {paginatedPatients.map((p) => (
                <tr key={p.userId} className="hover:bg-[#F5F5F7] transition">
                  <td className="py-3.5 px-3 font-mono font-bold text-[#0071E3]">{p.patientId}</td>
                  <td className="py-3.5 px-3 font-bold text-[#1D1D1F]">
                    {p.userName}
                    <span className="block text-[10px] text-[#6E6E73] font-mono font-normal">{p.userEmail}</span>
                  </td>
                  <td className="py-3.5 px-3 text-[#1D1D1F]">
                    {p.dob || 'N/A'} <span className="text-[#86868B]">• {p.gender || 'N/A'}</span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-teal-50 text-teal-800 border border-teal-200">
                      {p.bloodGroup || 'Unspecified'}
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    {p.isEmergencyProfileComplete ? (
                      <span className="inline-flex items-center gap-1 text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono">
                        <Heart className="w-3 h-3 text-emerald-600" /> Complete
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono">
                        Incomplete
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      Active Vault
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setInspectPatient(p)}
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold text-[#1D1D1F] bg-white hover:bg-[#F5F5F7] border border-[#D2D2D7] transition cursor-pointer flex items-center gap-1"
                      >
                        <User className="w-3.5 h-3.5 text-[#0071E3]" /> Profile
                      </button>
                      <button
                        onClick={() => setRecordsModalPatient(p)}
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold text-[#0071E3] bg-[#0071E3]/10 hover:bg-[#0071E3]/20 border border-[#0071E3]/20 transition cursor-pointer flex items-center gap-1"
                      >
                        <FileText className="w-3.5 h-3.5" /> Records
                      </button>
                    </div>
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

      {/* Patient Profile Modal */}
      {inspectPatient && (
        <Modal
          isOpen={!!inspectPatient}
          onClose={() => setInspectPatient(null)}
          title="Patient Vault Governance Profile"
        >
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-[#E5E5E7] pb-3">
              <div>
                <h3 className="text-lg font-bold text-[#1D1D1F] font-display">{inspectPatient.userName}</h3>
                <p className="text-xs text-[#6E6E73] font-mono">ID: {inspectPatient.patientId}</p>
              </div>
              <Badge variant="emerald">Active Account</Badge>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#F5F5F7] rounded-xl border border-[#E5E5E7]">
                <span className="text-[10px] text-[#6E6E73] uppercase font-mono block">Email</span>
                <span className="font-bold text-[#1D1D1F] block mt-0.5 truncate">{inspectPatient.userEmail}</span>
              </div>
              <div className="p-3 bg-[#F5F5F7] rounded-xl border border-[#E5E5E7]">
                <span className="text-[10px] text-[#6E6E73] uppercase font-mono block">Blood Group</span>
                <span className="font-bold text-teal-700 font-mono block mt-0.5">{inspectPatient.bloodGroup || 'Unspecified'}</span>
              </div>
              <div className="p-3 bg-[#F5F5F7] rounded-xl border border-[#E5E5E7]">
                <span className="text-[10px] text-[#6E6E73] uppercase font-mono block">Date of Birth</span>
                <span className="font-bold text-[#1D1D1F] block mt-0.5">{inspectPatient.dob || 'Not provided'}</span>
              </div>
              <div className="p-3 bg-[#F5F5F7] rounded-xl border border-[#E5E5E7]">
                <span className="text-[10px] text-[#6E6E73] uppercase font-mono block">Gender</span>
                <span className="font-bold text-[#1D1D1F] block mt-0.5">{inspectPatient.gender || 'Not provided'}</span>
              </div>
            </div>

            <div className="p-4 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl space-y-2">
              <span className="text-xs font-bold text-amber-800 flex items-center gap-1.5 font-mono uppercase">
                <Heart className="w-4 h-4 text-rose-600" /> Emergency Profile Summary
              </span>
              <div className="text-xs text-[#1D1D1F] space-y-1 font-mono">
                <p>Contact: <strong className="text-[#1D1D1F]">{inspectPatient.emergencyContactName || 'N/A'}</strong> ({inspectPatient.emergencyContactRelation || 'Relation N/A'})</p>
                <p>Phone: <strong className="text-[#1D1D1F]">{inspectPatient.emergencyContactPhone || 'N/A'}</strong></p>
                <p>Known Allergies: <strong className="text-amber-800">{inspectPatient.allergies || 'None recorded'}</strong></p>
                <p>Chronic Conditions: <strong className="text-teal-800">{inspectPatient.chronicDiseases || 'None recorded'}</strong></p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <SecondaryButton onClick={() => setInspectPatient(null)}>Close Governance View</SecondaryButton>
            </div>
          </div>
        </Modal>
      )}

      {/* Patient Records Security Rules Modal */}
      {recordsModalPatient && (
        <Modal
          isOpen={!!recordsModalPatient}
          onClose={() => setRecordsModalPatient(null)}
          title={`Medical Record Vault Governance (${recordsModalPatient.userName})`}
        >
          <div className="space-y-4">
            <div className="p-4 bg-[#F5F5F7] border border-[#0071E3]/30 rounded-2xl space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[#0071E3] font-bold font-mono uppercase">
                <Lock className="w-4 h-4" /> HIPAA Security Rule Compliance Notice
              </div>
              <p className="text-[#6E6E73] leading-relaxed">
                As an Administrator, you oversee vault metadata, access permissions, and audit trails. Direct medical report contents are protected under HIPAA Privacy Rules and end-to-end encryption.
              </p>
            </div>

            <div className="p-4 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-[#6E6E73] font-mono text-[10px] uppercase">Patient Vault ID</span>
                <span className="font-bold text-[#0071E3] font-mono">{recordsModalPatient.patientId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#6E6E73] font-mono text-[10px] uppercase">Vault Security Status</span>
                <span className="font-bold text-emerald-700 font-mono">AES-256-GCM Encrypted</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#6E6E73] font-mono text-[10px] uppercase">Audit Events Recorded</span>
                <span className="font-bold text-[#1D1D1F] font-mono">{recordsModalPatient.activityCount} events</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <SecondaryButton onClick={() => setRecordsModalPatient(null)}>Close</SecondaryButton>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
