'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { getCookiePreferences } from '@/lib/cookie-manager';

// Add your Google Analytics tracking ID here
const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

export default function Analytics() {
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check initial preferences
    const preferences = getCookiePreferences();
    setAnalyticsEnabled(preferences.analytics);

    // Listen for preference changes
    const handlePreferenceChange = (event: CustomEvent) => {
      const newPreferences = event.detail;
      setAnalyticsEnabled(newPreferences.analytics);
      
      // If analytics is disabled, clear existing data
      if (!newPreferences.analytics && window.gtag) {
        // Disable Google Analytics
        window.gtag('consent', 'update', {
          analytics_storage: 'denied'
        });
      } else if (newPreferences.analytics && window.gtag) {
        // Enable Google Analytics
        window.gtag('consent', 'update', {
          analytics_storage: 'granted'
        });
      }
    };

    window.addEventListener('cookiePreferencesChanged', handlePreferenceChange as EventListener);

    return () => {
      window.removeEventListener('cookiePreferencesChanged', handlePreferenceChange as EventListener);
    };
  }, []);

  // Don't render during SSR
  if (!mounted) return null;

  // Don't load analytics if user hasn't consented
  if (!analyticsEnabled || !GA_TRACKING_ID) return null;

  return (
    <>
      {/* Google Analytics */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          
          // Initialize with consent state
          gtag('consent', 'default', {
            analytics_storage: 'granted',
            ad_storage: 'denied'
          });
          
          gtag('config', '${GA_TRACKING_ID}', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
      </Script>
    </>
  );
}

// Utility functions for tracking events (only if analytics is enabled)
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  const preferences = getCookiePreferences();
  
  if (!preferences.analytics || !window.gtag) return;
  
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

export const trackPageView = (url: string, title?: string) => {
  const preferences = getCookiePreferences();
  
  if (!preferences.analytics || !window.gtag) return;
  
  window.gtag('config', GA_TRACKING_ID, {
    page_title: title || document.title,
    page_location: url,
  });
}; 