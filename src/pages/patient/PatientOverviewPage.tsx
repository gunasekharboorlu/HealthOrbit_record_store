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
    <div className="space-y-8 md:space-y-10 animate-fade-in pb-12">
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        {/* Welcome Card */}
        <div className="lg:col-span-8 bg-[#F5F5F7] border border-[#E5E5E7] rounded-3xl p-6 sm:p-8 md:p-10 text-[#1D1D1F] relative overflow-hidden flex flex-col justify-between shadow-xs">
          <div className="space-y-3 relative z-10">
            <span className="inline-flex items-center gap-1.5 bg-[#0071E3]/10 border border-[#0071E3]/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#0071E3] font-mono">
              <Sparkles className="w-3.5 h-3.5 text-[#0071E3]" /> HealthOrbit Vault Synchronized
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight leading-tight text-[#1D1D1F]">
              Welcome Back, {patientData?.name || 'Patient'}
            </h2>
            <p className="text-xs text-[#6E6E73] max-w-xl leading-relaxed">
              Your clinical health ledger is secured with zero-trust encryption. You hold full control over doctor access clearances and emergency vitals.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-[#E5E5E7] pt-5 relative z-10">
            <div className="space-y-1">
              <span className="block text-[9px] uppercase font-bold text-[#6E6E73] tracking-wider font-mono">
                Blood Group
              </span>
              <span className="text-sm font-black text-teal-700 font-mono">
                {patient?.bloodGroup || 'Not set'}
              </span>
            </div>
            <div className="space-y-1">
              <span className="block text-[9px] uppercase font-bold text-[#6E6E73] tracking-wider font-mono">
                Gender
              </span>
              <span className="text-sm font-bold text-[#1D1D1F]">
                {patient?.gender || 'Not set'}
              </span>
            </div>
            <div className="space-y-1">
              <span className="block text-[9px] uppercase font-bold text-[#6E6E73] tracking-wider font-mono">
                Birth Date
              </span>
              <span className="text-sm font-semibold text-[#1D1D1F]">
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
          whileHover={{ y: -2 }}
          className="lg:col-span-4 bg-[#FBFBFD] border border-[#E5E5E7] rounded-3xl p-6 text-[#1D1D1F] relative overflow-hidden flex flex-col justify-between shadow-2xs transition-all duration-300"
        >
          <div className="absolute top-6 right-6 h-10 w-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center">
            <Key className="w-5 h-5 text-amber-600" />
          </div>

          <div className="space-y-2 text-left">
            <span className="font-display text-[9px] font-bold tracking-widest text-[#0071E3] uppercase font-mono">
              Universal Patient Registry ID
            </span>
            <span className="block text-2xl font-mono font-bold tracking-tight text-[#1D1D1F] select-all">
              {patient?.patientId || 'PR-1001'}
            </span>
            <p className="text-[11px] text-[#6E6E73] leading-relaxed pt-1">
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
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#6E6E73]" />
                <span>Copy Registry ID</span>
              </>
            )}
          </SecondaryButton>
        </motion.div>
      </div>

      {/* Stat Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        <button
          onClick={() => onNavigateTab('upload')}
          className="flex items-center gap-3.5 p-5 bg-[#F5F5F7] border border-[#E5E5E7] rounded-3xl text-left hover:bg-[#E5E5E7]/50 transition cursor-pointer group"
        >
          <div className="p-3 rounded-2xl bg-[#0071E3]/10 text-[#0071E3] group-hover:scale-105 transition-transform">
            <FileUp className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-xs font-bold text-[#1D1D1F]">Upload Record</span>
            <span className="text-[10px] text-[#6E6E73] font-mono">Ingest report to vault</span>
          </div>
        </button>

        <button
          onClick={() => onNavigateTab('emergency')}
          className="flex items-center gap-3.5 p-5 bg-rose-50/50 border border-rose-200 rounded-3xl text-left hover:bg-rose-100/50 transition cursor-pointer group"
        >
          <div className="p-3 rounded-2xl bg-rose-100 text-rose-700 group-hover:scale-105 transition-transform">
            <Heart className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-xs font-bold text-[#1D1D1F]">Emergency Profile</span>
            <span className="text-[10px] text-rose-800 font-mono">First responder EMT card</span>
          </div>
        </button>

        <button
          onClick={() => onNavigateTab('records')}
          className="flex items-center gap-3.5 p-5 bg-purple-50/50 border border-purple-200 rounded-3xl text-left hover:bg-purple-100/50 transition cursor-pointer group"
        >
          <div className="p-3 rounded-2xl bg-purple-100 text-purple-700 group-hover:scale-105 transition-transform">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-xs font-bold text-[#1D1D1F]">Clinical Records</span>
            <span className="text-[10px] text-purple-800 font-mono">Complete library</span>
          </div>
        </button>

        <button
          onClick={() => onNavigateTab('doctors')}
          className="flex items-center gap-3.5 p-5 bg-amber-50/50 border border-amber-200 rounded-3xl text-left hover:bg-amber-100/50 transition cursor-pointer group"
        >
          <div className="p-3 rounded-2xl bg-amber-100 text-amber-700 group-hover:scale-105 transition-transform">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-xs font-bold text-[#1D1D1F]">Doctor Clearances</span>
            <span className="text-[10px] text-amber-800 font-mono">Manage access permissions</span>
          </div>
        </button>
      </div>

      {/* Pending Doctor Clearances Alert */}
      {pendingRequests.length > 0 && (
        <GlassCard className="border-rose-200 bg-rose-50/50 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShieldAlert className="w-5 h-5 text-rose-600 animate-pulse" />
              <h3 className="text-xs font-bold text-[#1D1D1F] uppercase tracking-wider font-mono">
                Doctor Access Clearances Pending ({pendingRequests.length})
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('doctors')}
              className="text-xs font-bold text-rose-600 hover:underline flex items-center gap-1 cursor-pointer"
            >
              Review All Requests <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {pendingRequests.slice(0, 2).map((req: any) => (
              <div
                key={req.id}
                className="bg-white border border-rose-200 rounded-2xl p-4 flex items-center justify-between gap-3"
              >
                <div>
                  <span className="block font-bold text-xs text-[#1D1D1F]">Dr. {req.doctorName}</span>
                  <span className="block text-[10px] text-[#6E6E73]">
                    {req.doctorSpecialization || 'Specialist'} • "{req.recordTitle}"
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleRespondAccess(req.id, 'approved')}
                    className="px-3 py-1.5 bg-emerald-700 text-white rounded-xl text-xs font-bold hover:bg-emerald-800 cursor-pointer"
                  >
                    Grant
                  </button>
                  <button
                    onClick={() => handleRespondAccess(req.id, 'rejected')}
                    className="px-3 py-1.5 bg-white text-rose-700 border border-rose-200 rounded-xl text-xs font-bold hover:bg-rose-50 cursor-pointer"
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
            <div className="flex items-center justify-between border-b border-[#E5E5E7] pb-3">
              <h3 className="font-display font-bold text-sm text-[#1D1D1F] flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#0071E3]" /> Upcoming Consultations
              </h3>
              <Badge variant="cyan">Scheduled</Badge>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl flex items-start gap-3">
                <div className="p-2.5 bg-[#0071E3]/10 text-[#0071E3] rounded-xl shrink-0 font-mono text-center">
                  <span className="block text-[10px] font-bold uppercase">Tomorrow</span>
                  <span className="block text-xs font-black">10:30</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1D1D1F]">Dr. Sarah Jenkins</h4>
                  <p className="text-[10px] text-[#6E6E73]">General Cardiology • Followup Consultation</p>
                  <span className="inline-block mt-1.5 text-[9px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                    Confirmed • Metro Health Center
                  </span>
                </div>
              </div>

              <div className="p-3.5 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl flex items-start gap-3">
                <div className="p-2.5 bg-purple-100 text-purple-700 rounded-xl shrink-0 font-mono text-center">
                  <span className="block text-[10px] font-bold uppercase">Thursday</span>
                  <span className="block text-xs font-black">14:00</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1D1D1F]">Dr. Robert Vance</h4>
                  <p className="text-[10px] text-[#6E6E73]">Neurology • Routine Checkup</p>
                  <span className="inline-block mt-1.5 text-[9px] font-mono text-[#0071E3] bg-[#0071E3]/10 px-2 py-0.5 rounded">
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
            <div className="flex items-center justify-between border-b border-[#E5E5E7] pb-3">
              <h3 className="font-display font-bold text-sm text-[#1D1D1F] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#0071E3]" /> Recent Medical Activity
              </h3>
              <button
                onClick={() => onNavigateTab('records')}
                className="text-xs font-bold text-[#0071E3] hover:underline flex items-center gap-1 cursor-pointer"
              >
                View Library <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {sortedRecords.length === 0 ? (
              <p className="text-xs text-[#6E6E73] italic py-4 text-center">
                No medical records uploaded yet.
              </p>
            ) : (
              <div className="space-y-3">
                {sortedRecords.slice(0, 3).map((rec: MedicalRecord) => (
                  <div
                    key={rec.id}
                    className="p-3.5 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2 bg-[#0071E3]/10 text-[#0071E3] rounded-xl shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-[#1D1D1F] truncate">{rec.title}</h4>
                        <span className="text-[10px] text-[#6E6E73] font-mono">
                          {rec.category} • {rec.fileName}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-[10px] text-[#86868B] font-mono">
                        {new Date(rec.createdAt).toLocaleDateString()}
                      </span>
                      <button
                        onClick={() => downloadFile(rec.fileName, rec.fileContent)}
                        className="p-1.5 text-[#6E6E73] hover:text-[#1D1D1F] bg-white rounded-lg border border-[#D2D2D7] cursor-pointer"
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
