import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}

export const Card = React.memo(function Card({
  children,
  className = '',
  onClick,
  hoverEffect = false,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl bg-slate-900/60 border border-slate-800 p-5 shadow-lg ${
        hoverEffect ? 'hover:border-slate-700 transition-all cursor-pointer' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
});

export const GlassCard = React.memo(function GlassCard({
  children,
  className = '',
  onClick,
  hoverEffect = false,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl bg-[#020617]/60 backdrop-blur-xl border border-white/10 p-6 shadow-xl ${
        hoverEffect ? 'hover:border-[#38bdf8]/40 hover:bg-[#020617]/80 transition-all cursor-pointer' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
});
