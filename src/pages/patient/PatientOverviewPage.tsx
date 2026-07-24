import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, Key, Check, Copy, FileText, Download, 
  ArrowRight, ShieldAlert, Clock, Calendar, Plus, 
  Heart, Activity, Bell, FileUp, ShieldCheck, CheckCircle
} from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import { GlassCard, Card, PrimaryButton, SecondaryButton, StatCard, Badge, StatusChip } from '../../components/ui';
import { MedicalRecord, Patient } from '../../types';
import ProfessionalAnalyticsCharts from '../../components/common/ProfessionalAnalyticsCharts';

interface PatientOverviewPageProps {
  patientData: {
    name?: string;
    patient: Patient;
    records: MedicalRecord[];
    pendingRequests: any[];
    accessHistory: any[];
  };
  onNavigateTab: (tab: string) => void;
  handleRespondAccess: (id: string, status: 'approved' | 'rejected') => void;
  downloadFile: (fileName: string, base64Content: string) => void;
  unreadCount?: number;
}


export default function PatientOverviewPage({
  patientData,
  onNavigateTab,
  handleRespondAccess,
  downloadFile,
  unreadCount = 0,
}: PatientOverviewPageProps) {
  const { patient, records = [], pendingRequests = [] } = patientData;
  const [copied, setCopied] = useState(false);

  const copyPatientId = () => {
    if (patient?.patientId) {
      navigator.clipboard.writeText(patient.patientId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const sortedRecords = [...records].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const totalReports = records.length;
  const sensitiveReports = records.filter((r) => r.isSensitive).length;
  const verifiedReports = records.filter(
    (r) => r.trustBadge === 'verified_hospital'
  ).length;

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Page Header */}
      <PageHeader
        portalName="Patient Portal"
        activeTab="dashboard"
        tabLabel="Overview"
        title="Workspace Overview"
        subtitle="Your clinical ledger is active. Monitor health stats, doctor requests, and recent activity."
        actions={
          <PrimaryButton
            icon={Plus}
            size="sm"
            onClick={() => onNavigateTab('upload')}
          >
            Upload Record
          </PrimaryButton>
        }
        onNavigateHome={() => onNavigateTab('dashboard')}
      />

      {/* Hero Welcome Banner + Universal Registry Key */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Welcome Card */}
        <div className="lg:col-span-8 bg-gradient-to-tr from-[#0a0f2b] via-[#0f173b] to-[#141d48] border border-white/10 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden flex flex-col justify-between shadow-2xl">
          <div className="absolute top-0 right-0 h-56 w-56 rounded-full bg-[#38bdf8] opacity-10 blur-3xl pointer-events-none animate-pulse" />

          <div className="space-y-3 relative z-10">
            <span className="inline-flex items-center gap-1.5 bg-[#38bdf8]/10 border border-[#38bdf8]/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#38bdf8] font-mono">
              <Sparkles className="w-3.5 h-3.5 text-[#38bdf8]" /> HealthOrbit Vault Synchronized
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Welcome Back,{' '}
              <span className="bg-gradient-to-r from-white via-[#86b0ff] to-[#38bdf8] bg-clip-text text-transparent">
                {patientData?.name || 'Patient'}
              </span>
            </h2>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              Your clinical health ledger is secured with zero-trust encryption. You hold full control over doctor access clearances and emergency vitals.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-5 relative z-10">
            <div className="space-y-1">
              <span className="block text-[9px] uppercase font-bold text-slate-400 tracking-wider font-mono">
                Blood Group
              </span>
              <span className="text-sm font-black text-teal-400 font-mono">
                {patient?.bloodGroup || 'Not set'}
              </span>
            </div>
            <div className="space-y-1">
              <span className="block text-[9px] uppercase font-bold text-slate-400 tracking-wider font-mono">
                Gender
              </span>
              <span className="text-sm font-bold text-slate-200">
                {patient?.gender || 'Not set'}
              </span>
            </div>
            <div className="space-y-1">
              <span className="block text-[9px] uppercase font-bold text-slate-400 tracking-wider font-mono">
                Birth Date
              </span>
              <span className="text-sm font-semibold text-slate-200">
                {patient?.dob
                  ? new Date(patient.dob).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })
                  : 'Not set'}
              </span>
            </div>
          </div>
        </div>

        {/* Digital Registry ID Card */}
        <motion.div
          whileHover={{ y: -3, borderColor: 'rgba(56,189,248,0.4)' }}
          className="lg:col-span-4 bg-gradient-to-br from-[#1b1c3d]/90 via-[#0d0e2c]/95 to-[#12133a]/90 border border-[#38bdf8]/25 rounded-3xl p-6 text-white relative overflow-hidden flex flex-col justify-between shadow-[0_15px_30px_rgba(0,0,0,0.4)] transition-all duration-300"
        >
          <div className="absolute top-6 right-6 h-10 w-10 rounded-xl bg-gradient-to-br from-amber-400/20 to-amber-500/10 border border-amber-400/30 flex items-center justify-center shadow-inner">
            <Key className="w-5 h-5 text-amber-300 animate-pulse" />
          </div>

          <div className="space-y-2 text-left">
            <span className="font-display text-[9px] font-black tracking-widest text-[#38bdf8] uppercase font-mono">
              Universal Patient Registry ID
            </span>
            <span className="block text-2xl font-mono font-black tracking-tight text-white select-all">
              {patient?.patientId || 'PR-1001'}
            </span>
            <p className="text-[11px] text-slate-300 leading-relaxed pt-1">
              Provide this key to licensed medical doctors so they can request record clearance.
            </p>
          </div>

          <SecondaryButton
            onClick={copyPatientId}
            fullWidth
            className="mt-6 font-mono text-xs py-2.5"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-400" />
                <span>Copy Registry ID</span>
              </>
            )}
          </SecondaryButton>
        </motion.div>
      </div>

      {/* Stat Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Reports"
          value={totalReports}
          icon={FileText}
          subtitle="View records library"
          onClick={() => onNavigateTab('records')}
        />
        <StatCard
          title="Privacy Locked"
          value={sensitiveReports}
          icon={ShieldAlert}
          subtitle="Protected sensitivity"
          onClick={() => onNavigateTab('records')}
        />
        <StatCard
          title="Clinic Verified"
          value={verifiedReports}
          icon={ShieldCheck}
          subtitle="Hospital certified"
          onClick={() => onNavigateTab('records')}
        />
        <StatCard
          title="Pending Clearances"
          value={pendingRequests.length}
          icon={Clock}
          subtitle="Review access requests"
          trend={pendingRequests.length > 0 ? { value: `${pendingRequests.length} pending`, positive: false } : undefined}
          onClick={() => onNavigateTab('doctors')}
        />
      </div>

      {/* Professional Health Vitals & Records Analytics */}
      <ProfessionalAnalyticsCharts role="patient" />


      {/* Quick Action Shortcuts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => onNavigateTab('upload')}
          className="flex items-center gap-3 p-4 bg-gradient-to-r from-[#38bdf8]/10 to-[#4f8cff]/10 border border-[#38bdf8]/20 rounded-2xl text-left hover:bg-[#38bdf8]/20 transition cursor-pointer group"
        >
          <div className="p-2.5 rounded-xl bg-[#38bdf8]/20 text-[#38bdf8] group-hover:scale-110 transition-transform">
            <FileUp className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-xs font-bold text-white">Upload Record</span>
            <span className="text-[10px] text-slate-400 font-mono">Ingest report to vault</span>
          </div>
        </button>

        <button
          onClick={() => onNavigateTab('emergency')}
          className="flex items-center gap-3 p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-left hover:bg-rose-500/20 transition cursor-pointer group"
        >
          <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400 group-hover:scale-110 transition-transform">
            <Heart className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <span className="block text-xs font-bold text-white">Emergency Profile</span>
            <span className="text-[10px] text-rose-300 font-mono">First responder EMT card</span>
          </div>
        </button>

        <button
          onClick={() => onNavigateTab('records')}
          className="flex items-center gap-3 p-4 bg-purple-500/10 border border-purple-500/20 rounded-2xl text-left hover:bg-purple-500/20 transition cursor-pointer group"
        >
          <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400 group-hover:scale-110 transition-transform">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-xs font-bold text-white">Clinical Records</span>
            <span className="text-[10px] text-purple-300 font-mono">Complete library</span>
          </div>
        </button>

        <button
          onClick={() => onNavigateTab('doctors')}
          className="flex items-center gap-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-left hover:bg-amber-500/20 transition cursor-pointer group"
        >
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 group-hover:scale-110 transition-transform">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-xs font-bold text-white">Doctor Clearances</span>
            <span className="text-[10px] text-amber-300 font-mono">Manage access permissions</span>
          </div>
        </button>
      </div>

      {/* Pending Doctor Clearances Alert */}
      {pendingRequests.length > 0 && (
        <GlassCard className="border-rose-500/30 bg-rose-950/20 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShieldAlert className="w-5 h-5 text-rose-400 animate-pulse" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Doctor Access Clearances Pending ({pendingRequests.length})
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('doctors')}
              className="text-xs font-bold text-rose-400 hover:underline flex items-center gap-1"
            >
              Review All Requests <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {pendingRequests.slice(0, 2).map((req: any) => (
              <div
                key={req.id}
                className="bg-slate-950/80 border border-rose-500/20 rounded-2xl p-4 flex items-center justify-between gap-3"
              >
                <div>
                  <span className="block font-bold text-xs text-white">Dr. {req.doctorName}</span>
                  <span className="block text-[10px] text-slate-400">
                    {req.doctorSpecialization || 'Specialist'} • "{req.recordTitle}"
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleRespondAccess(req.id, 'approved')}
                    className="px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-500 cursor-pointer"
                  >
                    Grant
                  </button>
                  <button
                    onClick={() => handleRespondAccess(req.id, 'rejected')}
                    className="px-3 py-1.5 bg-white/10 text-rose-300 rounded-xl text-xs font-bold hover:bg-white/20 cursor-pointer"
                  >
                    Deny
                  </button>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {/* Two Column Grid: Upcoming Appointments & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Upcoming Appointments Card (Placeholder) */}
        <div className="lg:col-span-5 space-y-4">
          <GlassCard className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <h3 className="font-display font-bold text-sm text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#38bdf8]" /> Upcoming Consultations
              </h3>
              <Badge variant="cyan">Scheduled</Badge>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 bg-white/5 border border-white/5 rounded-2xl flex items-start gap-3">
                <div className="p-2.5 bg-[#38bdf8]/10 text-[#38bdf8] rounded-xl shrink-0 font-mono text-center">
                  <span className="block text-[10px] font-bold uppercase">Tomorrow</span>
                  <span className="block text-xs font-black">10:30</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Dr. Sarah Jenkins</h4>
                  <p className="text-[10px] text-slate-400">General Cardiology • Followup Consultation</p>
                  <span className="inline-block mt-1.5 text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    Confirmed • Metro Health Center
                  </span>
                </div>
              </div>

              <div className="p-3.5 bg-white/5 border border-white/5 rounded-2xl flex items-start gap-3">
                <div className="p-2.5 bg-purple-500/10 text-purple-400 rounded-xl shrink-0 font-mono text-center">
                  <span className="block text-[10px] font-bold uppercase">Thursday</span>
                  <span className="block text-xs font-black">14:00</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Dr. Robert Vance</h4>
                  <p className="text-[10px] text-slate-400">Neurology • Routine Checkup</p>
                  <span className="inline-block mt-1.5 text-[9px] font-mono text-[#38bdf8] bg-[#38bdf8]/10 px-2 py-0.5 rounded">
                    Telehealth Portal Video
                  </span>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Recent Vault Activity Stream */}
        <div className="lg:col-span-7 space-y-4">
          <GlassCard className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <h3 className="font-display font-bold text-sm text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#38bdf8]" /> Recent Medical Activity
              </h3>
              <button
                onClick={() => onNavigateTab('records')}
                className="text-xs font-bold text-[#38bdf8] hover:underline flex items-center gap-1"
              >
                View Library <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {sortedRecords.length === 0 ? (
              <p className="text-xs text-slate-400 italic py-4 text-center">
                No medical records uploaded yet.
              </p>
            ) : (
              <div className="space-y-3">
                {sortedRecords.slice(0, 3).map((rec: MedicalRecord) => (
                  <div
                    key={rec.id}
                    className="p-3.5 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2 bg-[#38bdf8]/10 text-[#38bdf8] rounded-xl shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-white truncate">{rec.title}</h4>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {rec.category} • {rec.fileName}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-[10px] text-slate-500 font-mono">
                        {new Date(rec.createdAt).toLocaleDateString()}
                      </span>
                      <button
                        onClick={() => downloadFile(rec.fileName, rec.fileContent)}
                        className="p-1.5 text-slate-300 hover:text-white bg-white/5 rounded-lg border border-white/10 cursor-pointer"
                        title="Download record"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
