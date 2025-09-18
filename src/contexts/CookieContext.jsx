import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  getCookiePreferences, 
  saveCookiePreferences, 
  hasCookieConsent,
  setCookieConsent,
  storeUserDetails,
  getUserDetails,
  clearUserDetails,
  COOKIE_CATEGORIES,
  DEFAULT_COOKIE_PREFERENCES
} from '../utils/cookieUtils';

const CookieContext = createContext();

export const useCookie = () => {
  const context = useContext(CookieContext);
  if (!context) {
    throw new Error('useCookie must be used within a CookieProvider');
  }
  return context;
};

export const CookieProvider = ({ children }) => {
  const [preferences, setPreferences] = useState(DEFAULT_COOKIE_PREFERENCES);
  const [hasConsent, setHasConsent] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load cookie preferences and consent status
    const loadCookieData = () => {
      try {
        const cookiePreferences = getCookiePreferences();
        const consentStatus = hasCookieConsent();
        const storedUserDetails = getUserDetails();

        setPreferences(cookiePreferences);
        setHasConsent(consentStatus);
        setUserDetails(storedUserDetails);
      } catch (error) {
        console.error('Error loading cookie data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCookieData();
  }, []);

  const updatePreferences = (newPreferences) => {
    setPreferences(newPreferences);
    saveCookiePreferences(newPreferences);
  };

  const giveConsent = (consentPreferences = null) => {
    const prefsToSave = consentPreferences || preferences;
    setPreferences(prefsToSave);
    saveCookiePreferences(prefsToSave);
    setCookieConsent(true);
    setHasConsent(true);
  };

  const revokeConsent = () => {
    setCookieConsent(false);
    setHasConsent(false);
    // Clear all non-necessary cookies
    clearUserDetails();
    // Reset to default preferences
    const defaultPrefs = { ...DEFAULT_COOKIE_PREFERENCES };
    setPreferences(defaultPrefs);
    saveCookiePreferences(defaultPrefs);
  };

  const saveUserDetails = (details) => {
    if (!hasConsent) {
      console.warn('Cannot save user details without cookie consent');
      return false;
    }

    if (!preferences[COOKIE_CATEGORIES.FUNCTIONAL]) {
      console.warn('Cannot save user details without functional cookies enabled');
      return false;
    }

    const success = storeUserDetails(details);
    if (success) {
      setUserDetails(details);
    }
    return success;
  };

  const clearStoredUserDetails = () => {
    clearUserDetails();
    setUserDetails(null);
  };

  const isCategoryEnabled = (category) => {
    return preferences[category] || false;
  };

  const canStoreData = () => {
    return hasConsent && preferences[COOKIE_CATEGORIES.FUNCTIONAL];
  };

  const canTrackAnalytics = () => {
    return hasConsent && preferences[COOKIE_CATEGORIES.ANALYTICS];
  };

  const canTrackMarketing = () => {
    return hasConsent && preferences[COOKIE_CATEGORIES.MARKETING];
  };

  const value = {
    // State
    preferences,
    hasConsent,
    userDetails,
    isLoading,
    
    // Actions
    updatePreferences,
    giveConsent,
    revokeConsent,
    saveUserDetails,
    clearStoredUserDetails,
    
    // Utilities
    isCategoryEnabled,
    canStoreData,
    canTrackAnalytics,
    canTrackMarketing,
    
    // Constants
    COOKIE_CATEGORIES
  };

  return (
    <CookieContext.Provider value={value}>
      {children}
    </CookieContext.Provider>
  );
};

export default CookieContext;
