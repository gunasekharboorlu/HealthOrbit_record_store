import React from 'react';
import { Download, Smartphone, CheckCircle2, ChevronRight } from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall';
import PWAInstructionsModal from './PWAInstructionsModal';

export interface InstallHealthOrbitButtonProps {
  variant?: 'hero' | 'navbar' | 'footer' | 'card' | 'banner' | 'default';
  className?: string;
  showInstalledStatus?: boolean;
  label?: string;
}

export default function InstallHealthOrbitButton({
  variant = 'default',
  className = '',
  showInstalledStatus = true,
  label,
}: InstallHealthOrbitButtonProps) {
  const {
    isStandalone,
    isInstalled,
    isIOS,
    triggerInstall,
    showInstructionsModal,
    setShowInstructionsModal,
  } = usePWAInstall();

  const handleInstallClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    triggerInstall();
  };

  // State when application is installed / standalone
  if (isStandalone || isInstalled) {
    if (!showInstalledStatus) return null;

    if (variant === 'navbar') {
      return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium bg-emerald-50 border border-emerald-200 text-emerald-700 ${className}`}>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          HealthOrbit Installed
        </span>
      );
    }

    if (variant === 'hero') {
      return (
        <div className={`inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-5 py-3.5 rounded-full text-xs font-mono font-medium text-emerald-700 shadow-xs ${className}`}>
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>HealthOrbit is Installed on Device</span>
        </div>
      );
    }

    if (variant === 'footer') {
      return (
        <div className={`flex items-center gap-2 text-xs font-mono text-emerald-700 ${className}`}>
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>HealthOrbit App Installed</span>
        </div>
      );
    }

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium bg-emerald-50 border border-emerald-200 text-emerald-700 ${className}`}>
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
        {label || 'HealthOrbit is Installed'}
      </span>
    );
  }

  // State when application is NOT installed
  return (
    <>
      {variant === 'hero' && (
        <button
          onClick={handleInstallClick}
          type="button"
          className={`w-full sm:w-auto bg-[#F5F5F7] border border-[#E5E5E7] hover:bg-[#E8E8ED] text-[#1D1D1F] px-6 py-3.5 rounded-full font-medium text-sm transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2.5 cursor-pointer ${className}`}
        >
          <Smartphone className="w-4 h-4 text-[#1D1D1F]" />
          <span>{label || 'Install HealthOrbit App'}</span>
          <span className="text-[10px] font-mono uppercase bg-white border border-[#E5E5E7] px-2 py-0.5 rounded-full text-[#1D1D1F] font-medium">
            PWA
          </span>
        </button>
      )}

      {variant === 'navbar' && (
        <button
          onClick={handleInstallClick}
          type="button"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#1D1D1F] bg-[#F5F5F7] hover:bg-[#E8E8ED] border border-[#E5E5E7] transition-all cursor-pointer ${className}`}
        >
          <Download className="w-3.5 h-3.5 text-[#1D1D1F]" />
          <span>{label || 'Install App'}</span>
        </button>
      )}

      {variant === 'footer' && (
        <button
          onClick={handleInstallClick}
          type="button"
          className={`inline-flex items-center gap-2 bg-white hover:bg-[#F5F5F7] border border-[#E5E5E7] text-[#1D1D1F] px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${className}`}
        >
          <Smartphone className="w-4 h-4 text-[#1D1D1F]" />
          <span>{label || 'Install HealthOrbit (PWA)'}</span>
        </button>
      )}

      {variant === 'card' && (
        <div className={`bg-white border border-[#E5E5E7] rounded-3xl p-6 sm:p-8 relative overflow-hidden space-y-4 shadow-xs ${className}`}>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#1D1D1F] text-white font-bold">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[#1D1D1F]">Install HealthOrbit Progressive Web App</h3>
                <span className="text-[10px] font-mono bg-[#F5F5F7] border border-[#E5E5E7] text-[#1D1D1F] px-2 py-0.5 rounded-full font-medium">
                  Offline Ready
                </span>
              </div>
              <p className="text-xs text-[#6E6E73] mt-1 font-normal">
                Install on your Desktop, Android, or iPhone for instant access, biometric launch, and full offline ledger capabilities.
              </p>
            </div>
          </div>
          <button
            onClick={handleInstallClick}
            type="button"
            className="w-full bg-[#1D1D1F] hover:bg-black text-white font-medium text-xs py-3 px-5 rounded-full transition active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <Download className="w-4 h-4" />
            Install HealthOrbit Now
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {variant === 'default' && (
        <button
          onClick={handleInstallClick}
          type="button"
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium bg-[#F5F5F7] hover:bg-[#E8E8ED] text-[#1D1D1F] border border-[#E5E5E7] transition-all cursor-pointer ${className}`}
        >
          <Download className="w-4 h-4 text-[#1D1D1F]" />
          <span>{label || 'Install HealthOrbit'}</span>
        </button>
      )}

      {/* Render device instructions modal when required */}
      <PWAInstructionsModal
        isOpen={showInstructionsModal}
        onClose={() => setShowInstructionsModal(false)}
        isIOS={isIOS}
      />
    </>
  );
}
