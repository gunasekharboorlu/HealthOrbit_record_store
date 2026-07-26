import React from 'react';
import { Download, Smartphone, CheckCircle2, Sparkles, ChevronRight } from 'lucide-react';
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
        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 ${className}`}>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          HealthOrbit Installed
        </span>
      );
    }

    if (variant === 'hero') {
      return (
        <div className={`inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-5 py-3.5 rounded-2xl text-xs font-mono font-bold text-emerald-300 shadow-lg backdrop-blur-md ${className}`}>
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>HealthOrbit is Installed on Device</span>
        </div>
      );
    }

    if (variant === 'footer') {
      return (
        <div className={`flex items-center gap-2 text-xs font-mono text-emerald-400 ${className}`}>
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>HealthOrbit App Installed</span>
        </div>
      );
    }

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 ${className}`}>
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
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
          className={`w-full sm:w-auto relative group overflow-hidden bg-gradient-to-r from-[#0f172a] to-[#0c1425] text-white hover:text-white border border-[#38bdf8]/40 hover:border-[#38bdf8]/70 shadow-[0_0_25px_rgba(56,189,248,0.2)] hover:shadow-[0_0_35px_rgba(56,189,248,0.4)] px-6 py-3.5 rounded-2xl font-bold text-sm tracking-wide transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center gap-2.5 cursor-pointer backdrop-blur-md ${className}`}
        >
          <div className="p-1.5 rounded-xl bg-[#38bdf8]/15 text-[#38bdf8] group-hover:scale-110 transition-transform">
            <Smartphone className="w-4.5 h-4.5 text-[#38bdf8]" />
          </div>
          <span className="font-bold">{label || 'Install HealthOrbit App'}</span>
          <span className="text-[10px] font-mono uppercase bg-[#38bdf8]/20 border border-[#38bdf8]/30 px-2 py-0.5 rounded-md text-[#38bdf8] font-bold">
            PWA
          </span>
        </button>
      )}

      {variant === 'navbar' && (
        <button
          onClick={handleInstallClick}
          type="button"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-[#38bdf8] hover:bg-[#38bdf8]/10 border border-[#38bdf8]/30 transition-all cursor-pointer ${className}`}
        >
          <Download className="w-3.5 h-3.5 text-[#38bdf8]" />
          <span>{label || 'Install App'}</span>
        </button>
      )}

      {variant === 'footer' && (
        <button
          onClick={handleInstallClick}
          type="button"
          className={`inline-flex items-center gap-2 bg-[#38bdf8]/10 hover:bg-[#38bdf8]/20 border border-[#38bdf8]/30 text-[#38bdf8] px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${className}`}
        >
          <Smartphone className="w-4 h-4 text-[#38bdf8]" />
          <span>{label || 'Install HealthOrbit (PWA)'}</span>
        </button>
      )}

      {variant === 'card' && (
        <div className={`bg-gradient-to-tr from-[#0a0f2b] via-[#0f173b] to-[#020617] border border-[#38bdf8]/30 rounded-3xl p-6 sm:p-8 relative overflow-hidden space-y-4 shadow-xl ${className}`}>
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#38bdf8]/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-tr from-[#38bdf8] to-[#22d3ee] text-slate-950 font-black shadow-lg">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold font-display text-white">Install HealthOrbit Progressive Web App</h3>
                <span className="text-[10px] font-mono font-bold bg-[#38bdf8]/20 border border-[#38bdf8]/30 text-[#38bdf8] px-2 py-0.5 rounded-full">
                  Offline Ready
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Install on your Desktop, Android, or iPhone for instant access, biometric launch, and full offline ledger capabilities.
              </p>
            </div>
          </div>
          <button
            onClick={handleInstallClick}
            type="button"
            className="w-full bg-gradient-to-r from-[#38bdf8] to-[#22d3ee] hover:opacity-95 text-slate-950 font-bold text-xs py-3 px-5 rounded-2xl transition hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#38bdf8]/20"
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
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#38bdf8]/15 hover:bg-[#38bdf8]/25 text-[#38bdf8] border border-[#38bdf8]/30 transition-all cursor-pointer ${className}`}
        >
          <Download className="w-4 h-4 text-[#38bdf8]" />
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
