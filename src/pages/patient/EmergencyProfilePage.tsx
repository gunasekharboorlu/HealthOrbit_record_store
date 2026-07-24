import React, { useState } from 'react';
import { 
  Heart, ShieldAlert, Phone, UserCheck, Edit3, 
  Printer, QrCode, Check, Save, X, Sparkles, Activity
} from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import { GlassCard, PrimaryButton, SecondaryButton, DangerButton, Badge } from '../../components/ui';
import { Patient } from '../../types';

interface EmergencyProfilePageProps {
  patient: Patient;
  patientName: string;
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
  isEditingProfile: boolean;
  setIsEditingProfile: (val: boolean) => void;
  handleUpdateProfile: (e: React.FormEvent) => void;
  onNavigateTab: (tab: string) => void;
}

export default function EmergencyProfilePage({
  patient,
  patientName,
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
  isEditingProfile,
  setIsEditingProfile,
  handleUpdateProfile,
  onNavigateTab,
}: EmergencyProfilePageProps) {
  const handlePrintCard = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12 max-w-4xl mx-auto">
      {/* Page Header */}
      <PageHeader
        portalName="Patient Portal"
        activeTab="emergency"
        tabLabel="Emergency Card"
        title="Digital Emergency ID & Vitals"
        subtitle="Critical medical vitals instantly accessible by First Responders (EMTs) during emergencies."
        actions={
          <SecondaryButton
            icon={Printer}
            size="sm"
            onClick={handlePrintCard}
          >
            Print Emergency Card
          </SecondaryButton>
        }
        onNavigateHome={() => onNavigateTab('dashboard')}
      />

      {/* Primary Emergency Card Container */}
      <GlassCard className="border-rose-500/30 bg-gradient-to-br from-[#1a0c1a]/90 via-[#0d0714]/95 to-[#160a1f]/90 p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        {/* Glowing Background Effect */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500 opacity-10 blur-3xl rounded-full pointer-events-none animate-pulse" />

        {/* Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-rose-500/20 border border-rose-500/30 rounded-2xl text-rose-400">
              <ShieldAlert className="w-8 h-8 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-2xl font-black text-white">{patientName}</h2>
                <span className="bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase">
                  EMT Emergency Rescue
                </span>
              </div>
              <p className="text-xs text-rose-300 font-mono font-bold mt-0.5">
                Registry ID: {patient?.patientId || 'PR-1001'}
              </p>
            </div>
          </div>

          <SecondaryButton
            icon={Edit3}
            size="sm"
            onClick={() => setIsEditingProfile(!isEditingProfile)}
          >
            {isEditingProfile ? 'Cancel Editing' : 'Edit Vitals'}
          </SecondaryButton>
        </div>

        {/* Edit Form or Vitals Display */}
        {isEditingProfile ? (
          <form onSubmit={handleUpdateProfile} className="space-y-4 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase font-mono mb-1.5">
                  Blood Group
                </label>
                <input
                  type="text"
                  value={editBlood}
                  onChange={(e) => setEditBlood(e.target.value)}
                  placeholder="e.g. O-Positive"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white outline-none focus:border-[#38bdf8]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase font-mono mb-1.5">
                  Severe Allergies
                </label>
                <input
                  type="text"
                  value={editAllergies}
                  onChange={(e) => setEditAllergies(e.target.value)}
                  placeholder="e.g. Penicillin, Latex"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white outline-none focus:border-[#38bdf8]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase font-mono mb-1.5">
                Chronic Illnesses / Pre-existing Conditions
              </label>
              <input
                type="text"
                value={editDiseases}
                onChange={(e) => setEditDiseases(e.target.value)}
                placeholder="e.g. Type 1 Diabetes, Asthma"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white outline-none focus:border-[#38bdf8]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase font-mono mb-1.5">
                  Emergency Guardian Name
                </label>
                <input
                  type="text"
                  placeholder="Guardian Name"
                  value={editContactName}
                  onChange={(e) => setEditContactName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white outline-none focus:border-[#38bdf8]"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase font-mono mb-1.5">
                  Guardian Relationship
                </label>
                <input
                  type="text"
                  placeholder="e.g. Spouse / Parent"
                  value={editContactRelation}
                  onChange={(e) => setEditContactRelation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white outline-none focus:border-[#38bdf8]"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase font-mono mb-1.5">
                  Guardian Phone
                </label>
                <input
                  type="text"
                  placeholder="+1 (555) 019-2834"
                  value={editContactPhone}
                  onChange={(e) => setEditContactPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white outline-none focus:border-[#38bdf8]"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <PrimaryButton type="submit" icon={Save}>
                Save Vitals & Emergency Card
              </PrimaryButton>
              <SecondaryButton onClick={() => setIsEditingProfile(false)}>
                Cancel
              </SecondaryButton>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Vitals Info Grid */}
            <div className="md:col-span-8 grid grid-cols-2 gap-4">
              <div className="bg-slate-950/80 border border-white/10 p-4 rounded-2xl space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">
                  Blood Group
                </span>
                <span className="text-2xl font-black text-teal-400 font-mono block">
                  {patient?.bloodGroup || 'Not specified'}
                </span>
              </div>

              <div className="bg-slate-950/80 border border-white/10 p-4 rounded-2xl space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">
                  Severe Allergies
                </span>
                <span className="text-sm font-bold text-rose-400 block truncate">
                  {patient?.allergies || 'None declared'}
                </span>
              </div>

              <div className="bg-slate-950/80 border border-white/10 p-4 rounded-2xl space-y-1 col-span-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">
                  Chronic Illnesses / Baseline Conditions
                </span>
                <span className="text-sm font-bold text-white block">
                  {patient?.chronicDiseases || 'None declared'}
                </span>
              </div>

              <div className="bg-slate-950/80 border border-white/10 p-4 rounded-2xl space-y-2 col-span-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">
                  Emergency Guardian Contact
                </span>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-bold text-white block">
                      {patient?.emergencyContactName || 'Not configured'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Relationship: {patient?.emergencyContactRelation || 'N/A'}
                    </span>
                  </div>
                  {patient?.emergencyContactPhone && (
                    <a
                      href={`tel:${patient.emergencyContactPhone}`}
                      className="px-3 py-1.5 bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-xl text-xs font-bold font-mono hover:bg-rose-500/30 transition flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5" /> Call Guardian
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* QR Code Rescue Scanner Box */}
            <div className="md:col-span-4 bg-slate-950/90 border border-rose-500/20 p-5 rounded-2xl text-center space-y-3 flex flex-col items-center justify-center">
              <div className="w-32 h-32 bg-white p-2 rounded-xl flex items-center justify-center shadow-lg">
                {/* SVG QR Code Simulation */}
                <svg className="w-full h-full text-slate-950" viewBox="0 0 100 100" fill="currentColor">
                  <rect x="0" y="0" width="30" height="30" />
                  <rect x="5" y="5" width="20" height="20" fill="white" />
                  <rect x="10" y="10" width="10" height="10" />
                  <rect x="70" y="0" width="30" height="30" />
                  <rect x="75" y="5" width="20" height="20" fill="white" />
                  <rect x="80" y="10" width="10" height="10" />
                  <rect x="0" y="70" width="30" height="30" />
                  <rect x="5" y="75" width="20" height="20" fill="white" />
                  <rect x="10" y="80" width="10" height="10" />
                  <rect x="40" y="10" width="10" height="20" />
                  <rect x="50" y="40" width="20" height="20" />
                  <rect x="80" y="80" width="20" height="20" />
                  <rect x="30" y="80" width="20" height="10" />
                </svg>
              </div>

              <div>
                <span className="block text-xs font-bold text-white">EMT Scan Code</span>
                <span className="text-[10px] text-slate-400 font-mono">
                  ID: {patient?.patientId || 'PR-1001'}
                </span>
              </div>
            </div>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
