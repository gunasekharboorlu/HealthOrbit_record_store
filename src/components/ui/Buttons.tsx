import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode | React.ElementType;
  isLoading?: boolean;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
}

const sizeClasses = {
  sm: 'px-4 py-2 text-xs font-semibold rounded-xl gap-2',
  md: 'px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl gap-2.5',
  lg: 'px-7 py-3.5 text-sm font-bold rounded-2xl gap-3',
};

function renderIcon(icon?: React.ReactNode | React.ElementType, defaultClass: string = 'w-4 h-4 shrink-0') {
  if (!icon) return null;
  if (React.isValidElement(icon)) {
    return icon;
  }
  const IconComponent = icon as React.ElementType;
  return <IconComponent className={defaultClass} />;
}

export const PrimaryButton = React.memo(function PrimaryButton({
  children,
  icon,
  isLoading,
  size = 'md',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={`font-bold flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg shadow-[#38bdf8]/20 bg-gradient-to-r from-[#38bdf8] to-[#22d3ee] text-slate-950 hover:brightness-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
        sizeClasses[size]
      } ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
      ) : (
        renderIcon(icon, 'w-4 h-4 shrink-0')
      )}
      <span>{children}</span>
    </button>
  );
});

export const SecondaryButton = React.memo(function SecondaryButton({
  children,
  icon,
  isLoading,
  size = 'md',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={`font-semibold flex items-center justify-center transition-all duration-200 cursor-pointer bg-white/5 border border-white/10 text-slate-200 hover:text-white hover:bg-white/10 hover:border-white/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
        sizeClasses[size]
      } ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : (
        renderIcon(icon, 'w-4 h-4 shrink-0 text-slate-400')
      )}
      <span>{children}</span>
    </button>
  );
});

export const DangerButton = React.memo(function DangerButton({
  children,
  icon,
  isLoading,
  size = 'md',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={`font-bold flex items-center justify-center transition-all duration-200 cursor-pointer bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
        sizeClasses[size]
      } ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-rose-400 border-t-transparent rounded-full animate-spin" />
      ) : (
        renderIcon(icon, 'w-4 h-4 shrink-0')
      )}
      <span>{children}</span>
    </button>
  );
});
