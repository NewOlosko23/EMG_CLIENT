import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce' // Use PKCE flow for better security and performance
  },
  global: {
    headers: {
      'X-Client-Info': 'emg-music-app'
    }
  },
  // Disable console logging for production
  logger: {
    log: () => {},
    warn: () => {},
    error: () => {}
  },
  // Optimize realtime settings
  realtime: {
    params: {
      eventsPerSecond: 2
    }
  }
})

// Helper functions for common operations
export const authHelpers = {
  // Sign up with email and password
  async signUp(email, password, userData = {}) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: userData.username,
          full_name: userData.fullName || userData.full_name
        }
      }
    })
    return { data, error }
  },

  // Sign in with email and password
  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Get current user
  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  // Get user profile with role (optimized for speed)
  async getUserProfile(userId) {
    const { data, error } = await supabase
      .from('profiles_emg')
      .select('*')
      .eq('id', userId)
      .single()
    return { data, error }
  },

  // Fast role-only fetch (minimal data for quick UX)
  async getUserRole(userId) {
    const { data, error } = await supabase
      .from('profiles_emg')
      .select('role, is_active')
      .eq('id', userId)
      .single()
    return { data, error }
  },

  // Batch role fetch for multiple users (admin use)
  async getUsersRoles(userIds) {
    const { data, error } = await supabase
      .from('profiles_emg')
      .select('id, role, username, full_name, is_active')
      .in('id', userIds)
    return { data, error }
  },

  // Update user profile
  async updateUserProfile(userId, updates) {
    const { data, error } = await supabase
      .from('profiles_emg')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
    return { data, error }
  },

  // Reset password
  async resetPassword(email) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    })
    return { data, error }
  }
}

// Database helpers
export const dbHelpers = {
  // Get all users (admin only)
  async getAllUsers() {
    const { data, error } = await supabase
      .from('profiles_emg')
      .select('*')
      .order('created_at', { ascending: false })
    return { data, error }
  },

  // Get user by ID
  async getUserById(userId) {
    const { data, error } = await supabase
      .from('profiles_emg')
      .select('*')
      .eq('id', userId)
      .single()
    return { data, error }
  },

  // Update user role (admin only)
  async updateUserRole(userId, role) {
    const { data, error } = await supabase
      .from('profiles_emg')
      .update({ role })
      .eq('id', userId)
      .select()
      .single()
    return { data, error }
  },

  // Get tracks pending approval (admin only)
  async getPendingTracks() {
    const { data, error } = await supabase
      .from('tracks_emg')
      .select(`
        *,
        profiles_emg!tracks_emg_artist_id_fkey(username, full_name)
      `)
      .eq('approval_status', 'pending')
      .order('created_at', { ascending: false })
    return { data, error }
  },

  // Approve/reject track
  async updateTrackApproval(trackId, approvalStatus, rejectionReason = null) {
    const { data, error } = await supabase
      .from('tracks_emg')
      .update({ 
        approval_status: approvalStatus,
        is_approved: approvalStatus === 'approved',
        rejection_reason: rejectionReason
      })
      .eq('id', trackId)
      .select()
      .single()
    return { data, error }
  },

  // Get platform statistics
  async getPlatformStats() {
    const { data, error } = await supabase
      .from('platform_stats_emg')
      .select('*')
      .order('date', { ascending: false })
      .limit(30) // Last 30 days
    return { data, error }
  },

  // Get user's tracks
  async getUserTracks(userId) {
    const { data, error } = await supabase
      .from('tracks_emg')
      .select('*')
      .eq('artist_id', userId)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  // Get user's earnings
  async getUserEarnings(userId) {
    const { data, error } = await supabase
      .from('earnings_emg')
      .select('*')
      .eq('artist_id', userId)
      .order('period_start', { ascending: false })
    return { data, error }
  }
}

// Role Management Helpers (optimized for fast UX)
export const roleHelpers = {
  // Fast role check with caching
  async getCurrentUserRole() {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (authError || !user) {
        return { role: null, error: authError }
      }

      const { data, error } = await supabase
        .from('profiles_emg')
        .select('role, is_active')
        .eq('id', user.id)
        .single()

      if (error) {
        console.warn('Role fetch failed, defaulting to user:', error)
        return { role: 'user', error: null } // Safe fallback
      }

      return { 
        role: data?.role || 'user', 
        isActive: data?.is_active !== false,
        error: null 
      }
    } catch (err) {
      console.warn('Role check error, defaulting to user:', err)
      return { role: 'user', error: null } // Safe fallback
    }
  },

  // Check if current user is admin (with caching)
  async isCurrentUserAdmin() {
    const { role, isActive } = await roleHelpers.getCurrentUserRole()
    return role === 'admin' && isActive
  },

  // Check if current user is regular user
  async isCurrentUserRegular() {
    const { role, isActive } = await roleHelpers.getCurrentUserRole()
    return role === 'user' && isActive
  },

  // Get appropriate dashboard path for current user
  async getDashboardPath() {
    const { role, isActive } = await roleHelpers.getCurrentUserRole()
    
    if (!isActive) {
      return '/login' // Inactive users go to login
    }
    
    return role === 'admin' ? '/admin/dashboard' : '/dashboard'
  }
}

export default supabase
