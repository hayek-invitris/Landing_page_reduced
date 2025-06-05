'use client';

import { Button } from '@/components/ui/button';
import { trackEvent, trackPageView } from '@/components/common/Analytics';
import { trackFacebookEvent } from '@/components/common/Marketing';
import { useUserPreferences } from '@/components/common/PreferencesManager';

export default function TrackingExample() {
  const { preferences, updatePreferences, preferencesEnabled } = useUserPreferences();

  const handleButtonClick = () => {
    // These functions automatically check cookie preferences before tracking
    trackEvent('button_click', 'user_interaction', 'example_button');
    trackFacebookEvent('Custom_Event', { button_name: 'example_button' });
  };

  const handlePageView = () => {
    trackPageView(window.location.href, 'Example Page');
  };

  const toggleTheme = () => {
    const newTheme = preferences.theme === 'dark' ? 'light' : 'dark';
    updatePreferences({ theme: newTheme });
    
    // Track preference change only if analytics is enabled
    trackEvent('theme_change', 'preferences', newTheme);
  };

  return (
    <div className="space-y-4 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <h3 className="text-lg font-semibold">Cookie-Aware Tracking Example</h3>
      
      <div className="space-y-2">
        <Button onClick={handleButtonClick}>
          Click to Track Event
        </Button>
        
        <Button onClick={handlePageView} variant="outline">
          Track Page View
        </Button>
        
        {preferencesEnabled && (
          <Button onClick={toggleTheme} variant="secondary">
            Toggle Theme (Current: {preferences.theme})
          </Button>
        )}
      </div>
      
      <div className="text-sm text-gray-600 dark:text-gray-400">
        <p>
          Preferences enabled: {preferencesEnabled ? 'Yes' : 'No'}
        </p>
        <p>
          Current theme: {preferences.theme}
        </p>
        <p>
          Current language: {preferences.language}
        </p>
      </div>
    </div>
  );
} 