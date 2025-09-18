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
  Download
} from "lucide-react";
import { dbHelpers } from "../../lib/supabaseClient";

const AdminHome = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTracks: 0,
    pendingTracks: 0,
    totalRevenue: 0,
    activeUsers: 0,
    newUsersToday: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load platform stats
      const { data: platformStats } = await dbHelpers.getPlatformStats();
      
      // Load pending tracks
      const { data: pendingTracks } = await dbHelpers.getPendingTracks();
      
      // Load all users
      const { data: allUsers } = await dbHelpers.getAllUsers();
      
      // Calculate stats
      const today = new Date().toISOString().split('T')[0];
      const newUsersToday = allUsers?.filter(user => 
        user.created_at.startsWith(today)
      ).length || 0;
      
      setStats({
        totalUsers: allUsers?.length || 0,
        totalTracks: 0, // Will be calculated from tracks
        pendingTracks: pendingTracks?.length || 0,
        totalRevenue: 0, // Will be calculated from earnings
        activeUsers: allUsers?.filter(user => user.is_active).length || 0,
        newUsersToday
      });

      // Mock recent activity
      setRecentActivity([
        {
          id: 1,
          type: 'user_signup',
          message: 'New user registered: john_doe',
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
          type: 'support_ticket',
          message: 'New support ticket: Payment issue',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
          icon: MessageSquare
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
      case 'user_signup': return 'text-blue-500';
      case 'track_upload': return 'text-green-500';
      case 'track_approved': return 'text-emerald-500';
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
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening on your platform.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Music className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Tracks</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalTracks.toLocaleString()}</p>
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
            <div className="p-2 bg-purple-100 rounded-lg">
              <Activity className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeUsers.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-cyan-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-cyan-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">New Today</p>
              <p className="text-2xl font-bold text-gray-900">{stats.newUsersToday}</p>
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
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Manage Users</p>
                    <p className="text-xs text-gray-500">{stats.totalUsers} total</p>
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
