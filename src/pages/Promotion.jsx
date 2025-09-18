import React, { useState } from "react";
import { TrendingUp, Target, DollarSign, Users, Calendar, Play, Share2, BarChart3 } from "lucide-react";

const Promotion = () => {
  const [activeTab, setActiveTab] = useState("campaigns");

  const campaigns = [
    {
      id: 1,
      name: "Summer Vibes Promotion",
      status: "Active",
      budget: 500,
      spent: 320,
      reach: 25000,
      clicks: 1250,
      conversions: 89,
      startDate: "2024-03-01",
      endDate: "2024-03-31",
      platforms: ["Spotify", "Instagram", "Facebook"]
    },
    {
      id: 2,
      name: "New Release Campaign",
      status: "Completed",
      budget: 300,
      spent: 300,
      reach: 18000,
      clicks: 890,
      conversions: 67,
      startDate: "2024-02-15",
      endDate: "2024-02-28",
      platforms: ["YouTube", "TikTok", "Twitter"]
    },
    {
      id: 3,
      name: "Playlist Push",
      status: "Paused",
      budget: 200,
      spent: 120,
      reach: 12000,
      clicks: 450,
      conversions: 34,
      startDate: "2024-03-10",
      endDate: "2024-03-25",
      platforms: ["Spotify", "Apple Music"]
    }
  ];

  const promotionOptions = [
    {
      id: 1,
      name: "Playlist Placement",
      description: "Get your tracks featured on curated playlists",
      price: "Starting at $50",
      reach: "10K-100K listeners",
      duration: "1-4 weeks",
      icon: Play
    },
    {
      id: 2,
      name: "Social Media Ads",
      description: "Promote your music across social platforms",
      price: "Starting at $25",
      reach: "5K-50K impressions",
      duration: "1-2 weeks",
      icon: Share2
    },
    {
      id: 3,
      name: "Influencer Collaboration",
      description: "Partner with music influencers",
      price: "Starting at $100",
      reach: "20K-200K followers",
      duration: "1-3 days",
      icon: Users
    },
    {
      id: 4,
      name: "Radio Promotion",
      description: "Get airplay on radio stations",
      price: "Starting at $200",
      reach: "50K-500K listeners",
      duration: "2-6 weeks",
      icon: BarChart3
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Promotion</h1>
          <p className="text-gray-600 mt-1">Promote your music and reach new audiences</p>
        </div>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          Create Campaign
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: "campaigns", name: "My Campaigns" },
            { id: "options", name: "Promotion Options" },
            { id: "analytics", name: "Analytics" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? "border-purple-500 text-purple-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Campaigns Tab */}
      {activeTab === "campaigns" && (
        <div className="space-y-6">
          {/* Campaign Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Active Campaigns</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {campaigns.filter(c => c.status === "Active").length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Spent</p>
                  <p className="text-xl font-semibold text-gray-900">
                    ${campaigns.reduce((sum, c) => sum + c.spent, 0)}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Reach</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {campaigns.reduce((sum, c) => sum + c.reach, 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Target className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Conversions</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {campaigns.reduce((sum, c) => sum + c.conversions, 0)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Campaigns List */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Campaigns</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Campaign
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Budget
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reach
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Conversions
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {campaigns.map((campaign) => (
                    <tr key={campaign.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{campaign.name}</p>
                          <p className="text-sm text-gray-500">
                            {campaign.startDate} - {campaign.endDate}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          campaign.status === "Active" 
                            ? "bg-green-100 text-green-800"
                            : campaign.status === "Completed"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {campaign.status}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div>
                          <p className="text-sm text-gray-900">${campaign.spent} / ${campaign.budget}</p>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className="bg-purple-600 h-2 rounded-full"
                              style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900">
                        {campaign.reach.toLocaleString()}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900">
                        {campaign.conversions}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                            View
                          </button>
                          <button className="text-gray-400 hover:text-gray-600">
                            <BarChart3 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Promotion Options Tab */}
      {activeTab === "options" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {promotionOptions.map((option) => (
              <div key={option.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <option.icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{option.name}</h3>
                    <p className="text-gray-600 mb-4">{option.description}</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <DollarSign className="h-4 w-4" />
                        <span>{option.price}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="h-4 w-4" />
                        <span>{option.reach}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{option.duration}</span>
                      </div>
                    </div>
                    <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === "analytics" && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Promotion Analytics</h3>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Analytics visualization would go here</p>
                <p className="text-sm text-gray-400">Integration with analytics service needed</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Promotion;
