import { useEffect } from 'react';
import { SITE_CONFIG } from '../config/site';

interface AdSlotProps {
  slotId?: string;
  className?: string;
  format?: 'auto' | 'horizontal' | 'rectangle';
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function AdSlot({ slotId, className = '', format = 'auto' }: AdSlotProps) {
  // If ads are disabled or clientId is empty, render nothing at all (clean UX, no empty boxes)
  if (!SITE_CONFIG.ads.enabled || !SITE_CONFIG.ads.clientId) {
    return null;
  }

  const effectiveSlotId = slotId || SITE_CONFIG.ads.slots.homepageBanner;

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && effectiveSlotId) {
        // Load AdSense script once if not already present
        if (!document.getElementById('adsense-script')) {
          const script = document.createElement('script');
          script.id = 'adsense-script';
          script.async = true;
          script.crossOrigin = 'anonymous';
          script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${SITE_CONFIG.ads.clientId}`;
          document.head.appendChild(script);
        }

        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.warn('AdSense initialization error:', e);
    }
  }, [effectiveSlotId]);

  return (
    <div className={`my-8 text-center overflow-hidden ${className}`}>
      <span className="block text-[11px] text-slate-400 font-medium mb-1">إعلان</span>
      <ins
        className="adsbygoogle block"
        style={{ display: 'block' }}
        data-ad-client={SITE_CONFIG.ads.clientId}
        data-ad-slot={effectiveSlotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
