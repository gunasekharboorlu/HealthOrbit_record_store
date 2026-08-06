import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Lock, ShieldAlert, Key, FileCheck, Server, Sparkles } from 'lucide-react';

export default function SecurityPage() {
  const securityFeatures = [
    {
      title: '24-Hour Decaying JWT Keys',
      desc: 'When access is granted to a doctor for a sensitive report, the clearance link automatically expires and decays after exactly 24 hours.',
      icon: Lock,
    },
    {
      title: 'SHA-256 Hashing Integrity',
      desc: 'Every file uploaded generates a unique cryptographic SHA-256 hash stamp to detect any attempt at unauthorized alteration or corruption.',
      icon: FileCheck,
    },
    {
      title: 'Bcrypt Password Protection & JWT Session Management',
      desc: 'Industry-standard salted password hashing and secure bearer tokens ensure unauthorized users cannot access patient data.',
      icon: Key,
    },
    {
      title: 'HIPAA Compliant Data Governance',
      desc: 'Built in compliance with international patient data rights, ensuring complete consent-based record sharing.',
      icon: ShieldCheck,
    },
    {
      title: 'Isolated Emergency Gateway',
      desc: 'Emergency profiles only expose essential rescue vitals (blood group, allergies, emergency contacts) without granting access to full medical history.',
      icon: ShieldAlert,
    },
    {
      title: 'Comprehensive Immutable Audit Logs',
      desc: 'All admin actions, record creations, doctor access requests, and clearances are logged with timestamps and IP records.',
      icon: Server,
    },
  ];

  return (
    <div className="py-16 px-6 max-w-6xl mx-auto space-y-16 text-[#1D1D1F]">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-[#F5F5F7] border border-[#E5E5E7] px-4 py-1.5 rounded-full text-xs font-mono font-medium text-[#0071E3]">
          <Sparkles className="w-4 h-4 text-[#0071E3]" />
          Security & Cryptography
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-[#1D1D1F] tracking-tight">
          Enterprise Security Architecture.
        </h1>
        <p className="text-[#6E6E73] text-base sm:text-lg leading-relaxed font-normal">
          How HealthOrbit protects patient confidentiality through multi-layered cryptographic safeguards.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {securityFeatures.map((sec, idx) => {
          const Icon = sec.icon;
          return (
            <div key={idx} className="rounded-[32px] bg-[#FBFBFD] border border-[#E5E5E7] p-8 space-y-4 hover:border-[#D2D2D7] hover:bg-white transition-all shadow-2xs">
              <div className="p-3 w-fit rounded-2xl bg-blue-50 text-[#0071E3] border border-blue-100">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#1D1D1F] tracking-tight">{sec.title}</h3>
              <p className="text-xs text-[#6E6E73] leading-relaxed">{sec.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
