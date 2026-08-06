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
  color = '#1D1D1F',
  onClick,
}: StatCardProps) {
  const renderIcon = () => {
    if (!icon) return null;
    if (React.isValidElement(icon)) {
      return icon;
    }
    const IconComponent = icon as React.ElementType;
    return <IconComponent className="w-4 h-4 text-[#1D1D1F]" />;
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
      whileHover={{ y: -1 }}
      onClick={onClick}
      className={`rounded-2xl bg-white p-6 sm:p-7 border border-[#E5E5E7] shadow-xs relative overflow-hidden space-y-4 ${
        onClick ? 'cursor-pointer hover:border-[#D2D2D7] hover:shadow-md transition-all' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono font-medium uppercase text-[#86868B] tracking-wider">
          {title}
        </span>
        <div
          className="p-2 rounded-xl bg-[#F5F5F7] border border-[#E5E5E7]"
        >
          {renderIcon()}
        </div>
      </div>

      <div className="flex items-baseline justify-between gap-2">
        <h3 className="text-2xl sm:text-3xl font-bold font-sans text-[#1D1D1F] tracking-tight">
          {value}
        </h3>
        {trendText && (
          <span
            className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-full ${
              effectiveTrendType === 'up' || effectiveTrendType === 'positive'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : effectiveTrendType === 'down' || effectiveTrendType === 'warning'
                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                : 'bg-[#F5F5F7] text-[#6E6E73] border border-[#E5E5E7]'
            }`}
          >
            {trendText}
          </span>
        )}
      </div>

      {displayText && <p className="text-xs text-[#6E6E73] font-normal">{displayText}</p>}
    </motion.div>
  );
});
