import React from 'react';
import { User, Mail, Calendar, Heart, Shield, Save, Key, Phone, UserCheck } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import { GlassCard, PrimaryButton, SecondaryButton, Avatar, Badge } from '../../components/ui';
import { Patient, User as UserType } from '../../types';

interface ProfilePageProps {
  patient: Patient;
  patientName?: string;
  currentUser?: UserType | null;
  editDob: string;
  setEditDob: (val: string) => void;
  editGender: string;
  setEditGender: (val: string) => void;
  editBlood: string;
  setEditBlood: (val: string) => void;
  editAllergies: string;
  setEditAllergies: (val: string) => void;
  editDiseases: string;
  setEditDiseases: (val: string) => void;
  editContactName: string;
  setEditContactName: (val: string) => void;
  editContactPhone: string;
  setEditContactPhone: (val: string) => void;
  editContactRelation: string;
  setEditContactRelation: (val: string) => void;
  handleUpdateProfile: (e: React.FormEvent) => void;
  onNavigateTab: (tab: string) => void;
}

export default function ProfilePage({
  patient,
  patientName,
  currentUser,
  editDob,
  setEditDob,
  editGender,
  setEditGender,
  editBlood,
  setEditBlood,
  editAllergies,
  setEditAllergies,
  editDiseases,
  setEditDiseases,
  editContactName,
  setEditContactName,
  editContactPhone,
  setEditContactPhone,
  editContactRelation,
  setEditContactRelation,
  handleUpdateProfile,
  onNavigateTab,
}: ProfilePageProps) {
  const displayName = currentUser?.name || patientName || 'Patient';

  return (
    <div className="space-y-6 animate-fade-in pb-12 max-w-4xl mx-auto">
      {/* Page Header */}
      <PageHeader
        portalName="Patient Portal"
        activeTab="profile"
        tabLabel="Medical Profile"
        title="Patient Identity & Medical Baseline"
        subtitle="Manage your personal credentials, contact details, and core clinical baseline information."
        onNavigateHome={() => onNavigateTab('dashboard')}
      />

      {/* User Identity Header Card */}
      <GlassCard className="p-6 flex flex-col sm:flex-row items-center gap-6 bg-[#FBFBFD] border border-[#E5E5E7] shadow-xs">
        <Avatar
          name={displayName}
          src={currentUser?.profilePicture}
          size="lg"
        />
        <div className="text-center sm:text-left space-y-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h2 className="text-xl font-bold text-[#1D1D1F]">
              {displayName}
            </h2>
            <Badge variant="cyan">Universal Registry</Badge>
          </div>
          <p className="text-xs text-[#6E6E73] font-mono">
            Email: {currentUser?.email || 'patient@healthorbit.io'}
          </p>
          <span className="inline-block text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200 mt-1">
            Registry ID: {patient?.patientId || 'PR-1001'}
          </span>
        </div>
      </GlassCard>

      {/* Profile Form Container */}
      <GlassCard className="p-6 sm:p-8 space-y-6">
        <form onSubmit={handleUpdateProfile} className="space-y-6">
          {/* Section 1: Personal Info */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold font-mono text-[#0071E3] uppercase tracking-wider border-b border-[#E5E5E7] pb-2 flex items-center gap-2">
              <User className="w-4 h-4" /> Personal & Demographic Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-[#6E6E73] uppercase font-mono">
                  Birth Date
                </label>
                <input
                  type="date"
                  value={editDob}
                  onChange={(e) => setEditDob(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D2D2D7] text-xs text-[#1D1D1F] outline-none focus:border-[#0071E3]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-[#6E6E73] uppercase font-mono">
                  Gender
                </label>
                <select
                  value={editGender}
                  onChange={(e) => setEditGender(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D2D2D7] text-xs text-[#1D1D1F] outline-none focus:border-[#0071E3] cursor-pointer"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Medical Vitals */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold font-mono text-emerald-700 uppercase tracking-wider border-b border-[#E5E5E7] pb-2 flex items-center gap-2">
              <Heart className="w-4 h-4" /> Medical Vitals & Allergies Baseline
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-[#6E6E73] uppercase font-mono">
                  Blood Group
                </label>
                <input
                  type="text"
                  value={editBlood}
                  onChange={(e) => setEditBlood(e.target.value)}
                  placeholder="e.g. O-Positive"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D2D2D7] text-xs text-[#1D1D1F] outline-none focus:border-[#0071E3]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-[#6E6E73] uppercase font-mono">
                  Severe Allergies
                </label>
                <input
                  type="text"
                  value={editAllergies}
                  onChange={(e) => setEditAllergies(e.target.value)}
                  placeholder="e.g. Penicillin, Latex"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D2D2D7] text-xs text-[#1D1D1F] outline-none focus:border-[#0071E3]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-[#6E6E73] uppercase font-mono">
                Chronic Illnesses / Conditions
              </label>
              <input
                type="text"
                value={editDiseases}
                onChange={(e) => setEditDiseases(e.target.value)}
                placeholder="e.g. Type 1 Diabetes, Asthma"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D2D2D7] text-xs text-[#1D1D1F] outline-none focus:border-[#0071E3]"
              />
            </div>
          </div>

          {/* Section 3: Emergency Contact Guardian */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold font-mono text-rose-600 uppercase tracking-wider border-b border-[#E5E5E7] pb-2 flex items-center gap-2">
              <Phone className="w-4 h-4" /> Emergency Contact Guardian
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-[#6E6E73] uppercase font-mono">
                  Guardian Name
                </label>
                <input
                  type="text"
                  value={editContactName}
                  onChange={(e) => setEditContactName(e.target.value)}
                  placeholder="Contact Name"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D2D2D7] text-xs text-[#1D1D1F] outline-none focus:border-[#0071E3]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-[#6E6E73] uppercase font-mono">
                  Relationship
                </label>
                <input
                  type="text"
                  value={editContactRelation}
                  onChange={(e) => setEditContactRelation(e.target.value)}
                  placeholder="Spouse / Parent"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D2D2D7] text-xs text-[#1D1D1F] outline-none focus:border-[#0071E3]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-[#6E6E73] uppercase font-mono">
                  Guardian Phone
                </label>
                <input
                  type="text"
                  value={editContactPhone}
                  onChange={(e) => setEditContactPhone(e.target.value)}
                  placeholder="+1 (555) 019-2834"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D2D2D7] text-xs text-[#1D1D1F] outline-none focus:border-[#0071E3]"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <PrimaryButton type="submit" icon={Save} fullWidth size="lg">
            Update Profile & Baseline Vitals
          </PrimaryButton>
        </form>
      </GlassCard>
    </div>
  );
}
