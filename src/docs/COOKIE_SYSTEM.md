# Cookie Management System

This document explains how to use the comprehensive cookie management system implemented in the EMG Music application.

## Overview

The cookie system provides:
- **Cookie Consent Management**: GDPR-compliant cookie consent banner
- **User Details Storage**: Secure storage of user preferences and data
- **Cookie Categories**: Organized cookie types (Necessary, Functional, Analytics, Marketing)
- **React Context**: Global state management for cookie preferences
- **Custom Hooks**: Easy-to-use hooks for managing user data

## Components

### 1. Cookie Utilities (`src/utils/cookieUtils.js`)

Core functions for cookie management:

```javascript
import { 
  setCookie, 
  getCookie, 
  deleteCookie, 
  storeUserDetails, 
  getUserDetails,
  hasCookieConsent,
  setCookieConsent 
} from '../utils/cookieUtils';

// Basic cookie operations
setCookie('user_preference', 'dark_theme', { expires: 30 });
const theme = getCookie('user_preference');
deleteCookie('user_preference');

// User details storage (with encryption)
storeUserDetails({ name: 'John Doe', email: 'john@example.com' });
const userData = getUserDetails();

// Consent management
setCookieConsent(true);
const hasConsent = hasCookieConsent();
```

### 2. Cookie Context (`src/contexts/CookieContext.jsx`)

Global state management for cookie preferences:

```javascript
import { useCookie } from '../contexts/CookieContext';

function MyComponent() {
  const { 
    preferences, 
    hasConsent, 
    giveConsent, 
    canStoreData,
    canTrackAnalytics 
  } = useCookie();

  // Check if user has given consent
  if (!hasConsent) {
    return <div>Please accept cookies to continue</div>;
  }

  // Check if data storage is allowed
  if (canStoreData()) {
    // Store user data
  }

  // Check if analytics tracking is allowed
  if (canTrackAnalytics()) {
    // Track user behavior
  }
}
```

### 3. User Details Hook (`src/hooks/useUserDetails.js`)

Specialized hook for managing user data:

```javascript
import { useUserDetails } from '../hooks/useUserDetails';

function UserProfile() {
  const {
    userDetails,
    updateUserDetails,
    getUserTheme,
    setUserTheme,
    getUserDisplayName,
    setUserDisplayName,
    isLoading,
    error
  } = useUserDetails();

  const handleThemeChange = async (newTheme) => {
    const success = await setUserTheme(newTheme);
    if (success) {
      console.log('Theme updated successfully');
    }
  };

  return (
    <div>
      <h1>Welcome, {getUserDisplayName()}</h1>
      <button onClick={() => handleThemeChange('dark')}>
        Switch to Dark Theme
      </button>
    </div>
  );
}
```

### 4. Cookie Consent Banner (`src/components/CookieConsent.jsx`)

Automatic cookie consent management:

```javascript
import CookieConsent from '../components/CookieConsent';

function App() {
  return (
    <div>
      {/* Your app content */}
      <CookieConsent theme="light" />
    </div>
  );
}
```

## Cookie Categories

The system supports four cookie categories:

### 1. Necessary Cookies
- **Always enabled** - Cannot be disabled
- Required for basic website functionality
- Examples: Authentication, security, basic preferences

### 2. Functional Cookies
- **Optional** - User can enable/disable
- Enhanced functionality and personalization
- Examples: User preferences, theme settings, language

### 3. Analytics Cookies
- **Optional** - User can enable/disable
- Website usage analytics and performance monitoring
- Examples: Google Analytics, user behavior tracking

### 4. Marketing Cookies
- **Optional** - User can enable/disable
- Advertising and marketing purposes
- Examples: Ad targeting, social media integration

## Usage Examples

### Storing User Preferences

```javascript
import { useUserDetails } from '../hooks/useUserDetails';

function SettingsPage() {
  const { updateUserDetails, getUserSettings } = useUserDetails();

  const handleSaveSettings = async () => {
    const settings = {
      notifications: true,
      emailUpdates: false,
      theme: 'dark',
      language: 'en'
    };

    const success = await updateUserDetails({ settings });
    if (success) {
      alert('Settings saved!');
    }
  };

  return (
    <div>
      <button onClick={handleSaveSettings}>
        Save Settings
      </button>
    </div>
  );
}
```

### Tracking User Activity

```javascript
import { useUserDetails } from '../hooks/useUserDetails';

function MusicPlayer() {
  const { trackUserAction } = useUserDetails();

  const handlePlaySong = async (songId) => {
    // Track the play action
    await trackUserAction('song_played', { 
      songId, 
      timestamp: Date.now() 
    });
    
    // Play the song
    playSong(songId);
  };

  return (
    <button onClick={() => handlePlaySong('song123')}>
      Play Song
    </button>
  );
}
```

### Conditional Analytics

```javascript
import { useCookie } from '../contexts/CookieContext';

function AnalyticsComponent() {
  const { canTrackAnalytics } = useCookie();

  useEffect(() => {
    if (canTrackAnalytics()) {
      // Initialize Google Analytics
      gtag('config', 'GA_MEASUREMENT_ID');
    }
  }, [canTrackAnalytics]);

  return <div>Analytics Component</div>;
}
```

## Security Features

### Data Encryption
- User details are encrypted using base64 encoding (basic obfuscation)
- For production, consider implementing stronger encryption

### Consent Validation
- All data storage operations check for proper consent
- Functional cookies must be enabled for user data storage
- Analytics cookies must be enabled for tracking

### Cookie Expiration
- User details expire after 30 days
- Cookie preferences expire after 1 year
- Consent status expires after 1 year

## Best Practices

### 1. Always Check Consent
```javascript
const { hasConsent, canStoreData } = useCookie();

if (!hasConsent) {
  return <ConsentRequired />;
}

if (canStoreData()) {
  // Store user data
}
```

### 2. Handle Errors Gracefully
```javascript
const { updateUserDetails, error } = useUserDetails();

const handleSave = async () => {
  const success = await updateUserDetails(data);
  if (!success) {
    console.error('Failed to save:', error);
    // Show user-friendly error message
  }
};
```

### 3. Provide Clear Cookie Information
```javascript
// Always inform users about what data you're storing
const cookieInfo = {
  purpose: 'Store user preferences for better experience',
  data: ['theme', 'language', 'display_name'],
  retention: '30 days'
};
```

## Integration Steps

1. **Wrap your app with CookieProvider** (already done in App.jsx)
2. **Add CookieConsent component** (already done in Layout.jsx)
3. **Use the hooks in your components**:

```javascript
import { useCookie } from '../contexts/CookieContext';
import { useUserDetails } from '../hooks/useUserDetails';

function MyComponent() {
  const { hasConsent } = useCookie();
  const { updateUserDetails } = useUserDetails();
  
  // Your component logic
}
```

## Testing

To test the cookie system:

1. **Clear browser cookies** to see the consent banner
2. **Accept/reject cookies** to test different scenarios
3. **Use the UserProfileExample component** to test user data storage
4. **Check browser dev tools** to verify cookies are set correctly

## Browser Compatibility

- Modern browsers with ES6+ support
- LocalStorage fallback for older browsers (can be implemented)
- HTTPS required for secure cookies in production

## Future Enhancements

- [ ] Stronger encryption for sensitive data
- [ ] LocalStorage fallback for older browsers
- [ ] Cookie analytics dashboard
- [ ] Automated cookie expiration management
- [ ] Integration with privacy policy generator
