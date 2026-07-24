import React from 'react';
import { getAvatarInitials, getAvatarBgColor } from '../../utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md';
}

const variantClasses = {
  default: 'bg-slate-800 text-slate-300 border-slate-700',
  success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  danger: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  info: 'bg-[#38bdf8]/10 text-[#38bdf8] border-[#38bdf8]/20',
};

export const Badge = React.memo(function Badge({
  children,
  variant = 'default',
  size = 'sm',
}: BadgeProps) {
  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs';
  return (
    <span
      className={`inline-flex items-center font-bold font-mono rounded-lg border uppercase tracking-wider ${variantClasses[variant]} ${sizeClass}`}
    >
      {children}
    </span>
  );
});

interface AvatarProps {
  name?: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg';
}

const avatarSizes = {
  sm: 'w-7 h-7 text-[10px]',
  md: 'w-9 h-9 text-xs',
  lg: 'w-12 h-12 text-sm',
};

export const Avatar = React.memo(function Avatar({ name, src, size = 'md' }: AvatarProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={name || 'Avatar'}
        className={`${avatarSizes[size]} rounded-full object-cover border border-white/20 shadow-md`}
      />
    );
  }

  const initials = getAvatarInitials(name);
  const bgColor = getAvatarBgColor(name);

  return (
    <div
      className={`${avatarSizes[size]} rounded-full bg-gradient-to-tr ${bgColor} flex items-center justify-center text-slate-950 font-black font-display shadow-md shrink-0`}
    >
      {initials}
    </div>
  );
});

interface StatusChipProps {
  status: 'approved' | 'pending' | 'rejected' | 'verified' | string;
  label?: string;
}

export const StatusChip = React.memo(function StatusChip({ status, label }: StatusChipProps) {
  let style = 'bg-slate-800 text-slate-300 border-slate-700';
  const normStatus = status.toLowerCase();

  if (normStatus === 'approved' || normStatus === 'verified') {
    style = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
  } else if (normStatus === 'pending') {
    style = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
  } else if (normStatus === 'rejected') {
    style = 'bg-rose-500/10 text-rose-400 border-rose-500/30';
  }

  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold font-mono border uppercase tracking-wider ${style}`}>
      {label || status}
    </span>
  );
});
