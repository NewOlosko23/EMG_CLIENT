import React, { useState } from 'react';
import { useUserDetails } from '../hooks/useUserDetails';
import { useCookie } from '../contexts/CookieContext';
import { User, Mail, Palette, Globe, Save, Trash2 } from 'lucide-react';

/**
 * Example component demonstrating how to use the cookie system for user details
 * This component shows how to store and retrieve user information using cookies
 */
const UserProfileExample = ({ theme = "light" }) => {
  const {
    userDetails,
    updateUserDetails,
    clearUserDetails,
    getUserDisplayName,
    getUserEmail,
    getUserTheme,
    setUserTheme,
    getUserLanguage,
    setUserLanguage,
    isLoading,
    error
  } = useUserDetails();

  const { canStoreData, hasConsent } = useCookie();

  const [formData, setFormData] = useState({
    displayName: getUserDisplayName() || '',
    email: getUserEmail() || '',
    theme: getUserTheme(),
    language: getUserLanguage()
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    const success = await updateUserDetails(formData);
    if (success) {
      alert('User details saved successfully!');
    } else {
      alert('Failed to save user details. Check console for errors.');
    }
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all user details?')) {
      clearUserDetails();
      setFormData({
        displayName: '',
        email: '',
        theme: 'light',
        language: 'en'
      });
      alert('User details cleared!');
    }
  };

  if (!hasConsent) {
    return (
      <div className={`p-6 rounded-lg border ${
        theme === "dark" 
          ? "bg-gray-800 border-gray-700" 
          : "bg-gray-50 border-gray-200"
      }`}>
        <div className="text-center">
          <User className={`w-12 h-12 mx-auto mb-4 ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`} />
          <h3 className={`text-lg font-semibold mb-2 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>
            Cookie Consent Required
          </h3>
          <p className={`text-sm ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}>
            Please accept cookies to use this feature. User details can only be stored with your consent.
          </p>
        </div>
      </div>
    );
  }

  if (!canStoreData()) {
    return (
      <div className={`p-6 rounded-lg border ${
        theme === "dark" 
          ? "bg-gray-800 border-gray-700" 
          : "bg-gray-50 border-gray-200"
      }`}>
        <div className="text-center">
          <User className={`w-12 h-12 mx-auto mb-4 ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`} />
          <h3 className={`text-lg font-semibold mb-2 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>
            Functional Cookies Required
          </h3>
          <p className={`text-sm ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}>
            Please enable functional cookies in your cookie settings to store user details.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-6 rounded-lg border ${
      theme === "dark" 
        ? "bg-gray-800 border-gray-700" 
        : "bg-white border-gray-200"
    } shadow-lg`}>
      <div className="flex items-center gap-3 mb-6">
        <User className={`w-6 h-6 ${theme === "dark" ? "text-purple-400" : "text-purple-600"}`} />
        <h2 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
          User Profile (Cookie Storage Demo)
        </h2>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg">
          Error: {error}
        </div>
      )}

      <div className="space-y-4">
        {/* Display Name */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}>
            Display Name
          </label>
          <input
            type="text"
            name="displayName"
            value={formData.displayName}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
            placeholder="Enter your display name"
          />
        </div>

        {/* Email */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}>
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
            placeholder="Enter your email"
          />
        </div>

        {/* Theme Preference */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}>
            Theme Preference
          </label>
          <select
            name="theme"
            value={formData.theme}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto</option>
          </select>
        </div>

        {/* Language Preference */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}>
            Language Preference
          </label>
          <select
            name="language"
            value={formData.language}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="it">Italian</option>
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
        >
          <Save size={16} />
          {isLoading ? 'Saving...' : 'Save Details'}
        </button>
        
        <button
          onClick={handleClear}
          className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-300"
        >
          <Trash2 size={16} />
          Clear All
        </button>
      </div>

      {/* Current User Details Display */}
      {userDetails && (
        <div className={`mt-6 p-4 rounded-lg ${
          theme === "dark" ? "bg-gray-700" : "bg-gray-50"
        }`}>
          <h3 className={`text-sm font-medium mb-2 ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}>
            Currently Stored Details:
          </h3>
          <pre className={`text-xs overflow-auto ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}>
            {JSON.stringify(userDetails, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default UserProfileExample;
