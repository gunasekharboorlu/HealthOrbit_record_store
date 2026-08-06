import React, { useState, useEffect } from 'react';
import { Download, RefreshCw, WifiOff, X, Smartphone, CheckCircle2 } from 'lucide-react';
import { useRegisterSW } from 'virtual:pwa-register/react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export default function PWAInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [showOnlineRestored, setShowOnlineRestored] = useState(false);

  // Register SW with auto update check
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      if (r) {
        setInterval(() => {
          r.update();
        }, 60 * 60 * 1000); // Check for updates hourly
      }
    },
    onRegisterError(error) {
      console.warn('SW registration failed:', error);
    },
  });

  useEffect(() => {
    // Check standalone mode
    const checkStandalone = () => {
      const isStandaloneMode = 
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true ||
        document.referrer.includes('android-app://');
      
      setIsStandalone(isStandaloneMode);
    };

    checkStandalone();
    window.matchMedia('(display-mode: standalone)').addEventListener('change', checkStandalone);

    // Listen for beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstallBanner(true);
    };

    // Listen for appinstalled
    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setShowInstallBanner(false);
    };

    // Listen for online/offline events
    const handleOffline = () => {
      setIsOffline(true);
      setShowOnlineRestored(false);
    };

    const handleOnline = () => {
      setIsOffline(false);
      setShowOnlineRestored(true);
      const timer = setTimeout(() => setShowOnlineRestored(false), 4000);
      return () => clearTimeout(timer);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    try {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setShowInstallBanner(false);
      }
      setDeferredPrompt(null);
    } catch (err) {
      console.error('Error during PWA prompt:', err);
    }
  };

  return (
    <>
      {/* 1. Offline Indicator Banner */}
      {isOffline && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-rose-50 border-b border-rose-200 text-rose-800 px-4 py-2.5 text-xs font-medium flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
              </span>
              <WifiOff className="w-4 h-4 text-rose-600 shrink-0" />
              <span>Offline Mode Active — Viewing cached HealthOrbit clinical ledger.</span>
            </div>
            <span className="font-mono text-[10px] bg-rose-100 border border-rose-200 px-2 py-0.5 rounded text-rose-800 font-medium">
              STANDBY
            </span>
          </div>
        </div>
      )}

      {/* 2. Connection Restored Banner */}
      {showOnlineRestored && !isOffline && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-emerald-50 border-b border-emerald-200 text-emerald-800 px-4 py-2.5 text-xs font-medium flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Internet Restored — HealthOrbit is re-synchronized with live server.</span>
            </div>
            <button 
              onClick={() => setShowOnlineRestored(false)}
              className="text-emerald-700 hover:text-emerald-900 transition"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* 3. Service Worker Update Available Banner */}
      {needRefresh && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md w-[calc(100vw-3rem)] bg-white border border-[#E5E5E7] rounded-2xl p-4 shadow-xl text-[#1D1D1F] space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-[#F5F5F7] border border-[#E5E5E7] flex items-center justify-center text-[#1D1D1F] shrink-0">
                <RefreshCw className="w-4 h-4 animate-spin text-[#1D1D1F]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#1D1D1F]">System Update Ready</h4>
                <p className="text-[11px] text-[#6E6E73]">A new version of HealthOrbit is available.</p>
              </div>
            </div>
            <button
              onClick={() => setNeedRefresh(false)}
              className="text-[#86868B] hover:text-[#1D1D1F] transition p-1"
              title="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => updateServiceWorker(true)}
              className="flex-1 bg-[#1D1D1F] hover:bg-black text-white font-medium text-xs py-2 px-3 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5 text-white" />
              Update Now
            </button>
            <button
              onClick={() => setNeedRefresh(false)}
              className="px-3 py-2 bg-[#F5F5F7] hover:bg-[#E8E8ED] text-[#1D1D1F] text-xs font-medium rounded-xl border border-[#E5E5E7] transition cursor-pointer"
            >
              Later
            </button>
          </div>
        </div>
      )}

      {/* 4. Install HealthOrbit App Prompt Banner */}
      {showInstallBanner && !isStandalone && deferredPrompt && (
        <div className="fixed bottom-6 left-6 z-50 max-w-md w-[calc(100vw-3rem)] bg-white border border-[#E5E5E7] rounded-2xl p-4.5 shadow-xl text-[#1D1D1F] space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-[#1D1D1F] text-white flex items-center justify-center font-bold shrink-0">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold text-[#1D1D1F]">Install HealthOrbit</h4>
                  <span className="text-[9px] font-mono bg-[#F5F5F7] border border-[#E5E5E7] text-[#1D1D1F] px-1.5 py-0.2 rounded">
                    PWA App
                  </span>
                </div>
                <p className="text-[11px] text-[#6E6E73] leading-snug font-normal">
                  Install for offline access, instant launch, and desktop & mobile support.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowInstallBanner(false)}
              className="text-[#86868B] hover:text-[#1D1D1F] transition p-1 shrink-0"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleInstallClick}
              className="flex-1 bg-[#1D1D1F] hover:bg-black text-white font-medium text-xs py-2.5 px-4 rounded-xl transition shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-white" />
              Install Application
            </button>
            <button
              onClick={() => setShowInstallBanner(false)}
              className="px-3.5 py-2.5 bg-[#F5F5F7] hover:bg-[#E8E8ED] text-[#1D1D1F] text-xs font-medium rounded-xl border border-[#E5E5E7] transition cursor-pointer"
            >
              Not Now
            </button>
          </div>
        </div>
      )}
    </>
  );
}
