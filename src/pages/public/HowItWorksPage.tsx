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
      color: 'text-[#38bdf8]',
    },
    {
      step: '02',
      title: 'Upload Diagnostics & Set Locks',
      description: 'Upload lab reports, prescriptions, and scans. Mark sensitive items to enforce mandatory doctor permission requests.',
      icon: Database,
      color: 'text-[#22d3ee]',
    },
    {
      step: '03',
      title: 'Doctor Queries Patient Record',
      description: 'Medical practitioners search your Patient ID and request cryptographic clearance keys to inspect locked medical reports.',
      icon: Users,
      color: 'text-purple-400',
    },
    {
      step: '04',
      title: 'Approve Access & Receive Stamped Scripts',
      description: 'Approve doctor access requests from your dashboard. Doctors view reports and write certified prescriptions back into your timeline.',
      icon: CheckCircle2,
      color: 'text-emerald-400',
    },
  ];

  return (
    <div className="py-16 px-4 max-w-6xl mx-auto space-y-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-[#38bdf8]/10 border border-[#38bdf8]/20 px-4 py-1.5 rounded-full text-xs font-bold text-[#38bdf8] uppercase tracking-wider font-mono">
          <Sparkles className="w-4 h-4" />
          Operational Lifecycle
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight">
          How HealthOrbit Operates.
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
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
              transition={{ delay: idx * 0.1 }}
              className="glass-card rounded-3xl p-8 border border-white/10 space-y-4 relative"
            >
              <div className="flex items-center justify-between">
                <div className={`p-3.5 rounded-2xl bg-white/5 border border-white/10 ${s.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="font-mono font-black text-2xl text-slate-600">{s.step}</span>
              </div>
              <h3 className="font-display text-xl font-bold text-white">{s.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{s.description}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="text-center pt-8">
        <Link
          to="/register"
          className="inline-flex items-center gap-2 bg-gradient-to-tr from-[#38bdf8] to-[#22d3ee] text-slate-950 font-bold px-8 py-4 rounded-2xl text-xs hover:scale-[1.03] transition-all"
        >
          Initialize Your Health Vault Now <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
