import React from 'react';
import { Activity } from 'lucide-react';

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
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 space-y-4 text-center">
      <div className="relative w-14 h-14 flex items-center justify-center">
        <div className="absolute inset-0 border-2 border-[#38bdf8]/20 rounded-full"></div>
        <div className="absolute inset-0 border-2 border-t-[#38bdf8] border-r-transparent rounded-full animate-spin"></div>
        <Activity className="w-6 h-6 text-[#38bdf8] animate-pulse" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-bold text-white font-display tracking-wide">HealthOrbit Platform</p>
        <p className="text-xs text-slate-400 font-mono">Loading secure view...</p>
      </div>
    </div>
  );
}
