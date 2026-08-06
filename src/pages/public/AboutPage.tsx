import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Heart, Sparkles, Cpu, Layers, Lock, AlertCircle, FileText, Activity } from 'lucide-react';

export default function AboutPage() {
  const challenges = [
    {
      title: 'Fragmented Healthcare Silos',
      desc: 'Patient records are often scattered across disparate hospital systems, forcing patients to re-explain medical histories and undergo redundant diagnostic tests.',
    },
    {
      title: 'Uncontrolled Data Exposure',
      desc: 'Traditional health databases share records without granular, decaying permissions, compromising patient privacy and data sovereignty.',
    },
    {
      title: 'Emergency Delay Risks',
      desc: 'Critical vitals (blood group, severe allergies, emergency contacts) are rarely accessible in time during acute medical crises when minutes matter.',
    },
    {
      title: 'Lack of Record Integrity',
      desc: 'Standard digital copies lack cryptographic verification, making it difficult for doctors to distinguish authentic clinic diagnostics from unverified records.',
    },
  ];

  const technologies = [
    { name: 'React 18 & TypeScript', role: 'Type-safe UI component architecture' },
    { name: 'Vite & Tailwind CSS', role: 'Zero-latency build pipeline & custom design system' },
    { name: 'Express Node.js', role: 'RESTful API gateway & server-side logic' },
    { name: 'Cryptographic SHA-256', role: 'Tamper-evident record hashing' },
    { name: 'Server-Side Gemini AI', role: 'Clinical report summarization & jargon translation' },
    { name: 'Progressive Web App', role: 'Offline service-worker caching & home screen installation' },
  ];

  return (
    <div className="py-16 px-6 max-w-6xl mx-auto space-y-16 text-[#1D1D1F]">
      
      {/* Hero / Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-[#F5F5F7] border border-[#E5E5E7] px-4 py-1.5 rounded-full text-xs font-mono font-medium text-[#0071E3]">
          <Sparkles className="w-4 h-4 text-[#0071E3]" />
          Academic & Research Overview
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-[#1D1D1F] tracking-tight">
          About HealthOrbit.
        </h1>
        <p className="text-[#6E6E73] text-base sm:text-lg leading-relaxed font-normal">
          HealthOrbit is an academic research platform designed to demonstrate decentralized, patient-controlled digital healthcare record management.
        </p>
      </div>

      {/* Project Purpose & Vision Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-[32px] bg-[#FBFBFD] border border-[#E5E5E7] p-8 space-y-4 hover:bg-white transition-all shadow-2xs">
          <div className="p-3 w-fit rounded-2xl bg-blue-50 text-[#0071E3] border border-blue-100">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-[#1D1D1F] tracking-tight">Project Purpose</h2>
          <p className="text-xs text-[#6E6E73] leading-relaxed">
            The fundamental objective of HealthOrbit is to eliminate proprietary health data silos by equipping patients with cryptographic ownership of their medical timeline while maintaining instant, secure clearance workflows for accredited healthcare practitioners.
          </p>
        </div>

        <div className="rounded-[32px] bg-[#FBFBFD] border border-[#E5E5E7] p-8 space-y-4 hover:bg-white transition-all shadow-2xs">
          <div className="p-3 w-fit rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100">
            <Heart className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-[#1D1D1F] tracking-tight">System Vision</h2>
          <p className="text-xs text-[#6E6E73] leading-relaxed">
            We envision a modern healthcare ecosystem where patients hold sovereign access keys to their lifelong health history, while doctors operate with confidence using cryptographically verified, tamper-evident clinical records.
          </p>
        </div>
      </div>

      {/* Healthcare Challenges Addressed */}
      <div className="space-y-6">
        <div className="space-y-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0071E3] bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
            Problem Statement
          </span>
          <h2 className="text-2xl font-bold text-[#1D1D1F] tracking-tight">Healthcare Challenges Addressed</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {challenges.map((c, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white border border-[#E5E5E7] space-y-2 shadow-2xs">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <h3 className="text-sm font-bold text-[#1D1D1F]">{c.title}</h3>
              </div>
              <p className="text-xs text-[#6E6E73] leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Core Objectives */}
      <div className="rounded-[32px] bg-[#F5F5F7] border border-[#E5E5E7] p-8 sm:p-12 space-y-6">
        <h2 className="text-2xl font-bold text-[#1D1D1F] tracking-tight">Key Architectural Objectives</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-2 bg-white p-6 rounded-2xl border border-[#E5E5E7]">
            <Lock className="w-5 h-5 text-[#0071E3]" />
            <h3 className="text-sm font-bold text-[#1D1D1F]">Zero-Knowledge Access</h3>
            <p className="text-xs text-[#6E6E73] leading-relaxed">Sensitive medical reports remain locked until explicit 24-hour decaying clearance keys are granted by the patient.</p>
          </div>
          <div className="space-y-2 bg-white p-6 rounded-2xl border border-[#E5E5E7]">
            <Activity className="w-5 h-5 text-emerald-600" />
            <h3 className="text-sm font-bold text-[#1D1D1F]">Clinical Trust Seals</h3>
            <p className="text-xs text-[#6E6E73] leading-relaxed">Automated verification separates verified hospital uploads from patient self-reported diagnostic items.</p>
          </div>
          <div className="space-y-2 bg-white p-6 rounded-2xl border border-[#E5E5E7]">
            <FileText className="w-5 h-5 text-indigo-600" />
            <h3 className="text-sm font-bold text-[#1D1D1F]">Audit Log Integrity</h3>
            <p className="text-xs text-[#6E6E73] leading-relaxed">SHA-256 cryptographic hashes guarantee immutable, auditable records across every patient interaction.</p>
          </div>
        </div>
      </div>

      {/* Technologies Used */}
      <div className="space-y-6">
        <div className="space-y-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
            Stack Architecture
          </span>
          <h2 className="text-2xl font-bold text-[#1D1D1F] tracking-tight">Technologies & Frameworks</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {technologies.map((t, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-white border border-[#E5E5E7] flex items-start gap-3">
              <Cpu className="w-5 h-5 text-[#0071E3] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-[#1D1D1F]">{t.name}</h4>
                <p className="text-[11px] text-[#6E6E73] mt-0.5">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
