import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Smartphone, Share, PlusSquare, Download, CheckCircle2, Globe, Monitor, ArrowRight, Sparkles } from 'lucide-react';

interface PWAInstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isIOS?: boolean;
}

export default function PWAInstructionsModal({ isOpen, onClose, isIOS = false }: PWAInstructionsModalProps) {
  const [activeTab, setActiveTab] = useState<'ios' | 'android'>(isIOS ? 'ios' : 'android');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-[#0c1425] border border-[#38bdf8]/30 rounded-3xl p-6 sm:p-8 text-white shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden space-y-6"
        >
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#38bdf8]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="flex items-start justify-between gap-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-[#38bdf8] to-[#22d3ee] flex items-center justify-center text-slate-950 shadow-lg shrink-0">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold font-display text-white">Install HealthOrbit App</h3>
                  <span className="text-[10px] font-mono font-bold bg-[#38bdf8]/15 border border-[#38bdf8]/30 text-[#38bdf8] px-2 py-0.5 rounded-full">
                    PWA
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  Access clinical records offline with native app speed on your device home screen.
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Device Tabs */}
          <div className="grid grid-cols-2 p-1 bg-slate-900/80 border border-white/10 rounded-2xl font-mono text-xs relative z-10">
            <button
              onClick={() => setActiveTab('ios')}
              className={`py-2 px-3 rounded-xl font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
                activeTab === 'ios'
                  ? 'bg-gradient-to-r from-[#38bdf8] to-[#22d3ee] text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-4 h-4" /> iPhone / iPad
            </button>
            <button
              onClick={() => setActiveTab('android')}
              className={`py-2 px-3 rounded-xl font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
                activeTab === 'android'
                  ? 'bg-gradient-to-r from-[#38bdf8] to-[#22d3ee] text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Monitor className="w-4 h-4" /> Android / Desktop
            </button>
          </div>

          {/* Tab Content Instructions */}
          <div className="relative z-10 space-y-4">
            {activeTab === 'ios' ? (
              <div className="space-y-3 bg-slate-900/60 border border-white/5 rounded-2xl p-4 sm:p-5">
                <div className="text-xs font-semibold text-slate-300">To install HealthOrbit on iPhone or iPad:</div>

                <div className="flex items-start gap-3.5">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-[#38bdf8]/20 border border-[#38bdf8]/40 text-[#38bdf8] font-mono text-xs font-bold shrink-0">
                    1
                  </div>
                  <div className="text-xs text-slate-300 leading-relaxed pt-0.5">
                    Tap the <span className="font-bold text-white bg-slate-800 px-2 py-0.5 rounded border border-white/10 inline-flex items-center gap-1 mx-1"><Share className="w-3.5 h-3.5 text-[#38bdf8]" /> Share</span> button in Safari at the bottom or top of your screen.
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-[#38bdf8]/20 border border-[#38bdf8]/40 text-[#38bdf8] font-mono text-xs font-bold shrink-0">
                    2
                  </div>
                  <div className="text-xs text-slate-300 leading-relaxed pt-0.5">
                    Scroll down the options menu and tap <span className="font-bold text-white bg-slate-800 px-2 py-0.5 rounded border border-white/10 inline-flex items-center gap-1 mx-1"><PlusSquare className="w-3.5 h-3.5 text-emerald-400" /> Add to Home Screen</span>.
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-[#38bdf8]/20 border border-[#38bdf8]/40 text-[#38bdf8] font-mono text-xs font-bold shrink-0">
                    3
                  </div>
                  <div className="text-xs text-slate-300 leading-relaxed pt-0.5">
                    Tap <span className="font-bold text-white bg-slate-800 px-2 py-0.5 rounded border border-white/10 mx-1">Add</span> in the top right corner. HealthOrbit will appear as a standalone app on your home screen!
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3 bg-slate-900/60 border border-white/5 rounded-2xl p-4 sm:p-5">
                <div className="text-xs font-semibold text-slate-300">To install HealthOrbit on Chrome, Edge, or Android:</div>

                <div className="flex items-start gap-3.5">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-[#38bdf8]/20 border border-[#38bdf8]/40 text-[#38bdf8] font-mono text-xs font-bold shrink-0">
                    1
                  </div>
                  <div className="text-xs text-slate-300 leading-relaxed pt-0.5">
                    Open your browser menu <span className="font-bold text-white bg-slate-800 px-2 py-0.5 rounded border border-white/10 mx-1">⋮ or ⋯</span> in the top right or click the <Download className="w-3.5 h-3.5 text-[#38bdf8] inline mx-1" /> icon in the address bar.
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-[#38bdf8]/20 border border-[#38bdf8]/40 text-[#38bdf8] font-mono text-xs font-bold shrink-0">
                    2
                  </div>
                  <div className="text-xs text-slate-300 leading-relaxed pt-0.5">
                    Select <span className="font-bold text-white bg-slate-800 px-2 py-0.5 rounded border border-white/10 inline-flex items-center gap-1 mx-1"><Smartphone className="w-3.5 h-3.5 text-[#38bdf8]" /> Install HealthOrbit</span> or <span className="font-bold text-white bg-slate-800 px-2 py-0.5 rounded border border-white/10 mx-1">Add to Home screen</span>.
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-[#38bdf8]/20 border border-[#38bdf8]/40 text-[#38bdf8] font-mono text-xs font-bold shrink-0">
                    3
                  </div>
                  <div className="text-xs text-slate-300 leading-relaxed pt-0.5">
                    Click <span className="font-bold text-white bg-slate-800 px-2 py-0.5 rounded border border-white/10 mx-1">Install</span> to add HealthOrbit to your desktop or mobile app launcher.
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-2 gap-2 text-[11px] font-medium text-slate-400 relative z-10 pt-1">
            <div className="flex items-center gap-2 bg-white/5 border border-white/5 p-2.5 rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Full Offline Clinical Record Access</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 border border-white/5 p-2.5 rounded-xl">
              <Sparkles className="w-4 h-4 text-[#38bdf8] shrink-0" />
              <span>Instant Launch & Zero Browser Address Bar</span>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-2 relative z-10">
            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-[#38bdf8] to-[#22d3ee] hover:opacity-95 text-slate-950 font-bold text-xs py-3 px-4 rounded-xl shadow-lg transition hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer font-mono uppercase tracking-wider"
            >
              <CheckCircle2 className="w-4 h-4" /> Got It
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
