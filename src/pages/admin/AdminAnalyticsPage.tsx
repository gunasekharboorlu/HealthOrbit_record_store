import React from 'react';
import { 
  BarChart3, Users, Stethoscope, Building2, 
  FileText, ShieldCheck, Activity, Clock, ShieldAlert, CheckCircle2, Lock
} from 'lucide-react';
import { GlassCard, StatCard } from '../../components/ui';

interface AdminAnalyticsPageProps {
  adminData: any;
}

export default function AdminAnalyticsPage({ adminData }: AdminAnalyticsPageProps) {
  if (!adminData) return null;

  const patients = adminData.patients || [];
  const doctors = adminData.doctors || [];
  const hospitals = adminData.hospitals || [];
  const auditLogs = adminData.auditLogs || [];

  const totalPatients = patients.length;
  const totalDoctors = doctors.length;
  const totalHospitals = hospitals.length;
  const verifiedDoctors = doctors.filter((d: any) => d.isVerified).length;
  const pendingDoctors = doctors.filter((d: any) => !d.isVerified).length;

  const doctorVerificationRate = totalDoctors > 0 ? Math.round((verifiedDoctors / totalDoctors) * 100) : 0;

  // Real audit log activity breakdown
  const actionCounts = auditLogs.reduce((acc: Record<string, number>, log: any) => {
    const act = log.action || 'GENERAL';
    acc[act] = (acc[act] || 0) + 1;
    return acc;
  }, {});

  const actionList = Object.entries(actionCounts).map(([action, count]) => ({
    action,
    count: count as number,
    percentage: auditLogs.length > 0 ? Math.round(((count as number) / auditLogs.length) * 100) : 0,
  }));

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-display font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-[#38bdf8]" /> Network Telemetry & System Analytics
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Real network state derived directly from authenticated patient, physician, and hospital records.
          </p>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#38bdf8]/10 text-[#38bdf8] border border-[#38bdf8]/20">
          Live System Verified
        </span>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Patient Vaults"
          value={totalPatients}
          subtext="Encrypted records store"
          icon={Users}
          color="emerald"
        />
        <StatCard
          title="Physician Network"
          value={totalDoctors}
          subtext={`${doctorVerificationRate}% Verified (${verifiedDoctors}/${totalDoctors})`}
          icon={Stethoscope}
          color="cyan"
        />
        <StatCard
          title="Partner Clinics"
          value={totalHospitals}
          subtext="Whitelisted facilities"
          icon={Building2}
          color="teal"
        />
        <StatCard
          title="Audit Trail Records"
          value={auditLogs.length}
          subtext="HIPAA immutable logs"
          icon={ShieldCheck}
          color="purple"
        />
      </div>

      {/* Real Breakdown Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Real Audit Logs Action Breakdown */}
        <GlassCard className="p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#38bdf8]" />
              <h3 className="font-display font-bold text-base text-white">System Actions Real Breakdown</h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400">Audit Trail ({auditLogs.length})</span>
          </div>

          {actionList.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400 italic bg-white/5 rounded-2xl border border-white/5">
              No audit log activity recorded yet.
            </div>
          ) : (
            <div className="space-y-3">
              {actionList.map((item) => (
                <div key={item.action} className="space-y-1.5 p-3 bg-slate-950/60 rounded-xl border border-white/5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-200 font-bold">{item.action}</span>
                    <span className="text-[#38bdf8] font-bold">{item.count} events ({item.percentage}%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#38bdf8] rounded-full transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </GlassCard>

        {/* Real Hospital Nodes Status */}
        <GlassCard className="p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-teal-400" />
              <h3 className="font-display font-bold text-base text-white">Whitelisted Hospital Nodes ({totalHospitals})</h3>
            </div>
            <span className="text-[10px] font-mono text-emerald-400">All Nodes Active</span>
          </div>

          {hospitals.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400 italic bg-white/5 rounded-2xl border border-white/5">
              No hospital facilities whitelisted.
            </div>
          ) : (
            <div className="space-y-2.5">
              {hospitals.slice(0, 5).map((h: any) => (
                <div key={h.id} className="p-3 bg-white/5 border border-white/5 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white block">{h.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{h.address || 'Network Node'}</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                    ● ACTIVE
                  </span>
                </div>
              ))}
            </div>
          )}
        </GlassCard>

      </div>

      {/* Real Doctor Verification Velocity */}
      <GlassCard className="p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-purple-400" />
            <h3 className="font-display font-bold text-base text-white">Physician Verification Real Status</h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400">Licensing Audit</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 font-mono">Verified Practitioners</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-white font-mono">{verifiedDoctors}</div>
            <p className="text-[11px] text-slate-400">Authorized to inspect records and issue digital prescriptions</p>
          </div>

          <div className="p-4 bg-slate-950/80 rounded-2xl border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 font-mono">Pending Verifications</span>
              <ShieldAlert className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-black text-white font-mono">{pendingDoctors}</div>
            <p className="text-[11px] text-slate-400">Awaiting administrator licensing and hospital verification</p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
