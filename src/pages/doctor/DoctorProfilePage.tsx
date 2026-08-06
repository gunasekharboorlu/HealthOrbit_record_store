import React from 'react';
import { 
  BadgeCheck, Building, Award, Phone, Mail, Stethoscope, Camera, Shield, Save
} from 'lucide-react';
import { GlassCard, PrimaryButton, SecondaryButton, StatusChip } from '../../components/ui';
import Avatar from '../../components/Avatar';

interface DoctorProfilePageProps {
  doctorData: any;
  profName: string;
  setProfName: (val: string) => void;
  profPhone: string;
  setProfPhone: (val: string) => void;
  profAbout: string;
  setProfAbout: (val: string) => void;
  profPic: string;
  setProfPic: (val: string) => void;
  profExp: string;
  setProfExp: (val: string) => void;
  profDept: string;
  setProfDept: (val: string) => void;
  profSpec: string;
  setProfSpec: (val: string) => void;
  saveLoading: boolean;
  handleSaveProfile: (e: React.FormEvent) => void;
  showNotification: (msg: string, type?: 'success' | 'error') => void;
}

export default function DoctorProfilePage({
  doctorData,
  profName,
  setProfName,
  profPhone,
  setProfPhone,
  profAbout,
  setProfAbout,
  profPic,
  setProfPic,
  profExp,
  setProfExp,
  profDept,
  setProfDept,
  profSpec,
  setProfSpec,
  saveLoading,
  handleSaveProfile,
  showNotification,
}: DoctorProfilePageProps) {
  const doctor = doctorData?.doctor || {};

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl font-display font-bold text-[#1D1D1F]">Practitioner Credentials & Profile</h1>
        <p className="text-xs text-[#6E6E73] mt-1">
          Manage your verified medical license parameters, hospital affiliation, and public clinical profile.
        </p>
      </div>

      {/* Main Profile Form */}
      <GlassCard className="p-6 sm:p-8 space-y-6">
        
        {/* Avatar Header Section */}
        <div className="bg-[#F5F5F7] border border-[#E5E5E7] p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-6">
          <Avatar name={profName || 'Doctor'} src={profPic} size="xl" />
          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl font-bold text-[#1D1D1F]">Dr. {profName || doctor.name}</h2>
              {doctor.isVerified && <StatusChip status="Approved" label="Verified" />}
            </div>
            <p className="text-xs text-[#0071E3] font-mono">{profSpec} • {profDept}</p>
            <p className="text-[11px] text-[#6E6E73] font-mono">
              License #: {doctor.licenseNumber || 'N/A'} | Hospital: {doctor.hospitalName || 'Network Center'}
            </p>

            <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start pt-2">
              <label className="px-3.5 py-1.5 bg-[#0071E3]/10 hover:bg-[#0071E3]/20 border border-[#0071E3]/30 text-[#0071E3] text-xs font-bold rounded-xl cursor-pointer transition flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5" /> Upload Custom Photo
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      if (file.size > 5 * 1024 * 1024) {
                        showNotification('Profile image file must be less than 5MB', 'error');
                        return;
                      }
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        const base64 = event.target?.result as string;
                        setProfPic(base64);
                        showNotification('New profile photo staged. Click Save Profile Updates.', 'success');
                      };
                      reader.readAsDataURL(file);
                    }
                  }} 
                  className="hidden" 
                />
              </label>

              {profPic && (
                <button
                  type="button"
                  onClick={() => {
                    setProfPic('');
                    showNotification('Custom photo removed. Avatar initials restored.', 'success');
                  }}
                  className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-bold rounded-xl cursor-pointer transition"
                >
                  Remove Custom Photo
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Profile Inputs */}
        <form onSubmit={handleSaveProfile} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-[#6E6E73] uppercase font-mono mb-1">Full Name</label>
              <input
                type="text"
                required
                value={profName}
                onChange={e => setProfName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D2D2D7] text-xs text-[#1D1D1F] outline-none focus:border-[#0071E3]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#6E6E73] uppercase font-mono mb-1">Contact Phone</label>
              <input
                type="text"
                value={profPhone}
                onChange={e => setProfPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D2D2D7] text-xs text-[#1D1D1F] outline-none focus:border-[#0071E3]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-[#6E6E73] uppercase font-mono mb-1">Department</label>
              <input
                type="text"
                value={profDept}
                onChange={e => setProfDept(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D2D2D7] text-xs text-[#1D1D1F] outline-none focus:border-[#0071E3]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#6E6E73] uppercase font-mono mb-1">Specialization</label>
              <input
                type="text"
                value={profSpec}
                onChange={e => setProfSpec(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D2D2D7] text-xs text-[#1D1D1F] outline-none focus:border-[#0071E3]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#6E6E73] uppercase font-mono mb-1">Experience</label>
              <input
                type="text"
                value={profExp}
                onChange={e => setProfExp(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D2D2D7] text-xs text-[#1D1D1F] outline-none focus:border-[#0071E3]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#6E6E73] uppercase font-mono mb-1">Bio / Practitioner Statement</label>
            <textarea
              value={profAbout}
              onChange={e => setProfAbout(e.target.value)}
              rows={3}
              placeholder="Clinical experience, background, and medical summary..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D2D2D7] text-xs text-[#1D1D1F] outline-none resize-none focus:border-[#0071E3]"
            />
          </div>

          <PrimaryButton
            type="submit"
            isLoading={saveLoading}
            icon={<Save className="w-4 h-4" />}
            className="w-full justify-center"
          >
            Save Profile Updates
          </PrimaryButton>
        </form>

      </GlassCard>

    </div>
  );
}
