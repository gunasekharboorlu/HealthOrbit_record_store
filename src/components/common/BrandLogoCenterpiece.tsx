import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Activity } from 'lucide-react';

interface BrandLogoCenterpieceProps {
  size?: 'hero' | 'header' | 'compact';
  showTagline?: boolean;
  className?: string;
}

export default function BrandLogoCenterpiece({
  size = 'hero',
  showTagline = true,
  className = '',
}: BrandLogoCenterpieceProps) {
  const [isHovered, setIsHovered] = useState(false);

  if (size === 'header') {
    return (
      <div className={`flex items-center gap-3 group cursor-pointer ${className}`}>
        <div className="h-9 w-9 rounded-xl overflow-hidden shadow-xs transition-transform duration-200 group-hover:scale-[1.03]">
          <img src="/icon.svg" alt="HealthOrbit Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div>
          <span className="font-sans text-base font-semibold tracking-tight text-[#1D1D1F]">
            HealthOrbit
          </span>
          <span className="block font-mono text-[9px] font-medium tracking-wider text-[#6E6E73] uppercase">
            Clinical Ledger
          </span>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative flex flex-col items-center text-center select-none ${className}`}
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.2 }}
        className="relative z-10 mb-4"
      >
        <div className="h-20 w-20 sm:h-22 sm:w-22 rounded-3xl overflow-hidden shadow-md border border-[#E5E5E7]">
          <img src="/icon.svg" alt="HealthOrbit Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
      </motion.div>

      <div className="relative z-10 space-y-1">
        <div className="flex items-center justify-center gap-2.5">
          <span className="font-sans text-3xl sm:text-5xl font-bold tracking-tight text-[#1D1D1F]">
            HealthOrbit
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium tracking-wide text-[#1D1D1F] bg-[#F5F5F7] border border-[#E5E5E7]">
            Enterprise
          </span>
        </div>
        
        <p className="font-mono text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-[#6E6E73] uppercase">
          Decentralized Clinical Ledger
        </p>
      </div>

      {showTagline && (
        <div className="relative z-10 mt-3 pt-3 border-t border-[#E5E5E7] flex items-center gap-2 text-xs sm:text-sm font-normal text-[#6E6E73]">
          <span className="text-[#1D1D1F] font-medium">Secure</span>
          <span>•</span>
          <span className="text-[#1D1D1F] font-medium">Interoperable</span>
          <span>•</span>
          <span className="text-[#1D1D1F] font-medium">Verified Healthcare</span>
        </div>
      )}
    </motion.div>
  );
}
