import { useState, useEffect, useCallback, useMemo } from 'react';
import { useUserProfileCache, useTracksCache, useAnalyticsCache, useEarningsCache } from './useCache';
import { dbHelpers, authHelpers } from '../lib/supabaseClient';

// Optimized data fetching hook that combines caching with smart loading
export const useOptimizedData = (userId) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    profile: null,
    tracks: [],
    analytics: [],
    earnings: [],
    stats: {
      totalTracks: 0,
      totalPlays: 0,
      totalEarnings: 0,
      totalCountries: 0
    }
  });

  // Cache hooks
  const { getUserProfile, invalidateUserProfile } = useUserProfileCache();
  const { getUserTracks, invalidateUserTracks } = useTracksCache();
  const { getAnalytics, invalidateAnalytics } = useAnalyticsCache();
  const { getEarnings, invalidateEarnings } = useEarningsCache();

  // Memoized fetch functions to prevent unnecessary re-renders
  const fetchProfile = useCallback(async () => {
    return getUserProfile(userId, () => authHelpers.getUserProfile(userId));
  }, [userId, getUserProfile]);

  const fetchTracks = useCallback(async () => {
    return getUserTracks(userId, () => dbHelpers.getUserTracks(userId));
  }, [userId, getUserTracks]);

  const fetchAnalytics = useCallback(async () => {
    return getAnalytics(userId, '30d', () => dbHelpers.getUserAnalytics(userId, '30d'));
  }, [userId, getAnalytics]);

  const fetchEarnings = useCallback(async () => {
    return getEarnings(userId, () => dbHelpers.getUserEarnings(userId));
  }, [userId, getEarnings]);

  // Load all data with caching
  const loadData = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading(true);
      setError(null);

      // Fetch all data in parallel for better performance
      const [profileResult, tracksResult, analyticsResult, earningsResult] = await Promise.allSettled([
        fetchProfile(),
        fetchTracks(),
        fetchAnalytics(),
        fetchEarnings()
      ]);

      // Process results
      const profile = profileResult.status === 'fulfilled' ? profileResult.value.data : null;
      const tracks = tracksResult.status === 'fulfilled' ? tracksResult.value.data : [];
      const analytics = analyticsResult.status === 'fulfilled' ? analyticsResult.value.data : [];
      const earnings = earningsResult.status === 'fulfilled' ? earningsResult.value.data : [];

      // Calculate stats
      const totalTracks = tracks?.length || 0;
      const totalEarnings = earnings?.reduce((sum, earning) => sum + (earning.revenue_amount || 0), 0) || 0;
      const totalPlays = analytics?.length || 0;
      const countries = new Set(analytics?.map(play => play.country).filter(Boolean) || []);
      const totalCountries = countries.size;

      setData({
        profile,
        tracks,
        analytics,
        earnings,
        stats: {
          totalTracks,
          totalPlays,
          totalEarnings,
          totalCountries
        }
      });

    } catch (err) {
      console.error('Error loading optimized data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userId, fetchProfile, fetchTracks, fetchAnalytics, fetchEarnings]);

  // Invalidate specific cache entries
  const invalidateCache = useCallback((type) => {
    switch (type) {
      case 'profile':
        invalidateUserProfile(userId);
        break;
      case 'tracks':
        invalidateUserTracks(userId);
        break;
      case 'analytics':
        invalidateAnalytics(userId);
        break;
      case 'earnings':
        invalidateEarnings(userId);
        break;
      case 'all':
        invalidateUserProfile(userId);
        invalidateUserTracks(userId);
        invalidateAnalytics(userId);
        invalidateEarnings(userId);
        break;
    }
  }, [userId, invalidateUserProfile, invalidateUserTracks, invalidateAnalytics, invalidateEarnings]);

  // Refresh data (force reload from server)
  const refreshData = useCallback(async () => {
    invalidateCache('all');
    await loadData();
  }, [invalidateCache, loadData]);

  // Load data on mount and when userId changes
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Memoized computed values
  const computedStats = useMemo(() => {
    const { tracks, analytics, earnings } = data;
    
    // Calculate additional stats
    const topTracks = tracks
      ?.sort((a, b) => (b.play_count || 0) - (a.play_count || 0))
      ?.slice(0, 5) || [];

    const topCountries = analytics
      ?.reduce((acc, play) => {
        if (play.country) {
          acc[play.country] = (acc[play.country] || 0) + 1;
        }
        return acc;
      }, {}) || {};

    const sortedCountries = Object.entries(topCountries)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([country, plays]) => ({ country, plays }));

    return {
      topTracks,
      topCountries: sortedCountries,
      averageEarningsPerTrack: data.stats.totalTracks > 0 ? data.stats.totalEarnings / data.stats.totalTracks : 0
    };
  }, [data]);

  return {
    ...data,
    computedStats,
    loading,
    error,
    refreshData,
    invalidateCache,
    // Cache status indicators
    cacheStatus: {
      profile: data.profile ? 'cached' : 'loading',
      tracks: data.tracks.length > 0 ? 'cached' : 'loading',
      analytics: data.analytics.length > 0 ? 'cached' : 'loading',
      earnings: data.earnings.length > 0 ? 'cached' : 'loading'
    }
  };
};

// Hook for dashboard-specific optimized data
export const useDashboardData = (userId) => {
  const optimizedData = useOptimizedData(userId);
  
  const dashboardMetrics = useMemo(() => {
    const { stats, computedStats } = optimizedData;
    
    return {
      // Main metrics
      totalTracks: stats.totalTracks,
      totalPlays: stats.totalPlays,
      totalEarnings: stats.totalEarnings,
      totalCountries: stats.totalCountries,
      
      // Additional insights
      topTracks: computedStats.topTracks,
      topCountries: computedStats.topCountries,
      averageEarningsPerTrack: computedStats.averageEarningsPerTrack,
      
      // Growth indicators (mock for now - would need historical data)
      playGrowth: Number((Math.random() * 20 - 5).toFixed(1)),
      earningsGrowth: Number((Math.random() * 30 - 5).toFixed(1)),
      trackGrowth: Number((Math.random() * 15 - 5).toFixed(1))
    };
  }, [optimizedData]);

  return {
    ...optimizedData,
    dashboardMetrics
  };
};

// Hook for analytics-specific optimized data
export const useAnalyticsData = (userId, period = '30d') => {
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const { getAnalytics, invalidateAnalytics } = useAnalyticsCache();

  const loadAnalytics = useCallback(async () => {
    if (!userId) return { data: [], error: null };

    try {
      setAnalyticsLoading(true);
      const result = await getAnalytics(userId, period, () => dbHelpers.getUserAnalytics(userId, period));
      return { data: result.data || [], error: null };
    } catch (err) {
      return { data: [], error: err.message };
    } finally {
      setAnalyticsLoading(false);
    }
  }, [userId, period, getAnalytics]);

  const refreshAnalytics = useCallback(async () => {
    invalidateAnalytics(userId);
    return loadAnalytics();
  }, [userId, invalidateAnalytics, loadAnalytics]);

  return {
    loadAnalytics,
    refreshAnalytics,
    loading: analyticsLoading
  };
};
