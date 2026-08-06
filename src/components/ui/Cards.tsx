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
      className={`rounded-2xl bg-white border border-[#E5E5E7] p-6 sm:p-7 shadow-xs ${
        hoverEffect ? 'hover:border-[#D2D2D7] hover:shadow-md transition-all cursor-pointer' : ''
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
      className={`rounded-2xl bg-white border border-[#E5E5E7] p-6 sm:p-7 shadow-xs ${
        hoverEffect ? 'hover:border-[#D2D2D7] hover:shadow-md transition-all cursor-pointer' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
});
