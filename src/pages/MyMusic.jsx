import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Music, 
  Play, 
  Pause, 
  MoreVertical, 
  Download, 
  Share2, 
  Heart, 
  Clock, 
  Search, 
  Filter, 
  SortAsc, 
  SortDesc,
  Edit3,
  Trash2,
  Eye,
  CheckSquare,
  Square,
  Calendar,
  TrendingUp,
  Users,
  Globe
} from "lucide-react";
import { dbHelpers, fileHelpers } from "../lib/supabaseClient";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";

const MyMusic = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [viewMode, setViewMode] = useState("table"); // table or grid
  const [showFilters, setShowFilters] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalTracks: 0,
    totalPlays: 0,
    followers: 0,
    monthlyPlays: 0
  });

  // Fetch user's tracks
  useEffect(() => {
    const fetchTracks = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        const { data: userTracks, error } = await dbHelpers.getUserTracks(user.id);
        
        if (error) {
          throw new Error(error.message);
        }
        
        // Transform tracks data for display
        const transformedTracks = userTracks?.map(track => ({
          id: track.id,
          title: track.title,
          artist: track.artist,
          duration: track.duration ? formatDuration(track.duration) : "0:00",
          plays: track.play_count || 0,
          status: track.status === 'approved' ? 'Live' : track.status === 'pending' ? 'Pending' : 'Rejected',
          genre: track.genre,
          releaseDate: track.release_date || track.created_at,
          platforms: track.platforms || [],
          audioUrl: track.audio_url,
          coverArtUrl: track.cover_art_url,
          description: track.description,
          tags: track.tags || [],
          explicit: track.explicit || false
        })) || [];
        
        setTracks(transformedTracks);
        
        // Calculate stats
        const totalPlays = transformedTracks.reduce((sum, track) => sum + (track.plays || 0), 0);
        const monthlyPlays = transformedTracks.reduce((sum, track) => {
          const trackDate = new Date(track.releaseDate);
          const currentDate = new Date();
          const isThisMonth = trackDate.getMonth() === currentDate.getMonth() && 
                             trackDate.getFullYear() === currentDate.getFullYear();
          return isThisMonth ? sum + (track.plays || 0) : sum;
        }, 0);
        
        setStats({
          totalTracks: transformedTracks.length,
          totalPlays,
          followers: 0, // This would come from a separate query
          monthlyPlays
        });
        
      } catch (error) {
        console.error('Error fetching tracks:', error);
        showToast('Failed to load tracks', 'error');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTracks();
  }, [user, showToast]);

  // Helper function to format duration
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Filter and sort tracks
  const filteredTracks = tracks
    .filter(track => {
      const matchesSearch = track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           track.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           track.artist.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = selectedGenre === "all" || track.genre === selectedGenre;
      return matchesSearch && matchesGenre;
    })
    .sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case "title":
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case "plays":
          aValue = a.plays;
          bValue = b.plays;
          break;
        case "date":
          aValue = new Date(a.releaseDate);
          bValue = new Date(b.releaseDate);
          break;
        case "duration":
          aValue = a.duration;
          bValue = b.duration;
          break;
        default:
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
      }
      
      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const genres = ["all", "Electronic", "Ambient", "Synthwave", "House", "Techno", "Pop", "Rock", "Gospel"];

  const handleSelectTrack = (trackId) => {
    setSelectedTracks(prev => 
      prev.includes(trackId) 
        ? prev.filter(id => id !== trackId)
        : [...prev, trackId]
    );
  };

  const handleSelectAll = () => {
    setSelectedTracks(
      selectedTracks.length === filteredTracks.length 
        ? [] 
        : filteredTracks.map(track => track.id)
    );
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk action: ${action} on tracks:`, selectedTracks);
    // Handle bulk actions here
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Music</h1>
          <p className="text-gray-600 mt-1">Manage your tracks and releases</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode(viewMode === "table" ? "grid" : "table")}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              {viewMode === "table" ? <Eye className="h-4 w-4" /> : <Music className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter className="h-4 w-4" />
            </button>
          </div>
          <Link 
            to="/dashboard/upload"
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
          >
            <Music className="h-4 w-4" />
            Upload New Track
          </Link>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tracks by title or genre..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {genres.map(genre => (
                <option key={genre} value={genre}>
                  {genre === "all" ? "All Genres" : genre}
                </option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="date">Sort by Date</option>
              <option value="title">Sort by Title</option>
              <option value="plays">Sort by Plays</option>
              <option value="duration">Sort by Duration</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              {sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedTracks.length > 0 && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-purple-900">
                {selectedTracks.length} track{selectedTracks.length > 1 ? 's' : ''} selected
              </span>
              <button
                onClick={handleSelectAll}
                className="text-sm text-purple-600 hover:text-purple-700"
              >
                {selectedTracks.length === filteredTracks.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleBulkAction('download')}
                className="px-3 py-1 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Download
              </button>
              <button
                onClick={() => handleBulkAction('share')}
                className="px-3 py-1 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Share
              </button>
              <button
                onClick={() => handleBulkAction('delete')}
                className="px-3 py-1 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Music className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Tracks</p>
              <p className="text-xl font-semibold text-gray-900">{stats.totalTracks}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Play className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Plays</p>
              <p className="text-xl font-semibold text-gray-900">{stats.totalPlays.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Heart className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Followers</p>
              <p className="text-xl font-semibold text-gray-900">{stats.followers.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-xl font-semibold text-gray-900">{stats.monthlyPlays.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tracks Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Your Tracks ({filteredTracks.length})
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Showing {filteredTracks.length} of {tracks.length} tracks</span>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
              <span className="ml-2 text-gray-600">Loading tracks...</span>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={handleSelectAll}
                      className="flex items-center gap-2 hover:text-gray-700"
                    >
                      {selectedTracks.length === filteredTracks.length ? (
                        <CheckSquare className="h-4 w-4 text-purple-600" />
                      ) : (
                        <Square className="h-4 w-4" />
                      )}
                      Track
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Genre
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Plays
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Release Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTracks.map((track) => (
                <tr key={track.id} className={`hover:bg-gray-50 ${selectedTracks.includes(track.id) ? 'bg-purple-50' : ''}`}>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleSelectTrack(track.id)}
                        className="flex-shrink-0"
                      >
                        {selectedTracks.includes(track.id) ? (
                          <CheckSquare className="h-4 w-4 text-purple-600" />
                        ) : (
                          <Square className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Music className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{track.title}</p>
                        <p className="text-sm text-gray-500">{track.artist}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {track.genre}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">{track.duration}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-green-500" />
                      <span className="text-sm text-gray-900">{track.plays.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {new Date(track.releaseDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {track.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button className="text-gray-400 hover:text-gray-600" title="Play">
                        <Play className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600" title="Download">
                        <Download className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600" title="Share">
                        <Share2 className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600" title="Edit">
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-red-600" title="Delete">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {filteredTracks.length === 0 && (
          <div className="text-center py-12">
            <Music className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tracks found</h3>
            <p className="text-gray-500 mb-4">
              {searchQuery || selectedGenre !== "all" 
                ? "Try adjusting your search or filter criteria."
                : "You haven't uploaded any tracks yet."
              }
            </p>
            {!searchQuery && selectedGenre === "all" && (
              <Link 
                to="/dashboard/upload"
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors inline-flex items-center gap-2"
              >
                <Music className="h-4 w-4" />
                Upload Your First Track
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyMusic;
