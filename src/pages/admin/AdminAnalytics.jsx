import React, { useState, useEffect } from "react";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Music, 
  DollarSign, 
  Play, 
  Download,
  Calendar,
  Filter,
  RefreshCw,
  Eye,
  Globe,
  Smartphone,
  Monitor,
  Headphones,
  Clock,
  Star,
  Activity,
  CheckCircle,
  X
} from "lucide-react";
import { dbHelpers } from "../../lib/supabaseClient";
import { useToast } from "../../contexts/ToastContext";

const AdminAnalytics = () => {
  const { showToast } = useToast();
  const [timeRange, setTimeRange] = useState("30d");
  const [loading, setLoading] = useState(false);
  const [analyticsData, setAnalyticsData] = useState({
    overview: {
      totalUsers: 0,
      totalTracks: 0,
      totalPlays: 0,
      totalRevenue: 0,
      userGrowth: 0,
      trackGrowth: 0,
      playGrowth: 0,
      revenueGrowth: 0
    },
    userStats: {
      newUsers: 0,
      activeUsers: 0,
      premiumUsers: 0,
      userRetention: 0
    },
    contentStats: {
      tracksUploaded: 0,
      tracksApproved: 0,
      tracksRejected: 0,
      averageRating: 0
    },
    revenueStats: {
      monthlyRevenue: 0,
      subscriptionRevenue: 0,
      commissionRevenue: 0,
      averageRevenuePerUser: 0
    }
  });

  const [chartData, setChartData] = useState({
    userGrowth: [
      { month: 'Jan', users: 1200, growth: 5.2 },
      { month: 'Feb', users: 1350, growth: 12.5 },
      { month: 'Mar', users: 1520, growth: 12.6 },
      { month: 'Apr', users: 1680, growth: 10.5 },
      { month: 'May', users: 1890, growth: 12.5 },
      { month: 'Jun', users: 2100, growth: 11.1 }
    ],
    revenue: [
      { month: 'Jan', revenue: 8500, growth: 8.2 },
      { month: 'Feb', revenue: 9200, growth: 8.2 },
      { month: 'Mar', revenue: 10100, growth: 9.8 },
      { month: 'Apr', revenue: 11200, growth: 10.9 },
      { month: 'May', revenue: 11800, growth: 5.4 },
      { month: 'Jun', revenue: 12450, growth: 5.5 }
    ],
    topGenres: [
      { genre: 'Electronic', plays: 1250000, percentage: 35.2 },
      { genre: 'Hip-Hop', plays: 890000, percentage: 25.1 },
      { genre: 'Pop', plays: 670000, percentage: 18.9 },
      { genre: 'Rock', plays: 450000, percentage: 12.7 },
      { genre: 'Jazz', plays: 280000, percentage: 7.9 },
      { genre: 'Gospel', plays: 150000, percentage: 4.2 }
    ],
    deviceUsage: [
      { device: 'Mobile', percentage: 65.2, users: 1656 },
      { device: 'Desktop', percentage: 28.7, users: 730 },
      { device: 'Tablet', percentage: 6.1, users: 155 }
    ],
    topCountries: [
      { country: 'United States', users: 892, revenue: 4560.25 },
      { country: 'United Kingdom', users: 456, revenue: 2340.50 },
      { country: 'Canada', users: 234, revenue: 1200.75 },
      { country: 'Germany', users: 189, revenue: 980.25 },
      { country: 'France', users: 156, revenue: 810.50 }
    ]
  });

  // Fetch analytics data on component mount
  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange]);

  const fetchAnalyticsData = async () => {
    setLoading(true);
    try {
      const { data, error } = await dbHelpers.getPlatformAnalytics();
      
      if (error) {
        throw new Error(error.message);
      }
      
      if (data) {
        setAnalyticsData({
          overview: {
            totalUsers: data.totalUsers,
            totalTracks: data.totalTracks,
            totalPlays: data.totalPlays,
            totalRevenue: data.totalRevenue,
            userGrowth: data.userGrowth,
            trackGrowth: data.trackGrowth,
            playGrowth: data.playGrowth,
            revenueGrowth: data.revenueGrowth
          },
          userStats: {
            newUsers: 0, // Would need historical data
            activeUsers: data.activeUsers,
            premiumUsers: 0, // Would need subscription data
            userRetention: 0 // Would need historical data
          },
          contentStats: {
            tracksUploaded: data.totalTracks,
            tracksApproved: data.approvedTracks,
            tracksRejected: data.totalTracks - data.approvedTracks,
            averageRating: 0 // Would need rating data
          },
          revenueStats: {
            monthlyRevenue: data.totalRevenue,
            subscriptionRevenue: 0, // Would need subscription data
            commissionRevenue: data.totalRevenue,
            averageRevenuePerUser: data.totalUsers > 0 ? data.totalRevenue / data.totalUsers : 0
          }
        });
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
      showToast('Failed to load analytics data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    await fetchAnalyticsData();
  };

  const getGrowthColor = (growth) => {
    if (growth > 0) return 'text-green-600';
    if (growth < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getGrowthIcon = (growth) => {
    if (growth > 0) return <TrendingUp className="h-4 w-4" />;
    if (growth < 0) return <TrendingDown className="h-4 w-4" />;
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Platform Analytics</h1>
          <p className="text-gray-600 mt-1">Comprehensive insights into platform performance and user behavior</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button
            onClick={refreshData}
            disabled={loading}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.totalUsers.toLocaleString()}</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className={`flex items-center mt-2 ${getGrowthColor(analyticsData.overview.userGrowth)}`}>
            {getGrowthIcon(analyticsData.overview.userGrowth)}
            <span className="text-sm ml-1">{analyticsData.overview.userGrowth}% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tracks</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.totalTracks.toLocaleString()}</p>
            </div>
            <div className="p-2 bg-purple-100 rounded-lg">
              <Music className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className={`flex items-center mt-2 ${getGrowthColor(analyticsData.overview.trackGrowth)}`}>
            {getGrowthIcon(analyticsData.overview.trackGrowth)}
            <span className="text-sm ml-1">{analyticsData.overview.trackGrowth}% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Plays</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.totalPlays.toLocaleString()}</p>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <Play className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className={`flex items-center mt-2 ${getGrowthColor(analyticsData.overview.playGrowth)}`}>
            {getGrowthIcon(analyticsData.overview.playGrowth)}
            <span className="text-sm ml-1">{analyticsData.overview.playGrowth}% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${analyticsData.overview.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="p-2 bg-emerald-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
          <div className={`flex items-center mt-2 ${getGrowthColor(analyticsData.overview.revenueGrowth)}`}>
            {getGrowthIcon(analyticsData.overview.revenueGrowth)}
            <span className="text-sm ml-1">{analyticsData.overview.revenueGrowth}% from last month</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
            <h3 className="text-lg font-medium text-gray-900">User Growth</h3>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Total Users</span>
            </div>
          </div>
          <div className="h-48 sm:h-64 flex items-end justify-between gap-1 sm:gap-2 overflow-x-auto">
            {chartData.userGrowth.map((item, index) => (
              <div key={index} className="flex flex-col items-center flex-1 min-w-0">
                <div 
                  className="bg-blue-500 rounded-t w-full mb-2 transition-all duration-300 hover:bg-blue-600"
                  style={{ height: `${(item.users / 2500) * 150}px` }}
                ></div>
                <span className="text-xs text-gray-600 truncate">{item.month}</span>
                <span className="text-xs font-medium text-gray-900 truncate">{item.users}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
            <h3 className="text-lg font-medium text-gray-900">Revenue Growth</h3>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Monthly Revenue</span>
            </div>
          </div>
          <div className="h-48 sm:h-64 flex items-end justify-between gap-1 sm:gap-2 overflow-x-auto">
            {chartData.revenue.map((item, index) => (
              <div key={index} className="flex flex-col items-center flex-1 min-w-0">
                <div 
                  className="bg-emerald-500 rounded-t w-full mb-2 transition-all duration-300 hover:bg-emerald-600"
                  style={{ height: `${(item.revenue / 15000) * 150}px` }}
                ></div>
                <span className="text-xs text-gray-600 truncate">{item.month}</span>
                <span className="text-xs font-medium text-gray-900 truncate">${item.revenue.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Top Genres */}
        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Top Genres by Plays</h3>
          <div className="space-y-3">
            {chartData.topGenres.map((genre, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center min-w-0 flex-1">
                  <div className="w-3 h-3 rounded-full mr-3 flex-shrink-0" style={{ backgroundColor: `hsl(${index * 60}, 70%, 50%)` }}></div>
                  <span className="text-sm font-medium text-gray-900 truncate">{genre.genre}</span>
                </div>
                <div className="text-right flex-shrink-0 ml-2">
                  <div className="text-sm font-medium text-gray-900">{genre.plays.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">{genre.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device Usage */}
        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Device Usage</h3>
          <div className="space-y-4">
            {chartData.deviceUsage.map((device, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center min-w-0 flex-1">
                    {device.device === 'Mobile' && <Smartphone className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />}
                    {device.device === 'Desktop' && <Monitor className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />}
                    {device.device === 'Tablet' && <Monitor className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />}
                    <span className="text-sm font-medium text-gray-900 truncate">{device.device}</span>
                  </div>
                  <span className="text-sm text-gray-600 flex-shrink-0 ml-2">{device.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full"
                    style={{ width: `${device.percentage}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">{device.users} users</div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Countries */}
        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200 md:col-span-2 xl:col-span-1">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Top Countries</h3>
          <div className="space-y-3">
            {chartData.topCountries.map((country, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center min-w-0 flex-1">
                  <Globe className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-900 truncate">{country.country}</span>
                </div>
                <div className="text-right flex-shrink-0 ml-2">
                  <div className="text-sm font-medium text-gray-900">{country.users} users</div>
                  <div className="text-xs text-gray-500">${country.revenue.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User & Content Stats */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* User Statistics */}
        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">User Statistics</h3>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="text-center p-3 sm:p-4 bg-blue-50 rounded-lg">
              <Users className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-lg sm:text-2xl font-bold text-gray-900">{analyticsData.userStats.newUsers}</div>
              <div className="text-xs sm:text-sm text-gray-600">New Users</div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-green-50 rounded-lg">
              <Activity className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 mx-auto mb-2" />
              <div className="text-lg sm:text-2xl font-bold text-gray-900">{analyticsData.userStats.activeUsers}</div>
              <div className="text-xs sm:text-sm text-gray-600">Active Users</div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-purple-50 rounded-lg">
              <Star className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-lg sm:text-2xl font-bold text-gray-900">{analyticsData.userStats.premiumUsers}</div>
              <div className="text-xs sm:text-sm text-gray-600">Premium Users</div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-orange-50 rounded-lg">
              <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-lg sm:text-2xl font-bold text-gray-900">{analyticsData.userStats.userRetention}%</div>
              <div className="text-xs sm:text-sm text-gray-600">Retention Rate</div>
            </div>
          </div>
        </div>

        {/* Content Statistics */}
        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Content Statistics</h3>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="text-center p-3 sm:p-4 bg-purple-50 rounded-lg">
              <Music className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-lg sm:text-2xl font-bold text-gray-900">{analyticsData.contentStats.tracksUploaded}</div>
              <div className="text-xs sm:text-sm text-gray-600">Tracks Uploaded</div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-green-50 rounded-lg">
              <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 mx-auto mb-2" />
              <div className="text-lg sm:text-2xl font-bold text-gray-900">{analyticsData.contentStats.tracksApproved}</div>
              <div className="text-xs sm:text-sm text-gray-600">Tracks Approved</div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-red-50 rounded-lg">
              <X className="h-6 w-6 sm:h-8 sm:w-8 text-red-600 mx-auto mb-2" />
              <div className="text-lg sm:text-2xl font-bold text-gray-900">{analyticsData.contentStats.tracksRejected}</div>
              <div className="text-xs sm:text-sm text-gray-600">Tracks Rejected</div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-yellow-50 rounded-lg">
              <Star className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-lg sm:text-2xl font-bold text-gray-900">{analyticsData.contentStats.averageRating}</div>
              <div className="text-xs sm:text-sm text-gray-600">Avg Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Breakdown */}
      <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Breakdown</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="text-center p-4 sm:p-6 bg-emerald-50 rounded-lg">
            <DollarSign className="h-8 w-8 sm:h-12 sm:w-12 text-emerald-600 mx-auto mb-4" />
            <div className="text-xl sm:text-3xl font-bold text-gray-900">${analyticsData.revenueStats.monthlyRevenue.toLocaleString()}</div>
            <div className="text-sm text-gray-600 mb-2">Monthly Revenue</div>
            <div className="text-xs text-emerald-600">+15.2% from last month</div>
          </div>
          <div className="text-center p-4 sm:p-6 bg-blue-50 rounded-lg">
            <Users className="h-8 w-8 sm:h-12 sm:w-12 text-blue-600 mx-auto mb-4" />
            <div className="text-xl sm:text-3xl font-bold text-gray-900">${analyticsData.revenueStats.subscriptionRevenue.toLocaleString()}</div>
            <div className="text-sm text-gray-600 mb-2">Subscription Revenue</div>
            <div className="text-xs text-blue-600">+12.8% from last month</div>
          </div>
          <div className="text-center p-4 sm:p-6 bg-purple-50 rounded-lg sm:col-span-2 lg:col-span-1">
            <Music className="h-8 w-8 sm:h-12 sm:w-12 text-purple-600 mx-auto mb-4" />
            <div className="text-xl sm:text-3xl font-bold text-gray-900">${analyticsData.revenueStats.commissionRevenue.toLocaleString()}</div>
            <div className="text-sm text-gray-600 mb-2">Commission Revenue</div>
            <div className="text-xs text-purple-600">+18.5% from last month</div>
          </div>
        </div>
        <div className="mt-6 text-center">
          <div className="text-sm text-gray-600">Average Revenue Per User</div>
          <div className="text-xl sm:text-2xl font-bold text-gray-900">${analyticsData.revenueStats.averageRevenuePerUser}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
