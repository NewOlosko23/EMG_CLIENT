# Toast Notification System

This document explains how to use the global toast notification system implemented in the EMG Music app.

## Overview

The toast system provides a clean, consistent way to show user feedback throughout the application. It replaces inline error/success messages with elegant, non-intrusive notifications that appear in the top-right corner of the screen.

## Features

- ✅ **Success Notifications** - Green toasts for successful operations
- ❌ **Error Notifications** - Red toasts for errors and failures  
- ⚠️ **Warning Notifications** - Yellow toasts for warnings
- ℹ️ **Info Notifications** - Blue toasts for general information
- ⏳ **Loading Notifications** - Loading spinners for async operations
- 🎨 **Custom Styling** - Beautiful, consistent design with icons
- 📱 **Responsive** - Works on all screen sizes
- ⏰ **Auto-dismiss** - Configurable duration for each toast type

## Quick Start

### 1. Import the hook

```jsx
import { useToast } from '../contexts/ToastContext';
```

### 2. Use in your component

```jsx
const MyComponent = () => {
  const { showSuccess, showError, showWarning, showInfo, showLoading, dismiss } = useToast();

  const handleAction = async () => {
    const loadingToast = showLoading("Processing...");
    
    try {
      await someAsyncOperation();
      dismiss(loadingToast);
      showSuccess("Success!", "Your action completed successfully");
    } catch (error) {
      dismiss(loadingToast);
      showError("Error", "Something went wrong");
    }
  };

  return <button onClick={handleAction}>Do Something</button>;
};
```

## API Reference

### Toast Functions

#### `showSuccess(message, description?, options?)`
Shows a green success toast.

```jsx
showSuccess("Account created!", "Welcome to EMG Music");
showSuccess("File uploaded", "Your track is now live", { duration: 5000 });
```

#### `showError(message, description?, options?)`
Shows a red error toast.

```jsx
showError("Login failed", "Please check your credentials");
showError("Upload failed", "File size too large", { duration: 8000 });
```

#### `showWarning(message, description?, options?)`
Shows a yellow warning toast.

```jsx
showWarning("Unsaved changes", "Your changes will be lost");
showWarning("Quota exceeded", "You've reached your upload limit");
```

#### `showInfo(message, description?, options?)`
Shows a blue info toast.

```jsx
showInfo("New feature", "Check out our latest music discovery tools");
showInfo("Maintenance", "Scheduled maintenance in 1 hour");
```

#### `showLoading(message, options?)`
Shows a loading toast with spinner.

```jsx
const loadingToast = showLoading("Uploading file...");
// ... do async work ...
dismiss(loadingToast); // Dismiss when done
```

#### `dismiss(toastId)`
Dismisses a specific toast by ID.

```jsx
const toastId = showLoading("Processing...");
// ... later ...
dismiss(toastId);
```

#### `dismissAll()`
Dismisses all active toasts.

```jsx
dismissAll();
```

### Options

All toast functions accept an optional `options` object:

```jsx
{
  duration: 4000,        // Auto-dismiss time in ms (default varies by type)
  position: 'top-right', // Toast position (default: 'top-right')
  // ... other react-hot-toast options
}
```

## Common Use Cases

### Form Validation

```jsx
const validateForm = (data) => {
  if (!data.email) {
    showError("Email required", "Please enter your email address");
    return false;
  }
  
  if (!data.password) {
    showError("Password required", "Please enter your password");
    return false;
  }
  
  return true;
};
```

### API Calls

```jsx
const handleApiCall = async () => {
  const loadingToast = showLoading("Saving changes...");
  
  try {
    const response = await fetch('/api/endpoint');
    const result = await response.json();
    
    dismiss(loadingToast);
    
    if (result.success) {
      showSuccess("Changes saved", "Your profile has been updated");
    } else {
      showError("Save failed", result.message || "Something went wrong");
    }
  } catch (error) {
    dismiss(loadingToast);
    showError("Network error", "Please check your connection");
  }
};
```

### File Uploads

```jsx
const handleFileUpload = async (file) => {
  const loadingToast = showLoading("Uploading track...");
  
  try {
    await uploadFile(file);
    dismiss(loadingToast);
    showSuccess("Upload complete!", "Your track is now being processed");
  } catch (error) {
    dismiss(loadingToast);
    showError("Upload failed", "Please try again or contact support");
  }
};
```

### Authentication

```jsx
const handleLogin = async (credentials) => {
  const loadingToast = showLoading("Signing you in...");
  
  try {
    const result = await signIn(credentials);
    dismiss(loadingToast);
    
    if (result.success) {
      showSuccess("Welcome back!", "You have been signed in successfully");
      navigate("/dashboard");
    } else {
      showError("Login failed", result.error || "Please check your credentials");
    }
  } catch (error) {
    dismiss(loadingToast);
    showError("Unexpected error", "Please try again");
  }
};
```

## Best Practices

### 1. Always dismiss loading toasts
```jsx
const loadingToast = showLoading("Processing...");
try {
  await operation();
  dismiss(loadingToast);
  showSuccess("Done!");
} catch (error) {
  dismiss(loadingToast); // Important!
  showError("Failed");
}
```

### 2. Use descriptive messages
```jsx
// Good
showError("Upload failed", "File size exceeds 50MB limit");

// Bad
showError("Error", "Failed");
```

### 3. Provide actionable information
```jsx
// Good
showError("Login failed", "Please check your email and password");

// Bad
showError("Login failed", "Something went wrong");
```

### 4. Use appropriate toast types
- **Success**: Completed actions, confirmations
- **Error**: Failures, validation errors, network issues
- **Warning**: Destructive actions, unsaved changes, limits
- **Info**: General information, tips, updates
- **Loading**: Any async operation

### 5. Don't overuse toasts
```jsx
// Good - Important feedback
showSuccess("Account created!", "Check your email for verification");

// Bad - Too frequent
showSuccess("Button clicked"); // Every button click
```

## Integration Examples

The toast system is already integrated in:

- ✅ **Signup page** - Registration feedback
- ✅ **Login page** - Authentication feedback  
- ✅ **Dashboard** - Logout confirmation
- ✅ **Admin Dashboard** - Admin logout confirmation

## Customization

To customize toast appearance, modify the toast components in `src/contexts/ToastContext.jsx`:

- `SuccessToast` - Green success styling
- `ErrorToast` - Red error styling
- `WarningToast` - Yellow warning styling
- `InfoToast` - Blue info styling

## Dependencies

- `react-hot-toast` - Core toast library
- `lucide-react` - Icons for toast types

## Migration from Inline Messages

If you have existing inline error/success messages, replace them with toasts:

```jsx
// Before
{error && <div className="error-message">{error}</div>}

// After
// Remove the JSX and use:
showError("Error title", error);
```

This provides a cleaner, more consistent user experience across the entire application.
