'use client';

import { useState } from 'react';
import CookieConsentLib from 'react-cookie-consent';
import { X, Cookie } from 'lucide-react';
import { 
  saveCookiePreferences, 
  clearNonNecessaryCookies,
  type CookiePreferences 
} from '@/lib/cookie-manager';

export default function CookieConsent() {
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always required
    analytics: false,
    marketing: false,
    preferences: false,
  });

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    saveCookiePreferences(allAccepted);
    setPreferences(allAccepted);
  };

  const handleDecline = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };
    saveCookiePreferences(necessaryOnly);
    clearNonNecessaryCookies(necessaryOnly);
    setPreferences(necessaryOnly);
  };

  const handleSavePreferences = () => {
    saveCookiePreferences(preferences);
    clearNonNecessaryCookies(preferences);
    setShowDetails(false);
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return; // Cannot toggle necessary cookies
    setPreferences({
      ...preferences,
      [key]: !preferences[key],
    });
  };

  return (
    <>
      <CookieConsentLib
        location="bottom"
        buttonText="Accept All"
        declineButtonText="Decline"
        enableDeclineButton
        onAccept={handleAcceptAll}
        onDecline={handleDecline}
        cookieName="invitris-cookie-consent"
        style={{
          background: '#111827',
          borderTop: '1px solid #1f2937',
          padding: '20px',
          alignItems: 'center',
        }}
        buttonStyle={{
          background: '#0d9488',
          color: 'white',
          fontSize: '14px',
          fontWeight: '500',
          borderRadius: '6px',
          padding: '10px 24px',
          cursor: 'pointer',
          transition: 'background 0.2s',
        }}
        declineButtonStyle={{
          background: '#374151',
          color: 'white',
          fontSize: '14px',
          fontWeight: '500',
          borderRadius: '6px',
          padding: '10px 24px',
          cursor: 'pointer',
          transition: 'background 0.2s',
          marginRight: '12px',
        }}
        containerClasses="cookie-consent-container"
        contentClasses="cookie-consent-content"
        buttonClasses="cookie-accept-button"
        declineButtonClasses="cookie-decline-button"
        expires={365}
        overlay
        overlayStyle={{
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 40,
        }}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 max-w-7xl mx-auto">
          <div className="flex items-start gap-3 flex-1">
            <Cookie className="h-6 w-6 text-teal-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Cookie Settings</h3>
              <p className="text-gray-300 text-sm">
                We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                By clicking &quot;Accept All&quot;, you consent to our use of cookies.{' '}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowDetails(true);
                  }}
                  className="text-teal-400 hover:text-teal-300 underline"
                >
                  Customize settings
                </button>
              </p>
            </div>
          </div>
        </div>
      </CookieConsentLib>

      {/* Custom Preferences Modal */}
      {showDetails && (
        <>
          <div 
            className="fixed inset-0 bg-black/60 z-50" 
            onClick={() => setShowDetails(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-lg border border-gray-800 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 space-y-6">
                <div className="flex justify-between items-center border-b border-gray-800 pb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white">Cookie Preferences</h3>
                    <p className="text-gray-400 text-sm mt-1">
                      Manage your cookie preferences and privacy settings
                    </p>
                  </div>
                  <button 
                    onClick={() => setShowDetails(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  {/* Necessary Cookies */}
                  <div className="p-5 border border-gray-800 rounded-lg bg-gray-800/30">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="text-white font-semibold text-lg mb-1">Necessary Cookies</h4>
                        <p className="text-gray-400 text-sm">
                          These cookies are essential for the website to function properly. They enable basic functions like page navigation and access to secure areas.
                        </p>
                      </div>
                      <div className="bg-gray-700 px-3 py-1 rounded text-xs text-white font-medium ml-4">
                        Always Active
                      </div>
                    </div>
                  </div>
                  
                  {/* Analytics Cookies */}
                  <div className="p-5 border border-gray-800 rounded-lg hover:border-gray-700 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="text-white font-semibold text-lg mb-1">Analytics Cookies</h4>
                        <p className="text-gray-400 text-sm">
                          These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer ml-4">
                        <input 
                          type="checkbox" 
                          checked={preferences.analytics}
                          onChange={() => togglePreference('analytics')}
                          className="sr-only peer" 
                        />
                        <div className="w-12 h-7 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-teal-600 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:start-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                      </label>
                    </div>
                  </div>
                  
                  {/* Marketing Cookies */}
                  <div className="p-5 border border-gray-800 rounded-lg hover:border-gray-700 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="text-white font-semibold text-lg mb-1">Marketing Cookies</h4>
                        <p className="text-gray-400 text-sm">
                          These cookies are used to track visitors across websites to display relevant advertisements and measure campaign effectiveness.
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer ml-4">
                        <input 
                          type="checkbox" 
                          checked={preferences.marketing}
                          onChange={() => togglePreference('marketing')}
                          className="sr-only peer" 
                        />
                        <div className="w-12 h-7 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-teal-600 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:start-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                      </label>
                    </div>
                  </div>
                  
                  {/* Preferences Cookies */}
                  <div className="p-5 border border-gray-800 rounded-lg hover:border-gray-700 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="text-white font-semibold text-lg mb-1">Preferences Cookies</h4>
                        <p className="text-gray-400 text-sm">
                          These cookies enable personalized features and remember your preferences such as language settings or region.
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer ml-4">
                        <input 
                          type="checkbox" 
                          checked={preferences.preferences}
                          onChange={() => togglePreference('preferences')}
                          className="sr-only peer" 
                        />
                        <div className="w-12 h-7 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-teal-600 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:start-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-800">
                  <button
                    onClick={() => setShowDetails(false)}
                    className="px-6 py-2.5 text-sm font-medium text-white bg-transparent hover:bg-gray-800 border border-gray-700 rounded-md transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSavePreferences}
                    className="px-6 py-2.5 text-sm font-medium text-white bg-teal-600 hover:bg-teal-500 rounded-md transition-colors"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
} 