export type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
};

export const defaultPreferences: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  preferences: false,
};

/**
 * Get current cookie preferences from localStorage
 */
export const getCookiePreferences = (): CookiePreferences => {
  if (typeof window === 'undefined') {
    return defaultPreferences;
  }

  try {
    const stored = localStorage.getItem('cookieConsent');
    if (!stored) {
      return defaultPreferences;
    }
    
    const parsed = JSON.parse(stored);
    return {
      necessary: true, // Always true
      analytics: !!parsed.analytics,
      marketing: !!parsed.marketing,
      preferences: !!parsed.preferences,
    };
  } catch (error) {
    console.error('Error reading cookie preferences:', error);
    return defaultPreferences;
  }
};

/**
 * Save cookie preferences to localStorage
 */
export const saveCookiePreferences = (preferences: CookiePreferences): void => {
  if (typeof window === 'undefined') return;

  try {
    const toSave = {
      ...preferences,
      necessary: true, // Always true
    };
    localStorage.setItem('cookieConsent', JSON.stringify(toSave));
    
    // Trigger custom event for components to react to preference changes
    window.dispatchEvent(new CustomEvent('cookiePreferencesChanged', {
      detail: toSave
    }));
  } catch (error) {
    console.error('Error saving cookie preferences:', error);
  }
};

/**
 * Clear all non-necessary cookies when consent is withdrawn
 */
export const clearNonNecessaryCookies = (preferences: CookiePreferences): void => {
  if (typeof window === 'undefined') return;

  // Clear analytics cookies if analytics is disabled
  if (!preferences.analytics) {
    // Clear Google Analytics cookies
    document.cookie.split(";").forEach((cookie) => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
      
      if (name.startsWith('_ga') || name.startsWith('_gid') || name.startsWith('_gat')) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${window.location.hostname}`;
      }
    });
  }

  // Clear marketing cookies if marketing is disabled
  if (!preferences.marketing) {
    // Clear Facebook Pixel and other marketing cookies
    document.cookie.split(";").forEach((cookie) => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
      
      if (name.startsWith('_fbp') || name.startsWith('_fbc') || name.startsWith('fr')) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${window.location.hostname}`;
      }
    });
  }

  // Clear preference cookies if preferences is disabled
  if (!preferences.preferences) {
    // Clear theme, language, and other preference cookies
    document.cookie.split(";").forEach((cookie) => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
      
      if (name.includes('theme') || name.includes('lang') || name.includes('pref')) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${window.location.hostname}`;
      }
    });
  }
};

/**
 * Check if a specific cookie type is allowed
 */
export const isCookieTypeAllowed = (type: keyof CookiePreferences): boolean => {
  const preferences = getCookiePreferences();
  return preferences[type];
}; 