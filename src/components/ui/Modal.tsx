import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
};

export const Modal = React.memo(function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'md',
}: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-xs"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: 'spring', duration: 0.25 }}
            className={`relative w-full ${maxWidthClasses[maxWidth]} bg-white border border-[#E5E5E7] rounded-3xl p-6 shadow-xl z-10 space-y-4`}
          >
            {(title || onClose) && (
              <div className="flex items-start justify-between pb-3 border-b border-[#E5E5E7]">
                <div>
                  {title && <h3 className="text-lg font-bold font-sans text-[#1D1D1F] tracking-tight">{title}</h3>}
                  {subtitle && <p className="text-xs text-[#6E6E73] mt-0.5 font-normal">{subtitle}</p>}
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 text-[#6E6E73] hover:text-[#1D1D1F] rounded-xl hover:bg-[#F5F5F7] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}

            <div>{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
});
