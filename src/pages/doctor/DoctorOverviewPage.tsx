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
      <GlassCard className="p-6 sm:p-8 md:p-10 bg-[#FBFBFD] border-[#E5E5E7] relative overflow-hidden flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        
        <div className="flex items-center gap-6 relative z-10">
          <Avatar name={profName || 'Doctor'} src={profPic} size="xl" />
          <div className="space-y-2">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-[#1D1D1F]">
                Dr. {profName || doctor.name}
              </h1>
              {doctor.isVerified ? (
                <StatusChip status="Approved" label="Verified Practitioner" customIcon={<BadgeCheck className="w-3.5 h-3.5 text-emerald-600" />} />
              ) : (
                <StatusChip status="Pending" label="Verification Pending" />
              )}
            </div>
            <p className="text-xs sm:text-sm text-[#0071E3] font-mono font-bold flex items-center gap-2">
              <Stethoscope className="w-4 h-4" />
              {profSpec || doctor.specialization} • {doctor.department || 'General Medicine'}
            </p>
            <div className="flex items-center gap-3 text-xs text-[#6E6E73] font-mono flex-wrap">
              <span className="flex items-center gap-1.5"><Building className="w-3.5 h-3.5 text-[#6E6E73]" /> {doctor.hospitalName || 'HealthOrbit Hospital Network'}</span>
              <span>•</span>
              <span className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-[#6E6E73]" /> License: {doctor.licenseNumber || 'N/A'}</span>
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
          icon={<Users className="w-5 h-5 text-[#0071E3]" />}
          change="Directory View"
          changeType="positive"
          onClick={() => onNavigateTab('search')}
        />
        <StatCard
          title="PENDING CLEARANCES"
          value={stats.pendingAccessRequests || 0}
          icon={<AlertCircle className="w-5 h-5 text-amber-600" />}
          change="Requires Review"
          changeType={stats.pendingAccessRequests > 0 ? "warning" : "neutral"}
          onClick={() => onNavigateTab('requests')}
        />
        <StatCard
          title="ACTIVE CLEARANCES"
          value={stats.approvedAccessRequests || 0}
          icon={<Shield className="w-5 h-5 text-emerald-600" />}
          change="24-hr Unlocks"
          changeType="positive"
          onClick={() => onNavigateTab('requests')}
        />
        <StatCard
          title="TODAY'S PRESCRIPTIONS"
          value={stats.todayPrescriptions || 0}
          icon={<ClipboardList className="w-5 h-5 text-purple-600" />}
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
          className="flex items-center gap-3.5 p-5 bg-[#F5F5F7] border border-[#E5E5E7] rounded-3xl hover:border-[#0071E3]/40 transition text-left cursor-pointer group"
        >
          <div className="p-3 rounded-2xl bg-[#0071E3]/10 text-[#0071E3] group-hover:scale-105 transition-transform">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-xs font-bold text-[#1D1D1F]">Find Patient</span>
            <span className="text-[10px] text-[#6E6E73] font-mono">Registry Lookup</span>
          </div>
        </button>

        <button
          onClick={() => onNavigateTab('workspace')}
          className="flex items-center gap-3.5 p-5 bg-[#F5F5F7] border border-[#E5E5E7] rounded-3xl hover:border-purple-300 transition text-left cursor-pointer group"
        >
          <div className="p-3 rounded-2xl bg-purple-50 text-purple-700 group-hover:scale-105 transition-transform">
            <ClipboardList className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-xs font-bold text-[#1D1D1F]">Write Prescription</span>
            <span className="text-[10px] text-purple-700 font-mono">Sign & Issue</span>
          </div>
        </button>

        <button
          onClick={() => onNavigateTab('requests')}
          className="flex items-center gap-3.5 p-5 bg-[#F5F5F7] border border-[#E5E5E7] rounded-3xl hover:border-amber-300 transition text-left cursor-pointer group"
        >
          <div className="p-3 rounded-2xl bg-amber-50 text-amber-700 group-hover:scale-105 transition-transform">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-xs font-bold text-[#1D1D1F]">Clearances</span>
            <span className="text-[10px] text-amber-700 font-mono">Access Requests</span>
          </div>
        </button>

        <button
          onClick={() => onNavigateTab('search')}
          className="flex items-center gap-3.5 p-5 bg-[#F5F5F7] border border-[#E5E5E7] rounded-3xl hover:border-emerald-300 transition text-left cursor-pointer group"
        >
          <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-700 group-hover:scale-105 transition-transform">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-xs font-bold text-[#1D1D1F]">Patient Directory</span>
            <span className="text-[10px] text-emerald-700 font-mono">Browse All</span>
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
              <h3 className="font-display font-bold text-sm text-[#1D1D1F] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                Pending Access Clearances ({stats.pendingAccessRequests || 0})
              </h3>
              <button
                onClick={() => onNavigateTab('requests')}
                className="text-xs font-mono text-[#0071E3] hover:underline flex items-center gap-1"
              >
                View All <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {doctorData?.pendingAccessRequests && doctorData.pendingAccessRequests.length > 0 ? (
              <div className="space-y-2.5">
                {doctorData.pendingAccessRequests.slice(0, 3).map((req: any) => (
                  <div key={req.id} className="p-3.5 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-[#1D1D1F]">Patient: {req.patientName || req.patientId}</span>
                        <StatusChip status="Pending" />
                      </div>
                      <p className="text-[11px] text-[#6E6E73] font-mono">Requested: "{req.recordTitle}"</p>
                    </div>
                    <SecondaryButton onClick={() => onNavigateTab('requests')}>
                      Review
                    </SecondaryButton>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-xs text-[#6E6E73] bg-[#F5F5F7] rounded-2xl border border-[#E5E5E7]">
                No pending clearance requests awaiting response.
              </div>
            )}
          </GlassCard>

          {/* Activity Stream */}
          <GlassCard className="p-6 space-y-4">
            <h3 className="font-display font-bold text-sm text-[#1D1D1F] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#0071E3]" />
              Practitioner Audit & Activity Stream
            </h3>

            {stats.recentActivity && stats.recentActivity.length > 0 ? (
              <div className="space-y-2.5">
                {stats.recentActivity.slice(0, 5).map((log: any) => (
                  <div key={log.id} className="p-3 bg-[#F5F5F7] border border-[#E5E5E7] rounded-xl flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <Activity className="w-3.5 h-3.5 text-[#0071E3]" />
                      <span className="text-[#1D1D1F] font-medium">{log.details}</span>
                    </div>
                    <span className="text-[10px] text-[#6E6E73] font-mono shrink-0">
                      {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-xs text-[#6E6E73] bg-[#F5F5F7] rounded-2xl border border-[#E5E5E7]">
                No recent activity recorded today.
              </div>
            )}
          </GlassCard>
        </div>

        {/* Right Col: Recent Patients / Hospital Information */}
        <div className="space-y-6">
          <GlassCard className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-sm text-[#1D1D1F] flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-600" />
                Recent Patients
              </h3>
              <button
                onClick={() => onNavigateTab('search')}
                className="text-xs font-mono text-[#0071E3] hover:underline"
              >
                Directory
              </button>
            </div>

            <div className="space-y-3">
              {(doctorData.allPatients || []).slice(0, 4).map((p: any) => (
                <div
                  key={p.patientId}
                  onClick={() => onInspectPatient?.(p.patientId)}
                  className="p-3 bg-[#F5F5F7] border border-[#E5E5E7] hover:border-[#0071E3]/30 rounded-2xl flex items-center justify-between cursor-pointer transition"
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-xs text-[#1D1D1F] block">{p.name}</span>
                    <span className="text-[10px] text-[#0071E3] font-mono">{p.patientId} • {p.gender}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#6E6E73] group-hover:text-[#0071E3]" />
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Hospital & Verification Details Card */}
          <GlassCard className="p-6 space-y-3 border-emerald-200 bg-emerald-50/50">
            <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold font-mono uppercase">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              Verified Clinical Node
            </div>
            <p className="text-xs text-[#6E6E73]">
              Your license is synchronized with <strong>{doctor.hospitalName || 'Central Network'}</strong>. Digitally signed prescriptions will carry your official license hash.
            </p>
            <div className="pt-2 text-[10px] font-mono text-[#6E6E73] border-t border-[#E5E5E7] flex justify-between">
              <span>Node ID: {doctor.hospitalId || 'HOSP-01'}</span>
              <span>Status: ACTIVE</span>
            </div>
          </GlassCard>
        </div>

      </div>

    </div>
  );
}

