import React, { useState, useEffect } from 'react';
import { X, Settings, Shield, BarChart3, Target, Cookie } from 'lucide-react';
import { 
  setCookieConsent, 
  hasCookieConsent, 
  saveCookiePreferences, 
  getCookiePreferences,
  COOKIE_CATEGORIES,
  DEFAULT_COOKIE_PREFERENCES 
} from '../utils/cookieUtils';

const CookieConsent = ({ theme = "light" }) => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState(DEFAULT_COOKIE_PREFERENCES);

  useEffect(() => {
    // Check if user has already given consent
    if (!hasCookieConsent()) {
      setShowBanner(true);
    }
    
    // Load existing preferences
    const existingPreferences = getCookiePreferences();
    setPreferences(existingPreferences);
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      [COOKIE_CATEGORIES.NECESSARY]: true,
      [COOKIE_CATEGORIES.FUNCTIONAL]: true,
      [COOKIE_CATEGORIES.ANALYTICS]: true,
      [COOKIE_CATEGORIES.MARKETING]: true
    };
    
    setPreferences(allAccepted);
    saveCookiePreferences(allAccepted);
    setCookieConsent(true);
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    const onlyNecessary = {
      [COOKIE_CATEGORIES.NECESSARY]: true,
      [COOKIE_CATEGORIES.FUNCTIONAL]: false,
      [COOKIE_CATEGORIES.ANALYTICS]: false,
      [COOKIE_CATEGORIES.MARKETING]: false
    };
    
    setPreferences(onlyNecessary);
    saveCookiePreferences(onlyNecessary);
    setCookieConsent(true);
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    saveCookiePreferences(preferences);
    setCookieConsent(true);
    setShowBanner(false);
    setShowSettings(false);
  };

  const togglePreference = (category) => {
    if (category === COOKIE_CATEGORIES.NECESSARY) return; // Cannot disable necessary cookies
    
    setPreferences(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const cookieCategories = [
    {
      id: COOKIE_CATEGORIES.NECESSARY,
      title: "Necessary Cookies",
      description: "Essential for the website to function properly. These cannot be disabled.",
      icon: Shield,
      required: true
    },
    {
      id: COOKIE_CATEGORIES.FUNCTIONAL,
      title: "Functional Cookies",
      description: "Enable enhanced functionality and personalization features.",
      icon: Settings,
      required: false
    },
    {
      id: COOKIE_CATEGORIES.ANALYTICS,
      title: "Analytics Cookies",
      description: "Help us understand how visitors interact with our website.",
      icon: BarChart3,
      required: false
    },
    {
      id: COOKIE_CATEGORIES.MARKETING,
      title: "Marketing Cookies",
      description: "Used to track visitors across websites for advertising purposes.",
      icon: Target,
      required: false
    }
  ];

  if (!showBanner) return null;

  return (
    <>
      {/* Cookie Consent Banner */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 p-3 sm:p-4 transition-all duration-300 ${
        theme === "dark" 
          ? "bg-gray-900 border-t border-gray-700" 
          : "bg-white border-t border-gray-200"
      } shadow-lg`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Content Section */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Cookie className={`w-4 h-4 sm:w-5 sm:h-5 ${theme === "dark" ? "text-purple-400" : "text-purple-600"}`} />
                <h3 className={`text-base sm:text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  We use cookies
                </h3>
              </div>
              <p className={`text-xs sm:text-sm leading-relaxed ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                By clicking "Accept All", you consent to our use of cookies.
              </p>
            </div>
            
            {/* Button Section */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                onClick={() => setShowSettings(true)}
                className={`px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium rounded-lg border transition-all duration-300 flex-1 sm:flex-none ${
                  theme === "dark"
                    ? "border-gray-600 text-gray-300 hover:bg-gray-800"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span className="hidden sm:inline">Cookie Settings</span>
                <span className="sm:hidden">Settings</span>
              </button>
              <button
                onClick={handleRejectAll}
                className={`px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium rounded-lg border transition-all duration-300 flex-1 sm:flex-none ${
                  theme === "dark"
                    ? "border-gray-600 text-gray-300 hover:bg-gray-800"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                Reject All
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 sm:px-6 sm:py-2 text-xs sm:text-sm font-medium text-white bg-purple-600 rounded-lg transition-all duration-300 hover:bg-purple-700 hover:shadow-lg flex-1 sm:flex-none"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cookie Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black bg-opacity-50">
          <div className={`w-full max-w-xs sm:max-w-md lg:max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto rounded-lg sm:rounded-xl shadow-2xl ${
            theme === "dark" ? "bg-gray-900" : "bg-white"
          }`}>
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Cookie className={`w-5 h-5 sm:w-6 sm:h-6 ${theme === "dark" ? "text-purple-400" : "text-purple-600"}`} />
                  <h2 className={`text-lg sm:text-xl lg:text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    Cookie Preferences
                  </h2>
                </div>
                <button
                  onClick={() => setShowSettings(false)}
                  className={`p-1.5 sm:p-2 rounded-lg transition-colors duration-300 ${
                    theme === "dark" 
                      ? "text-gray-400 hover:text-white hover:bg-gray-800" 
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <X size={18} className="sm:w-5 sm:h-5" />
                </button>
              </div>

              <p className={`text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                Manage your cookie preferences. You can enable or disable different types of cookies below.
              </p>

              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                {cookieCategories.map((category) => {
                  const Icon = category.icon;
                  const isEnabled = preferences[category.id];
                  
                  return (
                    <div
                      key={category.id}
                      className={`p-3 sm:p-4 rounded-lg border transition-all duration-300 ${
                        theme === "dark"
                          ? "border-gray-700 bg-gray-800"
                          : "border-gray-200 bg-gray-50"
                      }`}
                    >
                      <div className="flex items-start sm:items-center justify-between gap-3">
                        <div className="flex items-start sm:items-center gap-2 sm:gap-3 flex-1 min-w-0">
                          <Icon className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5 sm:mt-0 ${theme === "dark" ? "text-purple-400" : "text-purple-600"}`} />
                          <div className="min-w-0 flex-1">
                            <h3 className={`text-sm sm:text-base font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                              {category.title}
                            </h3>
                            <p className={`text-xs sm:text-sm leading-relaxed ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                              {category.description}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center flex-shrink-0">
                          {category.required ? (
                            <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
                              theme === "dark" 
                                ? "bg-gray-700 text-gray-300" 
                                : "bg-gray-200 text-gray-600"
                            }`}>
                              Required
                            </span>
                          ) : (
                            <button
                              onClick={() => togglePreference(category.id)}
                              className={`relative inline-flex h-5 w-9 sm:h-6 sm:w-11 items-center rounded-full transition-colors duration-300 ${
                                isEnabled
                                  ? "bg-purple-600"
                                  : theme === "dark"
                                  ? "bg-gray-600"
                                  : "bg-gray-300"
                              }`}
                            >
                              <span
                                className={`inline-block h-3 w-3 sm:h-4 sm:w-4 transform rounded-full bg-white transition-transform duration-300 ${
                                  isEnabled ? "translate-x-5 sm:translate-x-6" : "translate-x-1"
                                }`}
                              />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-end">
                <button
                  onClick={() => setShowSettings(false)}
                  className={`px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium rounded-lg border transition-all duration-300 ${
                    theme === "dark"
                      ? "border-gray-600 text-gray-300 hover:bg-gray-800"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="px-4 py-2 sm:px-6 sm:py-2 text-xs sm:text-sm font-medium text-white bg-purple-600 rounded-lg transition-all duration-300 hover:bg-purple-700 hover:shadow-lg"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;
