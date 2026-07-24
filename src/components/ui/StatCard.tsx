import React from 'react';
import { motion } from 'motion/react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ElementType;
  trend?: string;
  trendType?: 'up' | 'down' | 'neutral';
  color?: string;
}

export const StatCard = React.memo(function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendType = 'neutral',
  color = '#38bdf8',
}: StatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="glass-card rounded-2xl p-5 border border-white/10 relative overflow-hidden space-y-3"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold font-mono uppercase text-slate-400 tracking-wider">
          {title}
        </span>
        <div
          className="p-2 rounded-xl bg-white/5 border border-white/10"
          style={{ color }}
        >
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="flex items-baseline justify-between gap-2">
        <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">
          {value}
        </h3>
        {trend && (
          <span
            className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-full ${
              trendType === 'up'
                ? 'bg-emerald-500/10 text-emerald-400'
                : trendType === 'down'
                ? 'bg-rose-500/10 text-rose-400'
                : 'bg-slate-800 text-slate-400'
            }`}
          >
            {trend}
          </span>
        )}
      </div>

      {subtitle && <p className="text-[11px] text-slate-400">{subtitle}</p>}
    </motion.div>
  );
});
