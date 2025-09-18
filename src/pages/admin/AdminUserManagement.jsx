import React, { useState, useEffect } from "react";
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  UserCheck, 
  UserX, 
  Mail, 
  Shield, 
  Calendar,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Edit,
  Trash2,
  UserPlus,
  Download,
  Music,
  Star,
  Globe,
  Phone,
  MapPin,
  Award,
  DollarSign,
  Play,
  X
} from "lucide-react";
import { getCountryOptions } from "../../constants/presenceData";
import { dbHelpers } from "../../lib/supabaseClient";
import { useToast } from "../../contexts/ToastContext";
import Modal from "../../components/Modal";

const AdminUserManagement = () => {
  const { showToast } = useToast();
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedSubscription, setSelectedSubscription] = useState("all");
  const [selectedVerification, setSelectedVerification] = useState("all");
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [artistStats, setArtistStats] = useState({});
  const [artistAnalytics, setArtistAnalytics] = useState({});

  useEffect(() => {
    loadArtists();
    loadArtistAnalytics();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadArtists = async () => {
    try {
      setLoading(true);
      const { data, error } = await dbHelpers.getAllArtists();
      if (error) {
        console.error('Error loading artists:', error);
        showToast('Failed to load artists', 'error');
        return;
      }
      setArtists(data || []);
    } catch (error) {
      console.error('Error loading artists:', error);
      showToast('Failed to load artists', 'error');
    } finally {
      setLoading(false);
    }
  };

  const loadArtistAnalytics = async () => {
    try {
      const { data, error } = await dbHelpers.getArtistAnalyticsSummary();
      if (error) {
        console.error('Error loading artist analytics:', error);
        return;
      }
      setArtistAnalytics(data || {});
    } catch (error) {
      console.error('Error loading artist analytics:', error);
    }
  };

  const handleArtistAction = async (artistId, action) => {
    try {
      let result;
      
      switch (action) {
        case 'activate':
          result = await dbHelpers.updateArtist(artistId, { is_active: true });
          if (result.error) throw result.error;
          showToast('Artist activated successfully', 'success');
          break;
          
        case 'deactivate':
          result = await dbHelpers.updateArtist(artistId, { is_active: false });
          if (result.error) throw result.error;
          showToast('Artist deactivated successfully', 'success');
          break;
          
        case 'verify':
          result = await dbHelpers.updateArtist(artistId, { is_verified: true });
          if (result.error) throw result.error;
          showToast('Artist verified successfully', 'success');
          break;
          
        case 'unverify':
          result = await dbHelpers.updateArtist(artistId, { is_verified: false });
          if (result.error) throw result.error;
          showToast('Artist verification removed', 'success');
          break;
          
        case 'delete':
          if (window.confirm('Are you sure you want to delete this artist? This action cannot be undone and will remove all their tracks and data.')) {
            result = await dbHelpers.deleteArtist(artistId);
            if (result.error) throw result.error;
            showToast('Artist deleted successfully', 'success');
          }
          break;
          
        case 'view': {
          const artist = artists.find(a => a.id === artistId);
          setSelectedArtist(artist);
          await loadArtistStats(artistId);
          setShowViewModal(true);
          break;
        }
          
        case 'edit': {
          const artistToEdit = artists.find(a => a.id === artistId);
          setSelectedArtist(artistToEdit);
          setShowEditModal(true);
          break;
        }
          
        default:
          console.log(`Unknown action: ${action}`);
      }
      
      // Reload artists after action
      await loadArtists();
    } catch (error) {
      console.error('Error performing artist action:', error);
      showToast(`Failed to ${action} artist: ${error.message}`, 'error');
    }
  };

  const loadArtistStats = async (artistId) => {
    try {
      const { data, error } = await dbHelpers.getArtistStats(artistId);
      if (error) {
        console.error('Error loading artist stats:', error);
        return;
      }
      setArtistStats(data || {});
    } catch (error) {
      console.error('Error loading artist stats:', error);
    }
  };

  const handleCreateArtist = async (artistData) => {
    try {
      const { error } = await dbHelpers.createArtist(artistData);
      if (error) throw error;
      showToast('Artist created successfully', 'success');
      setShowCreateModal(false);
      await loadArtists();
    } catch (error) {
      console.error('Error creating artist:', error);
      showToast(`Failed to create artist: ${error.message}`, 'error');
    }
  };

  const handleUpdateArtist = async (artistId, updates) => {
    try {
      const { error } = await dbHelpers.updateArtist(artistId, updates);
      if (error) throw error;
      showToast('Artist updated successfully', 'success');
      setShowEditModal(false);
      setSelectedArtist(null);
      await loadArtists();
    } catch (error) {
      console.error('Error updating artist:', error);
      showToast(`Failed to update artist: ${error.message}`, 'error');
    }
  };

  const filteredArtists = artists.filter(artist => {
    const matchesSearch = artist.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         artist.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "all" || 
                         (selectedStatus === "active" && artist.is_active) ||
                         (selectedStatus === "inactive" && !artist.is_active);
    const matchesSubscription = selectedSubscription === "all" || artist.subscription_tier === selectedSubscription;
    const matchesVerification = selectedVerification === "all" || 
                               (selectedVerification === "verified" && artist.is_verified) ||
                               (selectedVerification === "unverified" && !artist.is_verified);
    return matchesSearch && matchesStatus && matchesSubscription && matchesVerification;
  });

  const getStatusColor = (isActive) => {
    return isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Artist Management</h1>
          <p className="text-gray-600 mt-1">Manage all platform artists, their profiles, and permissions</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Artists
          </button>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
          >
            <UserPlus className="h-4 w-4" />
            Add Artist
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Music className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Artists</p>
              <p className="text-2xl font-bold text-gray-900">{artistAnalytics.totalArtists || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <UserCheck className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Artists</p>
              <p className="text-2xl font-bold text-gray-900">{artistAnalytics.activeArtists || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Award className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Verified Artists</p>
              <p className="text-2xl font-bold text-gray-900">{artistAnalytics.verifiedArtists || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">New This Month</p>
              <p className="text-2xl font-bold text-gray-900">{artistAnalytics.newThisMonth || 0}</p>
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
                placeholder="Search artists by username or email..."
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
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <select
              value={selectedSubscription}
              onChange={(e) => setSelectedSubscription(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Plans</option>
              <option value="free">Free</option>
              <option value="premium">Premium</option>
              <option value="pro">Pro</option>
            </select>
            <select
              value={selectedVerification}
              onChange={(e) => setSelectedVerification(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Verification</option>
              <option value="verified">Verified</option>
              <option value="unverified">Unverified</option>
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

      {/* Artists Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">
              Artists ({filteredArtists.length})
            </h3>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedArtists.length === filteredArtists.length}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedArtists(filteredArtists.map(a => a.id));
                  } else {
                    setSelectedArtists([]);
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
            <p className="text-gray-600 mt-2">Loading artists...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Username
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone Number
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredArtists.map((artist) => (
                  <tr key={artist.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedArtists.includes(artist.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedArtists([...selectedArtists, artist.id]);
                            } else {
                              setSelectedArtists(selectedArtists.filter(id => id !== artist.id));
                            }
                          }}
                          className="rounded border-gray-300 mr-3"
                        />
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                            <span className="text-sm font-medium text-purple-600">
                              {artist.username?.charAt(0) || 'A'}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {artist.username || 'Unknown'}
                          </div>
                          <div className="text-sm text-gray-500">{artist.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(artist.is_active)}`}>
                        {artist.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(artist.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {artist.phone_number || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleArtistAction(artist.id, 'view')}
                          className="text-gray-400 hover:text-gray-600"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleArtistAction(artist.id, 'edit')}
                          className="text-gray-400 hover:text-gray-600"
                          title="Edit Artist"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleArtistAction(artist.id, artist.is_verified ? 'unverify' : 'verify')}
                          className={artist.is_verified ? "text-yellow-400 hover:text-yellow-600" : "text-green-400 hover:text-green-600"}
                          title={artist.is_verified ? "Remove Verification" : "Verify Artist"}
                        >
                          {artist.is_verified ? <X className="h-4 w-4" /> : <Award className="h-4 w-4" />}
                        </button>
                        <button
                          onClick={() => handleArtistAction(artist.id, artist.is_active ? 'deactivate' : 'activate')}
                          className={artist.is_active ? "text-red-400 hover:text-red-600" : "text-green-400 hover:text-green-600"}
                          title={artist.is_active ? "Deactivate" : "Activate"}
                        >
                          {artist.is_active ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                        </button>
                        <button
                          onClick={() => handleArtistAction(artist.id, 'delete')}
                          className="text-red-400 hover:text-red-600"
                          title="Delete Artist"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filteredArtists.length === 0 && !loading && (
          <div className="p-8 text-center">
            <Music className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No artists found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>

      {/* Bulk Actions */}
      {selectedArtists.length > 0 && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-purple-700">
              {selectedArtists.length} artist(s) selected
            </span>
            <div className="flex items-center gap-2">
              <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">
                Activate
              </button>
              <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                Deactivate
              </button>
              <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                Verify
              </button>
              <button className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700">
                Export
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Artist Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Artist"
        size="lg"
      >
        <CreateArtistForm onSubmit={handleCreateArtist} onCancel={() => setShowCreateModal(false)} />
      </Modal>

      {/* Edit Artist Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedArtist(null);
        }}
        title="Edit Artist"
        size="lg"
      >
        {selectedArtist && (
          <EditArtistForm 
            artist={selectedArtist} 
            onSubmit={(updates) => handleUpdateArtist(selectedArtist.id, updates)} 
            onCancel={() => {
              setShowEditModal(false);
              setSelectedArtist(null);
            }} 
          />
        )}
      </Modal>

      {/* View Artist Modal */}
      <Modal
        isOpen={showViewModal}
        onClose={() => {
          setShowViewModal(false);
          setSelectedArtist(null);
          setArtistStats({});
        }}
        title="Artist Details"
        size="xl"
      >
        {selectedArtist && (
          <ViewArtistDetails artist={selectedArtist} stats={artistStats} />
        )}
      </Modal>
    </div>
  );
};

// Create Artist Form Component
const CreateArtistForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    username: '',
    full_name: '',
    email: '',
    artist_name: '',
    bio: '',
    country: '',
    city: '',
    phone_number: '',
    website_url: '',
    instagram_handle: '',
    twitter_handle: '',
    youtube_channel: '',
    music_genres: [],
    subscription_tier: 'free',
    is_active: true,
    is_verified: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username *
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Artist Name
          </label>
          <input
            type="text"
            name="artist_name"
            value={formData.artist_name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Country
          </label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Select country</option>
            {getCountryOptions().map((country) => (
              <option key={country.value} value={country.value}>
                {country.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subscription Tier
          </label>
          <select
            name="subscription_tier"
            value={formData.subscription_tier}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="free">Free</option>
            <option value="premium">Premium</option>
            <option value="pro">Pro</option>
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Bio
        </label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Website URL
          </label>
          <input
            type="url"
            name="website_url"
            value={formData.website_url}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Instagram Handle
          </label>
          <input
            type="text"
            name="instagram_handle"
            value={formData.instagram_handle}
            onChange={handleChange}
            placeholder="@username"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Twitter Handle
          </label>
          <input
            type="text"
            name="twitter_handle"
            value={formData.twitter_handle}
            onChange={handleChange}
            placeholder="@username"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            YouTube Channel
          </label>
          <input
            type="text"
            name="youtube_channel"
            value={formData.youtube_channel}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="is_active"
            checked={formData.is_active}
            onChange={handleChange}
            className="rounded border-gray-300"
          />
          <span className="ml-2 text-sm text-gray-700">Active</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="is_verified"
            checked={formData.is_verified}
            onChange={handleChange}
            className="rounded border-gray-300"
          />
          <span className="ml-2 text-sm text-gray-700">Verified</span>
        </label>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Create Artist
        </button>
      </div>
    </form>
  );
};

// Edit Artist Form Component
const EditArtistForm = ({ artist, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    username: artist.username || '',
    full_name: artist.full_name || '',
    email: artist.email || '',
    artist_name: artist.artist_name || '',
    bio: artist.bio || '',
    country: artist.country || '',
    city: artist.city || '',
    phone_number: artist.phone_number || '',
    website_url: artist.website_url || '',
    instagram_handle: artist.instagram_handle || '',
    twitter_handle: artist.twitter_handle || '',
    youtube_channel: artist.youtube_channel || '',
    subscription_tier: artist.subscription_tier || 'free',
    is_active: artist.is_active !== false,
    is_verified: artist.is_verified || false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username *
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Artist Name
          </label>
          <input
            type="text"
            name="artist_name"
            value={formData.artist_name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Country
          </label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Select country</option>
            {getCountryOptions().map((country) => (
              <option key={country.value} value={country.value}>
                {country.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subscription Tier
          </label>
          <select
            name="subscription_tier"
            value={formData.subscription_tier}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="free">Free</option>
            <option value="premium">Premium</option>
            <option value="pro">Pro</option>
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Bio
        </label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Website URL
          </label>
          <input
            type="url"
            name="website_url"
            value={formData.website_url}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Instagram Handle
          </label>
          <input
            type="text"
            name="instagram_handle"
            value={formData.instagram_handle}
            onChange={handleChange}
            placeholder="@username"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Twitter Handle
          </label>
          <input
            type="text"
            name="twitter_handle"
            value={formData.twitter_handle}
            onChange={handleChange}
            placeholder="@username"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            YouTube Channel
          </label>
          <input
            type="text"
            name="youtube_channel"
            value={formData.youtube_channel}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="is_active"
            checked={formData.is_active}
            onChange={handleChange}
            className="rounded border-gray-300"
          />
          <span className="ml-2 text-sm text-gray-700">Active</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="is_verified"
            checked={formData.is_verified}
            onChange={handleChange}
            className="rounded border-gray-300"
          />
          <span className="ml-2 text-sm text-gray-700">Verified</span>
        </label>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Update Artist
        </button>
      </div>
    </form>
  );
};

// View Artist Details Component
const ViewArtistDetails = ({ artist, stats }) => {
  return (
    <div className="space-y-6">
      {/* Artist Header */}
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
          <span className="text-2xl font-bold text-purple-600">
            {artist.artist_name?.charAt(0) || artist.full_name?.charAt(0) || artist.username?.charAt(0) || 'A'}
          </span>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900">
            {artist.artist_name || artist.full_name || artist.username || 'Unknown Artist'}
          </h3>
          <p className="text-gray-600">{artist.email}</p>
          <div className="flex items-center space-x-2 mt-2">
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${artist.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
              {artist.is_active ? 'Active' : 'Inactive'}
            </span>
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${artist.is_verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
              {artist.is_verified ? 'Verified' : 'Unverified'}
            </span>
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${artist.subscription_tier === 'pro' ? 'bg-purple-100 text-purple-800' : artist.subscription_tier === 'premium' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
              {artist.subscription_tier || 'free'}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{stats.totalTracks || 0}</div>
          <div className="text-sm text-gray-600">Total Tracks</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{stats.totalPlays || 0}</div>
          <div className="text-sm text-gray-600">Total Plays</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">${stats.totalEarnings || 0}</div>
          <div className="text-sm text-gray-600">Total Earnings</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{stats.tracksThisMonth || 0}</div>
          <div className="text-sm text-gray-600">Tracks This Month</div>
        </div>
      </div>

      {/* Artist Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-medium text-gray-900 mb-3">Basic Information</h4>
          <div className="space-y-2">
            <div>
              <span className="text-sm font-medium text-gray-600">Username:</span>
              <span className="ml-2 text-sm text-gray-900">{artist.username || 'N/A'}</span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Full Name:</span>
              <span className="ml-2 text-sm text-gray-900">{artist.full_name || 'N/A'}</span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Artist Name:</span>
              <span className="ml-2 text-sm text-gray-900">{artist.artist_name || 'N/A'}</span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Location:</span>
              <span className="ml-2 text-sm text-gray-900">
                {[artist.city, artist.country].filter(Boolean).join(', ') || 'N/A'}
              </span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Phone:</span>
              <span className="ml-2 text-sm text-gray-900">{artist.phone_number || 'N/A'}</span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Gender:</span>
              <span className="ml-2 text-sm text-gray-900">{artist.gender || 'N/A'}</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-medium text-gray-900 mb-3">Social Media</h4>
          <div className="space-y-2">
            <div>
              <span className="text-sm font-medium text-gray-600">Website:</span>
              <span className="ml-2 text-sm text-gray-900">
                {artist.website_url ? (
                  <a href={artist.website_url} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">
                    {artist.website_url}
                  </a>
                ) : 'N/A'}
              </span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Instagram:</span>
              <span className="ml-2 text-sm text-gray-900">{artist.instagram_handle || 'N/A'}</span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Twitter:</span>
              <span className="ml-2 text-sm text-gray-900">{artist.twitter_handle || 'N/A'}</span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">YouTube:</span>
              <span className="ml-2 text-sm text-gray-900">{artist.youtube_channel || 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bio */}
      {artist.bio && (
        <div>
          <h4 className="text-lg font-medium text-gray-900 mb-3">Bio</h4>
          <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-4">{artist.bio}</p>
        </div>
      )}

      {/* Account Information */}
      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-3">Account Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="text-sm font-medium text-gray-600">Member Since:</span>
            <span className="ml-2 text-sm text-gray-900">
              {new Date(artist.created_at).toLocaleDateString()}
            </span>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-600">Last Login:</span>
            <span className="ml-2 text-sm text-gray-900">
              {artist.last_login_at ? new Date(artist.last_login_at).toLocaleDateString() : 'Never'}
            </span>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-600">Email Verified:</span>
            <span className="ml-2 text-sm text-gray-900">
              {artist.email_verified_at ? new Date(artist.email_verified_at).toLocaleDateString() : 'Not verified'}
            </span>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-600">Profile Completion:</span>
            <span className="ml-2 text-sm text-gray-900">{artist.profile_completion_percentage || 0}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserManagement;
