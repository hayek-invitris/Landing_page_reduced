'use client';

import { useEffect, useState } from 'react';
import { getCookiePreferences } from '@/lib/cookie-manager';

// Example preferences that might be stored as cookies
interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  fontSize: 'small' | 'medium' | 'large';
  notifications: boolean;
}

const defaultUserPreferences: UserPreferences = {
  theme: 'system',
  language: 'en',
  fontSize: 'medium',
  notifications: false,
};

export default function PreferencesManager() {
  const [userPreferences, setUserPreferences] = useState<UserPreferences>(defaultUserPreferences);
  const [preferencesEnabled, setPreferencesEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check initial cookie preferences
    const cookiePreferences = getCookiePreferences();
    setPreferencesEnabled(cookiePreferences.preferences);

    // Load user preferences if allowed
    if (cookiePreferences.preferences) {
      loadUserPreferences();
    }

    // Listen for cookie preference changes
    const handlePreferenceChange = (event: CustomEvent) => {
      const newCookiePreferences = event.detail;
      setPreferencesEnabled(newCookiePreferences.preferences);
      
      if (!newCookiePreferences.preferences) {
        // Clear preferences and reset to defaults
        clearUserPreferences();
        setUserPreferences(defaultUserPreferences);
      } else {
        // Load preferences when enabled
        loadUserPreferences();
      }
    };

    window.addEventListener('cookiePreferencesChanged', handlePreferenceChange as EventListener);

    return () => {
      window.removeEventListener('cookiePreferencesChanged', handlePreferenceChange as EventListener);
    };
  }, []);

  const loadUserPreferences = () => {
    try {
      const stored = localStorage.getItem('userPreferences');
      if (stored) {
        const parsed = JSON.parse(stored);
        setUserPreferences({ ...defaultUserPreferences, ...parsed });
      }
    } catch (error) {
      console.error('Error loading user preferences:', error);
    }
  };

  // Function available but not used in this component - used via hook
  // const saveUserPreferences = (newPreferences: Partial<UserPreferences>) => {
  //   if (!preferencesEnabled) return;
  //   try {
  //     const updated = { ...userPreferences, ...newPreferences };
  //     localStorage.setItem('userPreferences', JSON.stringify(updated));
  //     setUserPreferences(updated);
  //     applyPreferences(updated);
  //   } catch (error) {
  //     console.error('Error saving user preferences:', error);
  //   }
  // };

  const clearUserPreferences = () => {
    try {
      localStorage.removeItem('userPreferences');
      // Remove any preference-related cookies
      document.cookie = 'theme=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
      document.cookie = 'language=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
      document.cookie = 'fontSize=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
    } catch (error) {
      console.error('Error clearing user preferences:', error);
    }
  };

  const applyPreferences = (preferences: UserPreferences) => {
    // Apply theme
    if (preferences.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (preferences.theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      // System theme
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }

    // Apply language (you might want to use next-i18next or similar)
    document.documentElement.lang = preferences.language;

    // Apply font size
    document.documentElement.setAttribute('data-font-size', preferences.fontSize);
  };

  // Apply preferences when they change
  useEffect(() => {
    if (mounted && preferencesEnabled) {
      applyPreferences(userPreferences);
    }
  }, [userPreferences, preferencesEnabled, mounted]);

  // Don't render anything during SSR
  if (!mounted) return null;

  // This component doesn't render UI, it just manages preferences
  return null;
}

// Hook for using preferences in other components
export const useUserPreferences = () => {
  const [userPreferences, setUserPreferences] = useState<UserPreferences>(defaultUserPreferences);
  const [preferencesEnabled, setPreferencesEnabled] = useState(false);

  useEffect(() => {
    const cookiePreferences = getCookiePreferences();
    setPreferencesEnabled(cookiePreferences.preferences);

    if (cookiePreferences.preferences) {
      try {
        const stored = localStorage.getItem('userPreferences');
        if (stored) {
          const parsed = JSON.parse(stored);
          setUserPreferences({ ...defaultUserPreferences, ...parsed });
        }
      } catch (error) {
        console.error('Error loading user preferences:', error);
      }
    }

    const handlePreferenceChange = (event: CustomEvent) => {
      const newCookiePreferences = event.detail;
      setPreferencesEnabled(newCookiePreferences.preferences);
      
      if (!newCookiePreferences.preferences) {
        setUserPreferences(defaultUserPreferences);
      }
    };

    window.addEventListener('cookiePreferencesChanged', handlePreferenceChange as EventListener);

    return () => {
      window.removeEventListener('cookiePreferencesChanged', handlePreferenceChange as EventListener);
    };
  }, []);

  const updatePreferences = (newPreferences: Partial<UserPreferences>) => {
    if (!preferencesEnabled) return;

    try {
      const updated = { ...userPreferences, ...newPreferences };
      localStorage.setItem('userPreferences', JSON.stringify(updated));
      setUserPreferences(updated);
    } catch (error) {
      console.error('Error updating user preferences:', error);
    }
  };

  return {
    preferences: userPreferences,
    updatePreferences,
    preferencesEnabled,
  };
}; 