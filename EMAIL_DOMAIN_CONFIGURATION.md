# Email Domain Configuration

## Overview
This document explains how email redirect URLs are configured for the EMG Music platform.

## Production Domain
- **Domain**: https://emg-build.onrender.com
- **Environment**: Production (Render deployment)

## Configuration

### 1. Authentication Functions
The `resetPassword` function in `src/contexts/AuthContext.jsx` now uses the production domain for email redirects:

```javascript
const redirectUrl = APP_CONFIG.getEmailRedirectUrl(APP_CONFIG.REDIRECT_PATHS.RESET_PASSWORD);
```

### 2. Configuration File
The domain configuration is centralized in `src/config/constants.js`:

```javascript
export const APP_CONFIG = {
  PRODUCTION_DOMAIN: 'https://emg-build.onrender.com',
  
  getEmailRedirectUrl: (path = '') => {
    const baseUrl = import.meta.env.PROD 
      ? APP_CONFIG.PRODUCTION_DOMAIN
      : window.location.origin;
    
    return `${baseUrl}${path}`;
  }
};
```

### 3. Email Templates
Email templates in the `email_templates/` directory use Supabase template variables:
- `{{ .ConfirmationURL }}` - Automatically uses the correct domain
- No hardcoded localhost URLs

## How It Works

1. **Development**: Uses `window.location.origin` (localhost:3000)
2. **Production**: Uses `https://emg-build.onrender.com`
3. **Email Redirects**: Automatically use the correct domain based on environment

## Supabase Configuration

Make sure your Supabase project has the following redirect URLs configured:

### Site URL
- `https://emg-build.onrender.com`

### Redirect URLs
- `https://emg-build.onrender.com/reset-password`
- `https://emg-build.onrender.com/email-confirmation`
- `https://emg-build.onrender.com/Dashboard`
- `https://emg-build.onrender.com/Login`

## Testing

### Development
- Email redirects will use `localhost:3000`
- Test password reset functionality locally

### Production
- Email redirects will use `https://emg-build.onrender.com`
- Verify email links work correctly in production

## Troubleshooting

If email links still show localhost URLs:

1. Check Supabase project settings
2. Verify environment variables
3. Ensure the application is built for production
4. Check browser console for any errors

## Files Modified

- `src/contexts/AuthContext.jsx` - Updated resetPassword function
- `src/config/constants.js` - Added domain configuration
- `EMAIL_DOMAIN_CONFIGURATION.md` - This documentation file
