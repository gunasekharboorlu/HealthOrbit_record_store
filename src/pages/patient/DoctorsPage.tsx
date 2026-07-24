import React from 'react';
import { 
  ShieldCheck, ShieldAlert, CheckCircle2, XCircle, 
  Lock, Key, Users, Building, Clock, AlertTriangle 
} from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import { GlassCard, PrimaryButton, SecondaryButton, DangerButton, Badge, StatusChip, EmptyState } from '../../components/ui';

interface DoctorsPageProps {
  pendingRequests: any[];
  accessHistory?: any[];
  handleRespondAccess: (id: string, status: 'approved' | 'rejected') => void;
  onNavigateTab: (tab: string) => void;
}

export default function DoctorsPage({
  pendingRequests = [],
  accessHistory = [],
  handleRespondAccess,
  onNavigateTab,
}: DoctorsPageProps) {
  // Separate approved and rejected requests from access history
  const approvedClearances = accessHistory.filter((a) => a.status === 'approved' || a.status === 'granted');
  const rejectedClearances = accessHistory.filter((a) => a.status === 'rejected' || a.status === 'denied');

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Page Header */}
      <PageHeader
        portalName="Patient Portal"
        activeTab="doctors"
        tabLabel="Doctors & Access"
        title="Physician Clearances & Access Control"
        subtitle="Zero-trust patient-governed access. Grant, inspect, or revoke doctor access to your medical vault."
        onNavigateHome={() => onNavigateTab('dashboard')}
      />

      {/* Security Info Card */}
      <GlassCard className="border-[#38bdf8]/20 bg-[#38bdf8]/5 p-5 flex items-start gap-4">
        <div className="p-2.5 rounded-xl bg-[#38bdf8]/20 text-[#38bdf8] shrink-0 mt-0.5">
          <Key className="w-5 h-5" />
        </div>
        <div className="space-y-1 text-xs text-slate-300">
          <h4 className="font-bold text-white text-sm">Patient-Centric Authorization Engine</h4>
          <p className="leading-relaxed">
            Doctors cannot view locked or sensitive medical records without explicit permission. When a doctor requests clearance using your Registry ID, it appears here for your authorization.
          </p>
        </div>
      </GlassCard>

      {/* Section 1: Pending Access Requests */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-4.5 h-4.5 text-amber-400" /> Pending Doctor Clearance Requests ({pendingRequests.length})
          </h3>
        </div>

        {pendingRequests.length === 0 ? (
          <EmptyState
            title="No Pending Clearance Requests"
            message="There are currently no doctors awaiting your access authorization."
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingRequests.map((req) => (
              <GlassCard
                key={req.id}
                className="border-amber-500/30 bg-amber-950/10 space-y-4 p-5"
              >
                <div className="flex justify-between items-start gap-3">
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm text-white">Dr. {req.doctorName}</h4>
                    <p className="text-xs text-slate-400 font-mono">
                      {req.doctorSpecialization || 'Specialist'} • {req.hospitalName || 'Health Center'}
                    </p>
                  </div>
                  <Badge variant="warning">Pending</Badge>
                </div>

                <div className="bg-slate-950/80 p-3 rounded-xl border border-white/5 text-xs">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Requested Record</span>
                  <span className="font-bold text-[#38bdf8] block">{req.recordTitle}</span>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <PrimaryButton
                    fullWidth
                    size="sm"
                    icon={CheckCircle2}
                    onClick={() => handleRespondAccess(req.id, 'approved')}
                  >
                    Grant Clearance
                  </PrimaryButton>
                  <DangerButton
                    fullWidth
                    size="sm"
                    icon={XCircle}
                    onClick={() => handleRespondAccess(req.id, 'rejected')}
                  >
                    Deny Request
                  </DangerButton>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </div>

      {/* Section 2: Active Granted Clearances */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4.5 h-4.5 text-emerald-400" /> Active Doctor Access Clearances ({approvedClearances.length})
          </h3>
        </div>

        {approvedClearances.length === 0 ? (
          <EmptyState
            title="No Active Doctor Clearances"
            message="No doctors currently possess active clearance to your sensitive records."
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {approvedClearances.map((item) => (
              <GlassCard key={item.id} className="p-5 space-y-3 border-emerald-500/20">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-sm text-white">Dr. {item.doctorName}</h4>
                    <span className="text-[10px] text-slate-400 font-mono">{item.doctorSpecialization || 'Physician'}</span>
                  </div>
                  <StatusChip status="approved" />
                </div>
                <p className="text-xs text-slate-300">
                  Access Granted to: <span className="font-bold text-[#38bdf8]">{item.recordTitle}</span>
                </p>
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono border-t border-white/5 pt-2">
                  <span>Granted: {new Date(item.timestamp || item.updatedAt || Date.now()).toLocaleDateString()}</span>
                  <button
                    onClick={() => handleRespondAccess(item.id, 'rejected')}
                    className="text-rose-400 hover:underline font-bold cursor-pointer"
                  >
                    Revoke Access
                  </button>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </div>

      {/* Section 3: Audit Ledger of Expired or Revoked Access */}
      {rejectedClearances.length > 0 && (
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="font-display text-base font-bold text-slate-300 flex items-center gap-2">
              <Clock className="w-4.5 h-4.5 text-slate-400" /> Revoked & Expired Clearance History
            </h3>
          </div>

          <div className="space-y-2">
            {rejectedClearances.map((item) => (
              <div
                key={item.id}
                className="p-3.5 bg-slate-900/40 border border-white/5 rounded-xl flex items-center justify-between text-xs text-slate-400"
              >
                <div>
                  <span className="font-bold text-white">Dr. {item.doctorName}</span>
                  <span className="text-[10px] text-slate-500 block">{item.recordTitle}</span>
                </div>
                <div className="flex items-center gap-3">
                  <StatusChip status="rejected" />
                  <span className="font-mono text-[10px]">
                    {new Date(item.timestamp || item.updatedAt || Date.now()).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
