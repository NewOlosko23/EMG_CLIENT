import React, { useState } from "react";
import { Settings as SettingsIcon, Globe, DollarSign, Languages, Save } from "lucide-react";
import { PRESENCE_CURRENCIES } from "../constants/presenceData";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("preferences");

  const [userPreferences, setUserPreferences] = useState({
    timezone: "Africa/Nairobi",
    currency: "KES",
    language: "en",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12h"
  });

  const handlePreferenceChange = (setting, value) => {
    setUserPreferences(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleSave = () => {
    // Handle save logic
    console.log("Preferences saved:", userPreferences);
    // Here you would typically save to your backend/database
  };

  // Timezone options - focused on presence countries
  const timezones = [
    { value: "Africa/Nairobi", label: "East Africa Time (EAT) - Kenya, Uganda, Tanzania" },
    { value: "Africa/Kigali", label: "Central Africa Time (CAT) - Rwanda, Burundi" },
    { value: "Africa/Lusaka", label: "Central Africa Time (CAT) - Zambia" },
    { value: "Africa/Freetown", label: "Greenwich Mean Time (GMT) - Sierra Leone" },
    { value: "Africa/Mbabane", label: "South Africa Standard Time (SAST) - Eswatini" },
    { value: "UTC", label: "Coordinated Universal Time (UTC)" },
    { value: "Europe/London", label: "Greenwich Mean Time (GMT)" },
    { value: "America/New_York", label: "Eastern Time (ET)" },
    { value: "Asia/Tokyo", label: "Japan Standard Time (JST)" }
  ];

  // Currency options - using presence countries currencies
  const currencies = PRESENCE_CURRENCIES;

  // Language options
  const languages = [
    { value: "en", label: "English" },
    { value: "es", label: "Español" },
    { value: "fr", label: "Français" },
    { value: "de", label: "Deutsch" },
    { value: "it", label: "Italiano" },
    { value: "pt", label: "Português" },
    { value: "ru", label: "Русский" },
    { value: "ja", label: "日本語" },
    { value: "ko", label: "한국어" },
    { value: "zh", label: "中文" },
    { value: "ar", label: "العربية" },
    { value: "hi", label: "हिन्दी" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Configure your preferences for timezone, currency, and language</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: "preferences", name: "Preferences", icon: SettingsIcon },
            { id: "localization", name: "Localization", icon: Globe },
            { id: "display", name: "Display", icon: Languages }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === tab.id
                  ? "border-purple-500 text-purple-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Preferences Tab */}
      {activeTab === "preferences" && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">General Preferences</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timezone
                </label>
                <select
                  value={userPreferences.timezone}
                  onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {timezones.map((tz) => (
                    <option key={tz.value} value={tz.value}>
                      {tz.label}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-gray-500 mt-1">
                  This affects how dates and times are displayed throughout the platform
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Currency
                </label>
                <select
                  value={userPreferences.currency}
                  onChange={(e) => handlePreferenceChange('currency', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {currencies.map((currency) => (
                    <option key={currency.value} value={currency.value}>
                      {currency.label}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-gray-500 mt-1">
                  Used for displaying earnings, pricing, and financial information
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Localization Tab */}
      {activeTab === "localization" && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Language & Region</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Language
                </label>
                <select
                  value={userPreferences.language}
                  onChange={(e) => handlePreferenceChange('language', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {languages.map((lang) => (
                    <option key={lang.value} value={lang.value}>
                      {lang.label}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-gray-500 mt-1">
                  Choose your preferred language for the interface
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date Format
                </label>
                <select
                  value={userPreferences.dateFormat}
                  onChange={(e) => handlePreferenceChange('dateFormat', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY (US)</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY (EU)</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD (ISO)</option>
                  <option value="DD MMM YYYY">DD MMM YYYY (Text)</option>
                </select>
                <p className="text-sm text-gray-500 mt-1">
                  How dates are displayed throughout the platform
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Display Tab */}
      {activeTab === "display" && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Display Preferences</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time Format
                </label>
                <select
                  value={userPreferences.timeFormat}
                  onChange={(e) => handlePreferenceChange('timeFormat', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="12h">12-hour (AM/PM)</option>
                  <option value="24h">24-hour</option>
                </select>
                <p className="text-sm text-gray-500 mt-1">
                  Choose between 12-hour and 24-hour time format
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number Format
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  disabled
                >
                  <option value="auto">Auto-detect from locale</option>
                </select>
                <p className="text-sm text-gray-500 mt-1">
                  Number formatting is automatically determined by your language setting
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Current time:</span>
                <span className="text-sm font-medium">
                  {new Date().toLocaleString(userPreferences.language, {
                    timeZone: userPreferences.timezone,
                    hour12: userPreferences.timeFormat === '12h',
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Sample price:</span>
                <span className="text-sm font-medium">
                  {new Intl.NumberFormat(userPreferences.language, {
                    style: 'currency',
                    currency: userPreferences.currency
                  }).format(99.99)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Sample date:</span>
                <span className="text-sm font-medium">
                  {new Date().toLocaleDateString(userPreferences.language, {
                    timeZone: userPreferences.timezone,
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default Settings;
