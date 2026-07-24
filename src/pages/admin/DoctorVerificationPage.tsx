import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, BadgeCheck, AlertCircle, CheckCircle2, XCircle, 
  Stethoscope, Building2, Eye, ShieldCheck, Mail, Calendar, FileText
} from 'lucide-react';
import { GlassCard, Badge, Modal, Pagination, EmptyState, PrimaryButton, SecondaryButton } from '../../components/ui';

interface DoctorVerificationPageProps {
  doctors: any[];
  users: any[];
  hospitals: any[];
  onVerifyDoctor: (userId: string, verify: boolean) => void;
}

export default function DoctorVerificationPage({
  doctors = [],
  users = [],
  hospitals = [],
  onVerifyDoctor,
}: DoctorVerificationPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'verified' | 'revoked'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Doctor Inspection Modal State
  const [inspectDoc, setInspectDoc] = useState<any | null>(null);

  // Combine doctor data with user account details
  const enrichedDoctors = useMemo(() => {
    return doctors.map((doc) => {
      const userAcc = users.find((u) => u.id === doc.userId) || {};
      const hospitalObj = hospitals.find((h) => h.id === doc.hospitalId || h.name === doc.hospitalName);
      return {
        ...doc,
        userName: userAcc.name || 'Unknown Doctor',
        userEmail: userAcc.email || 'N/A',
        userRole: userAcc.role || 'doctor',
        createdAt: userAcc.createdAt || new Date().toISOString(),
        hospitalName: doc.hospitalName || hospitalObj?.name || 'Unassigned Hospital',
      };
    });
  }, [doctors, users, hospitals]);

  // Pending queue
  const pendingQueue = useMemo(() => {
    return enrichedDoctors.filter((d) => !d.isVerified);
  }, [enrichedDoctors]);

  // Filtered doctors
  const filteredDoctors = useMemo(() => {
    return enrichedDoctors.filter((doc) => {
      if (statusFilter === 'pending' && doc.isVerified) return false;
      if (statusFilter === 'verified' && !doc.isVerified) return false;

      const q = searchQuery.toLowerCase();
      if (q) {
        const matchesName = doc.userName.toLowerCase().includes(q);
        const matchesSpec = (doc.specialization || '').toLowerCase().includes(q);
        const matchesHosp = (doc.hospitalName || '').toLowerCase().includes(q);
        const matchesLic = (doc.licenseNumber || '').toLowerCase().includes(q);
        const matchesEmail = doc.userEmail.toLowerCase().includes(q);
        if (!matchesName && !matchesSpec && !matchesHosp && !matchesLic && !matchesEmail) return false;
      }
      return true;
    });
  }, [enrichedDoctors, searchQuery, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage) || 1;
  const paginatedDoctors = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredDoctors.slice(start, start + itemsPerPage);
  }, [filteredDoctors, currentPage, itemsPerPage]);

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-display font-bold text-white flex items-center gap-2">
            <Stethoscope className="w-6 h-6 text-[#38bdf8]" /> Practitioner Licensing & Verification Console
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Validate physician identity, state medical license numbers, and hospital affiliations before granting clinical authority.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#38bdf8]/10 text-[#38bdf8] border border-[#38bdf8]/20">
            Total Practitioners: {enrichedDoctors.length}
          </span>
          {pendingQueue.length > 0 && (
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse">
              {pendingQueue.length} Pending Approval
            </span>
          )}
        </div>
      </div>

      {/* Pending Verification Highlight Banner Queue */}
      {pendingQueue.length > 0 && (
        <GlassCard className="p-6 border border-amber-500/30 bg-amber-500/5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm font-display">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>Pending Physician Verifications Queue ({pendingQueue.length})</span>
            </div>
            <span className="text-xs text-slate-400 font-mono">Requires Administrator Sign-off</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingQueue.map((doc) => (
              <div key={doc.userId} className="p-4 bg-slate-950/90 border border-amber-500/20 rounded-2xl flex flex-col justify-between gap-3 hover:border-amber-500/40 transition">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-sm">Dr. {doc.userName}</h3>
                    <Badge variant="amber">Pending</Badge>
                  </div>
                  <p className="text-xs text-slate-300">{doc.specialization} • {doc.hospitalName}</p>
                  <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400 pt-1">
                    <span>License: <strong className="text-white">{doc.licenseNumber || 'N/A'}</strong></span>
                    <span>Email: <strong className="text-slate-300">{doc.userEmail}</strong></span>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/5">
                  <button
                    onClick={() => setInspectDoc(doc)}
                    className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold border border-white/10 transition cursor-pointer flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" /> Inspect
                  </button>
                  <button
                    onClick={() => onVerifyDoctor(doc.userId, true)}
                    className="px-4 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition cursor-pointer flex items-center gap-1 shadow-md shadow-emerald-500/20"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Approve License
                  </button>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {/* Toolbar: Search and Status Filter */}
      <GlassCard className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search doctor name, license, specialization..."
            className="w-full pl-9 pr-3 py-2 bg-slate-950/60 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 outline-none focus:border-[#38bdf8]"
          />
        </div>

        {/* Status Filter Buttons */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {[
            { id: 'all', label: 'All Doctors' },
            { id: 'pending', label: 'Pending Review' },
            { id: 'verified', label: 'Verified & Active' },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => {
                setStatusFilter(btn.id as any);
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition cursor-pointer shrink-0 ${
                statusFilter === btn.id
                  ? 'bg-[#38bdf8] text-slate-950 shadow-md shadow-[#38bdf8]/20'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Main Doctor List Table */}
      {filteredDoctors.length === 0 ? (
        <EmptyState
          title="No Doctors Found"
          description={searchQuery || statusFilter !== 'all' ? "No physicians match your filter or search criteria." : "No registered doctor profiles available."}
        />
      ) : (
        <GlassCard className="p-6 overflow-x-auto space-y-4">
          <table className="w-full text-left text-xs divide-y divide-white/5">
            <thead>
              <tr className="text-slate-400 uppercase font-mono font-bold text-[9px] tracking-wider pb-3">
                <th className="py-3 px-3">Physician Name</th>
                <th className="py-3 px-3">Specialization</th>
                <th className="py-3 px-3">Hospital Affiliation</th>
                <th className="py-3 px-3">License Number</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300 font-medium">
              {paginatedDoctors.map((doc) => (
                <tr key={doc.userId} className="hover:bg-white/5 transition">
                  <td className="py-3.5 px-3 font-bold text-white">
                    Dr. {doc.userName}
                    <span className="block text-[10px] text-slate-400 font-mono font-normal">{doc.userEmail}</span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-white/5 text-slate-200 border border-white/5">
                      {doc.specialization}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-slate-300 flex items-center gap-1.5 mt-2">
                    <Building2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span className="truncate">{doc.hospitalName}</span>
                  </td>
                  <td className="py-3.5 px-3 font-mono font-bold text-slate-200">{doc.licenseNumber || 'Unassigned'}</td>
                  <td className="py-3.5 px-3">
                    {doc.isVerified ? (
                      <span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono">
                        <BadgeCheck className="w-3.5 h-3.5" /> Licensed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono animate-pulse">
                        <AlertCircle className="w-3.5 h-3.5" /> Pending Review
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setInspectDoc(doc)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition cursor-pointer"
                        title="Inspect Credentials"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {doc.isVerified ? (
                        <button
                          onClick={() => onVerifyDoctor(doc.userId, false)}
                          className="px-3 py-1 rounded-xl text-[10px] font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 transition cursor-pointer"
                        >
                          Revoke
                        </button>
                      ) : (
                        <button
                          onClick={() => onVerifyDoctor(doc.userId, true)}
                          className="px-3 py-1 rounded-xl text-[10px] font-bold text-slate-950 bg-[#38bdf8] hover:bg-[#38bdf8]/90 transition cursor-pointer"
                        >
                          Approve
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pt-4 border-t border-white/10">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </GlassCard>
      )}

      {/* Doctor Inspection Modal */}
      {inspectDoc && (
        <Modal
          isOpen={!!inspectDoc}
          onClose={() => setInspectDoc(null)}
          title="Physician Credentials Audit"
        >
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="text-lg font-bold text-white font-display">Dr. {inspectDoc.userName}</h3>
                <p className="text-xs text-slate-400 font-mono">{inspectDoc.userEmail}</p>
              </div>
              {inspectDoc.isVerified ? (
                <Badge variant="emerald">Verified Physician</Badge>
              ) : (
                <Badge variant="amber">Pending Approval</Badge>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Specialization</span>
                <span className="font-bold text-white block mt-0.5">{inspectDoc.specialization}</span>
              </div>

              <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">State License ID</span>
                <span className="font-bold text-[#38bdf8] font-mono block mt-0.5">{inspectDoc.licenseNumber || 'Not provided'}</span>
              </div>

              <div className="p-3 bg-white/5 rounded-xl border border-white/5 col-span-2">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Affiliated Hospital</span>
                <span className="font-bold text-teal-400 block mt-0.5 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" /> {inspectDoc.hospitalName}
                </span>
              </div>
            </div>

            <div className="p-4 bg-slate-950/80 border border-white/10 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                <ShieldCheck className="w-4 h-4 text-[#38bdf8]" />
                <span>Verification Checklist</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1 font-mono list-disc pl-5">
                <li>Medical State Registry Record Match</li>
                <li>Hospital Network Whitelist Association ({inspectDoc.hospitalName})</li>
                <li>Verified Identity & Clinical Authority</li>
              </ul>
            </div>

            <div className="flex justify-between items-center pt-2">
              <SecondaryButton onClick={() => setInspectDoc(null)}>Close</SecondaryButton>
              {inspectDoc.isVerified ? (
                <button
                  onClick={() => {
                    onVerifyDoctor(inspectDoc.userId, false);
                    setInspectDoc(null);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 transition cursor-pointer"
                >
                  Revoke Clinical License
                </button>
              ) : (
                <PrimaryButton
                  icon={CheckCircle2}
                  onClick={() => {
                    onVerifyDoctor(inspectDoc.userId, true);
                    setInspectDoc(null);
                  }}
                >
                  Approve Physician License
                </PrimaryButton>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
