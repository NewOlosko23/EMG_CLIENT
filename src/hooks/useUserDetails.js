import { useState, useEffect } from 'react';
import { useCookie } from '../contexts/CookieContext';

/**
 * Custom hook for managing user details with cookie storage
 * @returns {Object} - User details management functions and state
 */
export const useUserDetails = () => {
  const { userDetails, saveUserDetails, clearStoredUserDetails, canStoreData } = useCookie();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Update user details in cookies
  const updateUserDetails = async (newDetails) => {
    if (!canStoreData()) {
      setError('Cannot store user details without proper cookie consent');
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Merge with existing details
      const updatedDetails = {
        ...userDetails,
        ...newDetails,
        lastUpdated: new Date().toISOString()
      };

      const success = saveUserDetails(updatedDetails);
      
      if (!success) {
        throw new Error('Failed to save user details');
      }

      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Clear user details from cookies
  const clearUserDetails = () => {
    clearStoredUserDetails();
    setError(null);
  };

  // Get specific user detail
  const getUserDetail = (key) => {
    return userDetails?.[key] || null;
  };

  // Check if user details exist
  const hasUserDetails = () => {
    return userDetails !== null && Object.keys(userDetails).length > 0;
  };

  // Get user preferences
  const getUserPreferences = () => {
    return userDetails?.preferences || {};
  };

  // Update user preferences
  const updateUserPreferences = async (preferences) => {
    return await updateUserDetails({ preferences });
  };

  // Get user theme preference
  const getUserTheme = () => {
    return getUserDetail('theme') || 'light';
  };

  // Set user theme preference
  const setUserTheme = async (theme) => {
    return await updateUserDetails({ theme });
  };

  // Get user language preference
  const getUserLanguage = () => {
    return getUserDetail('language') || 'en';
  };

  // Set user language preference
  const setUserLanguage = async (language) => {
    return await updateUserDetails({ language });
  };

  // Get user display name
  const getUserDisplayName = () => {
    return getUserDetail('displayName') || getUserDetail('name') || 'User';
  };

  // Set user display name
  const setUserDisplayName = async (displayName) => {
    return await updateUserDetails({ displayName });
  };

  // Get user email
  const getUserEmail = () => {
    return getUserDetail('email') || null;
  };

  // Set user email
  const setUserEmail = async (email) => {
    return await updateUserDetails({ email });
  };

  // Get user avatar URL
  const getUserAvatar = () => {
    return getUserDetail('avatar') || getUserDetail('avatarUrl') || null;
  };

  // Set user avatar URL
  const setUserAvatar = async (avatarUrl) => {
    return await updateUserDetails({ avatar: avatarUrl });
  };

  // Get user role/permissions
  const getUserRole = () => {
    return getUserDetail('role') || 'user';
  };

  // Set user role
  const setUserRole = async (role) => {
    return await updateUserDetails({ role });
  };

  // Get user settings
  const getUserSettings = () => {
    return getUserDetail('settings') || {};
  };

  // Update user settings
  const updateUserSettings = async (settings) => {
    const currentSettings = getUserSettings();
    return await updateUserDetails({ 
      settings: { ...currentSettings, ...settings } 
    });
  };

  // Get user activity data
  const getUserActivity = () => {
    return getUserDetail('activity') || {};
  };

  // Update user activity
  const updateUserActivity = async (activityData) => {
    const currentActivity = getUserActivity();
    return await updateUserDetails({ 
      activity: { ...currentActivity, ...activityData } 
    });
  };

  // Track user action
  const trackUserAction = async (action, data = {}) => {
    const currentActivity = getUserActivity();
    const newActivity = {
      ...currentActivity,
      [action]: {
        ...currentActivity[action],
        count: (currentActivity[action]?.count || 0) + 1,
        lastPerformed: new Date().toISOString(),
        data: { ...currentActivity[action]?.data, ...data }
      }
    };
    
    return await updateUserDetails({ activity: newActivity });
  };

  return {
    // State
    userDetails,
    isLoading,
    error,
    
    // Core functions
    updateUserDetails,
    clearUserDetails,
    getUserDetail,
    hasUserDetails,
    
    // Preference functions
    getUserPreferences,
    updateUserPreferences,
    
    // Theme functions
    getUserTheme,
    setUserTheme,
    
    // Language functions
    getUserLanguage,
    setUserLanguage,
    
    // User info functions
    getUserDisplayName,
    setUserDisplayName,
    getUserEmail,
    setUserEmail,
    getUserAvatar,
    setUserAvatar,
    getUserRole,
    setUserRole,
    
    // Settings functions
    getUserSettings,
    updateUserSettings,
    
    // Activity functions
    getUserActivity,
    updateUserActivity,
    trackUserAction
  };
};

export default useUserDetails;
