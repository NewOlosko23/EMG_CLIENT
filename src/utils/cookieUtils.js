// Cookie utility functions for managing cookies in the frontend

/**
 * Set a cookie with the given name, value, and options
 * @param {string} name - Cookie name
 * @param {string} value - Cookie value
 * @param {Object} options - Cookie options (expires, path, domain, secure, sameSite)
 */
export const setCookie = (name, value, options = {}) => {
  const {
    expires = 365, // Default to 1 year
    path = '/',
    domain = window.location.hostname,
    secure = window.location.protocol === 'https:',
    sameSite = 'Lax'
  } = options;

  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (expires) {
    const date = new Date();
    date.setTime(date.getTime() + (expires * 24 * 60 * 60 * 1000));
    cookieString += `; expires=${date.toUTCString()}`;
  }

  cookieString += `; path=${path}`;
  cookieString += `; domain=${domain}`;
  
  if (secure) {
    cookieString += '; secure';
  }
  
  cookieString += `; samesite=${sameSite}`;

  document.cookie = cookieString;
};

/**
 * Get a cookie value by name
 * @param {string} name - Cookie name
 * @returns {string|null} - Cookie value or null if not found
 */
export const getCookie = (name) => {
  const nameEQ = encodeURIComponent(name) + '=';
  const cookies = document.cookie.split(';');
  
  for (let cookie of cookies) {
    let c = cookie.trim();
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length));
    }
  }
  return null;
};

/**
 * Delete a cookie by name
 * @param {string} name - Cookie name
 * @param {Object} options - Cookie options (path, domain)
 */
export const deleteCookie = (name, options = {}) => {
  const { path = '/', domain = window.location.hostname } = options;
  
  document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}; domain=${domain}`;
};

/**
 * Check if cookies are enabled in the browser
 * @returns {boolean} - True if cookies are enabled
 */
export const areCookiesEnabled = () => {
  try {
    setCookie('test_cookie', 'test', { expires: 1 });
    const enabled = getCookie('test_cookie') === 'test';
    deleteCookie('test_cookie');
    return enabled;
  } catch (e) {
    return false;
  }
};

/**
 * Get all cookies as an object
 * @returns {Object} - Object with all cookies
 */
export const getAllCookies = () => {
  const cookies = {};
  const cookieArray = document.cookie.split(';');
  
  cookieArray.forEach(cookie => {
    const [name, value] = cookie.trim().split('=');
    if (name && value) {
      cookies[decodeURIComponent(name)] = decodeURIComponent(value);
    }
  });
  
  return cookies;
};

/**
 * Simple encryption/decryption for sensitive data (basic obfuscation)
 * Note: This is not cryptographically secure, use for basic obfuscation only
 */
const simpleEncrypt = (text) => {
  return btoa(encodeURIComponent(text));
};

const simpleDecrypt = (encryptedText) => {
  try {
    return decodeURIComponent(atob(encryptedText));
  } catch (e) {
    return null;
  }
};

/**
 * Store user details in cookies with basic encryption
 * @param {Object} userDetails - User details object
 */
export const storeUserDetails = (userDetails) => {
  try {
    const encryptedData = simpleEncrypt(JSON.stringify(userDetails));
    setCookie('user_details', encryptedData, { expires: 30 }); // 30 days
    return true;
  } catch (e) {
    console.error('Error storing user details:', e);
    return false;
  }
};

/**
 * Retrieve user details from cookies
 * @returns {Object|null} - User details object or null if not found
 */
export const getUserDetails = () => {
  try {
    const encryptedData = getCookie('user_details');
    if (encryptedData) {
      const decryptedData = simpleDecrypt(encryptedData);
      return decryptedData ? JSON.parse(decryptedData) : null;
    }
    return null;
  } catch (e) {
    console.error('Error retrieving user details:', e);
    return null;
  }
};

/**
 * Clear user details from cookies
 */
export const clearUserDetails = () => {
  deleteCookie('user_details');
};

/**
 * Cookie categories for consent management
 */
export const COOKIE_CATEGORIES = {
  NECESSARY: 'necessary',
  FUNCTIONAL: 'functional',
  ANALYTICS: 'analytics',
  MARKETING: 'marketing'
};

/**
 * Default cookie preferences
 */
export const DEFAULT_COOKIE_PREFERENCES = {
  [COOKIE_CATEGORIES.NECESSARY]: true, // Always true, cannot be disabled
  [COOKIE_CATEGORIES.FUNCTIONAL]: false,
  [COOKIE_CATEGORIES.ANALYTICS]: false,
  [COOKIE_CATEGORIES.MARKETING]: false
};

/**
 * Get cookie preferences from cookies
 * @returns {Object} - Cookie preferences object
 */
export const getCookiePreferences = () => {
  try {
    const preferences = getCookie('cookie_preferences');
    return preferences ? JSON.parse(preferences) : DEFAULT_COOKIE_PREFERENCES;
  } catch (e) {
    return DEFAULT_COOKIE_PREFERENCES;
  }
};

/**
 * Save cookie preferences to cookies
 * @param {Object} preferences - Cookie preferences object
 */
export const saveCookiePreferences = (preferences) => {
  setCookie('cookie_preferences', JSON.stringify(preferences), { expires: 365 });
};

/**
 * Check if user has given cookie consent
 * @returns {boolean} - True if user has given consent
 */
export const hasCookieConsent = () => {
  return getCookie('cookie_consent') === 'true';
};

/**
 * Set cookie consent
 * @param {boolean} consent - Whether user has given consent
 */
export const setCookieConsent = (consent) => {
  setCookie('cookie_consent', consent.toString(), { expires: 365 });
};
