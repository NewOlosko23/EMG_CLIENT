import React, { useState, useEffect } from "react";
import { TrendingUp, Target, DollarSign, Users, Calendar, Play, Share2, BarChart3 } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import { dbHelpers, supabase } from "../lib/supabaseClient";

const Promotion = () => {
  const { user } = useAuth();
  const { showError } = useToast();
  const [activeTab, setActiveTab] = useState("campaigns");
  const [loading, setLoading] = useState(true);
  const [campaigns, setCampaigns] = useState([]);
  const [campaignStats, setCampaignStats] = useState({
    activeCampaigns: 0,
    totalSpent: 0,
    totalReach: 0,
    totalConversions: 0
  });

  // Form state for creating campaigns
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    startDate: "",
    endDate: "",
    targetAudience: {
      ageRange: "",
      genres: [],
      locations: []
    }
  });
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (user?.id) {
      loadCampaignData();
    }
  }, [user?.id]);

  const loadCampaignData = async () => {
    try {
      setLoading(true);
      
      // Load user's campaigns from the database
      const { data: campaignsData, error: campaignsError } = await supabase
        .from('campaigns_emg')
        .select('*')
        .eq('artist_id', user.id)
        .order('created_at', { ascending: false });
      
      if (campaignsError) throw campaignsError;

      // For now, we'll use mock data since campaigns table might not have data
      // In a real implementation, you would process the actual campaign data
      const mockCampaigns = [
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

      // Calculate campaign stats
      const activeCampaigns = mockCampaigns.filter(c => c.status === "Active").length;
      const totalSpent = mockCampaigns.reduce((sum, c) => sum + c.spent, 0);
      const totalReach = mockCampaigns.reduce((sum, c) => sum + c.reach, 0);
      const totalConversions = mockCampaigns.reduce((sum, c) => sum + c.conversions, 0);

      setCampaigns(mockCampaigns);
      setCampaignStats({
        activeCampaigns,
        totalSpent,
        totalReach,
        totalConversions
      });

    } catch (error) {
      console.error('Error loading campaign data:', error);
      showError('Error loading campaigns', 'Failed to load your campaign data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCampaign = async (e) => {
    e.preventDefault();
    
    if (!user?.id) {
      showError('Authentication required', 'Please log in to create a campaign');
      return;
    }

    try {
      setIsCreating(true);

      const campaignData = {
        artist_id: user.id,
        title: formData.title,
        description: formData.description,
        budget: parseFloat(formData.budget) || 0,
        start_date: formData.startDate,
        end_date: formData.endDate,
        status: 'draft',
        target_audience: formData.targetAudience
      };

      const { data, error } = await supabase
        .from('campaigns_emg')
        .insert([campaignData])
        .select()
        .single();

      if (error) throw error;

      // Reset form
      setFormData({
        title: "",
        description: "",
        budget: "",
        startDate: "",
        endDate: "",
        targetAudience: {
          ageRange: "",
          genres: [],
          locations: []
        }
      });

      // Reload campaigns
      await loadCampaignData();
      
      // Switch to campaigns tab
      setActiveTab("campaigns");

    } catch (error) {
      console.error('Error creating campaign:', error);
      showError('Failed to create campaign', error.message);
    } finally {
      setIsCreating(false);
    }
  };

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

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-8 bg-gray-200 rounded w-32 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white p-4 rounded-lg border border-gray-200">
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
          <h1 className="text-2xl font-bold text-gray-900">Promotion</h1>
          <p className="text-gray-600 mt-1">Promote your music and reach new audiences</p>
        </div>
        <button 
          onClick={() => setActiveTab("create")}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <TrendingUp className="h-4 w-4" />
          Create Campaign
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: "campaigns", name: "My Campaigns" },
            { id: "create", name: "Create Campaign" },
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
                    {campaignStats.activeCampaigns}
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
                    ${campaignStats.totalSpent}
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
                    {campaignStats.totalReach.toLocaleString()}
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
                    {campaignStats.totalConversions}
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

      {/* Create Campaign Tab */}
      {activeTab === "create" && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Create New Campaign</h2>
            
            <form onSubmit={handleCreateCampaign} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Campaign Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter campaign title"
                  />
                </div>
                
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                    Budget ($) *
                  </label>
                  <input
                    type="number"
                    id="budget"
                    required
                    min="0"
                    step="0.01"
                    value={formData.budget}
                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Describe your campaign goals and strategy"
                />
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
                    End Date *
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    required
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Target Audience */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Target Audience</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="ageRange" className="block text-sm font-medium text-gray-700 mb-2">
                      Age Range
                    </label>
                    <select
                      id="ageRange"
                      value={formData.targetAudience.ageRange}
                      onChange={(e) => setFormData({
                        ...formData, 
                        targetAudience: {...formData.targetAudience, ageRange: e.target.value}
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select age range</option>
                      <option value="13-17">13-17</option>
                      <option value="18-24">18-24</option>
                      <option value="25-34">25-34</option>
                      <option value="35-44">35-44</option>
                      <option value="45-54">45-54</option>
                      <option value="55+">55+</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="genres" className="block text-sm font-medium text-gray-700 mb-2">
                      Target Genres
                    </label>
                    <select
                      id="genres"
                      multiple
                      value={formData.targetAudience.genres}
                      onChange={(e) => {
                        const selectedGenres = Array.from(e.target.selectedOptions, option => option.value);
                        setFormData({
                          ...formData, 
                          targetAudience: {...formData.targetAudience, genres: selectedGenres}
                        });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="Electronic">Electronic</option>
                      <option value="Pop">Pop</option>
                      <option value="Rock">Rock</option>
                      <option value="Hip-Hop">Hip-Hop</option>
                      <option value="R&B">R&B</option>
                      <option value="Jazz">Jazz</option>
                      <option value="Classical">Classical</option>
                      <option value="Country">Country</option>
                      <option value="Gospel">Gospel</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple genres</p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setActiveTab("campaigns")}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isCreating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Creating...
                    </>
                  ) : (
                    <>
                      <TrendingUp className="h-4 w-4" />
                      Create Campaign
                    </>
                  )}
                </button>
              </div>
            </form>
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
