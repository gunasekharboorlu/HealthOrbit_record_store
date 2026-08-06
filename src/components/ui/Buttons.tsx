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
  sm: 'px-3.5 py-1.5 text-xs font-medium rounded-xl gap-2',
  md: 'px-4.5 py-2 text-xs sm:text-sm font-medium rounded-xl gap-2',
  lg: 'px-6 py-3 text-sm font-medium rounded-2xl gap-2.5',
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
      className={`font-medium flex items-center justify-center transition-all duration-200 cursor-pointer bg-[#1D1D1F] hover:bg-black text-white shadow-xs active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${
        sizeClasses[size]
      } ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
      className={`font-medium flex items-center justify-center transition-all duration-200 cursor-pointer bg-[#F5F5F7] border border-[#E5E5E7] text-[#1D1D1F] hover:bg-[#E8E8ED] hover:border-[#D2D2D7] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${
        sizeClasses[size]
      } ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-[#1D1D1F] border-t-transparent rounded-full animate-spin" />
      ) : (
        renderIcon(icon, 'w-4 h-4 shrink-0 text-[#6E6E73]')
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
      className={`font-medium flex items-center justify-center transition-all duration-200 cursor-pointer bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${
        sizeClasses[size]
      } ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-rose-600 border-t-transparent rounded-full animate-spin" />
      ) : (
        renderIcon(icon, 'w-4 h-4 shrink-0')
      )}
      <span>{children}</span>
    </button>
  );
});
