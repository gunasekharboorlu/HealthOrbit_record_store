import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  position?: 'left' | 'right';
  children: React.ReactNode;
}

export const Drawer = React.memo(function Drawer({
  isOpen,
  onClose,
  title,
  position = 'right',
  children,
}: DrawerProps) {
  const isRight = position === 'right';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-xs"
          />

          <motion.div
            initial={{ x: isRight ? '100%' : '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: isRight ? '100%' : '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`relative ml-auto h-full w-full max-w-md bg-white border-${
              isRight ? 'l' : 'r'
            } border-[#E5E5E7] p-6 shadow-xl z-10 flex flex-col justify-between overflow-y-auto`}
          >
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E5E5E7]">
                {title && <h3 className="text-base font-bold font-sans text-[#1D1D1F]">{title}</h3>}
                <button
                  onClick={onClose}
                  className="p-1.5 text-[#6E6E73] hover:text-[#1D1D1F] rounded-xl hover:bg-[#F5F5F7] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div>{children}</div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
});
