import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { 
  Upload, 
  Music, 
  BarChart3, 
  Plus, 
  Play, 
  Pause, 
  Edit, 
  Trash2, 
  Eye,
  Download,
  Calendar,
  Users,
  TrendingUp
} from "lucide-react";

const ArtistDashboard = () => {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [uploadModal, setUploadModal] = useState(false);

  // Mock data - replace with real data from your backend
  const stats = {
    totalTracks: 12,
    totalPlays: 15420,
    totalFollowers: 892,
    monthlyRevenue: 245.50
  };

  const recentTracks = [
    { id: 1, title: "Midnight Dreams", plays: 2340, uploadDate: "2024-01-15", status: "published" },
    { id: 2, title: "Summer Vibes", plays: 1890, uploadDate: "2024-01-10", status: "published" },
    { id: 3, title: "Urban Beat", plays: 1567, uploadDate: "2024-01-05", status: "draft" },
    { id: 4, title: "Electric Soul", plays: 2100, uploadDate: "2024-01-01", status: "published" }
  ];

  const handleLogout = async () => {
    await signOut();
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "tracks", label: "My Tracks", icon: Music },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
    { id: "upload", label: "Upload", icon: Upload }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 space-y-3 sm:space-y-0">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Artist Dashboard</h1>
              <p className="text-sm sm:text-base text-gray-600">Welcome back, {user?.user_metadata?.full_name || 'Artist'}!</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm sm:text-base"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-lg shadow p-3 sm:p-6">
            <div className="flex items-center">
              <div className="p-1.5 sm:p-2 bg-purple-100 rounded-lg">
                <Music className="w-4 h-4 sm:w-6 sm:h-6 text-purple-600" />
              </div>
              <div className="ml-2 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Total Tracks</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">{stats.totalTracks}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-3 sm:p-6">
            <div className="flex items-center">
              <div className="p-1.5 sm:p-2 bg-blue-100 rounded-lg">
                <Play className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <div className="ml-2 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Total Plays</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">{stats.totalPlays.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-3 sm:p-6">
            <div className="flex items-center">
              <div className="p-1.5 sm:p-2 bg-green-100 rounded-lg">
                <Users className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" />
              </div>
              <div className="ml-2 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Followers</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">{stats.totalFollowers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-3 sm:p-6">
            <div className="flex items-center">
              <div className="p-1.5 sm:p-2 bg-yellow-100 rounded-lg">
                <TrendingUp className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-600" />
              </div>
              <div className="ml-2 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">${stats.monthlyRevenue}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow mb-6 sm:mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto space-x-2 sm:space-x-8 px-3 sm:px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-3 sm:py-4 px-2 sm:px-1 border-b-2 font-medium text-xs sm:text-sm flex items-center space-x-1 sm:space-x-2 whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-purple-500 text-purple-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden xs:inline">{tab.label}</span>
                    <span className="xs:hidden">{tab.label.split(' ')[0]}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-3 sm:p-6">
            {activeTab === "overview" && (
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Recent Activity</h3>
                <div className="space-y-3 sm:space-y-4">
                  {recentTracks.map((track) => (
                    <div key={track.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg space-y-2 sm:space-y-0">
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Music className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 text-sm sm:text-base">{track.title}</h4>
                          <p className="text-xs sm:text-sm text-gray-600">{track.plays.toLocaleString()} plays</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-end">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          track.status === 'published' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {track.status}
                        </span>
                        <button className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-600">
                          <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "tracks" && (
              <div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 space-y-3 sm:space-y-0">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">My Tracks</h3>
                  <button
                    onClick={() => setUploadModal(true)}
                    className="w-full sm:w-auto bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center justify-center space-x-2 text-sm sm:text-base"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Upload Track</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Track
                        </th>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                          Plays
                        </th>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                          Upload Date
                        </th>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentTracks.map((track) => (
                        <tr key={track.id}>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-2 sm:mr-3">
                                <Music className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                              </div>
                              <div>
                                <div className="text-xs sm:text-sm font-medium text-gray-900">{track.title}</div>
                                <div className="text-xs text-gray-500 sm:hidden">{track.plays.toLocaleString()} plays</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden sm:table-cell">
                            {track.plays.toLocaleString()}
                          </td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden md:table-cell">
                            {new Date(track.uploadDate).toLocaleDateString()}
                          </td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              track.status === 'published' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {track.status}
                            </span>
                          </td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-1 sm:space-x-2">
                              <button className="text-purple-600 hover:text-purple-900 p-1">
                                <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                              </button>
                              <button className="text-blue-600 hover:text-blue-900 p-1">
                                <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-900 p-1">
                                <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "analytics" && (
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Analytics</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                    <h4 className="font-medium text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Plays Over Time</h4>
                    <div className="h-48 sm:h-64 bg-white rounded-lg flex items-center justify-center">
                      <p className="text-gray-500 text-sm sm:text-base">Chart will be implemented here</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                    <h4 className="font-medium text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Top Tracks</h4>
                    <div className="space-y-2 sm:space-y-3">
                      {recentTracks.slice(0, 3).map((track, index) => (
                        <div key={track.id} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 sm:space-x-3">
                            <span className="w-5 h-5 sm:w-6 sm:h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium">
                              {index + 1}
                            </span>
                            <span className="text-xs sm:text-sm font-medium text-gray-900 truncate">{track.title}</span>
                          </div>
                          <span className="text-xs sm:text-sm text-gray-600">{track.plays.toLocaleString()} plays</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "upload" && (
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Upload New Track</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-12 text-center">
                  <Upload className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
                  <h4 className="text-base sm:text-lg font-medium text-gray-900 mb-2">Upload your music</h4>
                  <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">Drag and drop your audio files here, or click to browse</p>
                  <button className="bg-purple-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-purple-700 text-sm sm:text-base">
                    Choose Files
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistDashboard;
