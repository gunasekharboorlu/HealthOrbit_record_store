import React from 'react';
import { Modal } from './Modal';
import { PrimaryButton, DangerButton, SecondaryButton } from './Buttons';
import { AlertTriangle } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDanger?: boolean;
  isLoading?: boolean;
}

export const ConfirmDialog = React.memo(function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDanger = true,
  isLoading = false,
}: ConfirmDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="sm">
      <div className="text-center space-y-4 pt-2">
        <div
          className={`w-12 h-12 rounded-full mx-auto flex items-center justify-center ${
            isDanger ? 'bg-rose-50 border border-rose-200 text-rose-600' : 'bg-[#F5F5F7] border border-[#E5E5E7] text-[#1D1D1F]'
          }`}
        >
          <AlertTriangle className="w-6 h-6" />
        </div>

        <div>
          <h3 className="text-base font-bold font-sans text-[#1D1D1F]">{title}</h3>
          <p className="text-xs text-[#6E6E73] mt-1 leading-relaxed font-normal">{message}</p>
        </div>

        <div className="flex gap-2 pt-2">
          <SecondaryButton size="md" fullWidth onClick={onClose} disabled={isLoading}>
            {cancelLabel}
          </SecondaryButton>
          {isDanger ? (
            <DangerButton size="md" fullWidth onClick={onConfirm} isLoading={isLoading}>
              {confirmLabel}
            </DangerButton>
          ) : (
            <PrimaryButton size="md" fullWidth onClick={onConfirm} isLoading={isLoading}>
              {confirmLabel}
            </PrimaryButton>
          )}
        </div>
      </div>
    </Modal>
  );
});
