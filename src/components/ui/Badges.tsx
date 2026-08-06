import React from 'react';
import { getAvatarInitials } from '../../utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md';
}

const variantClasses = {
  default: 'bg-[#F5F5F7] text-[#6E6E73] border-[#E5E5E7]',
  success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  warning: 'bg-amber-50 text-amber-700 border-amber-200',
  danger: 'bg-rose-50 text-rose-700 border-rose-200',
  info: 'bg-sky-50 text-sky-700 border-sky-200',
};

export const Badge = React.memo(function Badge({
  children,
  variant = 'default',
  size = 'sm',
}: BadgeProps) {
  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs';
  return (
    <span
      className={`inline-flex items-center font-mono font-medium rounded-md border uppercase tracking-wider ${variantClasses[variant]} ${sizeClass}`}
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
  md: 'w-8 h-8 text-xs',
  lg: 'w-11 h-11 text-sm',
};

export const Avatar = React.memo(function Avatar({ name, src, size = 'md' }: AvatarProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={name || 'Avatar'}
        className={`${avatarSizes[size]} rounded-full object-cover border border-[#E5E5E7] shadow-xs`}
      />
    );
  }

  const initials = getAvatarInitials(name);

  return (
    <div
      className={`${avatarSizes[size]} rounded-full bg-[#1D1D1F] text-white flex items-center justify-center font-bold font-sans shadow-xs shrink-0`}
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
  let style = 'bg-[#F5F5F7] text-[#6E6E73] border-[#E5E5E7]';
  const normStatus = status.toLowerCase();

  if (normStatus === 'approved' || normStatus === 'verified') {
    style = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  } else if (normStatus === 'pending') {
    style = 'bg-amber-50 text-amber-700 border-amber-200';
  } else if (normStatus === 'rejected') {
    style = 'bg-rose-50 text-rose-700 border-rose-200';
  }

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium border uppercase tracking-wider ${style}`}>
      {label || status}
    </span>
  );
});
