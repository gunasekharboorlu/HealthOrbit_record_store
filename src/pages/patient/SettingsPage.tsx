import React, { useState } from 'react';
import { 
  Shield, 
  Smartphone, Lock, CheckCircle2, Save 
} from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import { GlassCard, PrimaryButton } from '../../components/ui';

interface SettingsPageProps {
  onNavigateTab: (tab: string) => void;
}

export default function SettingsPage({ onNavigateTab }: SettingsPageProps) {
  // Settings State
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [autoExpireEnabled, setAutoExpireEnabled] = useState(true);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passSaved, setPassSaved] = useState(false);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || newPassword !== confirmPassword) return;
    setPassSaved(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPassSaved(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12 max-w-4xl mx-auto">
      {/* Page Header */}
      <PageHeader
        portalName="Patient Portal"
        activeTab="settings"
        tabLabel="Settings"
        title="Portal & Security Settings"
        subtitle="Manage security parameters, password credentials, and active device sessions."
        onNavigateHome={() => onNavigateTab('dashboard')}
      />

      {/* Security Preferences Card */}
      <GlassCard className="p-6 space-y-5">
        <div className="border-b border-[#E5E5E7] pb-3">
          <h3 className="font-display font-bold text-sm text-[#1D1D1F] flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-600" /> Vault Security Protocols
          </h3>
          <p className="text-xs text-[#6E6E73]">Cryptographic protections governing your medical records.</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3.5 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl">
            <div>
              <span className="block font-bold text-xs text-[#1D1D1F]">SHA-256 Record Tamper Check</span>
              <span className="text-[10px] text-[#6E6E73]">Automatic cryptographic integrity verification on all record uploads.</span>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              ACTIVE
            </span>
          </div>

          <div className="flex items-center justify-between p-3.5 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl">
            <div>
              <span className="block font-bold text-xs text-[#1D1D1F]">Automatic Token Session Expiration</span>
              <span className="text-[10px] text-[#6E6E73]">Auto-flushes active authorization credentials after 24 hours of inactivity.</span>
            </div>
            <input
              type="checkbox"
              checked={autoExpireEnabled}
              onChange={(e) => setAutoExpireEnabled(e.target.checked)}
              className="w-5 h-5 text-[#0071E3] accent-[#0071E3] cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-3.5 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl">
            <div>
              <span className="block font-bold text-xs text-[#1D1D1F]">Two-Factor Authorization Prompt</span>
              <span className="text-[10px] text-[#6E6E73]">Prompt for security code when granting sensitive record clearance.</span>
            </div>
            <input
              type="checkbox"
              checked={twoFactorEnabled}
              onChange={(e) => setTwoFactorEnabled(e.target.checked)}
              className="w-5 h-5 text-[#0071E3] accent-[#0071E3] cursor-pointer"
            />
          </div>
        </div>
      </GlassCard>

      {/* Change Password Card */}
      <GlassCard className="p-6 space-y-4">
        <div className="border-b border-[#E5E5E7] pb-3">
          <h3 className="font-display font-bold text-sm text-[#1D1D1F] flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-600" /> Password & Credentials
          </h3>
          <p className="text-xs text-[#6E6E73]">Update account password for HealthOrbit authentication.</p>
        </div>

        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold text-[#6E6E73] uppercase font-mono">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D2D2D7] text-xs text-[#1D1D1F] outline-none focus:border-[#0071E3]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-[#6E6E73] uppercase font-mono">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D2D2D7] text-xs text-[#1D1D1F] outline-none focus:border-[#0071E3]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-[#6E6E73] uppercase font-mono">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D2D2D7] text-xs text-[#1D1D1F] outline-none focus:border-[#0071E3]"
              />
            </div>
          </div>

          {passSaved && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-mono font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Password updated successfully.
            </div>
          )}

          <PrimaryButton type="submit" icon={Save}>
            Update Account Password
          </PrimaryButton>
        </form>
      </GlassCard>

      {/* Active Sessions Card */}
      <GlassCard className="p-6 space-y-4">
        <div className="border-b border-[#E5E5E7] pb-3">
          <h3 className="font-display font-bold text-sm text-[#1D1D1F] flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-[#0071E3]" /> Active Sessions & Devices
          </h3>
          <p className="text-xs text-[#6E6E73]">Current active authorization tokens for your account.</p>
        </div>

        <div className="p-3.5 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl flex items-center justify-between text-xs">
          <div className="space-y-0.5">
            <span className="font-bold text-[#1D1D1F] block">Current Browser Session</span>
            <span className="text-[10px] text-[#6E6E73] font-mono">Chrome / Cloud Container Workspace • IP 10.244.0.12</span>
          </div>
          <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            THIS DEVICE
          </span>
        </div>
      </GlassCard>
    </div>
  );
}
