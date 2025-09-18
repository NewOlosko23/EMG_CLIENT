import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Music, Play, Globe, DollarSign, Upload, TrendingUp, Calendar, Target, Sparkles, ArrowRight } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import { dbHelpers, authHelpers } from "../lib/supabaseClient";
import ProfileCompletionBanner from "../components/ProfileCompletionBanner";

const DashboardHome = () => {
  const { user } = useAuth();
  const { showError } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [dataFromCache, setDataFromCache] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    totalTracks: 0,
    totalPlays: 0,
    totalCountries: 0,
    totalEarnings: 0,
    recentActivity: []
  });

  useEffect(() => {
    if (user?.id) {
      loadDashboardData();
    }
    
    // Check if banner was previously dismissed
    const wasDismissed = localStorage.getItem('profileBannerDismissed');
    if (wasDismissed) {
      setBannerDismissed(true);
    }
  }, [user?.id]);

  // Reset banner dismissal if profile completion drops below 80%
  useEffect(() => {
    if (userProfile?.profile_completion_percentage < 80) {
      localStorage.removeItem('profileBannerDismissed');
      setBannerDismissed(false);
    }
  }, [userProfile?.profile_completion_percentage]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Check cache first
      const cacheKey = `dashboard_data_${user.id}`;
      const cachedData = localStorage.getItem(cacheKey);
      const cacheTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);
      const now = Date.now();
      const cacheExpiry = 2 * 60 * 1000; // 2 minutes cache
      
      // Use cached data if it's still valid
      if (cachedData && cacheTimestamp && (now - parseInt(cacheTimestamp)) < cacheExpiry) {
        const parsedData = JSON.parse(cachedData);
        setUserProfile(parsedData.profile);
        setDashboardData(parsedData.dashboardData);
        setDataFromCache(true);
        setLoading(false);
        return;
      }
      
      setDataFromCache(false);
      
      // Load user profile
      const { data: profile, error: profileError } = await authHelpers.getUserProfile(user.id);
      if (profileError) console.error('Error fetching user profile:', profileError);
      setUserProfile(profile);
      
      // Load user's tracks
      const { data: tracks, error: tracksError } = await dbHelpers.getUserTracks(user.id);
      if (tracksError) throw tracksError;

      // Load user's earnings
      const { data: earnings, error: earningsError } = await dbHelpers.getUserEarnings(user.id);
      if (earningsError) throw earningsError;

      // Load user's analytics
      const { data: analytics, error: analyticsError } = await dbHelpers.getUserAnalytics(user.id, '30d');
      if (analyticsError) throw analyticsError;

      // Calculate stats
      const totalTracks = tracks?.length || 0;
      const totalEarnings = earnings?.reduce((sum, earning) => sum + (earning.revenue_amount || 0), 0) || 0;
      
      // Calculate total plays from analytics
      const totalPlays = analytics?.length || 0;
      
      // Get unique countries from analytics
      const countries = new Set(analytics?.map(play => play.country).filter(Boolean) || []);
      const totalCountries = countries.size;

      // Generate recent activity
      const recentActivity = generateRecentActivity(tracks, earnings, analytics);

      const newDashboardData = {
        totalTracks,
        totalPlays,
        totalCountries,
        totalEarnings,
        recentActivity
      };

      setDashboardData(newDashboardData);

      // Cache the data
      const dataToCache = {
        profile,
        dashboardData: newDashboardData
      };
      localStorage.setItem(cacheKey, JSON.stringify(dataToCache));
      localStorage.setItem(`${cacheKey}_timestamp`, now.toString());

    } catch (error) {
      console.error('Error loading dashboard data:', error);
      showError('Error loading dashboard', 'Failed to load your dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const generateRecentActivity = (tracks, earnings, analytics) => {
    const activities = [];

    // Add recent track uploads
    if (tracks && tracks.length > 0) {
      const recentTracks = tracks.slice(0, 2);
      recentTracks.forEach(track => {
        activities.push({
          type: 'upload',
          title: 'New track uploaded',
          description: `"${track.title}" - ${getTimeAgo(track.created_at)}`,
          icon: Upload,
          color: 'green'
        });
      });
    }

    // Add recent earnings
    if (earnings && earnings.length > 0) {
      const recentEarnings = earnings.slice(0, 1);
      recentEarnings.forEach(earning => {
        activities.push({
          type: 'earnings',
          title: 'Payment received',
          description: `$${earning.revenue_amount} from streaming royalties - ${getTimeAgo(earning.created_at)}`,
          icon: DollarSign,
          color: 'purple'
        });
      });
    }

    // Add play milestones (mock data for now)
    if (analytics && analytics.length > 0) {
      activities.push({
        type: 'milestone',
        title: 'Play milestone reached',
        description: `Your tracks have been played ${analytics.length} times this month`,
        icon: TrendingUp,
        color: 'blue'
      });
    }

    return activities.slice(0, 3); // Show max 3 activities
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return date.toLocaleDateString();
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

  if (loading) {
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

        {/* Loading Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-32"></div>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 p-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-xl animate-pulse"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-32 mb-2 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-48 mb-1 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

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
    // Store dismissal in localStorage to persist across sessions
    localStorage.setItem('profileBannerDismissed', 'true');
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Welcome Section */}
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
            
            {/* Cache Status Indicator */}
            {dataFromCache && (
              <div className="flex items-center gap-2 px-3 py-1 bg-white/20 rounded-lg backdrop-blur-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-purple-100 text-xs font-medium">Cached</span>
              </div>
            )}
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
        </div>
      </div>

      {/* Profile Completion Banner */}
      {!bannerDismissed && userProfile && userProfile.profile_completion_percentage < 80 && (
        <ProfileCompletionBanner 
          userProfile={userProfile} 
          onDismiss={handleBannerDismiss}
        />
      )}

      {/* Enhanced Stats Grid */}
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
                <p className="text-sm font-medium text-gray-600">Total Tracks</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.totalTracks}</p>
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
                <p className="text-sm font-medium text-gray-600">Total Plays</p>
                <p className="text-2xl font-bold text-gray-900">{formatNumber(dashboardData.totalPlays)}</p>
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
                <p className="text-sm font-medium text-gray-600">Countries</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.totalCountries}</p>
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
                <p className="text-sm font-medium text-gray-600">Earnings</p>
                <p className="text-2xl font-bold text-gray-900">${dashboardData.totalEarnings.toFixed(2)}</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-yellow-600 transition-colors duration-300" />
          </div>
        </button>
      </div>

      {/* Enhanced Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
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
          {dashboardData.recentActivity.length > 0 ? (
            <div className="space-y-4">
              {dashboardData.recentActivity.map((activity, index) => (
                <div key={index} className="group flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className={`p-3 bg-gradient-to-br from-${activity.color}-100 to-${activity.color}-200 rounded-xl group-hover:scale-105 transition-transform duration-200`}>
                    <activity.icon className={`h-5 w-5 text-${activity.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.description}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Music className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No recent activity</h3>
              <p className="text-gray-500 mb-4">Start your musical journey by uploading your first track!</p>
              <button 
                onClick={() => navigate('/dashboard/upload')}
                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
              >
                <Upload className="h-4 w-4" />
                Upload Music
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
