import React from "react";
import { Music, Play, Pause, MoreVertical, Download, Share2, Heart, Clock } from "lucide-react";

const MyMusic = () => {
  // Mock music data
  const tracks = [
    {
      id: 1,
      title: "Summer Vibes",
      artist: "EMG Artist",
      duration: "3:45",
      plays: "125K",
      status: "Live",
      genre: "Electronic",
      releaseDate: "2024-01-15",
      platforms: ["Spotify", "Apple Music", "YouTube Music"]
    },
    {
      id: 2,
      title: "Midnight Dreams",
      artist: "EMG Artist",
      duration: "4:12",
      plays: "98K",
      status: "Live",
      genre: "Ambient",
      releaseDate: "2024-01-10",
      platforms: ["Spotify", "Apple Music", "Amazon Music"]
    },
    {
      id: 3,
      title: "Electric Dreams",
      artist: "EMG Artist",
      duration: "3:28",
      plays: "76K",
      status: "Live",
      genre: "Electronic",
      releaseDate: "2024-01-05",
      platforms: ["Spotify", "Apple Music", "YouTube Music", "Deezer"]
    },
    {
      id: 4,
      title: "Neon Lights",
      artist: "EMG Artist",
      duration: "4:05",
      plays: "54K",
      status: "Live",
      genre: "Synthwave",
      releaseDate: "2023-12-20",
      platforms: ["Spotify", "Apple Music", "YouTube Music"]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Music</h1>
          <p className="text-gray-600 mt-1">Manage your tracks and releases</p>
        </div>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
          <Music className="h-4 w-4" />
          Upload New Track
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Music className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Tracks</p>
              <p className="text-xl font-semibold text-gray-900">{tracks.length}</p>
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
              <p className="text-xl font-semibold text-gray-900">353K</p>
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
              <p className="text-xl font-semibold text-gray-900">12.5K</p>
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
              <p className="text-xl font-semibold text-gray-900">45K</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tracks Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Your Tracks</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Track
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
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tracks.map((track) => (
                <tr key={track.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
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
                  <td className="px-4 py-4 text-sm text-gray-900">{track.plays}</td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {track.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button className="text-gray-400 hover:text-gray-600">
                        <Play className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Download className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Share2 className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="h-4 w-4" />
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
  );
};

export default MyMusic;
