import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, User as UserIcon, Building, Eye, EyeOff, Search, ChevronDown, ChevronRight } from 'lucide-react';
import { api } from '../api';
import AnimatedBackground from './common/AnimatedBackground';
import BrandLogoCenterpiece from './common/BrandLogoCenterpiece';

interface AuthFormsProps {
  view: 'login' | 'register';
  setView: (view: any) => void;
  authRole: 'patient' | 'doctor' | 'admin';
  setAuthRole: (role: any) => void;
  email: string;
  setEmail: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  name: string;
  setName: (val: string) => void;
  dob: string;
  setDob: (val: string) => void;
  gender: string;
  setGender: (val: string) => void;
  bloodGroup: string;
  setBloodGroup: (val: string) => void;
  specialization: string;
  setSpecialization: (val: string) => void;
  licenseNumber: string;
  setLicenseNumber: (val: string) => void;
  hospitalId: string;
  setHospitalId: (val: string) => void;
  handleLogin: (e: React.FormEvent) => void;
  handleRegister: (e: React.FormEvent) => void;
}

export default function AuthForms({
  view,
  setView,
  authRole,
  setAuthRole,
  email,
  setEmail,
  password,
  setPassword,
  name,
  setName,
  dob,
  setDob,
  gender,
  setGender,
  bloodGroup,
  setBloodGroup,
  specialization,
  setSpecialization,
  licenseNumber,
  setLicenseNumber,
  hospitalId,
  setHospitalId,
  handleLogin,
  handleRegister,
}: AuthFormsProps) {
  
  const [showPassword, setShowPassword] = useState(false);
  const [hospitalsList, setHospitalsList] = useState<any[]>([]);
  const [hospitalSearch, setHospitalSearch] = useState('');
  const [isHospitalDropdownOpen, setIsHospitalDropdownOpen] = useState(false);

  useEffect(() => {
    if (view === 'register' && authRole === 'doctor') {
      api.getHospitals()
        .then((data: any) => {
          if (Array.isArray(data)) {
            setHospitalsList(data);
            const verified = data.filter((h: any) => h.verified !== false);
            if (verified.length > 0 && !hospitalId) {
              setHospitalId(verified[0].id);
            }
          }
        })
        .catch(() => {});
    }
  }, [view, authRole]);

  const verifiedHospitals = useMemo(() => {
    return hospitalsList.filter((h: any) => h.verified !== false);
  }, [hospitalsList]);

  const filteredHospitals = useMemo(() => {
    if (!hospitalSearch.trim()) return verifiedHospitals;
    const q = hospitalSearch.toLowerCase();
    return verifiedHospitals.filter(
      (h: any) => h.name.toLowerCase().includes(q) || (h.address || '').toLowerCase().includes(q)
    );
  }, [verifiedHospitals, hospitalSearch]);

  const selectedHospitalObj = verifiedHospitals.find((h: any) => h.id === hospitalId) || verifiedHospitals[0];

  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*()]/.test(password);

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 relative z-10 text-[#1D1D1F]">
      <AnimatedBackground variant="auth" />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch relative z-10">
        
        {/* Left Side: Apple Minimal Panel */}
        <div className="hidden md:flex md:col-span-5 flex-col justify-between p-8 rounded-3xl border border-[#E5E5E7] bg-[#FBFBFD] relative overflow-hidden shadow-xs">
          <div className="space-y-6 relative z-10 my-auto">
            <BrandLogoCenterpiece size="hero" showTagline={true} />
            
            <p className="text-xs text-[#6E6E73] text-center leading-relaxed font-sans pt-2 font-normal">
              Verify credentials, upload encrypted patient timelines, and manage instant health status updates on a tamper-proof ledger.
            </p>
          </div>
          
          {/* Status Indicators */}
          <div className="py-4 relative z-10 flex flex-col gap-2.5">
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-[#E5E5E7] shadow-xs">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-mono font-medium text-[#1D1D1F]">System Status: Active & Secured</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-[#E5E5E7] shadow-xs">
              <div className="w-2 h-2 rounded-full bg-[#0071E3]" />
              <span className="text-[10px] font-mono font-medium text-[#1D1D1F]">Integrity Check: SHA-256 Validated</span>
            </div>
          </div>
          
          <div className="text-[9px] font-mono text-[#86868B] border-t border-[#E5E5E7] pt-4">
            Security Protocol Version 4.1-A
          </div>
        </div>

        {/* Right Side: Auth Form Card */}
        <div className="md:col-span-7 flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-[#E5E5E7] bg-white p-8 space-y-6 shadow-md relative overflow-hidden"
          >
            {/* Header & Toggle Switch */}
            <div className="text-center space-y-2">
              <h2 className="font-sans text-2xl font-bold tracking-tight text-[#1D1D1F] block">
                {view === 'login' ? 'Welcome to HealthOrbit' : 'Register Profile'}
              </h2>
              <p className="text-xs font-normal text-[#6E6E73]">
                {view === 'login' ? 'Access your clinical database control room' : 'Set up your secure digital clinical registry'}
              </p>
              
              <div className="flex justify-center p-1 bg-[#F5F5F7] border border-[#E5E5E7] rounded-xl mt-4">
                <button 
                  type="button"
                  onClick={() => setAuthRole('patient')} 
                  className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all ${
                    authRole === 'patient' 
                      ? 'bg-[#1D1D1F] text-white shadow-xs' 
                      : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                  }`}
                >
                  Patient
                </button>
                <button 
                  type="button"
                  onClick={() => setAuthRole('doctor')} 
                  className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all ${
                    authRole === 'doctor' 
                      ? 'bg-[#1D1D1F] text-white shadow-xs' 
                      : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                  }`}
                >
                  Doctor
                </button>
                {view === 'login' && (
                  <button 
                    type="button"
                    onClick={() => setAuthRole('admin')} 
                    className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all ${
                      authRole === 'admin' 
                        ? 'bg-[#1D1D1F] text-white shadow-xs' 
                        : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                    }`}
                  >
                    Admin
                  </button>
                )}
              </div>
            </div>

            {/* Auth Form */}
            <form onSubmit={view === 'login' ? handleLogin : handleRegister} className="space-y-4">
              {view === 'register' && (
                <div>
                  <label className="block text-[10px] font-mono font-medium text-[#6E6E73] uppercase tracking-wider mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <input 
                      type="text" 
                      required 
                      value={name} 
                      onChange={e => setName(e.target.value)} 
                      placeholder="e.g. John Doe" 
                      className="w-full pl-10 pr-4 py-3 rounded-xl premium-input text-xs font-normal text-[#1D1D1F] placeholder-[#86868B]" 
                    />
                    <UserIcon className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-[#86868B]" />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[10px] font-mono font-medium text-[#6E6E73] uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <input 
                    type="email" 
                    required 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    placeholder="e.g. john@example.com" 
                    className="w-full pl-10 pr-4 py-3 rounded-xl premium-input text-xs font-normal text-[#1D1D1F] placeholder-[#86868B]" 
                  />
                  <Mail className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-[#86868B]" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-medium text-[#6E6E73] uppercase tracking-wider mb-1">
                  Password
                </label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    placeholder="••••••••" 
                    className="w-full pl-10 pr-10 py-3 rounded-xl premium-input text-xs font-normal text-[#1D1D1F] placeholder-[#86868B]" 
                  />
                  <Lock className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-[#86868B]" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-[#86868B] hover:text-[#1D1D1F] transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                  </button>
                </div>

                {/* Password Validation Requirements */}
                {view === 'register' && (
                  <div className="mt-2.5 p-3 bg-[#F5F5F7] border border-[#E5E5E7] rounded-xl space-y-1.5 text-[10px]">
                    <p className="font-mono font-medium text-[#86868B] text-[9px] uppercase tracking-wider mb-1">Password Requirements:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-bold ${
                          hasMinLength ? 'bg-emerald-100 text-emerald-700' : 'bg-[#E5E5E7] text-[#86868B]'
                        }`}>
                          {hasMinLength ? '✓' : '•'}
                        </span>
                        <span className={hasMinLength ? 'text-emerald-700 font-medium' : 'text-[#6E6E73]'}>
                          Min 8 characters
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-bold ${
                          hasUppercase ? 'bg-emerald-100 text-emerald-700' : 'bg-[#E5E5E7] text-[#86868B]'
                        }`}>
                          {hasUppercase ? '✓' : '•'}
                        </span>
                        <span className={hasUppercase ? 'text-emerald-700 font-medium' : 'text-[#6E6E73]'}>
                          1 uppercase (A-Z)
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-bold ${
                          hasLowercase ? 'bg-emerald-100 text-emerald-700' : 'bg-[#E5E5E7] text-[#86868B]'
                        }`}>
                          {hasLowercase ? '✓' : '•'}
                        </span>
                        <span className={hasLowercase ? 'text-emerald-700 font-medium' : 'text-[#6E6E73]'}>
                          1 lowercase (a-z)
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-bold ${
                          hasNumber ? 'bg-emerald-100 text-emerald-700' : 'bg-[#E5E5E7] text-[#86868B]'
                        }`}>
                          {hasNumber ? '✓' : '•'}
                        </span>
                        <span className={hasNumber ? 'text-emerald-700 font-medium' : 'text-[#6E6E73]'}>
                          1 number (0-9)
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 sm:col-span-2">
                        <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-bold ${
                          hasSpecial ? 'bg-emerald-100 text-emerald-700' : 'bg-[#E5E5E7] text-[#86868B]'
                        }`}>
                          {hasSpecial ? '✓' : '•'}
                        </span>
                        <span className={hasSpecial ? 'text-emerald-700 font-medium' : 'text-[#6E6E73]'}>
                          1 special char (!@#$%^&*())
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Patient Role Fields */}
              {view === 'register' && authRole === 'patient' && (
                <div className="grid grid-cols-2 gap-3.5 p-4 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl">
                  <div className="col-span-2">
                    <label className="block text-[9px] font-mono font-medium text-[#6E6E73] uppercase tracking-wider mb-1">Date of Birth</label>
                    <input 
                      type="date" 
                      required
                      value={dob} 
                      onChange={e => setDob(e.target.value)} 
                      className="w-full px-3 py-2.5 rounded-lg premium-input text-xs font-normal text-[#1D1D1F]" 
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-mono font-medium text-[#6E6E73] uppercase tracking-wider mb-1">Gender</label>
                    <select 
                      value={gender} 
                      onChange={e => setGender(e.target.value)} 
                      className="w-full px-2 py-2.5 rounded-lg premium-input text-xs font-normal text-[#1D1D1F]"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-mono font-medium text-[#6E6E73] uppercase tracking-wider mb-1">Blood Group</label>
                    <select 
                      value={bloodGroup} 
                      onChange={e => setBloodGroup(e.target.value)} 
                      className="w-full px-2 py-2.5 rounded-lg premium-input text-xs font-normal text-[#1D1D1F]"
                    >
                      <option value="O-Positive">O-Positive</option>
                      <option value="O-Negative">O-Negative</option>
                      <option value="A-Positive">A-Positive</option>
                      <option value="A-Negative">A-Negative</option>
                      <option value="B-Positive">B-Positive</option>
                      <option value="B-Negative">B-Negative</option>
                      <option value="AB-Positive">AB-Positive</option>
                      <option value="AB-Negative">AB-Negative</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Doctor Role Fields */}
              {view === 'register' && authRole === 'doctor' && (
                <div className="space-y-3.5 p-4 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl">
                  <div>
                    <label className="block text-[9px] font-mono font-medium text-[#6E6E73] uppercase tracking-wider mb-1">Clinical Specialization</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Cardiology, Pediatrics" 
                      value={specialization} 
                      onChange={e => setSpecialization(e.target.value)} 
                      className="w-full px-3 py-2.5 rounded-lg premium-input text-xs font-normal text-[#1D1D1F] placeholder-[#86868B]"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-mono font-medium text-[#6E6E73] uppercase tracking-wider mb-1">Medical License ID</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. LIC-12345" 
                      value={licenseNumber} 
                      onChange={e => setLicenseNumber(e.target.value)} 
                      className="w-full px-3 py-2.5 rounded-lg premium-input text-xs font-mono font-medium text-[#1D1D1F] placeholder-[#86868B]" 
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-mono font-medium text-[#6E6E73] uppercase tracking-wider mb-1">
                      Verified Partner Hospital
                    </label>
                    <div className="relative">
                      <div 
                        onClick={() => setIsHospitalDropdownOpen(!isHospitalDropdownOpen)}
                        className="w-full px-3 py-2.5 rounded-lg premium-input text-xs font-normal text-[#1D1D1F] flex items-center justify-between cursor-pointer"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <Building className="w-4 h-4 text-[#0071E3] flex-shrink-0" />
                          <span className="truncate">
                            {selectedHospitalObj ? `${selectedHospitalObj.name} (${selectedHospitalObj.address || 'Verified'})` : 'Select Verified Hospital...'}
                          </span>
                        </div>
                        <ChevronDown className="w-4 h-4 text-[#86868B] flex-shrink-0" />
                      </div>

                      {isHospitalDropdownOpen && (
                        <div className="absolute z-30 top-full left-0 right-0 mt-1.5 p-2 bg-white border border-[#E5E5E7] rounded-2xl shadow-xl space-y-2 max-h-60 overflow-y-auto">
                          <div className="relative">
                            <input
                              type="text"
                              value={hospitalSearch}
                              onChange={e => setHospitalSearch(e.target.value)}
                              placeholder="Search verified hospital by name..."
                              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-[#F5F5F7] border border-[#E5E5E7] text-[#1D1D1F] placeholder-[#86868B] focus:outline-none"
                              onClick={e => e.stopPropagation()}
                            />
                            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-[#86868B]" />
                          </div>

                          <div className="space-y-1">
                            {filteredHospitals.length === 0 ? (
                              <div className="text-[11px] text-[#86868B] p-2 text-center">
                                No verified hospital found
                              </div>
                            ) : (
                              filteredHospitals.map((h: any) => (
                                <button
                                  key={h.id}
                                  type="button"
                                  onClick={() => {
                                    setHospitalId(h.id);
                                    setIsHospitalDropdownOpen(false);
                                  }}
                                  className={`w-full text-left p-2 rounded-xl text-xs transition-colors flex items-center justify-between cursor-pointer ${
                                    hospitalId === h.id ? 'bg-[#F5F5F7] text-[#1D1D1F] font-bold border border-[#E5E5E7]' : 'text-[#6E6E73] hover:bg-[#F5F5F7]'
                                  }`}
                                >
                                  <div className="truncate">
                                    <p className="font-semibold text-[#1D1D1F]">{h.name}</p>
                                    <p className="text-[10px] text-[#6E6E73] truncate">{h.address}</p>
                                  </div>
                                  <span className="text-[9px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded ml-2 flex-shrink-0">
                                    Verified
                                  </span>
                                </button>
                              ))
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <button 
                type="submit" 
                className="w-full bg-[#1D1D1F] hover:bg-black text-white py-3.5 rounded-full text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-[0.98]"
              >
                {view === 'login' ? 'Sign In to HealthOrbit' : 'Register Profile'}
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </form>

            <div className="text-center text-xs text-[#6E6E73] border-t border-[#E5E5E7] pt-4 font-normal">
              {view === 'login' ? (
                <div className="space-y-3">
                  <div>
                    Don't have an account?{' '}
                    <button 
                      onClick={() => setView('register')} 
                      className="text-[#0071E3] hover:underline font-semibold bg-transparent border-none cursor-pointer"
                    >
                      Register as {authRole}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  Already have an account?{' '}
                  <button 
                    onClick={() => setView('login')} 
                    className="text-[#0071E3] hover:underline font-semibold bg-transparent border-none cursor-pointer"
                  >
                    Login as {authRole}
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
