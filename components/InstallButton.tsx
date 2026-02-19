
import React, { useState, useEffect } from 'react';

const InstallButton: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      // Prevent browser's default install bar
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
      setIsVisible(false);
    }
    setDeferredPrompt(null);
  };

  if (!isVisible) return null;

  return (
    <button 
      onClick={handleInstall}
      className="text-xs font-black text-[#1a8a3d] bg-[#eefcf2] border-2 border-[#1a8a3d]/30 px-3 py-1.5 rounded-xl hover:bg-[#1a8a3d] hover:text-white transition-all active:scale-95 flex items-center gap-1.5 shadow-sm"
    >
      <span className="text-sm">📲</span> অ্যাপ ইনস্টল করুন
    </button>
  );
};

export default InstallButton;
