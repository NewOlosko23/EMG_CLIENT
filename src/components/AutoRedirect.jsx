import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="w-8 h-8 border-3 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
      <p className="text-gray-600 text-sm">Redirecting to your dashboard...</p>
    </div>
  </div>
)

// Auto redirect component for authenticated users
export const AutoRedirect = ({ children }) => {
  const { 
    isAuthenticated, 
    getUserRole, 
    loading, 
    roleLoading,
    getDashboardPath 
  } = useAuth()
  const location = useLocation()

  // Show loading while checking authentication and role
  if (loading || roleLoading) {
    return <LoadingSpinner />
  }

  // If user is authenticated, redirect to appropriate dashboard
  if (isAuthenticated()) {
    const userRole = getUserRole()
    const dashboardPath = getDashboardPath()
    
    // Only redirect if we're not already on the correct dashboard
    const currentPath = location.pathname
    
    // Check if user is already on their appropriate dashboard
    const isOnCorrectDashboard = (userRole === 'admin' && currentPath.startsWith('/admin')) ||
                                (userRole === 'user' && currentPath.startsWith('/dashboard'))
    
    if (!isOnCorrectDashboard) {
      return <Navigate to={dashboardPath} replace />
    }
  }

  // If not authenticated or already on correct dashboard, render children
  return children
}

export default AutoRedirect
