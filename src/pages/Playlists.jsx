import React, { useState } from "react";
import { Play, Plus, Music, Users, Heart, MoreVertical, Share2, Edit3, Trash2 } from "lucide-react";

const Playlists = () => {
  const [playlists, setPlaylists] = useState([
    {
      id: 1,
      name: "My Favorites",
      description: "My personal collection of favorite tracks",
      trackCount: 24,
      followers: 1250,
      isPublic: true,
      createdAt: "2024-01-15",
      lastUpdated: "2024-03-10"
    },
    {
      id: 2,
      name: "Workout Mix",
      description: "High-energy tracks for workouts",
      trackCount: 18,
      followers: 890,
      isPublic: true,
      createdAt: "2024-02-01",
      lastUpdated: "2024-03-08"
    },
    {
      id: 3,
      name: "Chill Vibes",
      description: "Relaxing music for downtime",
      trackCount: 32,
      followers: 2100,
      isPublic: true,
      createdAt: "2024-01-20",
      lastUpdated: "2024-03-12"
    },
    {
      id: 4,
      name: "Private Collection",
      description: "Personal tracks and demos",
      trackCount: 15,
      followers: 0,
      isPublic: false,
      createdAt: "2024-02-15",
      lastUpdated: "2024-03-05"
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPlaylist, setNewPlaylist] = useState({
    name: "",
    description: "",
    isPublic: true
  });

  const handleCreatePlaylist = (e) => {
    e.preventDefault();
    const playlist = {
      id: playlists.length + 1,
      ...newPlaylist,
      trackCount: 0,
      followers: 0,
      createdAt: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setPlaylists([...playlists, playlist]);
    setNewPlaylist({ name: "", description: "", isPublic: true });
    setShowCreateModal(false);
  };

  const handleDeletePlaylist = (id) => {
    setPlaylists(playlists.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Playlists</h1>
          <p className="text-gray-600 mt-1">Create and manage your music playlists</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Create Playlist
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Music className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Playlists</p>
              <p className="text-xl font-semibold text-gray-900">{playlists.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Play className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Tracks</p>
              <p className="text-xl font-semibold text-gray-900">
                {playlists.reduce((sum, p) => sum + p.trackCount, 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Followers</p>
              <p className="text-xl font-semibold text-gray-900">
                {playlists.reduce((sum, p) => sum + p.followers, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Heart className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Public Playlists</p>
              <p className="text-xl font-semibold text-gray-900">
                {playlists.filter(p => p.isPublic).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Playlists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {playlists.map((playlist) => (
          <div key={playlist.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{playlist.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{playlist.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{playlist.trackCount} tracks</span>
                    <span>{playlist.followers} followers</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    playlist.isPublic 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {playlist.isPublic ? 'Public' : 'Private'}
                  </span>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500">
                  Updated {new Date(playlist.lastUpdated).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                    <Play className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                    <Share2 className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => handleDeletePlaylist(playlist.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Playlist Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Playlist</h3>
            <form onSubmit={handleCreatePlaylist} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Playlist Name *
                </label>
                <input
                  type="text"
                  value={newPlaylist.name}
                  onChange={(e) => setNewPlaylist({...newPlaylist, name: e.target.value})}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter playlist name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newPlaylist.description}
                  onChange={(e) => setNewPlaylist({...newPlaylist, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Describe your playlist..."
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={newPlaylist.isPublic}
                  onChange={(e) => setNewPlaylist({...newPlaylist, isPublic: e.target.checked})}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Make this playlist public
                </label>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Create Playlist
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Playlists;
