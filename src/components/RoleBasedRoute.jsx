import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

// Loading component for role checking
const RoleLoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="w-8 h-8 border-3 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
      <p className="text-gray-600 text-sm">Checking permissions...</p>
    </div>
  </div>
)

// Role-based route protection component
export const RoleBasedRoute = ({ 
  children, 
  requiredRole = 'admin',
  fallbackPath = '/dashboard',
  requireAuth = true 
}) => {
  const { 
    isAuthenticated, 
    isAdmin, 
    isUser, 
    getUserRole, 
    loading, 
    roleLoading,
    getDashboardPath 
  } = useAuth()
  const location = useLocation()

  // Show loading only for initial auth check
  if (loading) {
    return <RoleLoadingSpinner />
  }

  // If auth is required but user is not authenticated
  if (requireAuth && !isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // If user is authenticated but role doesn't match
  if (requireAuth && isAuthenticated()) {
    const userRole = getUserRole()
    
    // Check if user has the required role
    const hasRequiredRole = requiredRole === 'admin' ? isAdmin() : 
                           requiredRole === 'user' ? isUser() : 
                           userRole === requiredRole

    if (!hasRequiredRole) {
      // Redirect to appropriate dashboard based on user's actual role
      const redirectPath = getDashboardPath()
      return <Navigate to={redirectPath} replace />
    }
  }

  // If user is authenticated and has required role, render children
  return children
}

// Convenience components for common use cases
export const AdminRoute = ({ children, fallbackPath = '/dashboard' }) => (
  <RoleBasedRoute requiredRole="admin" fallbackPath={fallbackPath}>
    {children}
  </RoleBasedRoute>
)

export const UserRoute = ({ children, fallbackPath = '/admin/dashboard' }) => (
  <RoleBasedRoute requiredRole="user" fallbackPath={fallbackPath}>
    {children}
  </RoleBasedRoute>
)

export default RoleBasedRoute
