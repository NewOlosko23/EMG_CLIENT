import { useState, useEffect, useCallback, useRef } from 'react';

// Cache configuration
const CACHE_CONFIG = {
  // Cache durations in milliseconds
  USER_PROFILE: 5 * 60 * 1000, // 5 minutes
  USER_TRACKS: 2 * 60 * 1000, // 2 minutes
  ANALYTICS: 1 * 60 * 1000, // 1 minute
  EARNINGS: 5 * 60 * 1000, // 5 minutes
  PLATFORM_STATS: 10 * 60 * 1000, // 10 minutes
  NOTIFICATIONS: 30 * 1000, // 30 seconds
};

// In-memory cache store
const cacheStore = new Map();
const cacheTimestamps = new Map();

// Cache utility functions
const isCacheValid = (key, duration) => {
  const timestamp = cacheTimestamps.get(key);
  if (!timestamp) return false;
  return Date.now() - timestamp < duration;
};

const setCache = (key, data, duration) => {
  cacheStore.set(key, data);
  cacheTimestamps.set(key, Date.now());
  
  // Auto-cleanup expired cache
  setTimeout(() => {
    if (cacheStore.has(key) && !isCacheValid(key, duration)) {
      cacheStore.delete(key);
      cacheTimestamps.delete(key);
    }
  }, duration);
};

const getCache = (key, duration) => {
  if (isCacheValid(key, duration)) {
    return cacheStore.get(key);
  }
  return null;
};

// Custom hook for caching
export const useCache = () => {
  const [cacheStats, setCacheStats] = useState({
    hits: 0,
    misses: 0,
    size: 0
  });

  const updateStats = useCallback(() => {
    setCacheStats({
      hits: cacheStore.size,
      misses: 0, // This would need to be tracked separately
      size: cacheStore.size
    });
  }, []);

  const get = useCallback((key, duration) => {
    const data = getCache(key, duration);
    updateStats();
    return data;
  }, [updateStats]);

  const set = useCallback((key, data, duration) => {
    setCache(key, data, duration);
    updateStats();
  }, [updateStats]);

  const invalidate = useCallback((pattern) => {
    if (pattern === '*') {
      cacheStore.clear();
      cacheTimestamps.clear();
    } else {
      // Pattern-based invalidation
      for (const key of cacheStore.keys()) {
        if (key.includes(pattern)) {
          cacheStore.delete(key);
          cacheTimestamps.delete(key);
        }
      }
    }
    updateStats();
  }, [updateStats]);

  const clear = useCallback(() => {
    cacheStore.clear();
    cacheTimestamps.clear();
    updateStats();
  }, [updateStats]);

  return {
    get,
    set,
    invalidate,
    clear,
    stats: cacheStats
  };
};

// Specialized hooks for different data types
export const useUserProfileCache = () => {
  const cache = useCache();
  
  const getUserProfile = useCallback(async (userId, fetchFn) => {
    const cacheKey = `user_profile_${userId}`;
    const cached = cache.get(cacheKey, CACHE_CONFIG.USER_PROFILE);
    
    if (cached) {
      return { data: cached, fromCache: true };
    }
    
    const result = await fetchFn();
    if (result.data) {
      cache.set(cacheKey, result.data, CACHE_CONFIG.USER_PROFILE);
    }
    
    return { ...result, fromCache: false };
  }, [cache]);

  const invalidateUserProfile = useCallback((userId) => {
    cache.invalidate(`user_profile_${userId}`);
  }, [cache]);

  return { getUserProfile, invalidateUserProfile };
};

export const useTracksCache = () => {
  const cache = useCache();
  
  const getUserTracks = useCallback(async (userId, fetchFn) => {
    const cacheKey = `user_tracks_${userId}`;
    const cached = cache.get(cacheKey, CACHE_CONFIG.USER_TRACKS);
    
    if (cached) {
      return { data: cached, fromCache: true };
    }
    
    const result = await fetchFn();
    if (result.data) {
      cache.set(cacheKey, result.data, CACHE_CONFIG.USER_TRACKS);
    }
    
    return { ...result, fromCache: false };
  }, [cache]);

  const invalidateUserTracks = useCallback((userId) => {
    cache.invalidate(`user_tracks_${userId}`);
  }, [cache]);

  return { getUserTracks, invalidateUserTracks };
};

export const useAnalyticsCache = () => {
  const cache = useCache();
  
  const getAnalytics = useCallback(async (userId, period, fetchFn) => {
    const cacheKey = `analytics_${userId}_${period}`;
    const cached = cache.get(cacheKey, CACHE_CONFIG.ANALYTICS);
    
    if (cached) {
      return { data: cached, fromCache: true };
    }
    
    const result = await fetchFn();
    if (result.data) {
      cache.set(cacheKey, result.data, CACHE_CONFIG.ANALYTICS);
    }
    
    return { ...result, fromCache: false };
  }, [cache]);

  const invalidateAnalytics = useCallback((userId) => {
    cache.invalidate(`analytics_${userId}`);
  }, [cache]);

  return { getAnalytics, invalidateAnalytics };
};

export const useEarningsCache = () => {
  const cache = useCache();
  
  const getEarnings = useCallback(async (userId, fetchFn) => {
    const cacheKey = `earnings_${userId}`;
    const cached = cache.get(cacheKey, CACHE_CONFIG.EARNINGS);
    
    if (cached) {
      return { data: cached, fromCache: true };
    }
    
    const result = await fetchFn();
    if (result.data) {
      cache.set(cacheKey, result.data, CACHE_CONFIG.EARNINGS);
    }
    
    return { ...result, fromCache: false };
  }, [cache]);

  const invalidateEarnings = useCallback((userId) => {
    cache.invalidate(`earnings_${userId}`);
  }, [cache]);

  return { getEarnings, invalidateEarnings };
};

// Cache management hook for admin/debugging
export const useCacheManagement = () => {
  const cache = useCache();
  
  const getCacheInfo = useCallback(() => {
    const info = {};
    for (const [key, value] of cacheStore.entries()) {
      const timestamp = cacheTimestamps.get(key);
      const age = Date.now() - timestamp;
      info[key] = {
        size: JSON.stringify(value).length,
        age: Math.round(age / 1000), // seconds
        timestamp: new Date(timestamp).toISOString()
      };
    }
    return info;
  }, []);

  return {
    ...cache,
    getCacheInfo,
    config: CACHE_CONFIG
  };
};
