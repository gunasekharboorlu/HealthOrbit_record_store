import React from 'react';
import { motion } from 'motion/react';
import { Shield, Lock, BadgeCheck, Heart, Key, Database, RefreshCw, FileText, CheckCircle2, Sparkles, ShieldAlert, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FeaturesPage() {
  const features = [
    {
      icon: Lock,
      color: 'text-[#0071E3]',
      bgIcon: 'bg-blue-50 border-blue-100',
      title: 'Zero-Knowledge Access Locks',
      description: 'Tag any confidential report as Sensitive. Doctors receive permission alerts and can only inspect locked files when granted a 24-hour decaying JWT clearance key.',
      badge: 'Cryptographic Security',
    },
    {
      icon: BadgeCheck,
      color: 'text-emerald-600',
      bgIcon: 'bg-emerald-50 border-emerald-100',
      title: 'Clinical Trust Verification Stamps',
      description: 'Reports uploaded by accredited healthcare practitioners automatically receive a "Clinic Verified" seal, guaranteeing authentic diagnostic origins.',
      badge: 'Accreditation Engine',
    },
    {
      icon: Heart,
      color: 'text-rose-600',
      bgIcon: 'bg-rose-50 border-rose-100',
      title: 'Instant ER Rescue Profile',
      description: 'A zero-authentication, high-speed emergency portal allowing first responders to retrieve blood type, severe allergy vectors, and guardian contacts in under 3 seconds.',
      badge: 'Lifesaving Protocol',
    },
    {
      icon: ShieldAlert,
      color: 'text-[#0071E3]',
      bgIcon: 'bg-blue-50 border-blue-100',
      title: 'Tamper-Proof SHA-256 Audit Ledger',
      description: 'Every record upload, doctor query, permission grant, or credential change is cryptographically hashed and immutably logged for complete compliance auditing.',
      badge: 'Audit Transparency',
    },
    {
      icon: RefreshCw,
      color: 'text-indigo-600',
      bgIcon: 'bg-indigo-50 border-indigo-100',
      title: 'Universal Hospital Interoperability',
      description: 'Break free from proprietary hospital EHR software silos. HealthOrbit bridges patient files across multiple partner networks into one unified timeline.',
      badge: 'Interoperable Protocol',
    },
    {
      icon: Zap,
      color: 'text-amber-600',
      bgIcon: 'bg-amber-50 border-amber-100',
      title: 'Automated AI Medical Analysis',
      description: 'Leverage server-side Gemini intelligence to automatically summarize complex diagnostic lab reports and explain medical jargon in plain language.',
      badge: 'AI Diagnostic Copilot',
    },
  ];

  return (
    <div className="py-16 px-6 max-w-7xl mx-auto space-y-16 text-[#1D1D1F]">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-[#F5F5F7] border border-[#E5E5E7] px-4 py-1.5 rounded-full text-xs font-mono font-medium text-[#0071E3]">
          <Sparkles className="w-4 h-4 text-[#0071E3]" />
          Platform Capabilities
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-[#1D1D1F] tracking-tight">
          Next-Gen Healthcare Technology.
        </h1>
        <p className="text-[#6E6E73] text-base sm:text-lg leading-relaxed font-normal">
          Explore the comprehensive suite of cryptographic, interoperable, and lifesaving medical management tools built into HealthOrbit.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="rounded-[32px] bg-[#FBFBFD] border border-[#E5E5E7] p-8 space-y-5 flex flex-col justify-between hover:border-[#D2D2D7] hover:bg-white transition-all shadow-2xs hover:shadow-md"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-2xl border ${feat.bgIcon} ${feat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#6E6E73] bg-[#F5F5F7] border border-[#E5E5E7] px-2.5 py-1 rounded-lg">
                    {feat.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#1D1D1F] tracking-tight">{feat.title}</h3>
                <p className="text-xs text-[#6E6E73] leading-relaxed">{feat.description}</p>
              </div>

              <div className="pt-4 border-t border-[#E5E5E7] flex items-center gap-2 text-[10px] font-mono font-bold text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> HIPAA & Clinical Standard
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="rounded-[32px] p-8 sm:p-12 text-center space-y-6 border border-[#E5E5E7] bg-[#F5F5F7] shadow-sm">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#1D1D1F]">
          Ready to experience decentralized health record management?
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/register"
            className="bg-[#1D1D1F] hover:bg-black text-white px-8 py-3.5 rounded-full text-xs font-semibold transition-all shadow-xs"
          >
            Create Free Patient Vault
          </Link>
          <Link
            to="/login"
            className="bg-white hover:bg-[#F5F5F7] text-[#1D1D1F] border border-[#E5E5E7] px-8 py-3.5 rounded-full text-xs font-semibold transition-all"
          >
            Practitioner Sign In
          </Link>
        </div>
      </div>

    </div>
  );
}
