import React, { createContext, useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { CheckCircle, AlertCircle, Info, XCircle } from 'lucide-react';

const ToastContext = createContext({});

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Custom toast components
const SuccessToast = ({ message, description }) => (
  <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-lg border border-green-200 max-w-md">
    <div className="flex-shrink-0">
      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
        <CheckCircle className="w-5 h-5 text-green-600" />
      </div>
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold text-gray-900">{message}</p>
      {description && (
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      )}
    </div>
  </div>
);

const ErrorToast = ({ message, description }) => (
  <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-lg border border-red-200 max-w-md">
    <div className="flex-shrink-0">
      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
        <XCircle className="w-5 h-5 text-red-600" />
      </div>
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold text-gray-900">{message}</p>
      {description && (
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      )}
    </div>
  </div>
);

const WarningToast = ({ message, description }) => (
  <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-lg border border-yellow-200 max-w-md">
    <div className="flex-shrink-0">
      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
        <AlertCircle className="w-5 h-5 text-yellow-600" />
      </div>
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold text-gray-900">{message}</p>
      {description && (
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      )}
    </div>
  </div>
);

const InfoToast = ({ message, description }) => (
  <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-lg border border-blue-200 max-w-md">
    <div className="flex-shrink-0">
      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
        <Info className="w-5 h-5 text-blue-600" />
      </div>
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold text-gray-900">{message}</p>
      {description && (
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      )}
    </div>
  </div>
);

export const ToastProvider = ({ children }) => {
  const showSuccess = (message, description = null, options = {}) => {
    // Shorter duration for authentication-related messages
    const isAuthMessage = message.toLowerCase().includes('welcome') || 
                         message.toLowerCase().includes('signed out') || 
                         message.toLowerCase().includes('logged out') ||
                         message.toLowerCase().includes('signed in') ||
                         message.toLowerCase().includes('logged in') ||
                         message.toLowerCase().includes('signup') ||
                         message.toLowerCase().includes('registered');
    
    return toast.custom(
      () => <SuccessToast message={message} description={description} />,
      {
        duration: isAuthMessage ? 1200 : 1500,
        position: 'top-right',
        ...options,
      }
    );
  };

  const showError = (message, description = null, options = {}) => {
    // Shorter duration for authentication-related error messages
    const isAuthError = message.toLowerCase().includes('login') || 
                       message.toLowerCase().includes('logout') || 
                       message.toLowerCase().includes('sign in') ||
                       message.toLowerCase().includes('sign out') ||
                       message.toLowerCase().includes('signup') ||
                       message.toLowerCase().includes('authentication') ||
                       message.toLowerCase().includes('credentials') ||
                       message.toLowerCase().includes('password');
    
    return toast.custom(
      () => <ErrorToast message={message} description={description} />,
      {
        duration: isAuthError ? 1800 : 2000,
        position: 'top-right',
        ...options,
      }
    );
  };

  const showWarning = (message, description = null, options = {}) => {
    return toast.custom(
      () => <WarningToast message={message} description={description} />,
      {
        duration: 2000,
        position: 'top-right',
        ...options,
      }
    );
  };

  const showInfo = (message, description = null, options = {}) => {
    return toast.custom(
      () => <InfoToast message={message} description={description} />,
      {
        duration: 1500,
        position: 'top-right',
        ...options,
      }
    );
  };

  const showLoading = (message, options = {}) => {
    return toast.loading(message, {
      position: 'top-right',
      ...options,
    });
  };

  const dismiss = (toastId) => {
    toast.dismiss(toastId);
  };

  const dismissAll = () => {
    toast.dismiss();
  };

  const value = {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showLoading,
    dismiss,
    dismissAll,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Default options for all toasts
          duration: 1500,
          style: {
            background: 'transparent',
            boxShadow: 'none',
            padding: 0,
          },
          // Success toast options
          success: {
            duration: 1200,
            style: {
              background: 'transparent',
              boxShadow: 'none',
              padding: 0,
            },
          },
          // Error toast options
          error: {
            duration: 1800,
            style: {
              background: 'transparent',
              boxShadow: 'none',
              padding: 0,
            },
          },
        }}
      />
    </ToastContext.Provider>
  );
};

export default ToastContext;
