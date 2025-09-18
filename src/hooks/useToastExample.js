// Example usage of the toast system throughout the app
// This file demonstrates how to use the toast notifications in different scenarios

import { useToast } from '../contexts/ToastContext';

// Example usage in a component:
export const useToastExample = () => {
  const { showSuccess, showError, showWarning, showInfo, showLoading, dismiss } = useToast();

  // Example: File upload with progress
  const handleFileUpload = async (file) => {
    const loadingToast = showLoading("Uploading file...");
    
    try {
      // Simulate upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      dismiss(loadingToast);
      showSuccess("File uploaded successfully!", "Your track is now being processed");
    } catch (error) {
      dismiss(loadingToast);
      showError("Upload failed", "Please try again or contact support");
    }
  };

  // Example: Form validation
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

  // Example: API call with different outcomes
  const handleApiCall = async () => {
    const loadingToast = showLoading("Processing request...");
    
    try {
      const response = await fetch('/api/endpoint');
      const result = await response.json();
      
      dismiss(loadingToast);
      
      if (result.success) {
        showSuccess("Operation completed", "Your changes have been saved");
      } else {
        showError("Operation failed", result.message || "Something went wrong");
      }
    } catch (error) {
      dismiss(loadingToast);
      showError("Network error", "Please check your connection and try again");
    }
  };

  // Example: Warning for destructive actions
  const handleDelete = () => {
    showWarning("Are you sure?", "This action cannot be undone", {
      duration: 8000, // Longer duration for important warnings
    });
  };

  // Example: Info notification
  const showInfoMessage = () => {
    showInfo("New feature available", "Check out our latest music discovery tools");
  };

  return {
    handleFileUpload,
    validateForm,
    handleApiCall,
    handleDelete,
    showInfoMessage,
  };
};

// Toast types and their use cases:
/*
SUCCESS TOASTS:
- User registration/login
- File uploads
- Form submissions
- API operations completed
- Settings saved
- Actions completed successfully

ERROR TOASTS:
- Form validation errors
- API errors
- Network issues
- Authentication failures
- File upload failures
- Permission denied

WARNING TOASTS:
- Destructive actions
- Unsaved changes
- Quota limits
- Deprecated features
- Security warnings

INFO TOASTS:
- New features
- System updates
- Tips and hints
- General information
- Status updates

LOADING TOASTS:
- API calls
- File uploads
- Form submissions
- Data processing
- Any async operation
*/
