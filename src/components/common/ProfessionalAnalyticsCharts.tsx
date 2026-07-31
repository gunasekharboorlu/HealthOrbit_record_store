import React from 'react';
import { 
  Activity, ShieldCheck, Lock, Users, Stethoscope, 
  FileText, CheckCircle2, Clock, ShieldAlert, Sparkles, HardDrive, ArrowUpRight
} from 'lucide-react';
import { GlassCard } from '../ui';
import { MedicalRecord } from '../../types';

interface ProfessionalAnalyticsChartsProps {
  role?: 'patient' | 'doctor' | 'admin';
  records?: MedicalRecord[];
  pendingRequests?: any[];
  accessHistory?: any[];
  doctorStats?: any;
  adminData?: any;
}

export default function ProfessionalAnalyticsCharts({
  role = 'patient',
  records = [],
  pendingRequests = [],
  accessHistory = [],
  doctorStats = {},
  adminData = {},
}: ProfessionalAnalyticsChartsProps) {
  // Compute real metrics from props
  const totalRecords = records.length;
  const sensitiveRecords = records.filter(r => r.isSensitive).length;
  const verifiedRecords = records.filter(r => r.trustBadge === 'verified_hospital').length;
  const patientSelfReported = totalRecords - verifiedRecords;

  // Real Category breakdown from real records
  const categoryCounts = records.reduce((acc: Record<string, number>, rec) => {
    const cat = rec.category || 'Other';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const categoryArray = Object.entries(categoryCounts).map(([cat, count]) => ({
    name: cat,
    count,
    percentage: totalRecords > 0 ? Math.round((count / totalRecords) * 100) : 0,
  }));

  if (role === 'patient') {
    return (
      <GlassCard className="p-6 md:p-8 space-y-6 bg-gradient-to-br from-[#0a0f2b]/80 via-[#0f173b]/60 to-[#020617]/90 border border-white/10">
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#38bdf8]/15 text-[#38bdf8] border border-[#38bdf8]/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-display text-white">Cryptographic Vault & Ledger Status</h3>
              <p className="text-xs text-slate-400">Real-time breakdown of stored clinical documents & zero-trust security state.</p>
            </div>
          </div>
          <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            SHA-256 Ledger Integrity Active
          </span>
        </div>

        {/* Real Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Real Category Distribution */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#38bdf8]" /> Category Breakdown ({totalRecords} Total Records)
            </h4>

            {categoryArray.length === 0 ? (
              <div className="p-8 text-center bg-white/5 rounded-2xl border border-white/5 space-y-2">
                <HardDrive className="w-8 h-8 text-slate-500 mx-auto" />
                <p className="text-xs text-slate-300 font-medium">No medical documents uploaded yet</p>
                <p className="text-[11px] text-slate-500">Upload lab reports or prescriptions to view category analytics.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {categoryArray.map((cat) => (
                  <div key={cat.name} className="space-y-1.5 p-3 bg-slate-950/60 rounded-xl border border-white/5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-200 font-bold">{cat.name}</span>
                      <span className="text-[#38bdf8] font-bold">{cat.count} records ({cat.percentage}%)</span>
                    </div>
                    <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#38bdf8] to-[#22d3ee] rounded-full transition-all duration-500"
                        style={{ width: `${cat.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Security & Verification Status */}
          <div className="space-y-4 bg-slate-950/80 p-5 rounded-2xl border border-white/5 flex flex-col justify-between">
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Lock className="w-4 h-4 text-purple-400" /> Ledger Security Policy
              </h4>

              <div className="space-y-2.5 text-xs font-mono">
                <div className="flex justify-between p-2.5 bg-white/5 rounded-xl border border-white/5">
                  <span className="text-slate-400">Clinic Verified:</span>
                  <span className="text-emerald-400 font-bold">{verifiedRecords} Documents</span>
                </div>
                <div className="flex justify-between p-2.5 bg-white/5 rounded-xl border border-white/5">
                  <span className="text-slate-400">Self-Reported:</span>
                  <span className="text-slate-200 font-bold">{patientSelfReported} Documents</span>
                </div>
                <div className="flex justify-between p-2.5 bg-white/5 rounded-xl border border-white/5">
                  <span className="text-slate-400">Privacy Locked:</span>
                  <span className="text-purple-400 font-bold">{sensitiveRecords} Protected</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Decaying Token Standard</span>
              <span className="font-mono text-[#38bdf8] font-bold">24 Hours Auto-Revoke</span>
            </div>
          </div>

        </div>
      </GlassCard>
    );
  }

  if (role === 'doctor') {
    const pendingCount = doctorStats.pendingAccessRequests || pendingRequests.length || 0;
    const activeClearances = doctorStats.approvedAccessRequests || 0;

    return (
      <GlassCard className="p-6 md:p-8 space-y-6 bg-gradient-to-br from-[#0a0f2b]/80 via-[#0f173b]/60 to-[#020617]/90 border border-white/10">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/15 text-purple-400 border border-purple-500/30">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-display text-white">Practitioner Clearance & Patient Registry Status</h3>
              <p className="text-xs text-slate-400">Real-time clinical access approvals and verified hospital authorization node.</p>
            </div>
          </div>
          <span className="text-[11px] font-mono font-bold text-teal-400 bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded-full">
            ● Authorized Practitioner Node
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-950/70 border border-white/5 rounded-2xl space-y-1">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Active 24-Hr Unlocks</span>
            <div className="text-2xl font-black text-emerald-400 font-mono">{activeClearances}</div>
            <p className="text-[11px] text-slate-400">Records accessible via patient granted token</p>
          </div>

          <div className="p-4 bg-slate-950/70 border border-white/5 rounded-2xl space-y-1">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Pending Requests</span>
            <div className="text-2xl font-black text-amber-400 font-mono">{pendingCount}</div>
            <p className="text-[11px] text-slate-400">Clearances awaiting patient confirmation</p>
          </div>

          <div className="p-4 bg-slate-950/70 border border-white/5 rounded-2xl space-y-1">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Total Patients Consulted</span>
            <div className="text-2xl font-black text-[#38bdf8] font-mono">{doctorStats.totalPatientsViewed || 0}</div>
            <p className="text-[11px] text-slate-400">Unique patient registry interactions</p>
          </div>
        </div>
      </GlassCard>
    );
  }

  // Admin View
  const totalPatients = adminData.patients?.length || 0;
  const totalDoctors = adminData.doctors?.length || 0;
  const totalHospitals = adminData.hospitals?.length || 0;
  const verifiedDoctors = adminData.doctors?.filter((d: any) => d.isVerified).length || 0;

  return (
    <GlassCard className="p-6 md:p-8 space-y-6 bg-gradient-to-br from-[#0a0f2b]/80 via-[#0f173b]/60 to-[#020617]/90 border border-white/10">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold font-display text-white">System Security & Network Real-Time Status</h3>
            <p className="text-xs text-slate-400">Verified counts for registered users, partner clinics, and licensing status.</p>
          </div>
        </div>
        <span className="text-[11px] font-mono font-bold text-[#38bdf8] bg-[#38bdf8]/10 border border-[#38bdf8]/20 px-3 py-1 rounded-full">
          Zero-Trust Compliance Standard
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
        <div className="p-4 bg-slate-950/70 rounded-2xl border border-white/5 space-y-1">
          <span className="text-slate-400 font-bold block">Patient Ledger Accounts</span>
          <span className="text-xl font-black text-white">{totalPatients}</span>
        </div>
        <div className="p-4 bg-slate-950/70 rounded-2xl border border-white/5 space-y-1">
          <span className="text-slate-400 font-bold block">Registered Physicians</span>
          <span className="text-xl font-black text-[#38bdf8]">{totalDoctors} ({verifiedDoctors} Verified)</span>
        </div>
        <div className="p-4 bg-slate-950/70 rounded-2xl border border-white/5 space-y-1">
          <span className="text-slate-400 font-bold block">Whitelisted Hospital Nodes</span>
          <span className="text-xl font-black text-teal-400">{totalHospitals}</span>
        </div>
        <div className="p-4 bg-slate-950/70 rounded-2xl border border-white/5 space-y-1">
          <span className="text-slate-400 font-bold block">HIPAA Security Standard</span>
          <span className="text-xl font-black text-emerald-400">ACTIVE</span>
        </div>
      </div>
    </GlassCard>
  );
}
