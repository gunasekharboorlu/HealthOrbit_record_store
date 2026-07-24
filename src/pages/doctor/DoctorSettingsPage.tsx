import React, { useState } from 'react';
import { 
  Settings, Key, Shield, Bell, Lock, CheckCircle, Save
} from 'lucide-react';
import { GlassCard, PrimaryButton, SecondaryButton } from '../../components/ui';

interface DoctorSettingsPageProps {
  sigPin: string;
  setSigPin: (val: string) => void;
  notifPref: boolean;
  setNotifPref: (val: boolean) => void;
  showNotification: (msg: string, type?: 'success' | 'error') => void;
}

export default function DoctorSettingsPage({
  sigPin,
  setSigPin,
  notifPref,
  setNotifPref,
  showNotification,
}: DoctorSettingsPageProps) {
  const [pinInput, setPinInput] = useState(sigPin);
  const [isEditingPin, setIsEditingPin] = useState(false);

  const handleSavePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.length < 4) {
      showNotification('PIN must be at least 4 characters', 'error');
      return;
    }
    setSigPin(pinInput);
    setIsEditingPin(false);
    showNotification('Digital signature PIN updated successfully!', 'success');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-extrabold text-white">Practice Settings & Preferences</h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage digital signature authorization keys, clearance timeframes, and notification rules.
        </p>
      </div>

      {/* Settings Cards */}
      <div className="space-y-4">
        
        {/* Digital Signature PIN */}
        <GlassCard className="p-6 space-y-4">
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <div>
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Key className="w-4 h-4 text-[#38bdf8]" /> Digital Signature PIN
              </h3>
              <p className="text-xs text-slate-400">
                Attached to every digitally signed prescription issued to patients.
              </p>
            </div>
            <span className="text-sm font-mono font-bold text-[#38bdf8] bg-[#38bdf8]/10 px-3 py-1 rounded-xl">
              {sigPin}
            </span>
          </div>

          {isEditingPin ? (
            <form onSubmit={handleSavePin} className="flex gap-2 items-center pt-2">
              <input
                type="password"
                value={pinInput}
                onChange={e => setPinInput(e.target.value)}
                placeholder="Enter 4-digit PIN"
                className="px-3.5 py-2 rounded-xl premium-input text-xs text-white outline-none"
              />
              <PrimaryButton type="submit">Save PIN</PrimaryButton>
              <SecondaryButton type="button" onClick={() => setIsEditingPin(false)}>Cancel</SecondaryButton>
            </form>
          ) : (
            <SecondaryButton onClick={() => setIsEditingPin(true)}>
              Change Digital PIN
            </SecondaryButton>
          )}
        </GlassCard>

        {/* Clearance Rules */}
        <GlassCard className="p-6 space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" /> Clearance Window Policy
              </h3>
              <p className="text-xs text-slate-400">
                Patient authorizations for sensitive records automatically expire after 24 hours.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-xl">
              24-HR TIMEFRAME
            </span>
          </div>
        </GlassCard>

        {/* Notifications Preference */}
        <GlassCard className="p-6 space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Bell className="w-4 h-4 text-purple-400" /> Practice Notifications
              </h3>
              <p className="text-xs text-slate-400">
                Receive instant alerts when a patient approves or denies access to sensitive records.
              </p>
            </div>
            <button
              onClick={() => {
                setNotifPref(!notifPref);
                showNotification(`Notifications ${!notifPref ? 'enabled' : 'disabled'}`, 'success');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition cursor-pointer ${
                notifPref ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {notifPref ? 'ENABLED' : 'DISABLED'}
            </button>
          </div>
        </GlassCard>

      </div>

    </div>
  );
}
