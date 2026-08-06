import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import { Toast as ToastType } from '../../types';

interface ToastProps {
  toast: ToastType | null;
  onClose: () => void;
}

export const Toast = React.memo(function Toast({ toast, onClose }: ToastProps) {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className="fixed top-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-white border border-[#E5E5E7] shadow-lg max-w-md"
        >
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />}
          {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-sky-600 shrink-0" />}

          <span className="text-xs font-medium text-[#1D1D1F]">{toast.message}</span>

          <button
            onClick={onClose}
            className="p-1 text-[#6E6E73] hover:text-[#1D1D1F] rounded-lg hover:bg-[#F5F5F7] cursor-pointer ml-auto"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
});
