import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Smartphone, Share, PlusSquare, Download, CheckCircle2, Monitor, Sparkles } from 'lucide-react';

interface PWAInstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isIOS?: boolean;
}

export default function PWAInstructionsModal({ isOpen, onClose, isIOS = false }: PWAInstructionsModalProps) {
  const [activeTab, setActiveTab] = useState<'ios' | 'android'>(isIOS ? 'ios' : 'android');

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/30 backdrop-blur-xs">
          <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-white border border-[#E5E5E7] rounded-3xl p-6 sm:p-8 text-[#1D1D1F] shadow-xl overflow-hidden space-y-6"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl overflow-hidden shadow-md shrink-0 border border-[#E5E5E7]">
                <img src="/pwa-192x192.png" alt="HealthOrbit App Icon" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-[#1D1D1F]">Install HealthOrbit App</h3>
                  <span className="text-[10px] font-mono bg-[#F5F5F7] border border-[#E5E5E7] text-[#1D1D1F] px-2 py-0.5 rounded-full font-medium">
                    PWA
                  </span>
                </div>
                <p className="text-xs text-[#6E6E73] mt-0.5 font-normal">
                  Access clinical records offline with native app speed on your device home screen.
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#86868B] hover:text-[#1D1D1F] hover:bg-[#F5F5F7] rounded-full transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Device Tabs */}
          <div className="grid grid-cols-2 p-1 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl font-mono text-xs relative z-10">
            <button
              onClick={() => setActiveTab('ios')}
              className={`py-2 px-3 rounded-xl font-medium flex items-center justify-center gap-2 transition cursor-pointer ${
                activeTab === 'ios'
                  ? 'bg-[#1D1D1F] text-white shadow-xs'
                  : 'text-[#6E6E73] hover:text-[#1D1D1F]'
              }`}
            >
              <Smartphone className="w-4 h-4" /> iPhone / iPad
            </button>
            <button
              onClick={() => setActiveTab('android')}
              className={`py-2 px-3 rounded-xl font-medium flex items-center justify-center gap-2 transition cursor-pointer ${
                activeTab === 'android'
                  ? 'bg-[#1D1D1F] text-white shadow-xs'
                  : 'text-[#6E6E73] hover:text-[#1D1D1F]'
              }`}
            >
              <Monitor className="w-4 h-4" /> Android / Desktop
            </button>
          </div>

          {/* Tab Content Instructions */}
          <div className="relative z-10 space-y-4">
            {activeTab === 'ios' ? (
              <div className="space-y-3 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl p-4 sm:p-5">
                <div className="text-xs font-semibold text-[#1D1D1F]">To install HealthOrbit on iPhone or iPad:</div>

                <div className="flex items-start gap-3.5">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white border border-[#E5E5E7] text-[#1D1D1F] font-mono text-xs font-bold shrink-0">
                    1
                  </div>
                  <div className="text-xs text-[#6E6E73] leading-relaxed pt-0.5">
                    Tap the <span className="font-semibold text-[#1D1D1F] bg-white px-2 py-0.5 rounded border border-[#E5E5E7] inline-flex items-center gap-1 mx-1"><Share className="w-3.5 h-3.5 text-[#0071E3]" /> Share</span> button in Safari at the bottom or top of your screen.
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white border border-[#E5E5E7] text-[#1D1D1F] font-mono text-xs font-bold shrink-0">
                    2
                  </div>
                  <div className="text-xs text-[#6E6E73] leading-relaxed pt-0.5">
                    Scroll down the options menu and tap <span className="font-semibold text-[#1D1D1F] bg-white px-2 py-0.5 rounded border border-[#E5E5E7] inline-flex items-center gap-1 mx-1"><PlusSquare className="w-3.5 h-3.5 text-emerald-600" /> Add to Home Screen</span>.
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white border border-[#E5E5E7] text-[#1D1D1F] font-mono text-xs font-bold shrink-0">
                    3
                  </div>
                  <div className="text-xs text-[#6E6E73] leading-relaxed pt-0.5">
                    Tap <span className="font-semibold text-[#1D1D1F] bg-white px-2 py-0.5 rounded border border-[#E5E5E7] mx-1">Add</span> in the top right corner. HealthOrbit will appear as a standalone app on your home screen!
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl p-4 sm:p-5">
                <div className="text-xs font-semibold text-[#1D1D1F]">To install HealthOrbit on Chrome, Edge, or Android:</div>

                <div className="flex items-start gap-3.5">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white border border-[#E5E5E7] text-[#1D1D1F] font-mono text-xs font-bold shrink-0">
                    1
                  </div>
                  <div className="text-xs text-[#6E6E73] leading-relaxed pt-0.5">
                    Open your browser menu <span className="font-semibold text-[#1D1D1F] bg-white px-2 py-0.5 rounded border border-[#E5E5E7] mx-1">⋮ or ⋯</span> in the top right or click the <Download className="w-3.5 h-3.5 text-[#0071E3] inline mx-1" /> icon in the address bar.
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white border border-[#E5E5E7] text-[#1D1D1F] font-mono text-xs font-bold shrink-0">
                    2
                  </div>
                  <div className="text-xs text-[#6E6E73] leading-relaxed pt-0.5">
                    Select <span className="font-semibold text-[#1D1D1F] bg-white px-2 py-0.5 rounded border border-[#E5E5E7] inline-flex items-center gap-1 mx-1"><Smartphone className="w-3.5 h-3.5 text-[#0071E3]" /> Install HealthOrbit</span> or <span className="font-semibold text-[#1D1D1F] bg-white px-2 py-0.5 rounded border border-[#E5E5E7] mx-1">Add to Home screen</span>.
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white border border-[#E5E5E7] text-[#1D1D1F] font-mono text-xs font-bold shrink-0">
                    3
                  </div>
                  <div className="text-xs text-[#6E6E73] leading-relaxed pt-0.5">
                    Click <span className="font-semibold text-[#1D1D1F] bg-white px-2 py-0.5 rounded border border-[#E5E5E7] mx-1">Install</span> to add HealthOrbit to your desktop or mobile app launcher.
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-2 gap-2 text-[11px] font-medium text-[#6E6E73] relative z-10 pt-1">
            <div className="flex items-center gap-2 bg-[#F5F5F7] border border-[#E5E5E7] p-2.5 rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Full Offline Record Access</span>
            </div>
            <div className="flex items-center gap-2 bg-[#F5F5F7] border border-[#E5E5E7] p-2.5 rounded-xl">
              <Sparkles className="w-4 h-4 text-[#0071E3] shrink-0" />
              <span>Instant Launch Speed</span>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-2 relative z-10">
            <button
              onClick={onClose}
              className="w-full bg-[#1D1D1F] hover:bg-black text-white font-semibold text-xs py-3 px-4 rounded-full shadow-xs transition active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer font-mono uppercase tracking-wider"
            >
              <CheckCircle2 className="w-4 h-4" /> Got It
            </button>
          </div>
        </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
