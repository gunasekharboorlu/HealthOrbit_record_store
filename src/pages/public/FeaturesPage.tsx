import React from 'react';
import { motion } from 'motion/react';
import { Shield, Lock, BadgeCheck, Heart, Key, Database, RefreshCw, FileText, CheckCircle2, Sparkles, ShieldAlert, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FeaturesPage() {
  const features = [
    {
      icon: Lock,
      color: 'text-[#38bdf8]',
      border: 'border-[#38bdf8]/30',
      title: 'Zero-Knowledge Access Locks',
      description: 'Tag any confidential report as Sensitive. Doctors receive permission alerts and can only inspect locked files when granted a 24-hour decaying JWT clearance key.',
      badge: 'Cryptographic Security',
    },
    {
      icon: BadgeCheck,
      color: 'text-emerald-400',
      border: 'border-emerald-500/30',
      title: 'Clinical Trust Verification Stamps',
      description: 'Reports uploaded by accredited healthcare practitioners automatically receive a "Clinic Verified" seal, guaranteeing authentic diagnostic origins.',
      badge: 'Accreditation Engine',
    },
    {
      icon: Heart,
      color: 'text-rose-400',
      border: 'border-rose-500/30',
      title: 'Instant ER Rescue Profile',
      description: 'A zero-authentication, high-speed emergency portal allowing first responders to retrieve blood type, severe allergy vectors, and guardian contacts in under 3 seconds.',
      badge: 'Lifesaving Protocol',
    },
    {
      icon: ShieldAlert,
      color: 'text-[#22d3ee]',
      border: 'border-[#22d3ee]/30',
      title: 'Tamper-Proof SHA-256 Audit Ledger',
      description: 'Every record upload, doctor query, permission grant, or credential change is cryptographically hashed and immutably logged for complete compliance auditing.',
      badge: 'Audit Transparency',
    },
    {
      icon: RefreshCw,
      color: 'text-purple-400',
      border: 'border-purple-500/30',
      title: 'Universal Hospital Interoperability',
      description: 'Break free from proprietary hospital EHR software silos. HealthOrbit bridges patient files across multiple partner networks into one unified timeline.',
      badge: 'Interoperable Protocol',
    },
    {
      icon: Zap,
      color: 'text-amber-400',
      border: 'border-amber-500/30',
      title: 'Automated AI Medical Analysis',
      description: 'Leverage server-side Gemini intelligence to automatically summarize complex diagnostic lab reports and explain medical jargon in plain language.',
      badge: 'AI Diagnostic Copilot',
    },
  ];

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-[#38bdf8]/10 border border-[#38bdf8]/20 px-4 py-1.5 rounded-full text-xs font-bold text-[#38bdf8] uppercase tracking-wider font-mono">
          <Sparkles className="w-4 h-4 text-[#38bdf8]" />
          Platform Capabilities
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight">
          Next-Gen Healthcare Technology Features.
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
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
              transition={{ delay: idx * 0.1 }}
              className={`glass-card rounded-3xl p-8 space-y-5 border ${feat.border} flex flex-col justify-between`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 ${feat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 bg-white/5 px-2.5 py-1 rounded-lg">
                    {feat.badge}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-white">{feat.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{feat.description}</p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-[10px] font-mono font-bold text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> HIPAA & Clinical Standard
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="glass-card rounded-3xl p-8 sm:p-12 text-center space-y-6 border border-[#38bdf8]/20 bg-gradient-to-b from-[#090d23]/80 to-[#020617]/80">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
          Ready to experience decentralized health record management?
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/register"
            className="bg-gradient-to-tr from-[#38bdf8] to-[#22d3ee] text-slate-950 px-8 py-3.5 rounded-2xl text-xs font-bold transition-all hover:scale-[1.03]"
          >
            Create Free Patient Vault
          </Link>
          <Link
            to="/login"
            className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-3.5 rounded-2xl text-xs font-bold transition-all"
          >
            Practitioner Sign In
          </Link>
        </div>
      </div>

    </div>
  );
}
