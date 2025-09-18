import React, { useState, useEffect } from "react";
import { 
  Users, 
  Music, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  MessageSquare,
  BarChart3,
  Activity,
  Eye,
  Download,
  Award,
  Star,
  Play
} from "lucide-react";
import { dbHelpers } from "../../lib/supabaseClient";

const AdminHome = () => {
  const [stats, setStats] = useState({
    totalArtists: 0,
    activeArtists: 0,
    verifiedArtists: 0,
    totalTracks: 0,
    pendingTracks: 0,
    totalRevenue: 0,
    newArtistsToday: 0,
    premiumArtists: 0,
    proArtists: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load artist analytics
      const { data: artistAnalytics } = await dbHelpers.getArtistAnalyticsSummary();
      
      // Load pending tracks
      const { data: pendingTracks } = await dbHelpers.getPendingTracks();
      
      // Load all tracks for total count
      const { data: allTracks } = await dbHelpers.getAllTracks();
      
      // Load total revenue from earnings
      const { data: totalEarnings } = await dbHelpers.getTotalEarnings();
      
      // Calculate stats
      const newArtistsToday = artistAnalytics?.newThisMonth || 0; // Using monthly for now
      
      setStats({
        totalArtists: artistAnalytics?.totalArtists || 0,
        activeArtists: artistAnalytics?.activeArtists || 0,
        verifiedArtists: artistAnalytics?.verifiedArtists || 0,
        totalTracks: allTracks?.length || 0,
        pendingTracks: pendingTracks?.length || 0,
        totalRevenue: totalEarnings?.total || 0,
        newArtistsToday,
        premiumArtists: artistAnalytics?.premiumArtists || 0,
        proArtists: artistAnalytics?.proArtists || 0
      });

      // Mock recent activity
      setRecentActivity([
        {
          id: 1,
          type: 'artist_signup',
          message: 'New artist registered: john_doe',
          timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
          icon: Users
        },
        {
          id: 2,
          type: 'track_upload',
          message: 'New track uploaded: "Summer Vibes" by artist123',
          timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
          icon: Music
        },
        {
          id: 3,
          type: 'track_approved',
          message: 'Track approved: "Night Drive" by musiclover',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
          icon: CheckCircle
        },
        {
          id: 4,
          type: 'artist_verified',
          message: 'Artist verified: musicpro_artist',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
          icon: Award
        }
      ]);
      
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const getActivityIconColor = (type) => {
    switch (type) {
      case 'artist_signup': return 'text-blue-500';
      case 'track_upload': return 'text-green-500';
      case 'track_approved': return 'text-emerald-500';
      case 'artist_verified': return 'text-purple-500';
      case 'support_ticket': return 'text-orange-500';
      default: return 'text-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="relative space-y-6">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-red-50/30 pointer-events-none"></div>
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)`,
        backgroundSize: '20px 20px'
      }}></div>
      {/* Enhanced Header with Gradient */}
      <div className="relative z-10 bg-gradient-to-br from-white via-red-50/30 to-orange-50/20 p-6 sm:p-8 rounded-2xl border border-gray-200/50 shadow-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-orange-500/5"></div>
        <div className="relative">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                Admin Dashboard
              </h1>
              <p className="text-sm sm:text-base text-gray-600">Welcome back! Here's what's happening with your artists and platform.</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-full border border-gray-200/50 shadow-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">Live</span>
              </div>
          </div>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
        {/* Total Artists Card */}
        <div className="group relative bg-gradient-to-br from-white to-blue-50/30 p-4 sm:p-6 rounded-xl shadow-sm border border-blue-200/50 hover:shadow-lg hover:border-blue-300 hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex flex-col items-center text-center space-y-3">
            <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300">
              <Music className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            </div>
            <div className="space-y-1">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Total Artists</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                {stats.totalArtists.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Active Artists Card */}
        <div className="group relative bg-gradient-to-br from-white to-green-50/30 p-4 sm:p-6 rounded-xl shadow-sm border border-green-200/50 hover:shadow-lg hover:border-green-300 hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex flex-col items-center text-center space-y-3">
            <div className="p-3 bg-gradient-to-br from-green-100 to-green-200 rounded-xl shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300">
              <Activity className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
            </div>
            <div className="space-y-1">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Active Artists</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                {stats.activeArtists.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Verified Artists Card */}
        <div className="group relative bg-gradient-to-br from-white to-purple-50/30 p-4 sm:p-6 rounded-xl shadow-sm border border-purple-200/50 hover:shadow-lg hover:border-purple-300 hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex flex-col items-center text-center space-y-3">
            <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300">
              <Award className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
            </div>
            <div className="space-y-1">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Verified Artists</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                {stats.verifiedArtists.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Pending Tracks Card */}
        <div className="group relative bg-gradient-to-br from-white to-orange-50/30 p-4 sm:p-6 rounded-xl shadow-sm border border-orange-200/50 hover:shadow-lg hover:border-orange-300 hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex flex-col items-center text-center space-y-3">
            <div className="p-3 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300">
              <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
            </div>
            <div className="space-y-1">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Pending Tracks</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                {stats.pendingTracks}
              </p>
            </div>
          </div>
        </div>

        {/* Total Revenue Card */}
        <div className="group relative bg-gradient-to-br from-white to-emerald-50/30 p-4 sm:p-6 rounded-xl shadow-sm border border-emerald-200/50 hover:shadow-lg hover:border-emerald-300 hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex flex-col items-center text-center space-y-3">
            <div className="p-3 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300">
              <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600" />
            </div>
            <div className="space-y-1">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                ${stats.totalRevenue.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* New This Month Card */}
        <div className="group relative bg-gradient-to-br from-white to-red-50/30 p-4 sm:p-6 rounded-xl shadow-sm border border-red-200/50 hover:shadow-lg hover:border-red-300 hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex flex-col items-center text-center space-y-3">
            <div className="p-3 bg-gradient-to-br from-red-100 to-red-200 rounded-xl shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300">
              <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
            </div>
            <div className="space-y-1">
              <p className="text-xs sm:text-sm font-medium text-gray-600">New This Month</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                {stats.newArtistsToday}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Additional Artist Stats */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Premium Artists Card */}
        <div className="group relative bg-gradient-to-br from-white to-yellow-50/30 p-6 sm:p-8 rounded-xl shadow-sm border border-yellow-200/50 hover:shadow-lg hover:border-yellow-300 hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex flex-col items-center text-center space-y-4">
            <div className="p-4 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300">
              <Star className="h-6 w-6 sm:h-7 sm:w-7 text-yellow-600" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600">Premium Artists</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                {stats.premiumArtists.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Pro Artists Card */}
        <div className="group relative bg-gradient-to-br from-white to-indigo-50/30 p-6 sm:p-8 rounded-xl shadow-sm border border-indigo-200/50 hover:shadow-lg hover:border-indigo-300 hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex flex-col items-center text-center space-y-4">
            <div className="p-4 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-xl shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300">
              <Award className="h-6 w-6 sm:h-7 sm:w-7 text-indigo-600" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600">Pro Artists</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                {stats.proArtists.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Total Tracks Card */}
        <div className="group relative bg-gradient-to-br from-white to-pink-50/30 p-6 sm:p-8 rounded-xl shadow-sm border border-pink-200/50 hover:shadow-lg hover:border-pink-300 hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden sm:col-span-2 lg:col-span-1">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex flex-col items-center text-center space-y-4">
            <div className="p-4 bg-gradient-to-br from-pink-100 to-pink-200 rounded-xl shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300">
              <Play className="h-6 w-6 sm:h-7 sm:w-7 text-pink-600" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600">Total Tracks</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                {stats.totalTracks.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Quick Actions */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Enhanced Recent Activity */}
        <div className="relative bg-gradient-to-br from-white via-blue-50/20 to-indigo-50/10 rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5"></div>
          <div className="relative p-6 sm:p-8 border-b border-gray-200/50 bg-gradient-to-r from-white/80 to-blue-50/30 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Recent Activity</h3>
              <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-gray-600">Live</span>
              </div>
            </div>
          </div>
          <div className="relative p-6 sm:p-8">
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="group flex items-start space-x-4 p-4 rounded-xl hover:bg-white/80 hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
                  <div className={`p-3 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300 ${getActivityIconColor(activity.type)} bg-white/50 backdrop-blur-sm`}>
                    <activity.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm sm:text-base font-medium text-gray-900 group-hover:text-gray-700 transition-colors">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1 flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{formatTimeAgo(activity.timestamp)}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Quick Actions */}
        <div className="relative bg-gradient-to-br from-white via-purple-50/20 to-pink-50/10 rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5"></div>
          <div className="relative p-6 sm:p-8 border-b border-gray-200/50 bg-gradient-to-r from-white/80 to-purple-50/30 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Quick Actions</h3>
              <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-gray-600">Ready</span>
              </div>
            </div>
          </div>
          <div className="relative p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button className="group p-4 sm:p-5 text-left border border-orange-200/50 rounded-xl hover:bg-white/80 hover:shadow-lg hover:border-orange-300 transition-all duration-300 hover:scale-105 bg-white/30 backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300">
                    <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm sm:text-base font-medium text-gray-900 group-hover:text-orange-700 transition-colors">Review Tracks</p>
                    <p className="text-xs text-gray-500">{stats.pendingTracks} pending</p>
                  </div>
                </div>
              </button>

              <button className="group p-4 sm:p-5 text-left border border-purple-200/50 rounded-xl hover:bg-white/80 hover:shadow-lg hover:border-purple-300 transition-all duration-300 hover:scale-105 bg-white/30 backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300">
                    <Users className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm sm:text-base font-medium text-gray-900 group-hover:text-purple-700 transition-colors">Manage Artists</p>
                    <p className="text-xs text-gray-500">{stats.totalArtists} total</p>
                  </div>
                </div>
              </button>

              <button className="group p-4 sm:p-5 text-left border border-green-200/50 rounded-xl hover:bg-white/80 hover:shadow-lg hover:border-green-300 transition-all duration-300 hover:scale-105 bg-white/30 backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gradient-to-br from-green-100 to-green-200 rounded-xl shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300">
                    <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm sm:text-base font-medium text-gray-900 group-hover:text-green-700 transition-colors">View Analytics</p>
                    <p className="text-xs text-gray-500">Platform insights</p>
                  </div>
                </div>
              </button>

              <button className="group p-4 sm:p-5 text-left border border-blue-200/50 rounded-xl hover:bg-white/80 hover:shadow-lg hover:border-blue-300 transition-all duration-300 hover:scale-105 bg-white/30 backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300">
                    <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm sm:text-base font-medium text-gray-900 group-hover:text-blue-700 transition-colors">Support Tickets</p>
                    <p className="text-xs text-gray-500">Help users</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
