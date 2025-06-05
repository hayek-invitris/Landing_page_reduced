'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { getCookiePreferences } from '@/lib/cookie-manager';

// Add your Facebook Pixel ID here
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || '';

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
    _fbq: (...args: unknown[]) => void;
  }
}

export default function Marketing() {
  const [marketingEnabled, setMarketingEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check initial preferences
    const preferences = getCookiePreferences();
    setMarketingEnabled(preferences.marketing);

    // Listen for preference changes
    const handlePreferenceChange = (event: CustomEvent) => {
      const newPreferences = event.detail;
      setMarketingEnabled(newPreferences.marketing);
      
      // If marketing is disabled, clear existing data
      if (!newPreferences.marketing && window.fbq) {
        // Disable Facebook Pixel
        window.fbq('consent', 'revoke');
      } else if (newPreferences.marketing && window.fbq) {
        // Enable Facebook Pixel
        window.fbq('consent', 'grant');
      }
    };

    window.addEventListener('cookiePreferencesChanged', handlePreferenceChange as EventListener);

    return () => {
      window.removeEventListener('cookiePreferencesChanged', handlePreferenceChange as EventListener);
    };
  }, []);

  // Don't render during SSR
  if (!mounted) return null;

  // Don't load marketing scripts if user hasn't consented
  if (!marketingEnabled || !FB_PIXEL_ID) return null;

  return (
    <>
      {/* Facebook Pixel */}
      <Script id="facebook-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          
          fbq('init', '${FB_PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>
      
      {/* Add other marketing scripts here */}
      
      {/* Example: Google Ads */}
      {/* 
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-CONVERSION_ID"
        strategy="afterInteractive"
      />
      <Script id="google-ads" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-CONVERSION_ID');
        `}
      </Script>
      */}
    </>
  );
}

// Utility functions for tracking marketing events
export const trackFacebookEvent = (eventName: string, parameters?: Record<string, unknown>) => {
  const preferences = getCookiePreferences();
  
  if (!preferences.marketing || !window.fbq) return;
  
  if (parameters) {
    window.fbq('track', eventName, parameters);
  } else {
    window.fbq('track', eventName);
  }
};

export const trackConversion = (conversionId: string, conversionValue?: number) => {
  const preferences = getCookiePreferences();
  
  if (!preferences.marketing || !window.gtag) return;
  
  window.gtag('event', 'conversion', {
    send_to: conversionId,
    value: conversionValue,
  });
}; 