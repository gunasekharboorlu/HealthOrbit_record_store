import React, { useState } from 'react';
import { 
  Settings, Shield, Lock, Clock, Moon, Bell, Database, 
  AlertTriangle, Save, CheckCircle2, RefreshCw, Power, Server
} from 'lucide-react';
import { GlassCard, PrimaryButton, SecondaryButton, ConfirmDialog } from '../../components/ui';

export default function SystemSettingsPage() {
  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [requireMfa, setRequireMfa] = useState(true);
  const [enforceStrongPassword, setEnforceStrongPassword] = useState(true);
  const [sensitivityLockDefault, setSensitivityLockDefault] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [auditAlerts, setAuditAlerts] = useState(true);
  
  // Save Feedback
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Backup state
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [backupNotice, setBackupNotice] = useState<string | null>(null);

  // Maintenance mode
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [confirmMaintenanceModal, setConfirmMaintenanceModal] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  const handleTriggerBackup = () => {
    setIsBackingUp(true);
    setBackupNotice(null);
    setTimeout(() => {
      setIsBackingUp(false);
      setBackupNotice(`Snapshot created successfully: healthorbit_db_backup_${new Date().toISOString().slice(0, 10)}.sql`);
    }, 1800);
  };

  const toggleMaintenance = () => {
    setMaintenanceMode(!maintenanceMode);
    setConfirmMaintenanceModal(false);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#E5E5E7] pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-display font-bold text-[#1D1D1F] flex items-center gap-2">
            <Settings className="w-6 h-6 text-[#0071E3]" /> System Settings & Policy Configuration
          </h1>
          <p className="text-xs text-[#6E6E73] mt-0.5">
            Configure platform security mandates, session control limits, disaster recovery backups, and maintenance triggers.
          </p>
        </div>

        {savedSuccess && (
          <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold font-mono flex items-center gap-1.5 animate-pulse">
            <CheckCircle2 className="w-4 h-4" /> Policies Saved
          </span>
        )}
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        
        {/* Section 1: Security Policies */}
        <GlassCard className="p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-[#E5E5E7] pb-3">
            <Shield className="w-5 h-5 text-emerald-600" />
            <h3 className="font-display font-bold text-base text-[#1D1D1F]">Security Policies & Access Controls</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3.5 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl">
              <div>
                <span className="block font-bold text-xs text-[#1D1D1F]">Strict Password Mandate</span>
                <span className="text-[10px] text-[#6E6E73]">Require 8+ chars, uppercase, lowercase, number, and special character.</span>
              </div>
              <input
                type="checkbox"
                checked={enforceStrongPassword}
                onChange={(e) => setEnforceStrongPassword(e.target.checked)}
                className="w-4 h-4 accent-[#0071E3] rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl">
              <div>
                <span className="block font-bold text-xs text-[#1D1D1F]">Enforce Physician Multi-Factor Authentication (MFA)</span>
                <span className="text-[10px] text-[#6E6E73]">Require OTP validation on doctor logins.</span>
              </div>
              <input
                type="checkbox"
                checked={requireMfa}
                onChange={(e) => setRequireMfa(e.target.checked)}
                className="w-4 h-4 accent-[#0071E3] rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl">
              <div>
                <span className="block font-bold text-xs text-[#1D1D1F]">Sensitivity Lock Default for Scans & Mental Health</span>
                <span className="text-[10px] text-[#6E6E73]">Automatically flag sensitive reports as requiring explicit patient authorization.</span>
              </div>
              <input
                type="checkbox"
                checked={sensitivityLockDefault}
                onChange={(e) => setSensitivityLockDefault(e.target.checked)}
                className="w-4 h-4 accent-[#0071E3] rounded cursor-pointer"
              />
            </div>
          </div>
        </GlassCard>

        {/* Section 2: Session Timeout & Theme */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <GlassCard className="p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-[#E5E5E7] pb-3">
              <Clock className="w-5 h-5 text-[#0071E3]" />
              <h3 className="font-display font-bold text-base text-[#1D1D1F]">Session Timeout</h3>
            </div>

            <div className="space-y-2">
              <label className="block text-xs text-[#1D1D1F] font-semibold">Inactivity Auto-Logout Window</label>
              <select
                value={sessionTimeout}
                onChange={(e) => setSessionTimeout(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D2D2D7] text-xs text-[#1D1D1F] outline-none cursor-pointer"
              >
                <option value="15">15 Minutes (HIPAA Maximum Compliance)</option>
                <option value="30">30 Minutes (Standard Enterprise)</option>
                <option value="60">60 Minutes (Extended Window)</option>
              </select>
              <p className="text-[10px] text-[#6E6E73] pt-1">
                Sessions automatically terminate after this inactivity window to prevent unauthorized workstation access.
              </p>
            </div>
          </GlassCard>

          <GlassCard className="p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-[#E5E5E7] pb-3">
              <Moon className="w-5 h-5 text-purple-600" />
              <h3 className="font-display font-bold text-base text-[#1D1D1F]">Console Visual Theme</h3>
            </div>

            <div className="p-3 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl flex items-center justify-between">
              <div>
                <span className="block font-bold text-xs text-[#1D1D1F]">HealthOrbit Apple Light Canvas</span>
                <span className="text-[10px] text-[#6E6E73]">High-contrast clinical light theme active.</span>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                ACTIVE
              </span>
            </div>
          </GlassCard>

        </div>

        {/* Section 3: Notification Alerts */}
        <GlassCard className="p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-[#E5E5E7] pb-3">
            <Bell className="w-5 h-5 text-teal-600" />
            <h3 className="font-display font-bold text-base text-[#1D1D1F]">Compliance & System Notifications</h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3.5 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl">
              <div>
                <span className="block font-bold text-xs text-[#1D1D1F]">Critical Security Breach Immediate Alerts</span>
                <span className="text-[10px] text-[#6E6E73]">Notify system administrators immediately on unauthorized access attempts.</span>
              </div>
              <input
                type="checkbox"
                checked={auditAlerts}
                onChange={(e) => setAuditAlerts(e.target.checked)}
                className="w-4 h-4 accent-[#0071E3] rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl">
              <div>
                <span className="block font-bold text-xs text-[#1D1D1F]">Daily Doctor Licensing Summary Email</span>
                <span className="text-[10px] text-[#6E6E73]">Receive morning summary of pending physician verification requests.</span>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 accent-[#0071E3] rounded cursor-pointer"
              />
            </div>
          </div>
        </GlassCard>

        {/* Section 4: Disaster Recovery Backup Placeholders */}
        <GlassCard className="p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-[#E5E5E7] pb-3">
            <Database className="w-5 h-5 text-purple-600" />
            <h3 className="font-display font-bold text-base text-[#1D1D1F]">Disaster Recovery & Database Backup</h3>
          </div>

          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-4 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl">
              <div>
                <h4 className="font-bold text-xs text-[#1D1D1F]">Automated Snapshot Interval</h4>
                <p className="text-[10px] text-[#6E6E73] mt-0.5">Automated encrypted backups triggered every 6 hours to multi-region cloud buckets.</p>
              </div>
              <button
                type="button"
                onClick={handleTriggerBackup}
                disabled={isBackingUp}
                className="px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 transition cursor-pointer shrink-0"
              >
                {isBackingUp ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Creating Snapshot...
                  </>
                ) : (
                  <>
                    <Database className="w-3.5 h-3.5" /> Trigger Manual Backup
                  </>
                )}
              </button>
            </div>

            {backupNotice && (
              <p className="text-xs font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 p-3 rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{backupNotice}</span>
              </p>
            )}
          </div>
        </GlassCard>

        {/* Section 5: Maintenance Mode Switch */}
        <GlassCard className="p-6 space-y-4 border-rose-200 bg-rose-50/50">
          <div className="flex items-center justify-between border-b border-rose-200 pb-3">
            <div className="flex items-center gap-2">
              <Power className="w-5 h-5 text-rose-600" />
              <h3 className="font-display font-bold text-base text-rose-900">Emergency System Maintenance Switch</h3>
            </div>

            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
              maintenanceMode ? 'bg-rose-600 text-white animate-pulse' : 'bg-[#E5E5E7] text-[#6E6E73]'
            }`}>
              {maintenanceMode ? 'MAINTENANCE MODE ACTIVE' : 'SYSTEM OPERATIONAL'}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-xs text-[#1D1D1F] leading-relaxed">
              Activating emergency maintenance mode restricts public access and pauses record uploads. Only Administrators will retain access to the console.
            </p>

            <button
              type="button"
              onClick={() => setConfirmMaintenanceModal(true)}
              className={`px-4 py-2 rounded-xl font-bold text-xs transition cursor-pointer shrink-0 ${
                maintenanceMode
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-rose-600 text-white hover:bg-rose-700'
              }`}
            >
              {maintenanceMode ? 'Resume Operational Mode' : 'Activate Maintenance Switch'}
            </button>
          </div>
        </GlassCard>

        {/* Save Policy Button */}
        <div className="flex justify-end pt-2">
          <PrimaryButton type="submit" icon={Save}>
            Save Administrator Policies
          </PrimaryButton>
        </div>

      </form>

      {/* Confirmation Dialog for Maintenance Switch */}
      <ConfirmDialog
        isOpen={confirmMaintenanceModal}
        onClose={() => setConfirmMaintenanceModal(false)}
        onConfirm={toggleMaintenance}
        title={maintenanceMode ? "Deactivate Maintenance Mode?" : "Activate Emergency Maintenance Switch?"}
        message={
          maintenanceMode
            ? "This will restore full public access and enable medical record ingestion for patients and doctors across the network."
            : "WARNING: Activating maintenance mode will pause all non-administrator user access to the platform. Are you sure you wish to proceed?"
        }
        confirmText={maintenanceMode ? "Resume Platform Operations" : "Activate Maintenance Switch"}
        confirmVariant={maintenanceMode ? "primary" : "danger"}
      />
    </div>
  );
}
