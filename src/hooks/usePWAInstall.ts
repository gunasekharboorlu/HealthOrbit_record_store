import { useState, useEffect } from 'react';

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState<boolean>(false);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [isIOS, setIsIOS] = useState<boolean>(false);
  const [showInstructionsModal, setShowInstructionsModal] = useState<boolean>(false);

  useEffect(() => {
    // 1. Check standalone mode (PWA running as standalone app)
    const checkStandalone = () => {
      const standalone =
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true ||
        document.referrer.includes('android-app://');

      setIsStandalone(standalone);
      if (standalone) {
        setIsInstalled(true);
      }
    };

    checkStandalone();
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    const handleMediaChange = () => checkStandalone();
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaChange);
    } else {
      mediaQuery.addListener(handleMediaChange);
    }

    // 2. Detect iOS environment
    const userAgent = window.navigator.userAgent || '';
    const isIOSDevice = /iPhone|iPad|iPod/i.test(userAgent) && !(window as any).MSStream;
    setIsIOS(isIOSDevice);

    // 3. Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    // 4. Listen for appinstalled event
    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setIsInstalled(true);
      window.dispatchEvent(new CustomEvent('healthorbit-app-installed'));
      console.log('HealthOrbit PWA was installed successfully.');
    };

    // 5. Global sync custom event
    const handleCustomInstallSync = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('healthorbit-app-installed', handleCustomInstallSync);

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMediaChange);
      } else {
        mediaQuery.removeListener(handleMediaChange);
      }
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('healthorbit-app-installed', handleCustomInstallSync);
    };
  }, []);

  const triggerInstall = async () => {
    if (isStandalone || isInstalled) {
      return;
    }

    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
        if (choiceResult.outcome === 'accepted') {
          setIsInstalled(true);
          window.dispatchEvent(new CustomEvent('healthorbit-app-installed'));
        }
        setDeferredPrompt(null);
      } catch (err) {
        console.error('Error triggering PWA install prompt:', err);
      }
    } else {
      // Browser does not support native beforeinstallprompt (e.g. iOS Safari) or prompt unavailable
      setShowInstructionsModal(true);
    }
  };

  return {
    deferredPrompt,
    isStandalone,
    isInstalled,
    isIOS,
    canPromptNative: !!deferredPrompt,
    triggerInstall,
    showInstructionsModal,
    setShowInstructionsModal,
  };
}
