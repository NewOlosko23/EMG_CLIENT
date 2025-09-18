import React, { createContext, useContext, useEffect, useState, useRef } from 'react'
import { supabase, authHelpers, roleHelpers } from '../lib/supabaseClient'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userRole, setUserRole] = useState(null)
  const [roleLoading, setRoleLoading] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const fetchingRoleRef = useRef(false)
  
  // Fast role fetching function (direct database call to avoid loops)
  const fetchUserRole = async (userId) => {
    if (!userId) {
      setUserRole(null)
      return
    }

    // Prevent multiple simultaneous fetches using ref
    if (fetchingRoleRef.current) {
      return
    }

    fetchingRoleRef.current = true
    setRoleLoading(true)
    
    try {
      // Direct database call using the userId parameter to avoid auth loops
      const { data, error } = await supabase
        .from('profiles_emg')
        .select('role, is_active')
        .eq('id', userId)
        .single()
      
      if (error) {
        console.warn('Role fetch error:', error)
        setUserRole('user') // Safe fallback
      } else {
        const role = data?.role || 'user'
        const isActive = data?.is_active !== false
        setUserRole(isActive ? role : null)
        
        // Console log the user's role for debugging
        console.log('✅ User authenticated - Role:', role, '| Active:', isActive, '| User ID:', userId)
      }
    } catch (err) {
      console.warn('Role fetch exception:', err)
      setUserRole('user') // Safe fallback
    } finally {
      setRoleLoading(false)
      fetchingRoleRef.current = false
    }
  }

  // Simplified auth initialization with separate role fetching
  useEffect(() => {
    let mounted = true

    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (mounted) {
          setUser(session?.user || null)
          setLoading(false)
        }
      } catch (error) {
        console.error('Initial session error:', error)
        if (mounted) {
          setLoading(false)
        }
      }
    }

    getInitialSession()

    // Listen for auth changes (without role fetching to prevent loops)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return
        
        setUser(session?.user || null)
        
        if (!session?.user) {
          setUserRole(null)
          console.log('User logged out - role cleared')
        }
        
        setLoading(false)
      }
    )

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, []) // Empty dependency array to run only once

  // Separate effect for role fetching (only when user changes)
  useEffect(() => {
    if (user?.id && !fetchingRoleRef.current) {
      fetchUserRole(user.id)
    } else if (!user && userRole !== null) {
      // Only log when user was previously set and now cleared (actual logout)
      setUserRole(null)
      console.log('User logged out - role cleared')
    } else if (!user) {
      // Just clear role without logging (initial load)
      setUserRole(null)
    }
  }, [user?.id]) // Only depend on user ID to prevent loops


  // Sign up function
  const signUp = async (email, password, userData) => {
    try {
      setLoading(true)
      setError(null)
      
      const { data, error } = await authHelpers.signUp(email, password, userData)
      
      if (error) {
        setError(error.message)
        return { success: false, error: error.message }
      }

      return { success: true, data }
    } catch (err) {
      const errorMessage = err.message || 'An error occurred during signup'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  // Sign in function
  const signIn = async (email, password) => {
    try {
      setLoading(true)
      setError(null)
      
      const { data, error } = await authHelpers.signIn(email, password)
      
      if (error) {
        setError(error.message)
        return { success: false, error: error.message }
      }

      return { success: true, data }
    } catch (err) {
      const errorMessage = err.message || 'An error occurred during signin'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  // Sign out function
  const signOut = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const { error } = await authHelpers.signOut()
      
      if (error) {
        setError(error.message)
        return { success: false, error: error.message }
      }

      setUser(null)
      return { success: true }
    } catch (err) {
      const errorMessage = err.message || 'An error occurred during signout'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  // Reset password function
  const resetPassword = async (email) => {
    try {
      setLoading(true)
      setError(null)
      
      const { data, error } = await authHelpers.resetPassword(email)
      
      if (error) {
        setError(error.message)
        return { success: false, error: error.message }
      }

      return { success: true, data }
    } catch (err) {
      const errorMessage = err.message || 'An error occurred during password reset'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  // Helper functions
  const isAuthenticated = () => !!user
  const getUserId = () => user?.id
  const getUserEmail = () => user?.email
  const getUserName = () => user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'

  // Role-based helper functions
  const isAdmin = () => userRole === 'admin'
  const isUser = () => userRole === 'user'
  const getUserRole = () => userRole
  const isRoleLoading = () => roleLoading

  // Get appropriate dashboard path based on role
  const getDashboardPath = () => {
    if (!user) return '/login'
    if (userRole === 'admin') return '/admin/dashboard'
    return '/dashboard'
  }

  // Clear error function
  const clearError = () => setError(null)

  const value = {
    // State
    user,
    userRole,
    loading,
    roleLoading,
    error,
    
    // Auth functions
    signUp,
    signIn,
    signOut,
    resetPassword,
    
    // Helper functions
    isAuthenticated,
    getUserId,
    getUserEmail,
    getUserName,
    clearError,
    
    // Role-based functions
    isAdmin,
    isUser,
    getUserRole,
    isRoleLoading,
    getDashboardPath
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
