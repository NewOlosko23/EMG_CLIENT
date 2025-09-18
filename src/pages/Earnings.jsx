import React, { useState } from "react";
import { DollarSign, TrendingUp, Download, Calendar, PieChart, BarChart3 } from "lucide-react";

const Earnings = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("30d");

  // Mock earnings data
  const earningsData = {
    totalEarnings: 1250.50,
    thisMonth: 450.30,
    lastMonth: 380.20,
    growth: 18.4,
    totalPlays: 125000,
    averagePerPlay: 0.0036
  };

  const platformEarnings = [
    { platform: "Spotify", amount: 450.50, plays: 50000, percentage: 36 },
    { platform: "Apple Music", amount: 320.30, plays: 35000, percentage: 25.6 },
    { platform: "YouTube Music", amount: 280.20, plays: 25000, percentage: 22.4 },
    { platform: "Amazon Music", amount: 199.50, plays: 15000, percentage: 16 }
  ];

  const monthlyEarnings = [
    { month: "Jan 2024", amount: 380.20, plays: 95000 },
    { month: "Feb 2024", amount: 420.10, plays: 105000 },
    { month: "Mar 2024", amount: 450.30, plays: 125000 }
  ];

  const recentPayouts = [
    { date: "2024-03-15", amount: 450.30, status: "Completed", method: "Bank Transfer" },
    { date: "2024-02-15", amount: 420.10, status: "Completed", method: "Bank Transfer" },
    { date: "2024-01-15", amount: 380.20, status: "Completed", method: "Bank Transfer" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Earnings</h1>
          <p className="text-gray-600 mt-1">Track your music revenue and payouts</p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
            <option value="all">All time</option>
          </select>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Earnings</p>
              <p className="text-2xl font-bold text-gray-900">${earningsData.totalEarnings.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="flex items-center mt-2">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600 font-medium">+{earningsData.growth}%</span>
            <span className="text-sm text-gray-500 ml-1">vs last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">${earningsData.thisMonth.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">March 2024</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Plays</p>
              <p className="text-2xl font-bold text-gray-900">{earningsData.totalPlays.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">All time</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Per Play</p>
              <p className="text-2xl font-bold text-gray-900">${earningsData.averagePerPlay}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Revenue per stream</p>
        </div>
      </div>

      {/* Platform Breakdown */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Earnings by Platform</h3>
        <div className="space-y-4">
          {platformEarnings.map((platform, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{platform.platform}</p>
                    <p className="text-xs text-gray-500">{platform.plays.toLocaleString()} plays</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">${platform.amount.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">{platform.percentage}%</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full"
                  style={{ width: `${platform.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Earnings</h3>
          <div className="space-y-4">
            {monthlyEarnings.map((month, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">{month.month}</p>
                  <p className="text-xs text-gray-500">{month.plays.toLocaleString()} plays</p>
                </div>
                <p className="text-lg font-semibold text-gray-900">${month.amount.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Payouts</h3>
          <div className="space-y-4">
            {recentPayouts.map((payout, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">{payout.date}</p>
                  <p className="text-xs text-gray-500">{payout.method}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">${payout.amount.toLocaleString()}</p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {payout.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Settings */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payout Method
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
              <option>Bank Transfer</option>
              <option>PayPal</option>
              <option>Stripe</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payout Threshold
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
              <option>$50</option>
              <option>$100</option>
              <option>$250</option>
              <option>$500</option>
            </select>
          </div>
        </div>
        <div className="mt-4">
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
            Update Payment Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Earnings;
