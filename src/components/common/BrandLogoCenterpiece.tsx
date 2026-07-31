import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Activity, Shield, Sparkles } from 'lucide-react';

interface BrandLogoCenterpieceProps {
  size?: 'hero' | 'header' | 'compact';
  showTagline?: boolean;
  className?: string;
}

export default function BrandLogoCenterpiece({
  size = 'hero',
  showTagline = true,
  className = '',
}: BrandLogoCenterpieceProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Entrance animation variants
  const logoVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.90, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        duration: 0.9, 
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.15
      } 
    }
  };

  const highlightSweepVariants = {
    hidden: { x: '-120%', opacity: 0 },
    visible: { 
      x: '180%', 
      opacity: [0, 0.7, 0],
      transition: { 
        delay: 0.5, 
        duration: 1.2, 
        ease: 'easeInOut' 
      } 
    }
  };

  const pulseOnceVariants = {
    hidden: { boxShadow: '0 0 0px rgba(56, 189, 248, 0)' },
    visible: {
      boxShadow: [
        '0 0 0px rgba(56, 189, 248, 0)',
        '0 0 50px rgba(56, 189, 248, 0.45)',
        '0 0 25px rgba(56, 189, 248, 0.2)'
      ],
      transition: { delay: 0.8, duration: 1.0, ease: 'easeOut' }
    }
  };

  const taglineVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { delay: 0.7, duration: 0.8, ease: 'easeOut' }
    }
  };

  if (size === 'header') {
    return (
      <div className={`flex items-center gap-3.5 group cursor-pointer ${className}`}>
        {/* Compact Glass Icon Container */}
        <div className="relative flex items-center justify-center">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#38bdf8]/20 to-[#22d3ee]/20 blur-sm opacity-60 group-hover:opacity-100 transition-opacity" />
          <div className="relative h-10 w-10 rounded-xl bg-gradient-to-tr from-[#0284c7] via-[#0284c7] to-[#22d3ee] text-slate-950 flex items-center justify-center shadow-lg shadow-[#38bdf8]/20 border border-white/20 group-hover:scale-105 transition-transform duration-300">
            <Activity className="h-5.5 w-5.5 text-white" />
          </div>
        </div>
        <div>
          <span className="font-display text-xl font-black tracking-wide bg-gradient-to-r from-white via-slate-100 to-[#38bdf8] bg-clip-text text-transparent">
            HealthOrbit
          </span>
          <span className="block font-mono text-[8px] font-bold tracking-[0.2em] text-[#38bdf8] uppercase">
            Clinical Ledger
          </span>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={logoVariants}
      initial="hidden"
      animate="visible"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative flex flex-col items-center text-center select-none ${className}`}
    >
      {/* 1. Ultra-Thin Translucent Rotating Ring behind Logo (Opacity 5-10%) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
        <div className="w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] rounded-full border border-[#38bdf8]/10 animate-[spin_45s_linear_infinite] opacity-60" />
        <div className="absolute inset-2 rounded-full border border-cyan-400/5 animate-[spin_35s_linear_infinite_reverse] opacity-40" />
      </div>

      {/* 2. Glass Icon Container with Smooth Entrance & Reflection Sweep */}
      <motion.div
        animate={{
          scale: isHovered ? 1.02 : 1,
          y: isHovered ? -3 : 0,
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 18 }}
        className="relative z-10 mb-5"
      >
        {/* Soft Ambient Radial Glow Behind Logo */}
        <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#38bdf8]/25 via-[#22d3ee]/15 to-transparent blur-2xl opacity-70 transition-opacity duration-500" />

        {/* Outer Glass Shield Box */}
        <motion.div
          variants={pulseOnceVariants}
          className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-3xl bg-gradient-to-tr from-[#031d30]/90 via-[#0a3550]/80 to-[#02101e]/90 border border-white/20 backdrop-blur-xl p-0.5 flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden"
        >
          {/* Glass Sweep Highlight */}
          <motion.div
            variants={highlightSweepVariants}
            className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 pointer-events-none z-20"
          />

          {/* Inner Emblem Frame */}
          <div className="w-full h-full rounded-[22px] bg-gradient-to-br from-[#0284c7] via-[#0369a1] to-[#0f172a] flex items-center justify-center relative border border-[#38bdf8]/30 shadow-inner group">
            <Activity className="w-10 h-10 sm:w-12 sm:h-12 text-white drop-shadow-[0_4px_12px_rgba(56,189,248,0.5)] transition-transform duration-300 group-hover:scale-105" />
            
            {/* Subtle corner specular highlights */}
            <div className="absolute top-1.5 left-2 w-3 h-1 bg-white/40 rounded-full blur-[0.5px]" />
          </div>
        </motion.div>
      </motion.div>

      {/* 3. Wordmark Typography */}
      <div className="relative z-10 space-y-1">
        <div className="flex items-center justify-center gap-2">
          <span className="font-display text-3xl sm:text-5xl font-black tracking-wider bg-gradient-to-r from-white via-[#e0f2fe] to-[#38bdf8] bg-clip-text text-transparent drop-shadow-md">
            HealthOrbit
          </span>
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[9px] font-mono font-extrabold uppercase tracking-widest text-[#38bdf8] bg-[#38bdf8]/10 border border-[#38bdf8]/20 backdrop-blur-md">
            v2.5 Enterprise
          </span>
        </div>
        
        <p className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.28em] text-[#38bdf8]/90 uppercase">
          Decentralized Clinical Ledger
        </p>
      </div>

      {/* 4. Tagline */}
      {showTagline && (
        <motion.div
          variants={taglineVariants}
          className="relative z-10 mt-3 pt-3 border-t border-white/10 flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-300/90 tracking-wide"
        >
          <span className="text-[#38bdf8]">Secure</span>
          <span className="text-slate-500">•</span>
          <span className="text-[#22d3ee]">Connected</span>
          <span className="text-slate-500">•</span>
          <span className="text-emerald-400">Intelligent Healthcare</span>
        </motion.div>
      )}
    </motion.div>
  );
}
