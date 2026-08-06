import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Activity } from 'lucide-react';
import AnimatedBackground from '../common/AnimatedBackground';

interface LoadingSkeletonProps {
  type?: 'page' | 'card' | 'table';
}

export default function LoadingSkeleton({ type = 'page' }: LoadingSkeletonProps) {
  if (type === 'card') {
    return (
      <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4 animate-pulse">
        <div className="h-4 bg-white/10 rounded w-1/3"></div>
        <div className="h-8 bg-white/10 rounded w-2/3"></div>
        <div className="h-3 bg-white/10 rounded w-1/2"></div>
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4 animate-pulse">
        <div className="h-6 bg-white/10 rounded w-1/4 mb-4"></div>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex gap-4 items-center">
            <div className="h-4 bg-white/10 rounded flex-1"></div>
            <div className="h-4 bg-white/10 rounded flex-1"></div>
            <div className="h-4 bg-white/10 rounded w-20"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] relative flex flex-col items-center justify-center p-8 space-y-6 text-center overflow-hidden">
      <AnimatedBackground variant="loading" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="glass-card p-8 rounded-3xl border border-white/15 bg-slate-950/80 backdrop-blur-2xl shadow-2xl relative z-10 max-w-sm w-full space-y-6 flex flex-col items-center"
      >
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className="absolute inset-0 border-2 border-[#38bdf8]/20 rounded-2xl" />
          <div className="absolute inset-0 border-2 border-t-[#38bdf8] border-r-transparent rounded-2xl animate-spin" />
          <img src="/icon.svg" alt="HealthOrbit Logo" className="w-10 h-10 rounded-xl object-cover" referrerPolicy="no-referrer" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-[#38bdf8] font-mono text-[10px] uppercase font-bold tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> HealthOrbit Zero-Trust
          </div>
          <h3 className="text-base font-black text-white font-display tracking-tight">Authenticating Ledger Token...</h3>
          <p className="text-xs text-slate-400 font-sans">Decrypting patient vault credentials and establishing secure session.</p>
        </div>

        <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-white/5">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            className="h-full bg-gradient-to-r from-transparent via-[#38bdf8] to-transparent w-full"
          />
        </div>
      </motion.div>
    </div>
  );
}
