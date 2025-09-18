import React, { useState, useEffect } from "react";
import { BarChart3, TrendingUp, TrendingDown, Users, Play, Globe, Filter } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import { dbHelpers } from "../lib/supabaseClient";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Analytics = () => {
  const { user } = useAuth();
  const { showError } = useToast();
  const [selectedPeriod, setSelectedPeriod] = useState("30d");
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState({
    totalPlays: 0,
    totalListeners: 0,
    totalFollowers: 0,
    totalRevenue: 0,
    playGrowth: 0,
    listenerGrowth: 0,
    followerGrowth: 0,
    revenueGrowth: 0
  });
  const [topTracks, setTopTracks] = useState([]);
  const [topCountries, setTopCountries] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [playsOverTime, setPlaysOverTime] = useState([]);

  useEffect(() => {
    if (user?.id) {
      loadAnalyticsData();
    }
  }, [user?.id, selectedPeriod]);

  const loadAnalyticsData = async () => {
    try {
      setLoading(true);
      
      // Load user's tracks
      const { data: tracks, error: tracksError } = await dbHelpers.getUserTracks(user.id);
      if (tracksError) throw tracksError;

      // Load user's analytics for the selected period
      const { data: analytics, error: analyticsError } = await dbHelpers.getUserAnalytics(user.id, selectedPeriod);
      if (analyticsError) throw analyticsError;

      // Load user's earnings
      const { data: earnings, error: earningsError } = await dbHelpers.getUserEarnings(user.id);
      if (earningsError) throw earningsError;

      // Calculate analytics data
      const totalPlays = analytics?.length || 0;
      const uniqueListeners = new Set(analytics?.map(play => play.user_id).filter(Boolean)).size;
      const totalRevenue = earnings?.reduce((sum, earning) => sum + (earning.revenue_amount || 0), 0) || 0;

      // Calculate top tracks
      const trackPlays = {};
      analytics?.forEach(play => {
        if (play.tracks_emg) {
          const trackId = play.tracks_emg.id;
          if (!trackPlays[trackId]) {
            trackPlays[trackId] = {
              id: trackId,
              title: play.tracks_emg.title || 'Unknown Track',
              plays: 0
            };
          }
          trackPlays[trackId].plays++;
        }
      });

      const topTracksData = Object.values(trackPlays)
        .sort((a, b) => b.plays - a.plays)
        .slice(0, 4)
        .map(track => ({
          name: track.title,
          plays: track.plays,
          growth: Number((Math.random() * 20 - 10).toFixed(1)) // Mock growth data - 1 decimal place
        }));

      // Calculate top countries
      const countryPlays = {};
      analytics?.forEach(play => {
        if (play.country) {
          countryPlays[play.country] = (countryPlays[play.country] || 0) + 1;
        }
      });

      const topCountriesData = Object.entries(countryPlays)
        .map(([country, plays]) => ({
          country: getCountryName(country),
          plays,
          percentage: totalPlays > 0 ? Math.round((plays / totalPlays) * 100) : 0
        }))
        .sort((a, b) => b.plays - a.plays)
        .slice(0, 6);

      // Calculate platform distribution
      const platformPlays = {};
      analytics?.forEach(play => {
        if (play.platform) {
          platformPlays[play.platform] = (platformPlays[play.platform] || 0) + 1;
        }
      });

      const platformsData = Object.entries(platformPlays)
        .map(([platform, plays]) => ({
          name: platform.charAt(0).toUpperCase() + platform.slice(1),
          plays,
          percentage: totalPlays > 0 ? Math.round((plays / totalPlays) * 100) : 0
        }))
        .sort((a, b) => b.plays - a.plays);

      // Generate plays over time data (mock for now)
      const playsOverTimeData = generatePlaysOverTimeData(analytics);

      setAnalyticsData({
        totalPlays,
        totalListeners: uniqueListeners,
        totalFollowers: Math.floor(uniqueListeners * 0.3), // Mock followers data
        totalRevenue,
        playGrowth: Number((Math.random() * 20 - 5).toFixed(1)), // Mock growth - 1 decimal place
        listenerGrowth: Number((Math.random() * 15 - 5).toFixed(1)),
        followerGrowth: Number((Math.random() * 25 - 5).toFixed(1)),
        revenueGrowth: Number((Math.random() * 30 - 5).toFixed(1))
      });

      setTopTracks(topTracksData);
      setTopCountries(topCountriesData);
      setPlatforms(platformsData);
      setPlaysOverTime(playsOverTimeData);

    } catch (error) {
      console.error('Error loading analytics data:', error);
      showError('Error loading analytics', 'Failed to load your analytics data');
    } finally {
      setLoading(false);
    }
  };

  const getCountryName = (countryCode) => {
    const countryNames = {
      'US': 'United States',
      'GB': 'United Kingdom',
      'CA': 'Canada',
      'DE': 'Germany',
      'FR': 'France',
      'AU': 'Australia',
      'JP': 'Japan',
      'BR': 'Brazil',
      'IN': 'India',
      'IT': 'Italy',
      'ES': 'Spain',
      'NL': 'Netherlands',
      'SE': 'Sweden',
      'NO': 'Norway',
      'DK': 'Denmark'
    };
    return countryNames[countryCode] || countryCode;
  };

  const generatePlaysOverTimeData = (analytics) => {
    // Group plays by date
    const playsByDate = {};
    analytics?.forEach(play => {
      const date = new Date(play.played_at).toISOString().split('T')[0];
      playsByDate[date] = (playsByDate[date] || 0) + 1;
    });

    // Generate last 12 months of data
    const months = [];
    const now = new Date();
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = date.toISOString().split('T')[0];
      months.push({
        label: date.toLocaleDateString('en-US', { month: 'short' }),
        plays: playsByDate[monthKey] || Math.floor(Math.random() * 1000) + 100
      });
    }

    return months;
  };

  // Chart data generation
  const playsOverTimeChartData = {
    labels: playsOverTime.map(item => item.label),
    datasets: [
      {
        label: 'Total Plays',
        data: playsOverTime.map(item => item.plays),
        borderColor: 'rgb(147, 51, 234)',
        backgroundColor: 'rgba(147, 51, 234, 0.1)',
        tension: 0.4,
        fill: true,
      }
    ],
  };

  const topTracksChartData = {
    labels: topTracks.map(track => track.name),
    datasets: [
      {
        label: 'Plays',
        data: topTracks.map(track => track.plays),
        backgroundColor: [
          'rgba(147, 51, 234, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
        ],
        borderColor: [
          'rgba(147, 51, 234, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const platformDistributionChartData = {
    labels: platforms.map(platform => platform.name),
    datasets: [
      {
        data: platforms.map(platform => platform.plays),
        backgroundColor: [
          'rgba(30, 215, 96, 0.8)',
          'rgba(251, 146, 60, 0.8)',
          'rgba(255, 0, 0, 0.8)',
          'rgba(255, 193, 7, 0.8)',
        ],
        borderColor: [
          'rgba(30, 215, 96, 1)',
          'rgba(251, 146, 60, 1)',
          'rgba(255, 0, 0, 1)',
          'rgba(255, 193, 7, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-8 bg-gray-200 rounded w-32 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="animate-pulse">
                <div className="h-16 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Plays Over Time Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Plays Over Time</h3>
          <div className="h-80">
            <Line data={playsOverTimeChartData} options={chartOptions} />
          </div>
        </div>

        {/* Top Tracks Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Tracks Performance</h3>
          <div className="h-80">
            <Bar data={topTracksChartData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Platform Distribution Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Distribution</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-80">
            <Doughnut data={platformDistributionChartData} options={doughnutOptions} />
          </div>
          <div className="flex flex-col justify-center">
            <div className="space-y-4">
              {platforms.map((platform, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ 
                        backgroundColor: platformDistributionChartData.datasets[0].backgroundColor[index] 
                      }}
                    ></div>
                    <span className="text-sm font-medium text-gray-900">{platform.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">{platform.plays.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">{platform.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
