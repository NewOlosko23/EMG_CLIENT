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
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your artists and platform.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Music className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Artists</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalArtists.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Activity className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Artists</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeArtists.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Award className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Verified Artists</p>
              <p className="text-2xl font-bold text-gray-900">{stats.verifiedArtists.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Tracks</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingTracks}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-emerald-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-cyan-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-cyan-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">New This Month</p>
              <p className="text-2xl font-bold text-gray-900">{stats.newArtistsToday}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Artist Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Star className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Premium Artists</p>
              <p className="text-2xl font-bold text-gray-900">{stats.premiumArtists.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pro Artists</p>
              <p className="text-2xl font-bold text-gray-900">{stats.proArtists.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Play className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Tracks</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalTracks.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${getActivityIconColor(activity.type)}`}>
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{formatTimeAgo(activity.timestamp)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Clock className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Review Tracks</p>
                    <p className="text-xs text-gray-500">{stats.pendingTracks} pending</p>
                  </div>
                </div>
              </button>

              <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Users className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Manage Artists</p>
                    <p className="text-xs text-gray-500">{stats.totalArtists} total</p>
                  </div>
                </div>
              </button>

              <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <BarChart3 className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">View Analytics</p>
                    <p className="text-xs text-gray-500">Platform insights</p>
                  </div>
                </div>
              </button>

              <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <MessageSquare className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Support Tickets</p>
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
