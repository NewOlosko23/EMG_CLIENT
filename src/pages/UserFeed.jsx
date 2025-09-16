import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { 
  Search, 
  Heart, 
  Play, 
  Pause, 
  Plus, 
  ShoppingBag, 
  Star,
  Music,
  Headphones,
  TrendingUp,
  Clock,
  ThumbsUp,
  Share2,
  Filter
} from "lucide-react";

const UserFeed = () => {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState("discover");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - replace with real data from your backend
  const featuredTracks = [
    { id: 1, title: "Midnight Dreams", artist: "Alex Johnson", duration: "3:45", plays: 2340, genre: "Electronic" },
    { id: 2, title: "Summer Vibes", artist: "Sarah Wilson", duration: "4:12", plays: 1890, genre: "Pop" },
    { id: 3, title: "Urban Beat", artist: "Mike Chen", duration: "3:28", plays: 1567, genre: "Hip-Hop" },
    { id: 4, title: "Electric Soul", artist: "Emma Davis", duration: "4:05", plays: 2100, genre: "Rock" }
  ];

  const playlists = [
    { id: 1, name: "My Favorites", trackCount: 24, cover: "🎵" },
    { id: 2, name: "Workout Mix", trackCount: 18, cover: "💪" },
    { id: 3, name: "Chill Vibes", trackCount: 32, cover: "🌙" },
    { id: 4, name: "Party Hits", trackCount: 15, cover: "🎉" }
  ];

  const recommendations = [
    { id: 1, title: "New Release: 'Digital Dreams'", type: "album", artist: "Tech Beats" },
    { id: 2, title: "Trending: 'City Lights'", type: "track", artist: "Urban Sounds" },
    { id: 3, title: "Similar to your taste: 'Ocean Waves'", type: "track", artist: "Nature Music" }
  ];

  const merchItems = [
    { id: 1, name: "EMG Music T-Shirt", price: 29.99, image: "👕" },
    { id: 2, name: "Artist Hoodie", price: 49.99, image: "🧥" },
    { id: 3, name: "Music Lover Cap", price: 24.99, image: "🧢" },
    { id: 4, name: "Studio Headphones", price: 89.99, image: "🎧" }
  ];

  const handleLogout = async () => {
    await signOut();
  };

  const tabs = [
    { id: "discover", label: "Discover", icon: Search },
    { id: "playlists", label: "Playlists", icon: Music },
    { id: "recommendations", label: "For You", icon: Star },
    { id: "shop", label: "Shop", icon: ShoppingBag }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 space-y-3 sm:space-y-0">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Music Feed</h1>
              <p className="text-sm sm:text-base text-gray-600">Welcome back, {user?.user_metadata?.full_name || 'Music Lover'}!</p>
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
        {/* Search Bar */}
        <div className="mb-6 sm:mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Search music, artists, playlists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
            />
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
            {activeTab === "discover" && (
              <div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 space-y-3 sm:space-y-0">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">Discover Music</h3>
                  <button className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 text-sm sm:text-base">
                    <Filter className="w-4 h-4" />
                    <span>Filter</span>
                  </button>
                </div>

                {/* Featured Tracks */}
                <div className="mb-6 sm:mb-8">
                  <h4 className="text-sm sm:text-md font-medium text-gray-900 mb-3 sm:mb-4">Featured Tracks</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                    {featuredTracks.map((track) => (
                      <div key={track.id} className="bg-gray-50 rounded-lg p-3 sm:p-4 hover:bg-gray-100 transition-colors">
                        <div className="w-full h-24 sm:h-32 bg-purple-100 rounded-lg flex items-center justify-center mb-2 sm:mb-3">
                          <Music className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
                        </div>
                        <h5 className="font-medium text-gray-900 truncate text-xs sm:text-sm">{track.title}</h5>
                        <p className="text-xs sm:text-sm text-gray-600 truncate">{track.artist}</p>
                        <div className="flex items-center justify-between mt-1 sm:mt-2">
                          <span className="text-xs text-gray-500">{track.genre}</span>
                          <span className="text-xs text-gray-500">{track.duration}</span>
                        </div>
                        <div className="flex items-center justify-between mt-2 sm:mt-3">
                          <button className="flex items-center space-x-1 text-purple-600 hover:text-purple-700">
                            <Play className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="text-xs sm:text-sm">Play</span>
                          </button>
                          <button className="text-gray-400 hover:text-red-500">
                            <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trending */}
                <div>
                  <h4 className="text-sm sm:text-md font-medium text-gray-900 mb-3 sm:mb-4">Trending Now</h4>
                  <div className="space-y-2 sm:space-y-3">
                    {featuredTracks.map((track, index) => (
                      <div key={track.id} className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
                          <span className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium">
                            {index + 1}
                          </span>
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Music className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h5 className="font-medium text-gray-900 text-xs sm:text-sm truncate">{track.title}</h5>
                            <p className="text-xs sm:text-sm text-gray-600 truncate">{track.artist}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 sm:space-x-4">
                          <span className="text-xs sm:text-sm text-gray-500 hidden sm:inline">{track.plays.toLocaleString()} plays</span>
                          <button className="p-1.5 sm:p-2 text-gray-400 hover:text-purple-600">
                            <Play className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                          <button className="p-1.5 sm:p-2 text-gray-400 hover:text-red-500">
                            <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "playlists" && (
              <div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 space-y-3 sm:space-y-0">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">Your Playlists</h3>
                  <button className="w-full sm:w-auto bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center justify-center space-x-2 text-sm sm:text-base">
                    <Plus className="w-4 h-4" />
                    <span>Create Playlist</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                  {playlists.map((playlist) => (
                    <div key={playlist.id} className="bg-gray-50 rounded-lg p-3 sm:p-4 hover:bg-gray-100 transition-colors cursor-pointer">
                      <div className="w-full h-24 sm:h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center mb-2 sm:mb-3 text-2xl sm:text-4xl">
                        {playlist.cover}
                      </div>
                      <h5 className="font-medium text-gray-900 mb-1 text-xs sm:text-sm">{playlist.name}</h5>
                      <p className="text-xs sm:text-sm text-gray-600">{playlist.trackCount} tracks</p>
                      <button className="w-full mt-2 sm:mt-3 bg-purple-600 text-white py-1.5 sm:py-2 rounded-lg hover:bg-purple-700 transition-colors text-xs sm:text-sm">
                        Play
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "recommendations" && (
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Recommended for You</h3>
                
                <div className="space-y-4 sm:space-y-6">
                  {recommendations.map((rec) => (
                    <div key={rec.id} className="bg-gray-50 rounded-lg p-4 sm:p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 sm:space-x-4 min-w-0 flex-1">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Star className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="font-medium text-gray-900 mb-1 text-sm sm:text-base truncate">{rec.title}</h4>
                            <p className="text-xs sm:text-sm text-gray-600 mb-2 truncate">{rec.artist}</p>
                            <span className="inline-block px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                              {rec.type}
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-1 sm:space-x-2 ml-2">
                          <button className="p-1.5 sm:p-2 text-gray-400 hover:text-purple-600">
                            <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                          <button className="p-1.5 sm:p-2 text-gray-400 hover:text-red-500">
                            <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                          <button className="p-1.5 sm:p-2 text-gray-400 hover:text-blue-600">
                            <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "shop" && (
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">EMG Music Shop</h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                  {merchItems.map((item) => (
                    <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-lg transition-shadow">
                      <div className="w-full h-24 sm:h-32 bg-gray-100 rounded-lg flex items-center justify-center mb-2 sm:mb-3 text-2xl sm:text-4xl">
                        {item.image}
                      </div>
                      <h5 className="font-medium text-gray-900 mb-1 text-xs sm:text-sm">{item.name}</h5>
                      <p className="text-sm sm:text-lg font-bold text-purple-600 mb-2 sm:mb-3">${item.price}</p>
                      <button className="w-full bg-purple-600 text-white py-1.5 sm:py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
                        <ShoppingBag className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserFeed;
