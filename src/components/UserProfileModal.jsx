import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  MapPin, 
  Phone, 
  Globe, 
  Instagram, 
  Twitter, 
  Facebook, 
  Youtube, 
  Music, 
  Calendar, 
  Edit,
  Mail,
  Award,
  Clock
} from 'lucide-react';
import Modal from './Modal';

const UserProfileModal = ({ isOpen, onClose, userProfile, user }) => {
  const navigate = useNavigate();

  const handleEditProfile = () => {
    onClose();
    navigate('/dashboard/profile');
  };

  if (!userProfile) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString();
  };

  const formatGenres = (genres) => {
    if (!genres || !Array.isArray(genres) || genres.length === 0) {
      return 'Not specified';
    }
    return genres.join(', ');
  };

  const formatInstruments = (instruments) => {
    if (!instruments || !Array.isArray(instruments) || instruments.length === 0) {
      return 'Not specified';
    }
    return instruments.join(', ');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Profile Details"
      size="xl"
    >
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex items-start gap-6 pb-6 border-b border-gray-200">
          <div className="relative">
            {userProfile.avatar_url ? (
              <img
                src={userProfile.avatar_url}
                alt={userProfile.full_name || userProfile.username || 'User'}
                className="w-24 h-24 rounded-full object-cover border-4 border-purple-100"
              />
            ) : (
              <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center border-4 border-purple-100">
                <User className="h-12 w-12 text-purple-600" />
              </div>
            )}
            {userProfile.is_verified && (
              <div className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full p-1.5">
                <Award className="w-4 h-4" />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-gray-900">
                {userProfile.full_name || userProfile.username || 'User'}
              </h2>
              {userProfile.artist_name && (
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                  {userProfile.artist_name}
                </span>
              )}
            </div>
            
            {userProfile.bio && (
              <p className="text-gray-600 mb-3">{userProfile.bio}</p>
            )}
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{userProfile.role || 'Artist'}</span>
              </div>
              {userProfile.years_experience > 0 && (
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{userProfile.years_experience} years experience</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <User className="h-5 w-5 text-purple-600" />
              Basic Information
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Email</p>
                  <p className="text-sm text-gray-600">{user?.email || 'Not available'}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Username</p>
                  <p className="text-sm text-gray-600">{userProfile.username || 'Not set'}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Date of Birth</p>
                  <p className="text-sm text-gray-600">{formatDate(userProfile.date_of_birth)}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Gender</p>
                  <p className="text-sm text-gray-600">{userProfile.gender || 'Not specified'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Location Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-purple-600" />
              Location
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Country</p>
                  <p className="text-sm text-gray-600">{userProfile.country_name || userProfile.country || 'Not specified'}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">State/Province</p>
                  <p className="text-sm text-gray-600">{userProfile.state_province || 'Not specified'}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">City</p>
                  <p className="text-sm text-gray-600">{userProfile.city || 'Not specified'}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Postal Code</p>
                  <p className="text-sm text-gray-600">{userProfile.postal_code || 'Not specified'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Music className="h-5 w-5 text-purple-600" />
              Professional Info
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Music className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Record Label</p>
                  <p className="text-sm text-gray-600">{userProfile.record_label || 'Not specified'}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Music className="h-4 w-4 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Music Genres</p>
                  <p className="text-sm text-gray-600">{formatGenres(userProfile.music_genres)}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Music className="h-4 w-4 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Instruments</p>
                  <p className="text-sm text-gray-600">{formatInstruments(userProfile.instruments)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Phone className="h-5 w-5 text-purple-600" />
              Contact & Social
            </h3>
            
            <div className="space-y-3">
              {userProfile.phone_number && (
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Phone</p>
                    <p className="text-sm text-gray-600">{userProfile.phone_number}</p>
                  </div>
                </div>
              )}
              
              {userProfile.website_url && (
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Website</p>
                    <a 
                      href={userProfile.website_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      {userProfile.website_url}
                    </a>
                  </div>
                </div>
              )}
              
              {userProfile.instagram_handle && (
                <div className="flex items-center gap-3">
                  <Instagram className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Instagram</p>
                    <p className="text-sm text-gray-600">@{userProfile.instagram_handle}</p>
                  </div>
                </div>
              )}
              
              {userProfile.twitter_handle && (
                <div className="flex items-center gap-3">
                  <Twitter className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Twitter</p>
                    <p className="text-sm text-gray-600">@{userProfile.twitter_handle}</p>
                  </div>
                </div>
              )}
              
              {userProfile.youtube_channel && (
                <div className="flex items-center gap-3">
                  <Youtube className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">YouTube</p>
                    <p className="text-sm text-gray-600">{userProfile.youtube_channel}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Profile Completion */}
        {userProfile.profile_completion_percentage !== undefined && (
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-900">Profile Completion</h4>
              <span className="text-sm text-gray-600">{userProfile.profile_completion_percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${userProfile.profile_completion_percentage}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
          >
            Close
          </button>
          <button
            onClick={handleEditProfile}
            className="px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors flex items-center gap-2"
          >
            <Edit className="h-4 w-4" />
            Edit Profile
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UserProfileModal;
