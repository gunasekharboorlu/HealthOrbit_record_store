import React from 'react';
import { motion } from 'motion/react';
import { Key, Database, Users, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HowItWorksPage() {
  const steps = [
    {
      step: '01',
      title: 'Initialize Digital Patient Vault',
      description: 'Register your secure HealthOrbit account. The system provisions a unique blockchain-signed Patient ID and encrypted vault matrix.',
      icon: Key,
      color: 'text-[#0071E3]',
      bgIcon: 'bg-blue-50 border-blue-100',
    },
    {
      step: '02',
      title: 'Upload Diagnostics & Set Locks',
      description: 'Upload lab reports, prescriptions, and scans. Mark sensitive items to enforce mandatory doctor permission requests.',
      icon: Database,
      color: 'text-[#0071E3]',
      bgIcon: 'bg-blue-50 border-blue-100',
    },
    {
      step: '03',
      title: 'Doctor Queries Patient Record',
      description: 'Medical practitioners search your Patient ID and request cryptographic clearance keys to inspect locked medical reports.',
      icon: Users,
      color: 'text-indigo-600',
      bgIcon: 'bg-indigo-50 border-indigo-100',
    },
    {
      step: '04',
      title: 'Approve Access & Receive Stamped Scripts',
      description: 'Approve doctor access requests from your dashboard. Doctors view reports and write certified prescriptions back into your timeline.',
      icon: CheckCircle2,
      color: 'text-emerald-600',
      bgIcon: 'bg-emerald-50 border-emerald-100',
    },
  ];

  return (
    <div className="py-16 px-6 max-w-6xl mx-auto space-y-16 text-[#1D1D1F]">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-[#F5F5F7] border border-[#E5E5E7] px-4 py-1.5 rounded-full text-xs font-mono font-medium text-[#0071E3]">
          <Sparkles className="w-4 h-4 text-[#0071E3]" />
          Operational Lifecycle
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-[#1D1D1F] tracking-tight">
          How HealthOrbit Operates.
        </h1>
        <p className="text-[#6E6E73] text-base sm:text-lg leading-relaxed font-normal">
          Four simple, secure steps connecting patients, medical centers, and practitioners.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="rounded-[32px] bg-[#FBFBFD] border border-[#E5E5E7] p-8 space-y-4 hover:border-[#D2D2D7] hover:bg-white transition-all shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <div className={`p-3.5 rounded-2xl border ${s.bgIcon} ${s.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="font-mono font-bold text-2xl text-[#86868B]">{s.step}</span>
              </div>
              <h3 className="text-xl font-bold text-[#1D1D1F] tracking-tight">{s.title}</h3>
              <p className="text-xs text-[#6E6E73] leading-relaxed">{s.description}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="text-center pt-8">
        <Link
          to="/register"
          className="inline-flex items-center gap-2 bg-[#1D1D1F] hover:bg-black text-white font-semibold px-8 py-4 rounded-full text-xs transition-all shadow-md"
        >
          Initialize Your Health Vault Now <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
