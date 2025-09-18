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

// File upload helpers
export const fileHelpers = {
  // Upload file to Supabase Storage
  async uploadFile(bucket, file, path, options = {}) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false,
        ...options
      })
    return { data, error }
  },

  // Get public URL for file
  getPublicUrl(bucket, path) {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path)
    return data.publicUrl
  },

  // Delete file from storage
  async deleteFile(bucket, path) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .remove([path])
    return { data, error }
  },

  // Upload track audio file
  async uploadTrackAudio(file, userId, trackId) {
    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}/${trackId}/audio.${fileExt}`
    
    const { data, error } = await this.uploadFile('tracks', file, fileName)
    if (error) return { data: null, error }
    
    const publicUrl = this.getPublicUrl('tracks', fileName)
    return { data: { path: fileName, url: publicUrl }, error: null }
  },

  // Upload cover art
  async uploadCoverArt(file, userId, trackId) {
    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}/${trackId}/cover.${fileExt}`
    
    const { data, error } = await this.uploadFile('covers', file, fileName)
    if (error) return { data: null, error }
    
    const publicUrl = this.getPublicUrl('covers', fileName)
    return { data: { path: fileName, url: publicUrl }, error: null }
  },

  // Upload avatar
  async uploadAvatar(file, userId) {
    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}/avatar.${fileExt}`
    
    const { data, error } = await this.uploadFile('avatars', file, fileName)
    if (error) return { data: null, error }
    
    const publicUrl = this.getPublicUrl('avatars', fileName)
    return { data: { path: fileName, url: publicUrl }, error: null }
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
  },

  // Get all tracks (admin only)
  async getAllTracks() {
    const { data, error } = await supabase
      .from('tracks_emg')
      .select(`
        *,
        profiles_emg!tracks_emg_artist_id_fkey(username, full_name)
      `)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  // Get total earnings across all users (admin only)
  async getTotalEarnings() {
    const { data, error } = await supabase
      .from('earnings_emg')
      .select('revenue_amount')
    
    if (error) return { data: null, error }
    
    const total = data?.reduce((sum, earning) => sum + (earning.revenue_amount || 0), 0) || 0
    return { data: { total }, error: null }
  },

  // Update user status (admin only)
  async updateUserStatus(userId, isActive) {
    const { data, error } = await supabase
      .from('profiles_emg')
      .update({ is_active: isActive })
      .eq('id', userId)
      .select()
    return { data, error }
  },

  // Update user role (admin only)
  async updateUserRole(userId, role) {
    const { data, error } = await supabase
      .from('profiles_emg')
      .update({ role: role })
      .eq('id', userId)
      .select()
    return { data, error }
  },

  // Delete user (admin only)
  async deleteUser(userId) {
    const { data, error } = await supabase
      .from('profiles_emg')
      .delete()
      .eq('id', userId)
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

  // Create new track
  async createTrack(trackData) {
    const { data, error } = await supabase
      .from('tracks_emg')
      .insert([trackData])
      .select()
      .single()
    return { data, error }
  },

  // Update track
  async updateTrack(trackId, updates) {
    const { data, error } = await supabase
      .from('tracks_emg')
      .update(updates)
      .eq('id', trackId)
      .select()
      .single()
    return { data, error }
  },

  // Delete track
  async deleteTrack(trackId) {
    const { data, error } = await supabase
      .from('tracks_emg')
      .delete()
      .eq('id', trackId)
    return { data, error }
  },

  // Get user's tracks with pagination
  async getUserTracksPaginated(userId, page = 1, limit = 10) {
    const from = (page - 1) * limit
    const to = from + limit - 1
    
    const { data, error, count } = await supabase
      .from('tracks_emg')
      .select('*', { count: 'exact' })
      .eq('artist_id', userId)
      .order('created_at', { ascending: false })
      .range(from, to)
    
    return { data, error, count }
  },

  // Get track analytics
  async getTrackAnalytics(trackId, period = '30d') {
    const { data, error } = await supabase
      .from('track_plays_emg')
      .select('*')
      .eq('track_id', trackId)
      .gte('played_at', this.getDateFromPeriod(period))
      .order('played_at', { ascending: false })
    
    return { data, error }
  },

  // Get user analytics
  async getUserAnalytics(userId, period = '30d') {
    const { data, error } = await supabase
      .from('track_plays_emg')
      .select(`
        *,
        tracks_emg!inner(artist_id)
      `)
      .eq('tracks_emg.artist_id', userId)
      .gte('played_at', this.getDateFromPeriod(period))
      .order('played_at', { ascending: false })
    
    return { data, error }
  },

  // Get user earnings
  async getUserEarningsPaginated(userId, page = 1, limit = 10) {
    const from = (page - 1) * limit
    const to = from + limit - 1
    
    const { data, error, count } = await supabase
      .from('earnings_emg')
      .select('*', { count: 'exact' })
      .eq('artist_id', userId)
      .order('period_start', { ascending: false })
      .range(from, to)
    
    return { data, error, count }
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

  // Update user settings
  async updateUserSettings(userId, updates) {
    const { data, error } = await supabase
      .from('user_settings_emg')
      .upsert({ user_id: userId, ...updates })
      .select()
      .single()
    return { data, error }
  },

  // Get user settings
  async getUserSettings(userId) {
    const { data, error } = await supabase
      .from('user_settings_emg')
      .select('*')
      .eq('user_id', userId)
      .single()
    return { data, error }
  },

  // Create support ticket
  async createSupportTicket(ticketData) {
    const { data, error } = await supabase
      .from('messages_emg')
      .insert([ticketData])
      .select()
      .single()
    return { data, error }
  },

  // Get support tickets (admin)
  async getSupportTickets(page = 1, limit = 10, status = null) {
    const from = (page - 1) * limit
    const to = from + limit - 1
    
    let query = supabase
      .from('messages_emg')
      .select(`
        *,
        profiles_emg!messages_emg_user_id_fkey(username, full_name, email)
      `, { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to)
    
    if (status) {
      query = query.eq('status', status)
    }
    
    const { data, error, count } = await query
    return { data, error, count }
  },

  // Update support ticket
  async updateSupportTicket(ticketId, updates) {
    const { data, error } = await supabase
      .from('messages_emg')
      .update(updates)
      .eq('id', ticketId)
      .select()
      .single()
    return { data, error }
  },

  // Get platform analytics
  async getPlatformAnalytics() {
    const { data: users, error: usersError } = await supabase
      .from('profiles_emg')
      .select('id, created_at, role, is_active')
    
    if (usersError) return { data: null, error: usersError }
    
    const { data: tracks, error: tracksError } = await supabase
      .from('tracks_emg')
      .select('id, created_at, status, play_count')
    
    if (tracksError) return { data: null, error: tracksError }
    
    const { data: earnings, error: earningsError } = await supabase
      .from('earnings_emg')
      .select('revenue_amount, created_at')
    
    if (earningsError) return { data: null, error: earningsError }
    
    // Calculate analytics
    const totalUsers = users?.length || 0
    const activeUsers = users?.filter(u => u.is_active).length || 0
    const totalTracks = tracks?.length || 0
    const approvedTracks = tracks?.filter(t => t.status === 'approved').length || 0
    const totalPlays = tracks?.reduce((sum, t) => sum + (t.play_count || 0), 0) || 0
    const totalRevenue = earnings?.reduce((sum, e) => sum + (e.revenue_amount || 0), 0) || 0
    
    return {
      data: {
        totalUsers,
        activeUsers,
        totalTracks,
        approvedTracks,
        totalPlays,
        totalRevenue,
        userGrowth: 0, // Would need historical data
        trackGrowth: 0, // Would need historical data
        playGrowth: 0, // Would need historical data
        revenueGrowth: 0 // Would need historical data
      },
      error: null
    }
  },

  // Helper function to get date from period
  getDateFromPeriod(period) {
    const now = new Date()
    switch (period) {
      case '7d':
        return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()
      case '30d':
        return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString()
      case '90d':
        return new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000).toISOString()
      case '1y':
        return new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000).toISOString()
      default:
        return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString()
    }
  },

  // =============================================
  // ARTIST-SPECIFIC FUNCTIONS (role = 'user')
  // =============================================

  // Get all artists (users with role = 'user')
  async getAllArtists() {
    const { data, error } = await supabase
      .from('profiles_emg')
      .select('*')
      .eq('role', 'user')
      .order('created_at', { ascending: false })
    return { data, error }
  },

  // Get artist by ID
  async getArtistById(artistId) {
    const { data, error } = await supabase
      .from('profiles_emg')
      .select('*')
      .eq('id', artistId)
      .eq('role', 'user')
      .single()
    return { data, error }
  },

  // Create new artist
  async createArtist(artistData) {
    const { data, error } = await supabase
      .from('profiles_emg')
      .insert([{ ...artistData, role: 'user' }])
      .select()
      .single()
    return { data, error }
  },

  // Update artist profile
  async updateArtist(artistId, updates) {
    const { data, error } = await supabase
      .from('profiles_emg')
      .update(updates)
      .eq('id', artistId)
      .eq('role', 'user')
      .select()
      .single()
    return { data, error }
  },

  // Delete artist
  async deleteArtist(artistId) {
    const { data, error } = await supabase
      .from('profiles_emg')
      .delete()
      .eq('id', artistId)
      .eq('role', 'user')
    return { data, error }
  },

  // Get artist statistics
  async getArtistStats(artistId) {
    // Get artist's tracks count
    const { data: tracks, error: tracksError } = await supabase
      .from('tracks_emg')
      .select('id, play_count, created_at')
      .eq('artist_id', artistId)

    if (tracksError) return { data: null, error: tracksError }

    // Get artist's total plays
    const { data: plays, error: playsError } = await supabase
      .from('track_plays_emg')
      .select('id')
      .in('track_id', tracks?.map(t => t.id) || [])

    if (playsError) return { data: null, error: playsError }

    // Get artist's earnings
    const { data: earnings, error: earningsError } = await supabase
      .from('earnings_emg')
      .select('revenue_amount')
      .eq('artist_id', artistId)

    if (earningsError) return { data: null, error: earningsError }

    const totalTracks = tracks?.length || 0
    const totalPlays = plays?.length || 0
    const totalEarnings = earnings?.reduce((sum, e) => sum + (e.revenue_amount || 0), 0) || 0

    return {
      data: {
        totalTracks,
        totalPlays,
        totalEarnings,
        tracksThisMonth: tracks?.filter(t => {
          const monthAgo = new Date()
          monthAgo.setMonth(monthAgo.getMonth() - 1)
          return new Date(t.created_at) > monthAgo
        }).length || 0
      },
      error: null
    }
  },

  // Get artists with pagination and filters
  async getArtistsPaginated(page = 1, limit = 10, filters = {}) {
    const from = (page - 1) * limit
    const to = from + limit - 1
    
    let query = supabase
      .from('profiles_emg')
      .select('*', { count: 'exact' })
      .eq('role', 'user')
      .order('created_at', { ascending: false })
      .range(from, to)

    // Apply filters
    if (filters.is_active !== undefined) {
      query = query.eq('is_active', filters.is_active)
    }
    if (filters.is_verified !== undefined) {
      query = query.eq('is_verified', filters.is_verified)
    }
    if (filters.subscription_tier) {
      query = query.eq('subscription_tier', filters.subscription_tier)
    }
    if (filters.country) {
      query = query.eq('country', filters.country)
    }

    const { data, error, count } = await query
    return { data, error, count }
  },

  // Search artists
  async searchArtists(searchQuery, limit = 20) {
    const { data, error } = await supabase
      .from('profiles_emg')
      .select('*')
      .eq('role', 'user')
      .or(`username.ilike.%${searchQuery}%,full_name.ilike.%${searchQuery}%,artist_name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%`)
      .limit(limit)
    return { data, error }
  },

  // Get artist's recent activity
  async getArtistActivity(artistId, limit = 10) {
    const { data, error } = await supabase
      .from('tracks_emg')
      .select('id, title, created_at, approval_status')
      .eq('artist_id', artistId)
      .order('created_at', { ascending: false })
      .limit(limit)
    return { data, error }
  },

  // Bulk update artists
  async bulkUpdateArtists(artistIds, updates) {
    const { data, error } = await supabase
      .from('profiles_emg')
      .update(updates)
      .in('id', artistIds)
      .eq('role', 'user')
      .select()
    return { data, error }
  },

  // Get artist analytics summary
  async getArtistAnalyticsSummary() {
    const { data: artists, error: artistsError } = await supabase
      .from('profiles_emg')
      .select('id, created_at, is_active, is_verified, subscription_tier')
      .eq('role', 'user')

    if (artistsError) return { data: null, error: artistsError }

    const totalArtists = artists?.length || 0
    const activeArtists = artists?.filter(a => a.is_active).length || 0
    const verifiedArtists = artists?.filter(a => a.is_verified).length || 0
    const premiumArtists = artists?.filter(a => a.subscription_tier === 'premium').length || 0
    const proArtists = artists?.filter(a => a.subscription_tier === 'pro').length || 0

    // New artists this month
    const monthAgo = new Date()
    monthAgo.setMonth(monthAgo.getMonth() - 1)
    const newThisMonth = artists?.filter(a => new Date(a.created_at) > monthAgo).length || 0

    return {
      data: {
        totalArtists,
        activeArtists,
        verifiedArtists,
        premiumArtists,
        proArtists,
        newThisMonth,
        inactiveArtists: totalArtists - activeArtists
      },
      error: null
    }
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
