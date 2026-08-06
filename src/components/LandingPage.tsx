import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, Shield, BadgeCheck, Heart, ArrowRight, Sparkles, 
  FileText, Lock, CheckCircle2, RefreshCw, Key, ChevronDown, Stethoscope, 
  ChevronRight, Smartphone, Monitor, Database, BarChart3, Building2, 
  UserCheck, ShieldAlert, Cpu, Globe, Search, Clock, Check, Eye, Layers, Zap
} from 'lucide-react';
import InstallHealthOrbitButton from './common/InstallHealthOrbitButton';
import AnimatedBackground from './common/AnimatedBackground';
import BrandLogoCenterpiece from './common/BrandLogoCenterpiece';

interface LandingPageProps {
  setView: (view: any) => void;
  setAuthRole: (role: any) => void;
}

export default function LandingPage({ setView, setAuthRole }: LandingPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [patientTab, setPatientTab] = useState<'records' | 'locks' | 'emergency'>('records');
  const [doctorTab, setDoctorTab] = useState<'search' | 'clearance' | 'prescribe'>('search');
  const [activeHashCopied, setActiveHashCopied] = useState(false);

  const faqs = [
    {
      q: "How does the 24-hour sensitive access lock work?",
      a: "When a doctor requests permission to view a report marked as sensitive, you receive a real-time dashboard notification. Once you click 'Approve', a secure JWT link is validated for exactly 24 hours. After this period, the access token naturally decays and the report automatically relocks."
    },
    {
      q: "Who can see my Emergency Profile?",
      a: "Your Emergency Profile contains only critical rescue vitals (blood group, severe allergies, chronic conditions, and emergency contact numbers). It is designed to be accessible to emergency first responders without full account authentication, saving vital minutes during a crisis."
    },
    {
      q: "What is a Clinical Trust Badge?",
      a: "HealthOrbit separates patient-uploaded medical history from clinical records. Reports uploaded directly by verified practitioners at partner hospitals receive a 'Clinic Verified' stamp, whereas user-reported items receive a 'Patient Self-Report' indicator."
    },
    {
      q: "Is my medical data sold or exposed to advertisers?",
      a: "Absolutely not. HealthOrbit relies on a decentralized identity protocol. You hold the unique decryption keys. Without your explicit cryptographic approval, no doctor, clinic, or third party can access your medical records."
    }
  ];

  const handleCopyHash = (text: string) => {
    navigator.clipboard.writeText(text);
    setActiveHashCopied(true);
    setTimeout(() => setActiveHashCopied(false), 2000);
  };

  return (
    <div className="relative overflow-hidden bg-white text-[#1D1D1F] selection:bg-[#0071E3]/20">
      <AnimatedBackground variant="hero" />
      
      {/* ========================================================= */}
      {/* 1. HERO SECTION                                           */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-8 sm:pt-16 pb-24 sm:pb-32 relative z-10">
        
        {/* Brand Logo Centerpiece Showcase */}
        <div className="mb-12 sm:mb-16 flex justify-center">
          <BrandLogoCenterpiece size="hero" showTagline={true} />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          
          {/* Left Column: Typography & High-Impact Copy */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Sparkle Tag */}
            <div className="inline-flex">
              <div className="inline-flex items-center gap-2 bg-[#F5F5F7] border border-[#E5E5E7] px-4 py-2 rounded-full text-xs font-mono font-medium text-[#1D1D1F] shadow-2xs">
                <Sparkles className="w-4 h-4 text-[#0071E3]" />
                <span>Next-Gen Interoperable Health Protocol</span>
              </div>
            </div>

            {/* Headline - 72px-80px Scale */}
            <h1 className="font-sans text-4xl sm:text-6xl lg:text-[76px] font-bold text-[#1D1D1F] tracking-tight leading-[1.04]">
              Your Certified <br className="hidden sm:block" />
              Medical Timeline. <br/>
              <span className="text-[#6E6E73] font-normal">
                Decentralized & Patient-Owned.
              </span>
            </h1>

            {/* Subtitle - 24px Scale */}
            <p className="text-[#6E6E73] text-lg sm:text-[22px] max-w-2xl leading-relaxed font-normal">
              HealthOrbit dismantles fragmented medical silos. Securely compile certified diagnostics, govern access locks with cryptographic permission keys, and authorize doctors instantly across any network clinic.
            </p>

            {/* Action Buttons with 20px Spacing */}
            <div className="flex flex-col sm:flex-row flex-wrap items-center gap-5 pt-3">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => { setAuthRole('patient'); setView('register'); }} 
                className="w-full sm:w-auto bg-[#1D1D1F] hover:bg-black text-white px-8 py-4 rounded-full font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <span>Initialize Patient Vault</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => { setAuthRole('doctor'); setView('login'); }} 
                className="w-full sm:w-auto bg-[#F5F5F7] border border-[#E5E5E7] hover:bg-[#E8E8ED] text-[#1D1D1F] px-8 py-4 rounded-full font-semibold text-sm transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Stethoscope className="w-4.5 h-4.5 text-[#6E6E73]" />
                <span>Practitioner Entry</span>
              </motion.button>

              <InstallHealthOrbitButton variant="hero" />
            </div>

            {/* Core Feature Badges */}
            <div className="pt-8 border-t border-[#E5E5E7] flex flex-wrap gap-x-10 gap-y-4">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#6E6E73] font-medium">
                <Shield className="w-4.5 h-4.5 text-[#1D1D1F]" />
                <span>Zero-Knowledge Access Locks</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#6E6E73] font-medium">
                <BadgeCheck className="w-4.5 h-4.5 text-emerald-600" />
                <span>Accredited Clinic Stamps</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#6E6E73] font-medium">
                <RefreshCw className="w-4.5 h-4.5 text-[#0071E3]" />
                <span>Real-Time Sync</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Graphic Card */}
          <div className="lg:col-span-5 relative">
            <motion.div 
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="rounded-[32px] bg-white border border-[#E5E5E7] p-8 shadow-xl space-y-6 relative overflow-hidden"
            >
              <div className="flex items-center justify-between pb-5 border-b border-[#E5E5E7]">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-[#1D1D1F] text-white flex items-center justify-center font-bold shadow-xs">
                    <Activity className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#1D1D1F]">Encrypted Ledger</h4>
                    <p className="text-[11px] font-mono text-[#86868B] uppercase tracking-wider">PAT-80924 • ACTIVE</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <ShieldCheckIcon className="w-3.5 h-3.5 text-emerald-600" /> VERIFIED
                </span>
              </div>

              {/* Sample Record Row 1 */}
              <div className="p-4 rounded-2xl bg-[#FBFBFD] border border-[#E5E5E7] flex items-center justify-between gap-3 shadow-2xs hover:border-[#D2D2D7] transition-all">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white border border-[#E5E5E7]">
                    <FileText className="w-4 h-4 text-[#1D1D1F]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1D1D1F]">Full Diagnostic Panel</p>
                    <p className="text-[11px] text-[#6E6E73]">St. Jude Medical • 24h Lock</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-lg text-[10px] font-mono font-medium">
                  <Lock className="w-3 h-3 text-amber-600" /> 24h Expiring
                </div>
              </div>

              {/* Sample Record Row 2 */}
              <div className="p-4 rounded-2xl bg-[#FBFBFD] border border-[#E5E5E7] flex items-center justify-between gap-3 shadow-2xs hover:border-[#D2D2D7] transition-all">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white border border-[#E5E5E7]">
                    <Heart className="w-4 h-4 text-rose-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1D1D1F]">Cardiology Screening</p>
                    <p className="text-[11px] text-[#6E6E73]">Dr. Robert Chen • Clinic Verified</p>
                  </div>
                </div>
                <BadgeCheck className="w-5 h-5 text-emerald-600" />
              </div>

              {/* Sample Record Row 3 */}
              <div className="p-4 rounded-2xl bg-[#FBFBFD] border border-[#E5E5E7] flex items-center justify-between gap-3 shadow-2xs hover:border-[#D2D2D7] transition-all">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white border border-[#E5E5E7]">
                    <Activity className="w-4 h-4 text-[#0071E3]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1D1D1F]">MRI Spinal Scan</p>
                    <p className="text-[11px] text-[#6E6E73]">SHA-256 Ledger Block #99281</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-[#0071E3] font-semibold bg-blue-50 px-2 py-1 rounded-md border border-blue-200">
                  e-Signed
                </span>
              </div>

              <div className="pt-2 text-center border-t border-[#E5E5E7]">
                <span className="text-xs text-[#6E6E73] font-medium flex items-center justify-center gap-2">
                  <Key className="w-4 h-4 text-[#1D1D1F]" /> 256-bit AES Cryptographic Vault
                </span>
              </div>

            </motion.div>
          </div>

        </motion.div>
      </section>

      {/* ========================================================= */}
      {/* 2. WHY HEALTHORBIT SECTION                                */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-28 sm:py-36 border-t border-[#E5E5E7] relative z-10">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <span className="text-xs font-mono uppercase tracking-widest text-[#0071E3] font-semibold">
            ARCHITECTURAL PHILOSOPHY
          </span>
          <h2 className="text-3xl sm:text-[48px] font-bold text-[#1D1D1F] tracking-tight leading-[1.12]">
            Designed for Absolute Clarity.
          </h2>
          <p className="text-[#6E6E73] text-lg sm:text-[22px] leading-relaxed font-normal">
            Every clinical event, prescription update, and diagnostic clearance structured into a unified, tamper-evident timeline.
          </p>
        </div>

        {/* 4-Column Feature Grid with 32px padding */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <motion.div 
            whileHover={{ y: -6 }}
            className="rounded-[32px] bg-[#FBFBFD] border border-[#E5E5E7] p-8 space-y-5 hover:border-[#D2D2D7] hover:bg-white shadow-xs hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#1D1D1F] text-white flex items-center justify-center shadow-xs">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#1D1D1F] tracking-tight">Granular Access Control</h3>
            <p className="text-sm text-[#6E6E73] leading-relaxed">
              Grant doctors temporary 24-hour access keys to sensitive records. Access permissions decay automatically without lingering tokens.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -6 }}
            className="rounded-[32px] bg-[#FBFBFD] border border-[#E5E5E7] p-8 space-y-5 hover:border-[#D2D2D7] hover:bg-white shadow-xs hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#1D1D1F] text-white flex items-center justify-center shadow-xs">
              <BadgeCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#1D1D1F] tracking-tight">Clinic Trust Stamps</h3>
            <p className="text-sm text-[#6E6E73] leading-relaxed">
              Distinguish practitioner-verified lab results from patient self-uploads with immutable, tamper-evident cryptographic badges.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -6 }}
            className="rounded-[32px] bg-[#FBFBFD] border border-[#E5E5E7] p-8 space-y-5 hover:border-[#D2D2D7] hover:bg-white shadow-xs hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#1D1D1F] text-white flex items-center justify-center shadow-xs">
              <Heart className="w-6 h-6 text-rose-500" />
            </div>
            <h3 className="text-xl font-bold text-[#1D1D1F] tracking-tight">Emergency Rescue Profile</h3>
            <p className="text-sm text-[#6E6E73] leading-relaxed">
              Immediate, zero-latency access to rescue vitals for first responders without authentication hurdles during critical care.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -6 }}
            className="rounded-[32px] bg-[#FBFBFD] border border-[#E5E5E7] p-8 space-y-5 hover:border-[#D2D2D7] hover:bg-white shadow-xs hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#1D1D1F] text-white flex items-center justify-center shadow-xs">
              <Database className="w-6 h-6 text-[#0071E3]" />
            </div>
            <h3 className="text-xl font-bold text-[#1D1D1F] tracking-tight">Decentralized Storage</h3>
            <p className="text-sm text-[#6E6E73] leading-relaxed">
              Patient data is encrypted client-side using zero-knowledge architecture so no central broker can read your sensitive medical files.
            </p>
          </motion.div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. PATIENT EXPERIENCE SHOWCASE (VISUAL STORYTELLING)      */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-28 sm:py-36 border-t border-[#E5E5E7] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column Text */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="text-xs font-mono uppercase tracking-widest text-[#0071E3] font-semibold">
              PATIENT EXPERIENCE
            </span>
            <h2 className="text-3xl sm:text-[48px] font-bold text-[#1D1D1F] tracking-tight leading-[1.12]">
              Complete Autonomy Over Your Health Record.
            </h2>
            <p className="text-[#6E6E73] text-lg leading-relaxed">
              Store lifetime lab diagnostics, digital prescriptions, and imaging reports in one secure vault. You control who views what, for how long.
            </p>

            <ul className="space-y-4 pt-2 text-sm text-[#1D1D1F] font-medium">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Instant approving or revoking doctor access with 1-click controls</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Automatic decay timer revokes sensitive clearance after 24 hours</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>One-touch rescue portal for allergies and blood group vitals</span>
              </li>
            </ul>

            <div className="pt-4">
              <button 
                onClick={() => { setAuthRole('patient'); setView('register'); }}
                className="bg-[#1D1D1F] text-white hover:bg-black px-7 py-3.5 rounded-full text-xs font-semibold transition-all inline-flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Explore Patient Vault</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column Interactive Patient Dashboard Mockup */}
          <div className="lg:col-span-7">
            <div className="rounded-[32px] bg-[#F5F5F7] border border-[#E5E5E7] p-6 sm:p-8 shadow-xl space-y-6">
              
              {/* Mock Nav Bar Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E5E5E7]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#1D1D1F] text-white flex items-center justify-center font-bold">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#1D1D1F]">Patient Health Hub</h3>
                    <p className="text-[10px] font-mono text-[#86868B]">PATIENT ID: PAT-99201</p>
                  </div>
                </div>

                {/* Mock Tabs */}
                <div className="flex gap-1.5 p-1 bg-white rounded-full border border-[#E5E5E7]">
                  <button 
                    onClick={() => setPatientTab('records')}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                      patientTab === 'records' ? 'bg-[#1D1D1F] text-white' : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                    }`}
                  >
                    Clinical Records
                  </button>
                  <button 
                    onClick={() => setPatientTab('locks')}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                      patientTab === 'locks' ? 'bg-[#1D1D1F] text-white' : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                    }`}
                  >
                    Access Locks (1)
                  </button>
                </div>
              </div>

              {/* Dynamic Content Preview */}
              <AnimatePresence mode="wait">
                {patientTab === 'records' && (
                  <motion.div 
                    key="records"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-3"
                  >
                    <div className="p-4 bg-white rounded-2xl border border-[#E5E5E7] flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-[#0071E3]" />
                        <div>
                          <p className="text-xs font-bold text-[#1D1D1F]">Complete Lipid Profile</p>
                          <p className="text-[10px] text-[#6E6E73]">City Care Clinic • Issued Aug 2026</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-200 font-bold">
                        Clinic Verified
                      </span>
                    </div>

                    <div className="p-4 bg-white rounded-2xl border border-[#E5E5E7] flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <Lock className="w-5 h-5 text-amber-600" />
                        <div>
                          <p className="text-xs font-bold text-[#1D1D1F]">Endocrinology Assessment</p>
                          <p className="text-[10px] text-[#6E6E73]">Restricted • Dr. Jane Smith Clearance</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full border border-amber-200 font-bold">
                        24h Active Lock
                      </span>
                    </div>
                  </motion.div>
                )}

                {patientTab === 'locks' && (
                  <motion.div 
                    key="locks"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 bg-white rounded-2xl border border-[#E5E5E7] space-y-3"
                  >
                    <div className="flex justify-between items-center border-b border-[#E5E5E7] pb-3">
                      <div>
                        <span className="text-[10px] font-mono text-[#0071E3] uppercase font-bold">PENDING APPROVAL REQUEST</span>
                        <p className="text-xs font-bold text-[#1D1D1F] mt-0.5">Dr. Marcus Vance (Cardiology)</p>
                        <p className="text-[11px] text-[#6E6E73]">Requesting view for: "Echocardiogram Diagnostic"</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1.5 bg-[#1D1D1F] text-white text-xs rounded-full font-medium shadow-2xs">
                          Approve 24h
                        </button>
                      </div>
                    </div>
                    <p className="text-[10px] text-[#86868B] font-mono">
                      Granting access allows Dr. Vance to view this report for 24 hours. Token automatically revokes after duration expires.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. DOCTOR EXPERIENCE SHOWCASE (VISUAL STORYTELLING)       */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-28 sm:py-36 border-t border-[#E5E5E7] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column Interactive Doctor Dashboard Mockup (Flipped layout for rhythm) */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="rounded-[32px] bg-[#F5F5F7] border border-[#E5E5E7] p-6 sm:p-8 shadow-xl space-y-6">
              
              {/* Doctor Search Bar Mock */}
              <div className="p-3 bg-white rounded-2xl border border-[#E5E5E7] flex items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-3 flex-1">
                  <Search className="w-4 h-4 text-[#86868B]" />
                  <span className="text-xs text-[#1D1D1F] font-mono">PAT-80924 (Verified Patient)</span>
                </div>
                <span className="px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-mono font-bold rounded-full">
                  MATCH FOUND
                </span>
              </div>

              {/* Patient File Workspace */}
              <div className="bg-white rounded-2xl border border-[#E5E5E7] p-5 space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-[#E5E5E7]">
                  <div>
                    <h4 className="text-sm font-bold text-[#1D1D1F]">John Doe (38Y • O-Positive)</h4>
                    <p className="text-[11px] text-[#6E6E73] font-mono">Allergies: Penicillin, Sulfa • Chronic: Hypertension</p>
                  </div>
                  <button className="px-3 py-1.5 bg-[#0071E3] text-white text-xs rounded-full font-medium flex items-center gap-1">
                    <Stethoscope className="w-3.5 h-3.5" /> Prescribe
                  </button>
                </div>

                <div className="p-3 bg-[#FBFBFD] border border-[#E5E5E7] rounded-xl flex justify-between items-center text-xs">
                  <div>
                    <span className="font-semibold text-[#1D1D1F]">Amoxicillin (500mg)</span>
                    <span className="text-[#6E6E73] text-[10px] block">1 Tablet • 3x Daily • 7 Days</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Signed & Encrypted
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column Text */}
          <div className="lg:col-span-5 space-y-6 text-left order-1 lg:order-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#0071E3] font-semibold">
              DOCTOR WORKSPACE
            </span>
            <h2 className="text-3xl sm:text-[48px] font-bold text-[#1D1D1F] tracking-tight leading-[1.12]">
              Seamless Consultations Without Friction.
            </h2>
            <p className="text-[#6E6E73] text-lg leading-relaxed">
              Practitioners access authorized patient records in seconds, upload certified hospital lab results, and write cryptographic prescriptions directly to the patient ledger.
            </p>

            <ul className="space-y-4 pt-2 text-sm text-[#1D1D1F] font-medium">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>10-second patient registry search via unique Patient ID</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Request 24-hour clearance for restricted medical diagnostics</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Issue digital prescriptions stamped with practitioner license credentials</span>
              </li>
            </ul>

            <div className="pt-4">
              <button 
                onClick={() => { setAuthRole('doctor'); setView('login'); }}
                className="bg-[#1D1D1F] text-white hover:bg-black px-7 py-3.5 rounded-full text-xs font-semibold transition-all inline-flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Practitioner Login</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. ADMIN CONSOLE SHOWCASE                                 */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-28 sm:py-36 border-t border-[#E5E5E7] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="text-xs font-mono uppercase tracking-widest text-[#0071E3] font-semibold">
              ADMINISTRATION & COMPLIANCE
            </span>
            <h2 className="text-3xl sm:text-[48px] font-bold text-[#1D1D1F] tracking-tight leading-[1.12]">
              Enterprise Oversight & Network Health.
            </h2>
            <p className="text-[#6E6E73] text-lg leading-relaxed">
              Hospital networks and health systems manage practitioner verifications, onboard accredited clinical facilities, and inspect network telemetry in real time.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#F5F5F7] border border-[#E5E5E7]">
                <p className="text-2xl font-bold text-[#1D1D1F]">100%</p>
                <p className="text-xs text-[#6E6E73] font-mono mt-1">Practitioner Verification</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#F5F5F7] border border-[#E5E5E7]">
                <p className="text-2xl font-bold text-[#1D1D1F]">99.99%</p>
                <p className="text-xs text-[#6E6E73] font-mono mt-1">Ledger Uptime</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-[32px] bg-[#1D1D1F] text-white p-7 sm:p-8 shadow-2xl space-y-6 border border-white/10">
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white/10 text-white">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">HealthOrbit Admin Telemetry</h4>
                    <p className="text-[10px] font-mono text-[#86868B]">GLOBAL NETWORK MESH • ONLINE</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold rounded-full">
                  SYS-OK
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-[#86868B] font-mono block">ROLE-BASED ACCESS</span>
                  <span className="text-xs font-bold text-white">RBAC Active</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-[#86868B] font-mono block">ACCESS LOCKS</span>
                  <span className="text-xs font-bold text-white">24h Decaying JWT</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-[#86868B] font-mono block">HASH VERIFICATION</span>
                  <span className="text-xs font-bold text-emerald-400">SHA-256 Validated</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-[#86868B] text-[10px]">
                  <span>RECENT SYSTEM LOG</span>
                  <span>TIME: 08:27:10</span>
                </div>
                <p className="text-emerald-400 text-[11px]">
                  ✓ Verified Dr. Sarah Jenkins (Lic #LIC-99382) • Hospital: St. Jude Medical
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. SECURITY & SHA-256 LEDGER SHOWCASE                    */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-28 sm:py-36 border-t border-[#E5E5E7] relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <span className="text-xs font-mono uppercase tracking-widest text-[#0071E3] font-semibold">
            CRYPTOGRAPHIC LEDGER
          </span>
          <h2 className="text-3xl sm:text-[48px] font-bold text-[#1D1D1F] tracking-tight leading-[1.12]">
            Tamper-Evident SHA-256 Audit.
          </h2>
          <p className="text-[#6E6E73] text-lg sm:text-[22px] leading-relaxed font-normal">
            Every clinical document uploaded produces a unique SHA-256 cryptographic hash. Any unauthorized modification breaks the hash chain instantly.
          </p>
        </div>

        <div className="max-w-4xl mx-auto rounded-[32px] bg-[#F5F5F7] border border-[#E5E5E7] p-8 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-[#1D1D1F] text-white">
                <ShieldAlert className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#1D1D1F]">SHA-256 Block Inspector</h3>
                <p className="text-xs text-[#6E6E73]">Live Verification Engine v3.5</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-bold rounded-full">
              INTEGRITY VERIFIED
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-[#E5E5E7] p-5 space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center text-[#86868B] text-[10px]">
              <span>SAMPLE RECORD HASH STRING</span>
              <span>256-BIT CHECKSUM</span>
            </div>
            <div className="p-3 bg-[#F5F5F7] rounded-xl border border-[#E5E5E7] text-[#1D1D1F] break-all flex items-center justify-between gap-3">
              <span>e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</span>
              <button 
                onClick={() => handleCopyHash('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855')}
                className="p-1.5 hover:bg-[#E8E8ED] rounded-lg transition cursor-pointer shrink-0"
                title="Copy SHA-256 Hash"
              >
                {activeHashCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <CopyIcon className="w-4 h-4 text-[#6E6E73]" />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-white rounded-2xl border border-[#E5E5E7] space-y-1">
              <span className="font-bold text-[#1D1D1F] block">Zero-Knowledge Keys</span>
              <p className="text-[#6E6E73] text-[11px]">Decryption occurs exclusively in browser client runtime.</p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-[#E5E5E7] space-y-1">
              <span className="font-bold text-[#1D1D1F] block">HIPAA / GDPR Ready</span>
              <p className="text-[#6E6E73] text-[11px]">Architected for global health data privacy mandates.</p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-[#E5E5E7] space-y-1">
              <span className="font-bold text-[#1D1D1F] block">Immutable Audit Log</span>
              <p className="text-[#6E6E73] text-[11px]">Every record view or access attempt is logged permanently.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. PROGRESSIVE WEB APP (PWA) SHOWCASE                    */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-28 sm:py-36 border-t border-[#E5E5E7] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="text-xs font-mono uppercase tracking-widest text-[#0071E3] font-semibold">
              PROGRESSIVE WEB APP
            </span>
            <h2 className="text-3xl sm:text-[48px] font-bold text-[#1D1D1F] tracking-tight leading-[1.12]">
              Native Desktop & Mobile Performance.
            </h2>
            <p className="text-[#6E6E73] text-lg leading-relaxed">
              Install HealthOrbit as a standalone application on iOS, Android, macOS, or Windows with offline data caching and background sync capabilities.
            </p>

            <div className="pt-2">
              <InstallHealthOrbitButton variant="hero" />
            </div>
          </div>

          <div className="lg:col-span-7 flex justify-center">
            <div className="relative w-full max-w-lg bg-[#1D1D1F] text-white p-8 rounded-[32px] border border-white/10 shadow-2xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-6 h-6 text-[#0071E3]" />
                  <Monitor className="w-6 h-6 text-emerald-400" />
                  <span className="text-sm font-bold text-white">Cross-Platform Sync</span>
                </div>
                <span className="px-2.5 py-1 bg-white/10 text-white rounded-full text-[10px] font-mono">
                  PWA INSTALLED
                </span>
              </div>

              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-2">
                <p className="text-xs font-bold text-white">Offline Capability Active</p>
                <p className="text-[11px] text-[#86868B]">
                  Clinical records and emergency profiles remain cached locally. Changes sync automatically when internet connectivity resumes.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. ENTERPRISE ANALYTICS SHOWCASE                          */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-28 sm:py-36 border-t border-[#E5E5E7] relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <span className="text-xs font-mono uppercase tracking-widest text-[#0071E3] font-semibold">
            REAL-TIME ANALYTICS
          </span>
          <h2 className="text-3xl sm:text-[48px] font-bold text-[#1D1D1F] tracking-tight leading-[1.12]">
            Data Visualizers & Vitals Tracking.
          </h2>
          <p className="text-[#6E6E73] text-lg sm:text-[22px] leading-relaxed font-normal">
            Track diagnostic trends, monitor vital metrics, and generate clinical insights with built-in analytics visualizers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-8 rounded-[32px] bg-[#FBFBFD] border border-[#E5E5E7] space-y-4">
            <BarChart3 className="w-8 h-8 text-[#0071E3]" />
            <h3 className="text-xl font-bold text-[#1D1D1F]">Clinical Trends</h3>
            <p className="text-xs text-[#6E6E73] leading-relaxed">
              Track longitudinal cholesterol, blood glucose, and hemoglobin metrics with automated chart visualization.
            </p>
          </div>

          <div className="p-8 rounded-[32px] bg-[#FBFBFD] border border-[#E5E5E7] space-y-4">
            <Zap className="w-8 h-8 text-amber-500" />
            <h3 className="text-xl font-bold text-[#1D1D1F]">Zero Latency</h3>
            <p className="text-xs text-[#6E6E73] leading-relaxed">
              Instant local client response times with optimistic updates and background database queueing.
            </p>
          </div>

          <div className="p-8 rounded-[32px] bg-[#FBFBFD] border border-[#E5E5E7] space-y-4">
            <Layers className="w-8 h-8 text-emerald-600" />
            <h3 className="text-xl font-bold text-[#1D1D1F]">Interoperable Format</h3>
            <p className="text-xs text-[#6E6E73] leading-relaxed">
              Export records seamlessly to standard FHIR JSON or PDF format for physical doctor review.
            </p>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* FAQ SECTION                                              */}
      {/* ========================================================= */}
      <section className="max-w-4xl mx-auto px-6 lg:px-8 py-24 sm:py-32 border-t border-[#E5E5E7] relative z-10">
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#0071E3] font-semibold">
            SUPPORT & KNOWLEDGE
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1D1D1F] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-[#6E6E73]">Everything you need to know about HealthOrbit security and access protocols.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              className="rounded-2xl bg-white border border-[#E5E5E7] overflow-hidden transition-all shadow-2xs"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full text-left p-6 flex items-center justify-between gap-4 font-semibold text-base text-[#1D1D1F] cursor-pointer hover:bg-[#F5F5F7]"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-[#86868B] transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="p-6 pt-0 text-sm text-[#6E6E73] leading-relaxed border-t border-[#F5F5F7]">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 9. REDESIGNED FINAL CTA SECTION WITH 140PX BOTTOM MARGIN  */}
      {/* ========================================================= */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 pt-12 pb-8 mb-[140px] relative z-10">
        <motion.div 
          whileHover={{ scale: 1.005 }}
          transition={{ duration: 0.3 }}
          className="rounded-[32px] bg-gradient-to-br from-[#1C1C1E] via-[#141416] to-[#0A0A0C] text-white p-12 sm:p-20 text-center space-y-8 shadow-2xl shadow-black/20 border border-white/10 relative overflow-hidden"
        >
          {/* Subtle Background Glow Accent */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#0071E3]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Eyebrow Label */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-mono font-medium text-white/90">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Enterprise Clinical Ledger Access</span>
          </div>

          {/* Large Headline */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08] max-w-3xl mx-auto">
            Take Ownership of Your Health Data Today.
          </h2>

          {/* Subtitle */}
          <p className="text-[#86868B] text-base sm:text-xl max-w-2xl mx-auto leading-relaxed font-normal">
            Utilize HealthOrbit's decentralized medical ledger for certified, zero-trust healthcare record management.
          </p>

          {/* Decorative Divider Line */}
          <div className="w-24 h-px bg-white/15 mx-auto my-6" />

          {/* Better Button Spacing (20px gap) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-2">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { setAuthRole('patient'); setView('register'); }}
              className="w-full sm:w-auto bg-white text-[#1D1D1F] hover:bg-[#F5F5F7] px-8 py-4 rounded-full text-sm font-semibold transition-all shadow-lg active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Initialize Patient Vault</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { setAuthRole('doctor'); setView('login'); }}
              className="w-full sm:w-auto bg-white/10 border border-white/20 text-white hover:bg-white/15 px-8 py-4 rounded-full text-sm font-semibold transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
            >
              <Stethoscope className="w-4 h-4 text-[#86868B]" />
              <span>Practitioner Portal</span>
            </motion.button>
          </div>

          {/* Guarantee Footer */}
          <p className="text-[11px] font-mono text-[#86868B] pt-4">
            FREE FOREVER FOR INDIVIDUAL PATIENTS • HIPAA & GDPR COMPLIANT ARCHITECTURE
          </p>

        </motion.div>
      </section>

    </div>
  );
}

function ShieldCheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751A11.959 11.959 0 0112 2.714z" />
    </svg>
  );
}

function CopyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v9.25c0 .621-.504 1.125-1.125 1.125z" />
    </svg>
  );
}
