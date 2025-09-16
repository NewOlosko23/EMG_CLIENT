export const APP_CONFIG = {
  // Production domain
  PRODUCTION_DOMAIN: 'https://emg-build.onrender.com',
  
  // Email redirect URLs
  getEmailRedirectUrl: (path = '') => {
    const baseUrl = import.meta.env.PROD 
      ? APP_CONFIG.PRODUCTION_DOMAIN
      : window.location.origin;
    
    return `${baseUrl}${path}`;
  },
  
  // Common redirect paths
  REDIRECT_PATHS: {
    RESET_PASSWORD: '/reset-password',
    EMAIL_CONFIRMATION: '/email-confirmation',
    DASHBOARD: '/Dashboard',
    LOGIN: '/Login'
  }
};

export default APP_CONFIG;
