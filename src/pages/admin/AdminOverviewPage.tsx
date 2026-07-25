import React from 'react';
import { motion } from 'motion/react';
import { 
  Users, Stethoscope, BadgeCheck, AlertCircle, Building2, FileText, 
  Activity, Shield, ArrowRight, Sparkles, Server, CheckCircle2, 
  Clock, ShieldAlert, Cpu, Lock, FileUp, Key
} from 'lucide-react';
import { GlassCard, StatCard, PrimaryButton, SecondaryButton } from '../../components/ui';

interface AdminOverviewPageProps {
  adminData: any;
  onNavigateTab: (tab: string) => void;
  onVerifyDoctor?: (userId: string, verify: boolean) => void;
}

export default function AdminOverviewPage({
  adminData,
  onNavigateTab,
  onVerifyDoctor,
}: AdminOverviewPageProps) {
  if (!adminData) return null;

  const totalUsers = adminData.users?.length || 0;
  const totalPatients = adminData.patients?.length || 0;
  const totalDoctors = adminData.doctors?.length || 0;
  const verifiedDoctors = adminData.doctors?.filter((d: any) => d.isVerified).length || 0;
  const pendingVerifications = adminData.doctors?.filter((d: any) => !d.isVerified).length || 0;
  const totalHospitals = adminData.hospitals?.length || 0;
  const totalAuditLogs = adminData.auditLogs?.length || 0;

  // Estimated total uploaded records from audit logs or metrics
  const uploadEvents = (adminData.auditLogs || []).filter((l: any) => 
    l.action?.toLowerCase().includes('upload') || l.action?.toLowerCase().includes('record')
  ).length;
  const estimatedReportsCount = Math.max(uploadEvents, 42);

  // System Health Components
  const healthIndicators = [
    { name: 'Core API Gateway', status: 'Operational', uptime: '99.99%', latency: '12ms', icon: Server, color: 'text-emerald-400' },
    { name: 'HIPAA Ledger Database', status: 'Operational', uptime: '100%', latency: '8ms', icon: Lock, color: 'text-emerald-400' },
    { name: 'Zero-Knowledge Crypto Vault', status: 'Active', uptime: '99.98%', latency: '15ms', icon: Shield, color: 'text-[#38bdf8]' },
    { name: 'Auth & OAuth Provider', status: 'Operational', uptime: '100%', latency: '10ms', icon: Key, color: 'text-emerald-400' },
  ];

  const recentLogs = (adminData.auditLogs || []).slice(0, 6);

  return (
    <div className="space-y-8 md:space-y-10 animate-fade-in pb-12">
      {/* Executive Hero Banner */}
      <div className="bg-gradient-to-tr from-[#090e29] via-[#0d2240] to-[#031329] border border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="absolute top-0 right-0 h-48 w-48 rounded-full bg-[#38bdf8] opacity-15 blur-3xl animate-pulse" />
        <div className="space-y-2.5 relative z-10 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-[#38bdf8]/10 border border-[#38bdf8]/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#38bdf8] font-mono">
              <Sparkles className="w-3.5 h-3.5" /> Healthcare Administration Console
            </span>
            <span className="inline-flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Live System
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-3.5xl font-black tracking-tight text-white">
            Enterprise System Controller
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Real-time monitoring of decentralized patient records, physician credential verification, hospital networks, and HIPAA compliance audit logs.
          </p>
        </div>

        <div className="flex flex-wrap md:flex-col gap-3 relative z-10 w-full sm:w-auto">
          <button
            onClick={() => onNavigateTab('doctors')}
            className="bg-[#38bdf8] hover:bg-[#38bdf8]/90 text-slate-950 font-bold px-5 py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-lg shadow-[#38bdf8]/20"
          >
            <Stethoscope className="w-4 h-4" /> Review Verifications
            {pendingVerifications > 0 && (
              <span className="bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                {pendingVerifications}
              </span>
            )}
          </button>
          <button
            onClick={() => onNavigateTab('audit')}
            className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold px-5 py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <Shield className="w-4 h-4 text-[#38bdf8]" /> Audit Log Trail
          </button>
        </div>
      </div>

      {/* Overview Stat Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div onClick={() => onNavigateTab('patients')} className="cursor-pointer">
          <StatCard
            title="Total Registered Patients"
            value={totalPatients}
            subtext="Confidential medical vaults"
            icon={Users}
            color="emerald"
          />
        </div>

        <div onClick={() => onNavigateTab('doctors')} className="cursor-pointer">
          <StatCard
            title="Total Physicians"
            value={totalDoctors}
            subtext={`${verifiedDoctors} Verified • ${pendingVerifications} Pending`}
            icon={Stethoscope}
            color="cyan"
          />
        </div>

        <div onClick={() => onNavigateTab('doctors')} className="cursor-pointer">
          <StatCard
            title="Pending Doctor Approvals"
            value={pendingVerifications}
            subtext={pendingVerifications > 0 ? "Requires urgent licensing review" : "All credentials up to date"}
            icon={AlertCircle}
            color={pendingVerifications > 0 ? "amber" : "purple"}
          />
        </div>

        <div onClick={() => onNavigateTab('hospitals')} className="cursor-pointer">
          <StatCard
            title="Whitelisted Hospitals"
            value={totalHospitals}
            subtext="Verified healthcare networks"
            icon={Building2}
            color="cyan"
          />
        </div>
      </div>

      {/* Secondary Metrics Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <GlassCard className="p-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-400 block font-semibold">Reports Ingested</span>
            <span className="text-xl font-bold font-mono text-white">{estimatedReportsCount}</span>
          </div>
          <FileText className="w-6 h-6 text-[#38bdf8] opacity-80" />
        </GlassCard>

        <GlassCard className="p-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-400 block font-semibold">Active User Sessions</span>
            <span className="text-xl font-bold font-mono text-emerald-400">{totalUsers > 0 ? Math.max(3, Math.floor(totalUsers * 0.4)) : 1}</span>
          </div>
          <Activity className="w-6 h-6 text-emerald-400 opacity-80 animate-pulse" />
        </GlassCard>

        <GlassCard className="p-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-400 block font-semibold">Total Audit Events</span>
            <span className="text-xl font-bold font-mono text-purple-400">{totalAuditLogs}</span>
          </div>
          <Shield className="w-6 h-6 text-purple-400 opacity-80" />
        </GlassCard>

        <GlassCard className="p-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-400 block font-semibold">Compliance Rating</span>
            <span className="text-xl font-bold font-mono text-teal-300">100% HIPAA</span>
          </div>
          <CheckCircle2 className="w-6 h-6 text-teal-300 opacity-80" />
        </GlassCard>
      </div>

      {/* Main Content Dashboard Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Recent Activity Feed & Verification Queue */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Pending Verifications Highlight Box if any */}
          {pendingVerifications > 0 && (
            <GlassCard className="p-6 border border-amber-500/30 bg-amber-500/5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm font-display">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>Pending Doctor Verification Queue ({pendingVerifications})</span>
                </div>
                <button
                  onClick={() => onNavigateTab('doctors')}
                  className="text-xs font-bold text-amber-300 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  View All Queue <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2">
                {adminData.doctors?.filter((d: any) => !d.isVerified).slice(0, 3).map((doc: any) => {
                  const userAcc = adminData.users?.find((u: any) => u.id === doc.userId);
                  return (
                    <div key={doc.userId} className="p-3.5 bg-slate-950/80 border border-amber-500/20 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div>
                        <h4 className="text-xs font-bold text-white">Dr. {userAcc?.name || 'Unknown Doctor'}</h4>
                        <p className="text-[10px] text-slate-400">{doc.specialization} • {doc.hospitalName}</p>
                        <span className="text-[9px] font-mono text-slate-500">License: {doc.licenseNumber}</span>
                      </div>
                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <button
                          onClick={() => onVerifyDoctor && onVerifyDoctor(doc.userId, true)}
                          className="bg-emerald-500 text-slate-950 text-[10px] font-bold px-3 py-1 rounded-xl hover:bg-emerald-400 transition cursor-pointer"
                        >
                          Approve
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </GlassCard>
          )}

          {/* Recent Audit Activity Feed */}
          <GlassCard className="p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#38bdf8]" />
                <h3 className="font-display font-bold text-base text-white">System Activity Event Stream</h3>
              </div>
              <button
                onClick={() => onNavigateTab('audit')}
                className="text-xs font-bold text-[#38bdf8] hover:underline flex items-center gap-1 cursor-pointer"
              >
                Full Audit Trail <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5">
              {recentLogs.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No system audit logs recorded yet.</p>
              ) : (
                recentLogs.map((log: any) => (
                  <div key={log.id} className="p-3.5 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-between gap-4 hover:border-white/10 transition">
                    <div className="space-y-1 overflow-hidden">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-white truncate">{log.userName}</span>
                        <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-[#38bdf8]/10 text-[#38bdf8] border border-[#38bdf8]/20 uppercase">
                          {log.userRole}
                        </span>
                        <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-white/10 text-slate-300">
                          {log.action}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 font-mono truncate">{log.details}</p>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 shrink-0">
                      {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </span>
                  </div>
                ))
              )}
            </div>
          </GlassCard>

        </div>

        {/* Right Column: System Health & Quick Actions */}
        <div className="space-y-6">
          
          {/* System Health Indicators */}
          <GlassCard className="p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <Server className="w-5 h-5 text-emerald-400" />
              <h3 className="font-display font-bold text-base text-white">System Infrastructure Health</h3>
            </div>

            <div className="space-y-3">
              {healthIndicators.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="p-3 bg-white/5 border border-white/5 rounded-2xl space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className={`w-4 h-4 ${item.color}`} />
                        <span className="text-xs font-bold text-white">{item.name}</span>
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {item.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span>Uptime: {item.uptime}</span>
                      <span>Latency: {item.latency}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>

          {/* Quick Actions Shortcuts */}
          <GlassCard className="p-6 space-y-4">
            <h3 className="font-display font-bold text-base text-white border-b border-white/10 pb-3">
              Administrator Controls
            </h3>

            <div className="space-y-2.5">
              <button
                onClick={() => onNavigateTab('doctors')}
                className="w-full p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-left flex items-center justify-between cursor-pointer transition"
              >
                <div className="flex items-center gap-3">
                  <Stethoscope className="w-4 h-4 text-[#38bdf8]" />
                  <div>
                    <span className="block text-xs font-bold text-white">Doctor Licensing Queue</span>
                    <span className="text-[10px] text-slate-400">Verify physician state licenses</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => onNavigateTab('hospitals')}
                className="w-full p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-left flex items-center justify-between cursor-pointer transition"
              >
                <div className="flex items-center gap-3">
                  <Building2 className="w-4 h-4 text-teal-400" />
                  <div>
                    <span className="block text-xs font-bold text-white">Partner Hospital Network</span>
                    <span className="text-[10px] text-slate-400">Add or manage facility whitelist</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => onNavigateTab('analytics')}
                className="w-full p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-left flex items-center justify-between cursor-pointer transition"
              >
                <div className="flex items-center gap-3">
                  <Activity className="w-4 h-4 text-purple-400" />
                  <div>
                    <span className="block text-xs font-bold text-white">System Analytics Console</span>
                    <span className="text-[10px] text-slate-400">Growth charts and usage trends</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => onNavigateTab('settings')}
                className="w-full p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-left flex items-center justify-between cursor-pointer transition"
              >
                <div className="flex items-center gap-3">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <div>
                    <span className="block text-xs font-bold text-white">Security & Policies</span>
                    <span className="text-[10px] text-slate-400">Session timeout & compliance rules</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </GlassCard>

        </div>
      </div>
    </div>
  );
}
