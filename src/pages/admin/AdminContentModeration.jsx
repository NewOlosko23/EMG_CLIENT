import React, { useState, useEffect } from "react";
import { 
  Music, 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle, 
  X, 
  Clock, 
  AlertTriangle,
  Eye,
  Play,
  Pause,
  Download,
  User,
  Calendar,
  Tag,
  Volume2,
  FileText,
  Image,
  Shield
} from "lucide-react";
import { dbHelpers } from "../../lib/supabaseClient";

const AdminContentModeration = () => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("pending");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [showTrackModal, setShowTrackModal] = useState(false);

  useEffect(() => {
    loadTracks();
  }, []);

  const loadTracks = async () => {
    try {
      setLoading(true);
      const { data, error } = await dbHelpers.getPendingTracks();
      if (error) {
        console.error('Error loading tracks:', error);
        return;
      }
      setTracks(data || []);
    } catch (error) {
      console.error('Error loading tracks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTrackAction = async (trackId, action, rejectionReason = null) => {
    try {
      if (action === 'approve') {
        await dbHelpers.updateTrackApproval(trackId, 'approved');
      } else if (action === 'reject') {
        await dbHelpers.updateTrackApproval(trackId, 'rejected', rejectionReason);
      }
      await loadTracks();
    } catch (error) {
      console.error('Error performing track action:', error);
    }
  };

  const filteredTracks = tracks.filter(track => {
    const matchesSearch = track.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         track.artist_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         track.genre?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "all" || track.approval_status === selectedStatus;
    const matchesGenre = selectedGenre === "all" || track.genre === selectedGenre;
    return matchesSearch && matchesStatus && matchesGenre;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getGenreColor = (genre) => {
    const colors = {
      'Electronic': 'bg-purple-100 text-purple-800',
      'Hip-Hop': 'bg-orange-100 text-orange-800',
      'Pop': 'bg-pink-100 text-pink-800',
      'Rock': 'bg-red-100 text-red-800',
      'Jazz': 'bg-blue-100 text-blue-800',
      'Classical': 'bg-indigo-100 text-indigo-800',
      'Country': 'bg-green-100 text-green-800',
      'R&B': 'bg-yellow-100 text-yellow-800'
    };
    return colors[genre] || 'bg-gray-100 text-gray-800';
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content Moderation</h1>
          <p className="text-gray-600 mt-1">Review and approve tracks, manage content quality</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Moderation Rules
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Review</p>
              <p className="text-2xl font-bold text-gray-900">
                {tracks.filter(t => t.approval_status === 'pending').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Approved Today</p>
              <p className="text-2xl font-bold text-gray-900">
                {tracks.filter(t => {
                  const today = new Date().toISOString().split('T')[0];
                  return t.approval_status === 'approved' && t.updated_at?.startsWith(today);
                }).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <X className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Rejected Today</p>
              <p className="text-2xl font-bold text-gray-900">
                {tracks.filter(t => {
                  const today = new Date().toISOString().split('T')[0];
                  return t.approval_status === 'rejected' && t.updated_at?.startsWith(today);
                }).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Music className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Tracks</p>
              <p className="text-2xl font-bold text-gray-900">{tracks.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tracks by title, artist, or genre..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Genres</option>
              <option value="Electronic">Electronic</option>
              <option value="Hip-Hop">Hip-Hop</option>
              <option value="Pop">Pop</option>
              <option value="Rock">Rock</option>
              <option value="Jazz">Jazz</option>
              <option value="Classical">Classical</option>
              <option value="Country">Country</option>
              <option value="R&B">R&B</option>
              <option value="Gospel">Gospel</option>
            </select>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Tracks Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">
              Tracks ({filteredTracks.length})
            </h3>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedTracks.length === filteredTracks.length}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedTracks(filteredTracks.map(t => t.id));
                  } else {
                    setSelectedTracks([]);
                  }
                }}
                className="rounded border-gray-300"
              />
              <span className="text-sm text-gray-600">Select All</span>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
            <p className="text-gray-600 mt-2">Loading tracks...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Track
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Artist
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Genre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTracks.map((track) => (
                  <tr key={track.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedTracks.includes(track.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedTracks([...selectedTracks, track.id]);
                            } else {
                              setSelectedTracks(selectedTracks.filter(id => id !== track.id));
                            }
                          }}
                          className="rounded border-gray-300 mr-3"
                        />
                        <div className="flex-shrink-0 h-12 w-12">
                          {track.cover_art_url ? (
                            <img
                              src={track.cover_art_url}
                              alt={track.title}
                              className="h-12 w-12 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
                              <Music className="h-6 w-6 text-purple-600" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                            {track.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {track.description ? track.description.substring(0, 50) + '...' : 'No description'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">
                          {track.profiles_emg?.full_name || track.artist_name || 'Unknown Artist'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getGenreColor(track.genre)}`}>
                        {track.genre || 'Unknown'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDuration(track.duration || 0)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(track.approval_status)}`}>
                        {track.approval_status || 'pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(track.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedTrack(track);
                            setShowTrackModal(true);
                          }}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedTrack(track);
                            setShowTrackModal(true);
                          }}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <Play className="h-4 w-4" />
                        </button>
                        {track.approval_status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleTrackAction(track.id, 'approve')}
                              className="text-green-400 hover:text-green-600"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleTrackAction(track.id, 'reject')}
                              className="text-red-400 hover:text-red-600"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filteredTracks.length === 0 && !loading && (
          <div className="p-8 text-center">
            <Music className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tracks found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>

      {/* Bulk Actions */}
      {selectedTracks.length > 0 && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-purple-700">
              {selectedTracks.length} track(s) selected
            </span>
            <div className="flex items-center gap-2">
              <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">
                Approve All
              </button>
              <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                Reject All
              </button>
              <button className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700">
                Export
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Track Detail Modal */}
      {showTrackModal && selectedTrack && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Track Review</h3>
              <button
                onClick={() => setShowTrackModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Track Info */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Track Information</h4>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div><strong>Title:</strong> {selectedTrack.title}</div>
                    <div><strong>Artist:</strong> {selectedTrack.profiles_emg?.full_name || selectedTrack.artist_name}</div>
                    <div><strong>Genre:</strong> {selectedTrack.genre}</div>
                    <div><strong>Duration:</strong> {formatDuration(selectedTrack.duration)}</div>
                    <div><strong>Status:</strong> 
                      <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedTrack.approval_status)}`}>
                        {selectedTrack.approval_status}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Description</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">
                      {selectedTrack.description || 'No description provided'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Cover Art & Audio */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Cover Art</h4>
                  <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-center">
                    {selectedTrack.cover_art_url ? (
                      <img
                        src={selectedTrack.cover_art_url}
                        alt={selectedTrack.title}
                        className="h-32 w-32 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="h-32 w-32 rounded-lg bg-purple-100 flex items-center justify-center">
                        <Image className="h-8 w-8 text-purple-600" />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Audio Preview</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-center">
                      <button className="bg-purple-600 text-white p-3 rounded-full hover:bg-purple-700">
                        <Play className="h-6 w-6" />
                      </button>
                    </div>
                    <div className="mt-2 text-center text-sm text-gray-600">
                      {formatDuration(selectedTrack.duration)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            {selectedTrack.approval_status === 'pending' && (
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => {
                    handleTrackAction(selectedTrack.id, 'reject');
                    setShowTrackModal(false);
                  }}
                  className="px-4 py-2 text-red-700 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
                >
                  Reject Track
                </button>
                <button
                  onClick={() => {
                    handleTrackAction(selectedTrack.id, 'approve');
                    setShowTrackModal(false);
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Approve Track
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContentModeration;
