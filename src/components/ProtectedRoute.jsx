import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

// Simple loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="w-8 h-8 border-3 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
      <p className="text-gray-600 text-sm">Loading...</p>
    </div>
  </div>
)

// Enhanced protected route with role-based redirects
export const ProtectedRoute = ({ children, requireAuth = true }) => {
  const { 
    isAuthenticated, 
    isAdmin, 
    isUser, 
    loading, 
    roleLoading,
    getDashboardPath 
  } = useAuth()
  const location = useLocation()

  // Show loading only for initial auth check, not role loading
  if (loading) {
    return <LoadingSpinner />
  }

  // If auth is required but user is not authenticated
  if (requireAuth && !isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // If user is authenticated but trying to access auth pages (login/signup)
  if (!requireAuth && isAuthenticated()) {
    // Wait for role to be loaded before redirecting
    if (roleLoading) {
      return <LoadingSpinner />
    }
    // Redirect to appropriate dashboard based on role (with fallback)
    const dashboardPath = getDashboardPath()
    return <Navigate to={dashboardPath} replace />
  }

  // Show loading spinner only if we're still fetching role and it's been more than 2 seconds
  if (roleLoading && requireAuth) {
    return <LoadingSpinner />
  }

  return children
}

export default ProtectedRoute
