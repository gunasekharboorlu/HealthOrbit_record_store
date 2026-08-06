import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { Toast as ToastType } from '../types';

interface ToastProps {
  toast: ToastType | null;
  onClose: () => void;
}

export default function Toast({ toast, onClose }: ToastProps) {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="fixed top-6 right-6 z-50 flex items-center gap-3.5 px-4.5 py-3.5 rounded-2xl shadow-lg border border-[#E5E5E7] bg-white text-[#1D1D1F] max-w-md"
        >
          <div className="shrink-0">
            {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-emerald-600" />}
            {toast.type === 'error' && <XCircle className="w-5 h-5 text-rose-600" />}
            {toast.type === 'warning' && <AlertCircle className="w-5 h-5 text-amber-600" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-sky-600" />}
          </div>
          <div className="flex-1 font-sans text-xs font-medium leading-relaxed tracking-tight text-[#1D1D1F]">
            {toast.message}
          </div>
          <button 
            onClick={onClose} 
            className="p-1 rounded-lg hover:bg-[#F5F5F7] transition-colors shrink-0 text-[#6E6E73] hover:text-[#1D1D1F]"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
