import React, { useState } from "react";
import { BarChart3, TrendingUp, TrendingDown, Users, Play, Globe, Filter } from "lucide-react";

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("30d");

  // Mock analytics data
  const analyticsData = {
    totalPlays: 125000,
    totalListeners: 45000,
    totalFollowers: 12500,
    totalRevenue: 1250.50,
    playGrowth: 12.5,
    listenerGrowth: 8.3,
    followerGrowth: 15.2,
    revenueGrowth: 22.1
  };

  const topTracks = [
    { name: "Summer Vibes", plays: 45000, growth: 15.2 },
    { name: "Midnight Dreams", plays: 32000, growth: 8.7 },
    { name: "Electric Dreams", plays: 28000, growth: -2.1 },
    { name: "Neon Lights", plays: 20000, growth: 12.4 }
  ];

  const topCountries = [
    { country: "United States", plays: 45000, percentage: 36 },
    { country: "United Kingdom", plays: 25000, percentage: 20 },
    { country: "Canada", plays: 18000, percentage: 14.4 },
    { country: "Germany", plays: 15000, percentage: 12 },
    { country: "France", plays: 12000, percentage: 9.6 },
    { country: "Australia", plays: 10000, percentage: 8 }
  ];

  const platforms = [
    { name: "Spotify", plays: 50000, percentage: 40 },
    { name: "Apple Music", plays: 35000, percentage: 28 },
    { name: "YouTube Music", plays: 25000, percentage: 20 },
    { name: "Amazon Music", plays: 15000, percentage: 12 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-1">Track your music performance and growth</p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Export Data
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Plays</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.totalPlays.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Play className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center mt-2">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600 font-medium">+{analyticsData.playGrowth}%</span>
            <span className="text-sm text-gray-500 ml-1">vs last period</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Listeners</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.totalListeners.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Users className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="flex items-center mt-2">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600 font-medium">+{analyticsData.listenerGrowth}%</span>
            <span className="text-sm text-gray-500 ml-1">vs last period</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Followers</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.totalFollowers.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="flex items-center mt-2">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600 font-medium">+{analyticsData.followerGrowth}%</span>
            <span className="text-sm text-gray-500 ml-1">vs last period</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${analyticsData.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <div className="flex items-center mt-2">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600 font-medium">+{analyticsData.revenueGrowth}%</span>
            <span className="text-sm text-gray-500 ml-1">vs last period</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Tracks */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Tracks</h3>
          <div className="space-y-4">
            {topTracks.map((track, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-medium text-purple-600">#{index + 1}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{track.name}</p>
                    <p className="text-xs text-gray-500">{track.plays.toLocaleString()} plays</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {track.growth > 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                  <span className={`text-sm font-medium ${track.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {track.growth > 0 ? '+' : ''}{track.growth}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Countries */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Countries</h3>
          <div className="space-y-4">
            {topCountries.map((country, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Globe className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">{country.country}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{country.plays.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">{country.percentage}%</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full"
                    style={{ width: `${country.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Platform Performance */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {platforms.map((platform, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="h-8 w-8 text-gray-600" />
              </div>
              <h4 className="text-sm font-medium text-gray-900 mb-1">{platform.name}</h4>
              <p className="text-2xl font-bold text-gray-900 mb-1">{platform.plays.toLocaleString()}</p>
              <p className="text-xs text-gray-500">{platform.percentage}% of total plays</p>
            </div>
          ))}
        </div>
      </div>

      {/* Time-based Chart Placeholder */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Plays Over Time</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Chart visualization would go here</p>
            <p className="text-sm text-gray-400">Integration with charting library needed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
