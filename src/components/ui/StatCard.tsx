import React from 'react';
import { motion } from 'motion/react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  subtext?: string;
  icon: React.ReactNode | React.ElementType;
  trend?: string | { value: string; positive?: boolean };
  change?: string;
  trendType?: 'up' | 'down' | 'neutral' | 'positive' | 'warning';
  changeType?: 'up' | 'down' | 'neutral' | 'positive' | 'warning';
  color?: string;
  onClick?: () => void;
}

export const StatCard = React.memo(function StatCard({
  title,
  value,
  subtitle,
  subtext,
  icon,
  trend,
  change,
  trendType,
  changeType,
  color = '#38bdf8',
  onClick,
}: StatCardProps) {
  const renderIcon = () => {
    if (!icon) return null;
    if (React.isValidElement(icon)) {
      return icon;
    }
    const IconComponent = icon as React.ElementType;
    return <IconComponent className="w-4 h-4" />;
  };

  const displayText = subtitle || subtext;
  
  let trendText = '';
  if (typeof trend === 'string') {
    trendText = trend;
  } else if (trend && typeof trend === 'object' && 'value' in trend) {
    trendText = trend.value;
  } else if (change) {
    trendText = change;
  }

  const effectiveTrendType = trendType || changeType || (typeof trend === 'object' && trend?.positive ? 'up' : 'neutral');

  return (
    <motion.div
      whileHover={{ y: -2 }}
      onClick={onClick}
      className={`glass-card rounded-3xl p-6 sm:p-7 border border-white/10 relative overflow-hidden space-y-4 ${
        onClick ? 'cursor-pointer hover:border-[#38bdf8]/40 transition-colors' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold font-mono uppercase text-slate-400 tracking-wider">
          {title}
        </span>
        <div
          className="p-2 rounded-xl bg-white/5 border border-white/10"
          style={{ color }}
        >
          {renderIcon()}
        </div>
      </div>

      <div className="flex items-baseline justify-between gap-2">
        <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">
          {value}
        </h3>
        {trendText && (
          <span
            className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-full ${
              effectiveTrendType === 'up' || effectiveTrendType === 'positive'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : effectiveTrendType === 'down' || effectiveTrendType === 'warning'
                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                : 'bg-slate-800 text-slate-400 border border-white/10'
            }`}
          >
            {trendText}
          </span>
        )}
      </div>

      {displayText && <p className="text-[11px] text-slate-400">{displayText}</p>}
    </motion.div>
  );
});
