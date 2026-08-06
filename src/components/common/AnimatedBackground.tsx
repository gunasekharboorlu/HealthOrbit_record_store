import React from 'react';

interface AnimatedBackgroundProps {
  variant?: 'hero' | 'auth' | 'subtle' | 'loading';
  className?: string;
}

export default function AnimatedBackground({
  variant = 'hero',
  className = '',
}: AnimatedBackgroundProps) {
  return (
    <div
      className={`fixed inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* Base Apple Light Canvas */}
      <div className="absolute inset-0 bg-[#FFFFFF]" />

      {/* Subtle Gray Background Gradient Transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFFFFF] via-[#FBFBFD] to-[#F5F5F7]" />

      {/* Extremely Faint Apple Subtle Texture Grid (2-3% opacity) */}
      <div 
        className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(135deg,rgba(0,0,0,0.4)_1px,transparent_1px),linear-gradient(45deg,rgba(0,0,0,0.4)_1px,transparent_1px)] bg-[size:48px_48px]" 
      />

      {/* Hero / Auth Soft Neutral Spotlight */}
      {(variant === 'hero' || variant === 'auth' || variant === 'loading') && (
        <div
          className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[1200px] h-[600px] rounded-full pointer-events-none opacity-60"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.03) 0%, rgba(245, 245, 247, 0.4) 50%, transparent 75%)',
          }}
        />
      )}
    </div>
  );
}
