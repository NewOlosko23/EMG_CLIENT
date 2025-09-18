import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Music, Play, Globe, DollarSign, Upload, TrendingUp, Calendar, Target, Sparkles, ArrowRight, RefreshCw } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import { useDashboardData } from "../hooks/useOptimizedData";
import ProfileCompletionBanner from "../components/ProfileCompletionBanner";

const DashboardHomeOptimized = () => {
  const { user } = useAuth();
  const { showError, showSuccess } = useToast();
  const navigate = useNavigate();
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  // Use optimized data hook with caching
  const {
    profile: userProfile,
    dashboardMetrics,
    loading,
    error,
    refreshData,
    cacheStatus
  } = useDashboardData(user?.id);

  useEffect(() => {
    // Check if banner was previously dismissed
    const wasDismissed = localStorage.getItem('profileBannerDismissed');
    if (wasDismissed) {
      setBannerDismissed(true);
    }
  }, []);

  // Reset banner dismissal if profile completion drops below 80%
  useEffect(() => {
    if (userProfile?.profile_completion_percentage < 80) {
      localStorage.removeItem('profileBannerDismissed');
      setBannerDismissed(false);
    }
  }, [userProfile?.profile_completion_percentage]);

  const handleRefresh = async () => {
    try {
      await refreshData();
      setLastRefresh(new Date());
      showSuccess("Data refreshed", "Dashboard data has been updated");
    } catch (err) {
      showError("Refresh failed", "Failed to refresh dashboard data");
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const getDisplayName = () => {
    if (userProfile?.artist_name) return userProfile.artist_name;
    if (userProfile?.username) return userProfile.username;
    if (userProfile?.full_name) return userProfile.full_name;
    return "Artist";
  };

  const handleBannerDismiss = () => {
    setBannerDismissed(true);
    localStorage.setItem('profileBannerDismissed', 'true');
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const getCacheIndicator = (status) => {
    switch (status) {
      case 'cached':
        return <span className="text-green-500 text-xs">●</span>;
      case 'loading':
        return <span className="text-yellow-500 text-xs animate-pulse">●</span>;
      default:
        return <span className="text-gray-400 text-xs">●</span>;
    }
  };

  if (loading && !userProfile) {
    return (
      <div className="space-y-8">
        {/* Loading Welcome Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 rounded-2xl p-8 text-white shadow-2xl">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
          
          <div className="relative z-10">
            <div className="animate-pulse">
              <div className="h-6 bg-purple-400 rounded w-24 mb-4"></div>
              <div className="h-10 bg-purple-400 rounded w-80 mb-3"></div>
              <div className="h-5 bg-purple-400 rounded w-96 mb-6"></div>
              <div className="flex gap-3">
                <div className="h-8 bg-purple-400 rounded w-32"></div>
                <div className="h-8 bg-purple-400 rounded w-32"></div>
                <div className="h-8 bg-purple-400 rounded w-32"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="animate-pulse">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                    <div className="ml-4">
                      <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                      <div className="h-6 bg-gray-200 rounded w-12"></div>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Dashboard</h3>
        <p className="text-gray-500 mb-4">{error}</p>
        <button
          onClick={handleRefresh}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Enhanced Welcome Section with Cache Status */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 rounded-2xl p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Sparkles className="h-6 w-6" />
              </div>
              <span className="text-purple-100 text-sm font-medium">Dashboard</span>
            </div>
            
            {/* Cache Status and Refresh Button */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-xs text-purple-200">
                <span>Cache:</span>
                {getCacheIndicator(cacheStatus.profile)}
                {getCacheIndicator(cacheStatus.tracks)}
                {getCacheIndicator(cacheStatus.analytics)}
                {getCacheIndicator(cacheStatus.earnings)}
              </div>
              <button
                onClick={handleRefresh}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-all duration-200 hover:scale-105"
                title="Refresh Data"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
            {getGreeting()}, {getDisplayName()}! 👋
          </h1>
          <p className="text-purple-100 text-lg mb-6 max-w-2xl">
            Ready to share your music with the world? Let's make today productive and creative!
          </p>
          
          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => navigate('/dashboard/upload')}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-all duration-200 hover:scale-105"
            >
              <Upload className="h-4 w-4" />
              <span className="text-sm font-medium">Upload Music</span>
            </button>
            <button 
              onClick={() => navigate('/dashboard/analytics')}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-all duration-200 hover:scale-105"
            >
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium">View Analytics</span>
            </button>
            <button 
              onClick={() => navigate('/dashboard/promotion')}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-all duration-200 hover:scale-105"
            >
              <Target className="h-4 w-4" />
              <span className="text-sm font-medium">Create Campaign</span>
            </button>
            <button 
              onClick={() => navigate('/dashboard/calendar')}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-all duration-200 hover:scale-105"
            >
              <Calendar className="h-4 w-4" />
              <span className="text-sm font-medium">Calendar</span>
            </button>
          </div>
          
          {/* Last Refresh Time */}
          <div className="mt-4 text-xs text-purple-200">
            Last updated: {lastRefresh.toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Profile Completion Banner */}
      {!bannerDismissed && userProfile && userProfile.profile_completion_percentage < 80 && (
        <ProfileCompletionBanner 
          userProfile={userProfile} 
          onDismiss={handleBannerDismiss}
        />
      )}

      {/* Enhanced Stats Grid with Cache Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <button 
          onClick={() => navigate('/dashboard/music')}
          className="group bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-purple-200 transition-all duration-300 hover:-translate-y-1 w-full text-left"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Music className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-600">Total Tracks</p>
                  {getCacheIndicator(cacheStatus.tracks)}
                </div>
                <p className="text-2xl font-bold text-gray-900">{dashboardMetrics.totalTracks}</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-purple-600 transition-colors duration-300" />
          </div>
        </button>

        <button 
          onClick={() => navigate('/dashboard/analytics')}
          className="group bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-green-200 transition-all duration-300 hover:-translate-y-1 w-full text-left"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-green-100 to-green-200 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Play className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-600">Total Plays</p>
                  {getCacheIndicator(cacheStatus.analytics)}
                </div>
                <p className="text-2xl font-bold text-gray-900">{formatNumber(dashboardMetrics.totalPlays)}</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-green-600 transition-colors duration-300" />
          </div>
        </button>

        <button 
          onClick={() => navigate('/dashboard/analytics')}
          className="group bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-200 transition-all duration-300 hover:-translate-y-1 w-full text-left"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Globe className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-600">Countries</p>
                  {getCacheIndicator(cacheStatus.analytics)}
                </div>
                <p className="text-2xl font-bold text-gray-900">{dashboardMetrics.totalCountries}</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors duration-300" />
          </div>
        </button>

        <button 
          onClick={() => navigate('/dashboard/analytics')}
          className="group bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-yellow-200 transition-all duration-300 hover:-translate-y-1 w-full text-left"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-600">Earnings</p>
                  {getCacheIndicator(cacheStatus.earnings)}
                </div>
                <p className="text-2xl font-bold text-gray-900">${dashboardMetrics.totalEarnings.toFixed(2)}</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-yellow-600 transition-colors duration-300" />
          </div>
        </button>
      </div>

      {/* Top Tracks Section */}
      {dashboardMetrics.topTracks.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Top Performing Tracks</h2>
              <button 
                onClick={() => navigate('/dashboard/music')}
                className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
              >
                View All
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {dashboardMetrics.topTracks.map((track, index) => (
                <div key={track.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-medium text-purple-600">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{track.title}</p>
                      <p className="text-xs text-gray-500">{track.genre}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{track.play_count?.toLocaleString() || 0} plays</p>
                    <p className="text-xs text-gray-500">{track.duration || '0:00'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHomeOptimized;
