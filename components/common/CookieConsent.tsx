'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
};

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always required
    analytics: false,
    marketing: false,
    preferences: false,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Force show the consent banner for testing
    // Comment this out in production
    setShowConsent(true);
    
    try {
      // Check if user has already consented
      const consent = localStorage.getItem('cookieConsent');
      if (!consent) {
        setShowConsent(true);
      } else {
        try {
          const savedPreferences = JSON.parse(consent);
          setPreferences(savedPreferences);
        } catch {
          // If parsing fails, show consent again
          setShowConsent(true);
        }
      }
    } catch (error) {
      // Handle case where localStorage is not available
      console.error('Error accessing localStorage:', error);
      setShowConsent(true);
    }
  }, []);

  // Don't render anything during SSR
  if (!mounted) return null;

  const acceptAll = () => {
    try {
      const allAccepted = {
        necessary: true,
        analytics: true,
        marketing: true,
        preferences: true,
      };
      localStorage.setItem('cookieConsent', JSON.stringify(allAccepted));
      setPreferences(allAccepted);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
    setShowConsent(false);
  };

  const acceptNecessary = () => {
    try {
      const necessaryOnly = {
        necessary: true,
        analytics: false,
        marketing: false,
        preferences: false,
      };
      localStorage.setItem('cookieConsent', JSON.stringify(necessaryOnly));
      setPreferences(necessaryOnly);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
    setShowConsent(false);
  };

  const savePreferences = () => {
    try {
      localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
    setShowConsent(false);
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return; // Cannot toggle necessary cookies
    setPreferences({
      ...preferences,
      [key]: !preferences[key],
    });
  };

  if (!showConsent) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-40" />
      
      {/* Cookie Consent Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gray-900 border-t border-gray-800">
        <div className="container mx-auto max-w-7xl">
          {!showDetails ? (
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">Cookie Settings</h3>
                <p className="text-gray-300 text-sm">
                  We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking &quot;Accept All&quot;, you consent to our use of cookies.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
                <button
                  onClick={() => setShowDetails(true)}
                  className="px-4 py-2 text-sm font-medium text-white bg-transparent hover:bg-gray-800 border border-gray-700 rounded-md transition-colors"
                >
                  Customize
                </button>
                <button
                  onClick={acceptNecessary}
                  className="px-4 py-2 text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                >
                  Necessary Only
                </button>
                <button
                  onClick={acceptAll}
                  className="px-4 py-2 text-sm font-medium text-white bg-teal-600 hover:bg-teal-500 rounded-md transition-colors"
                >
                  Accept All
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-white">Cookie Preferences</h3>
                <button 
                  onClick={() => setShowDetails(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                {/* Necessary Cookies */}
                <div className="p-4 border border-gray-800 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-white font-medium">Necessary Cookies</h4>
                      <p className="text-gray-400 text-sm mt-1">These cookies are required for the website to function properly.</p>
                    </div>
                    <div className="bg-gray-700 px-3 py-1 rounded text-xs text-white">Required</div>
                  </div>
                </div>
                
                {/* Analytics Cookies */}
                <div className="p-4 border border-gray-800 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-white font-medium">Analytics Cookies</h4>
                      <p className="text-gray-400 text-sm mt-1">These cookies help us understand how visitors interact with our website.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={preferences.analytics}
                        onChange={() => togglePreference('analytics')}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                    </label>
                  </div>
                </div>
                
                {/* Marketing Cookies */}
                <div className="p-4 border border-gray-800 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-white font-medium">Marketing Cookies</h4>
                      <p className="text-gray-400 text-sm mt-1">These cookies are used to track visitors across websites to display relevant advertisements.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={preferences.marketing}
                        onChange={() => togglePreference('marketing')}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                    </label>
                  </div>
                </div>
                
                {/* Preferences Cookies */}
                <div className="p-4 border border-gray-800 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-white font-medium">Preferences Cookies</h4>
                      <p className="text-gray-400 text-sm mt-1">These cookies enable personalized features and functionality.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={preferences.preferences}
                        onChange={() => togglePreference('preferences')}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDetails(false)}
                  className="px-4 py-2 text-sm font-medium text-white bg-transparent hover:bg-gray-800 border border-gray-700 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={savePreferences}
                  className="px-4 py-2 text-sm font-medium text-white bg-teal-600 hover:bg-teal-500 rounded-md transition-colors"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
} 