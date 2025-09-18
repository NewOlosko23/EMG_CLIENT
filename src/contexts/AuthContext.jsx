import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase, authHelpers } from '../lib/supabaseClient'

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
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Simple auth initialization
  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user || null)
      setLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])


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

  // Clear error function
  const clearError = () => setError(null)

  const value = {
    // State
    user,
    loading,
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
    clearError
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
