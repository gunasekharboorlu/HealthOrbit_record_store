import React from 'react';
import { 
  BadgeCheck, Search, ArrowRight, Clock, Activity, 
  ClipboardList, Key, Users, Stethoscope, AlertCircle, Building, Award, Calendar, CheckCircle, Shield
} from 'lucide-react';
import { GlassCard, StatCard, StatusChip, PrimaryButton, SecondaryButton } from '../../components/ui';
import Avatar from '../../components/Avatar';
import ProfessionalAnalyticsCharts from '../../components/common/ProfessionalAnalyticsCharts';

interface DoctorOverviewPageProps {
  doctorData: any;
  profName: string;
  profPic: string;
  profSpec: string;
  profExp: string;
  stats: any;
  onNavigateTab: (tab: string) => void;
  onInspectPatient?: (patientId: string) => void;
}

export default function DoctorOverviewPage({
  doctorData,
  profName,
  profPic,
  profSpec,
  profExp,
  stats,
  onNavigateTab,
  onInspectPatient,
}: DoctorOverviewPageProps) {
  const doctor = doctorData?.doctor || {};

  return (
    <div className="space-y-8 md:space-y-10 animate-fade-in">
      
      {/* Welcome Card & Doctor Profile Summary */}
      <GlassCard className="p-6 sm:p-8 md:p-10 bg-gradient-to-tr from-[#0a0f2b] via-[#0f173b] to-[#020617] border-white/10 relative overflow-hidden flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#38bdf8]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center gap-6 relative z-10">
          <Avatar name={profName || 'Doctor'} src={profPic} size="xl" />
          <div className="space-y-2">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white">
                Dr. {profName || doctor.name}
              </h1>
              {doctor.isVerified ? (
                <StatusChip status="Approved" label="Verified Practitioner" customIcon={<BadgeCheck className="w-3.5 h-3.5 text-emerald-400" />} />
              ) : (
                <StatusChip status="Pending" label="Verification Pending" />
              )}
            </div>
            <p className="text-xs sm:text-sm text-[#38bdf8] font-mono font-bold flex items-center gap-2">
              <Stethoscope className="w-4 h-4" />
              {profSpec || doctor.specialization} • {doctor.department || 'General Medicine'}
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-400 font-mono flex-wrap">
              <span className="flex items-center gap-1.5"><Building className="w-3.5 h-3.5 text-slate-500" /> {doctor.hospitalName || 'HealthOrbit Hospital Network'}</span>
              <span>•</span>
              <span className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-slate-500" /> License: {doctor.licenseNumber || 'N/A'}</span>
              <span>•</span>
              <span>Exp: {profExp}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 relative z-10 w-full lg:w-auto">
          <PrimaryButton onClick={() => onNavigateTab('search')} icon={<Search className="w-4 h-4" />}>
            Search Registry
          </PrimaryButton>
          <SecondaryButton onClick={() => onNavigateTab('workspace')}>
            Patient Workspace
          </SecondaryButton>
        </div>
      </GlassCard>

      {/* Today's Clinical Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="PATIENTS TREATED"
          value={stats.totalPatientsViewed || 0}
          icon={<Users className="w-5 h-5 text-[#38bdf8]" />}
          change="Directory View"
          changeType="positive"
          onClick={() => onNavigateTab('search')}
        />
        <StatCard
          title="PENDING CLEARANCES"
          value={stats.pendingAccessRequests || 0}
          icon={<AlertCircle className="w-5 h-5 text-amber-400" />}
          change="Requires Review"
          changeType={stats.pendingAccessRequests > 0 ? "warning" : "neutral"}
          onClick={() => onNavigateTab('requests')}
        />
        <StatCard
          title="ACTIVE CLEARANCES"
          value={stats.approvedAccessRequests || 0}
          icon={<Shield className="w-5 h-5 text-emerald-400" />}
          change="24-hr Unlocks"
          changeType="positive"
          onClick={() => onNavigateTab('requests')}
        />
        <StatCard
          title="TODAY'S PRESCRIPTIONS"
          value={stats.todayPrescriptions || 0}
          icon={<ClipboardList className="w-5 h-5 text-purple-400" />}
          change="Signed Rx Issued"
          changeType="positive"
          onClick={() => onNavigateTab('workspace')}
        />
      </div>

      {/* Professional Analytics Section */}
      <ProfessionalAnalyticsCharts role="doctor" />

      {/* Quick Actions Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        <button
          onClick={() => onNavigateTab('search')}
          className="flex items-center gap-3.5 p-5 bg-gradient-to-r from-[#38bdf8]/10 to-[#4f8cff]/10 border border-[#38bdf8]/20 rounded-3xl hover:border-[#38bdf8]/40 transition text-left cursor-pointer group"
        >
          <div className="p-3 rounded-2xl bg-[#38bdf8]/20 text-[#38bdf8] group-hover:scale-110 transition-transform">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-xs font-bold text-white">Find Patient</span>
            <span className="text-[10px] text-slate-400 font-mono">Registry Lookup</span>
          </div>
        </button>

        <button
          onClick={() => onNavigateTab('workspace')}
          className="flex items-center gap-3.5 p-5 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/20 rounded-3xl hover:border-purple-500/40 transition text-left cursor-pointer group"
        >
          <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-400 group-hover:scale-110 transition-transform">
            <ClipboardList className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-xs font-bold text-white">Write Prescription</span>
            <span className="text-[10px] text-purple-300 font-mono">Sign & Issue</span>
          </div>
        </button>

        <button
          onClick={() => onNavigateTab('requests')}
          className="flex items-center gap-3.5 p-5 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-3xl hover:border-amber-500/40 transition text-left cursor-pointer group"
        >
          <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 group-hover:scale-110 transition-transform">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-xs font-bold text-white">Clearances</span>
            <span className="text-[10px] text-amber-300 font-mono">Access Requests</span>
          </div>
        </button>

        <button
          onClick={() => onNavigateTab('search')}
          className="flex items-center gap-3.5 p-5 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-3xl hover:border-emerald-500/40 transition text-left cursor-pointer group"
        >
          <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-xs font-bold text-white">Patient Directory</span>
            <span className="text-[10px] text-emerald-300 font-mono">Browse All</span>
          </div>
        </button>
      </div>

      {/* Main Grid: Today's Schedule / Pending Requests & Recent Patients */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Recent Activity & Pending Clearances */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Pending Requests Quick View */}
          <GlassCard className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-sm text-white flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                Pending Access Clearances ({stats.pendingAccessRequests || 0})
              </h3>
              <button
                onClick={() => onNavigateTab('requests')}
                className="text-xs font-mono text-[#38bdf8] hover:underline flex items-center gap-1"
              >
                View All <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {doctorData?.pendingAccessRequests && doctorData.pendingAccessRequests.length > 0 ? (
              <div className="space-y-2.5">
                {doctorData.pendingAccessRequests.slice(0, 3).map((req: any) => (
                  <div key={req.id} className="p-3.5 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-white">Patient: {req.patientName || req.patientId}</span>
                        <StatusChip status="Pending" />
                      </div>
                      <p className="text-[11px] text-slate-300 font-mono">Requested: "{req.recordTitle}"</p>
                    </div>
                    <SecondaryButton onClick={() => onNavigateTab('requests')}>
                      Review
                    </SecondaryButton>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-xs text-slate-400 bg-white/5 rounded-2xl border border-white/5">
                No pending clearance requests awaiting response.
              </div>
            )}
          </GlassCard>

          {/* Activity Stream */}
          <GlassCard className="p-6 space-y-4">
            <h3 className="font-display font-bold text-sm text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#38bdf8]" />
              Practitioner Audit & Activity Stream
            </h3>

            {stats.recentActivity && stats.recentActivity.length > 0 ? (
              <div className="space-y-2.5">
                {stats.recentActivity.slice(0, 5).map((log: any) => (
                  <div key={log.id} className="p-3 bg-white/5 border border-white/5 rounded-xl flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <Activity className="w-3.5 h-3.5 text-[#38bdf8]" />
                      <span className="text-slate-200 font-medium">{log.details}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono shrink-0">
                      {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-xs text-slate-400 bg-white/5 rounded-2xl border border-white/5">
                No recent activity recorded today.
              </div>
            )}
          </GlassCard>
        </div>

        {/* Right Col: Recent Patients / Hospital Information */}
        <div className="space-y-6">
          <GlassCard className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-sm text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-400" />
                Recent Patients
              </h3>
              <button
                onClick={() => onNavigateTab('search')}
                className="text-xs font-mono text-[#38bdf8] hover:underline"
              >
                Directory
              </button>
            </div>

            <div className="space-y-3">
              {(doctorData.allPatients || []).slice(0, 4).map((p: any) => (
                <div
                  key={p.patientId}
                  onClick={() => onInspectPatient?.(p.patientId)}
                  className="p-3 bg-white/5 border border-white/5 hover:border-[#38bdf8]/30 rounded-2xl flex items-center justify-between cursor-pointer transition"
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-xs text-white block">{p.name}</span>
                    <span className="text-[10px] text-[#38bdf8] font-mono">{p.patientId} • {p.gender}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-[#38bdf8]" />
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Hospital & Verification Details Card */}
          <GlassCard className="p-6 space-y-3 border-emerald-500/20 bg-emerald-500/5">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold font-mono uppercase">
              <CheckCircle className="w-4 h-4" />
              Verified Clinical Node
            </div>
            <p className="text-xs text-slate-300">
              Your license is synchronized with <strong>{doctor.hospitalName || 'Central Network'}</strong>. Digitally signed prescriptions will carry your official license hash.
            </p>
            <div className="pt-2 text-[10px] font-mono text-slate-400 border-t border-white/5 flex justify-between">
              <span>Node ID: {doctor.hospitalId || 'HOSP-01'}</span>
              <span>Status: ACTIVE</span>
            </div>
          </GlassCard>
        </div>

      </div>

    </div>
  );
}

