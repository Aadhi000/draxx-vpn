import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, Check } from "lucide-react";

export default function PWAInstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    
    setDeferredPrompt(null);
  };

  if (isInstalled) {
    return (
      <Button disabled className="w-full bg-green-500 hover:bg-green-600 text-white">
        <Check className="w-4 h-4 mr-2" />
        App Installed
      </Button>
    );
  }

  if (!deferredPrompt) {
    return (
      <Button disabled className="w-full" variant="outline">
        <Download className="w-4 h-4 mr-2" />
        Install App (Not Available)
      </Button>
    );
  }

  return (
    <Button onClick={handleInstallClick} className="w-full bg-blue-500 hover:bg-blue-600 text-white">
      <Download className="w-4 h-4 mr-2" />
      Install App
    </Button>
  );
}
