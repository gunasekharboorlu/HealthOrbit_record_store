import React from 'react';
import { motion } from 'motion/react';
import { Activity, ShieldCheck, Heart, Users, Building2, Sparkles, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="py-16 px-4 max-w-6xl mx-auto space-y-16">
      
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-[#38bdf8]/10 border border-[#38bdf8]/20 px-4 py-1.5 rounded-full text-xs font-bold text-[#38bdf8] uppercase tracking-wider font-mono">
          <Sparkles className="w-4 h-4 text-[#38bdf8]" />
          Our Mission
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight">
          Restoring Ownership To Patient Health Timelines.
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          HealthOrbit was founded to dismantle fragmented clinical data silos. We empower patients with zero-knowledge cryptographic control over their lifelong diagnostic records while enabling practitioners to access certified clinical data seamlessly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass-card rounded-3xl p-8 border border-white/5 space-y-4">
          <div className="p-3.5 w-fit rounded-2xl bg-[#38bdf8]/10 text-[#38bdf8] border border-[#38bdf8]/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-display text-xl font-bold text-white">Patient Sovereignty</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Your medical history belongs to you. No third party can decrypt, sell, or inspect sensitive files without your explicit permission key.
          </p>
        </div>

        <div className="glass-card rounded-3xl p-8 border border-white/5 space-y-4">
          <div className="p-3.5 w-fit rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-display text-xl font-bold text-white">Clinical Integrity</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Medical practitioners can trust every report on HealthOrbit thanks to SHA-256 cryptographic origin stamps and hospital verification seals.
          </p>
        </div>

        <div className="glass-card rounded-3xl p-8 border border-white/5 space-y-4">
          <div className="p-3.5 w-fit rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <Heart className="w-6 h-6 animate-pulse" />
          </div>
          <h3 className="font-display text-xl font-bold text-white">Lifesaving Availability</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            During medical emergencies, first responders access crucial rescue vitals in seconds without delaying lifesaving interventions.
          </p>
        </div>
      </div>

    </div>
  );
}
