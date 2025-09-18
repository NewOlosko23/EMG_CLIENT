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
    <div className="space-y-6">
      {/* Minimal Header */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">Admin Dashboard</h1>
            <p className="text-gray-500">Welcome back! Here's what's happening with your artists and platform.</p>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <span className="text-sm text-gray-400">Live</span>
          </div>
        </div>
      </div>

      {/* Minimal Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {/* Total Artists Card */}
        <div className="group bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-200 cursor-pointer">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="p-3 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors duration-200">
              <Music className="h-6 w-6 text-gray-600" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Total Artists</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.totalArtists.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Active Artists Card */}
        <div className="group bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-200 cursor-pointer">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="p-3 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors duration-200">
              <Activity className="h-6 w-6 text-gray-600" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Active Artists</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.activeArtists.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Verified Artists Card */}
        <div className="group bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-200 cursor-pointer">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="p-3 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors duration-200">
              <Award className="h-6 w-6 text-gray-600" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Verified Artists</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.verifiedArtists.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Pending Tracks Card */}
        <div className="group bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-200 cursor-pointer">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="p-3 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors duration-200">
              <Clock className="h-6 w-6 text-gray-600" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Pending Tracks</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.pendingTracks}
              </p>
            </div>
          </div>
        </div>

        {/* Total Revenue Card */}
        <div className="group bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-200 cursor-pointer">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="p-3 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors duration-200">
              <DollarSign className="h-6 w-6 text-gray-600" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                ${stats.totalRevenue.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* New This Month Card */}
        <div className="group bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-200 cursor-pointer">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="p-3 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors duration-200">
              <TrendingUp className="h-6 w-6 text-gray-600" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">New This Month</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.newArtistsToday}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Minimal Additional Artist Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Premium Artists Card */}
        <div className="group bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-200 cursor-pointer">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="p-3 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors duration-200">
              <Star className="h-6 w-6 text-gray-600" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Premium Artists</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.premiumArtists.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Pro Artists Card */}
        <div className="group bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-200 cursor-pointer">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="p-3 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors duration-200">
              <Award className="h-6 w-6 text-gray-600" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Pro Artists</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.proArtists.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Total Tracks Card */}
        <div className="group bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-200 cursor-pointer">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="p-3 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors duration-200">
              <Play className="h-6 w-6 text-gray-600" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Total Tracks</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.totalTracks.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enhanced Recent Activity */}
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="group flex items-start space-x-3 p-3 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-200">
                  <div className={`p-2 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-200 ${getActivityIconColor(activity.type)}`}>
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 group-hover:text-gray-700 transition-colors">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{formatTimeAgo(activity.timestamp)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Quick Actions */}
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <button className="group p-4 text-left border border-gray-200 rounded-xl hover:bg-white hover:shadow-lg hover:border-orange-200 transition-all duration-300 hover:scale-105">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300">
                    <Clock className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 group-hover:text-orange-700 transition-colors">Review Tracks</p>
                    <p className="text-xs text-gray-500">{stats.pendingTracks} pending</p>
                  </div>
                </div>
              </button>

              <button className="group p-4 text-left border border-gray-200 rounded-xl hover:bg-white hover:shadow-lg hover:border-purple-200 transition-all duration-300 hover:scale-105">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300">
                    <Users className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 group-hover:text-purple-700 transition-colors">Manage Artists</p>
                    <p className="text-xs text-gray-500">{stats.totalArtists} total</p>
                  </div>
                </div>
              </button>

              <button className="group p-4 text-left border border-gray-200 rounded-xl hover:bg-white hover:shadow-lg hover:border-green-200 transition-all duration-300 hover:scale-105">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-green-100 to-green-200 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300">
                    <BarChart3 className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 group-hover:text-green-700 transition-colors">View Analytics</p>
                    <p className="text-xs text-gray-500">Platform insights</p>
                  </div>
                </div>
              </button>

              <button className="group p-4 text-left border border-gray-200 rounded-xl hover:bg-white hover:shadow-lg hover:border-blue-200 transition-all duration-300 hover:scale-105">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 group-hover:text-blue-700 transition-colors">Support Tickets</p>
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
