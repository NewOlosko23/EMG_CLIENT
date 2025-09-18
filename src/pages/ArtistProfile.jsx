import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { supabase, dbHelpers, fileHelpers } from '../lib/supabaseClient';
import { ensureStorageSetup } from '../lib/storageSetup';
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
  Save,
  Upload,
  X,
  Check,
  AlertCircle
} from 'lucide-react';

const ArtistProfile = () => {
  const { user } = useAuth();
  const { showSuccess, showError, showInfo } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profileData, setProfileData] = useState({
    // Basic Information
    username: '',
    full_name: '',
    bio: '',
    avatar_url: '',
    
    // Location Information
    country: '',
    country_name: '',
    state_province: '',
    city: '',
    postal_code: '',
    
    // Contact Information
    phone_number: '',
    website_url: '',
    instagram_handle: '',
    twitter_handle: '',
    facebook_url: '',
    youtube_channel: '',
    tiktok_handle: '',
    
    // Personal Details
    date_of_birth: '',
    gender: '',
    language: 'en',
    timezone: 'UTC',
    
    // Professional Information
    artist_name: '',
    record_label: '',
    music_genres: [],
    years_experience: 0,
    instruments: [],
    
    // Privacy & Preferences
    profile_visibility: 'public',
    show_email: false,
    show_phone: false,
    allow_messages: true,
    
    // Completion tracking
    profile_completion_percentage: 0
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [newGenre, setNewGenre] = useState('');
  const [newInstrument, setNewInstrument] = useState('');

  // Common music genres
  const commonGenres = [
    'Electronic', 'Hip Hop', 'Pop', 'Rock', 'R&B', 'Jazz', 'Classical', 'Country',
    'Reggae', 'Blues', 'Folk', 'Alternative', 'Indie', 'Ambient', 'Techno',
    'House', 'Trance', 'Dubstep', 'Drum & Bass', 'Trap', 'Future Bass', 'Lo-Fi', 'Gospel'
  ];

  // Common instruments
  const commonInstruments = [
    'Vocals', 'Guitar', 'Piano', 'Drums', 'Bass', 'Synthesizer', 'Violin',
    'Saxophone', 'Trumpet', 'Flute', 'Cello', 'Harp', 'Ukulele', 'Banjo',
    'Harmonica', 'Accordion', 'Xylophone', 'Marimba', 'DJ Equipment', 'MIDI Controller'
  ];

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles_emg')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      if (data) {
        setProfileData({
          // Basic Information
          username: data.username || '',
          full_name: data.full_name || '',
          bio: data.bio || '',
          avatar_url: data.avatar_url || '',
          
          // Location Information
          country: data.country || '',
          country_name: data.country_name || '',
          state_province: data.state_province || '',
          city: data.city || '',
          postal_code: data.postal_code || '',
          
          // Contact Information
          phone_number: data.phone_number || '',
          website_url: data.website_url || '',
          instagram_handle: data.instagram_handle || '',
          twitter_handle: data.twitter_handle || '',
          facebook_url: data.facebook_url || '',
          youtube_channel: data.youtube_channel || '',
          tiktok_handle: data.tiktok_handle || '',
          
          // Personal Details
          date_of_birth: data.date_of_birth ? data.date_of_birth.split('T')[0] : '',
          gender: data.gender || '',
          language: data.language || 'en',
          timezone: data.timezone || 'UTC',
          
          // Professional Information
          artist_name: data.artist_name || '',
          record_label: data.record_label || '',
          music_genres: data.music_genres || [],
          years_experience: data.years_experience || 0,
          instruments: data.instruments || [],
          
          // Privacy & Preferences
          profile_visibility: data.profile_visibility || 'public',
          show_email: data.show_email || false,
          show_phone: data.show_phone || false,
          allow_messages: data.allow_messages !== false,
          
          // Completion tracking
          profile_completion_percentage: data.profile_completion_percentage || 0
        });
        setAvatarPreview(data.avatar_url || '');
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      showError('Error loading profile', 'Failed to load your profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        showError('File too large', 'Avatar image must be less than 5MB');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        showError('Invalid file type', 'Please select an image file');
        return;
      }

      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setAvatarPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const uploadAvatar = async () => {
    if (!avatarFile) return null;

    try {
      // Create unique filename with timestamp to avoid conflicts
      const fileExt = avatarFile.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = fileName; // Don't include 'avatars/' prefix as it's already the bucket name

      // Upload directly to avoid conflicts
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, avatarFile, {
          cacheControl: '3600',
          upsert: true // This allows overwriting existing files
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        
        // If bucket doesn't exist, try to set up storage
        if (uploadError.message.includes('Bucket not found')) {
          console.log('Attempting to set up storage buckets...');
          const setupResult = await ensureStorageSetup();
          
          if (setupResult.success) {
            // Retry upload after setting up storage
            const retryResult = await supabase.storage
              .from('avatars')
              .upload(filePath, avatarFile, { upsert: true });
            
            if (retryResult.error) {
              showError('Upload failed', 'Failed to upload avatar image after setting up storage.');
              return null;
            }
            
            const { data } = supabase.storage
              .from('avatars')
              .getPublicUrl(filePath);
            return data.publicUrl;
          } else {
            showError('Storage Error', 'Avatar storage bucket not configured. Please contact support.');
            return null;
          }
        }
        
        showError('Upload failed', 'Failed to upload avatar image. Please try again.');
        return null;
      }

      // Get public URL
      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading avatar:', error);
      showError('Upload failed', 'Failed to upload avatar image. Please try again.');
      return null;
    }
  };

  const addGenre = () => {
    if (newGenre.trim() && !profileData.music_genres.includes(newGenre.trim())) {
      setProfileData(prev => ({
        ...prev,
        music_genres: [...prev.music_genres, newGenre.trim()]
      }));
      setNewGenre('');
    }
  };

  const removeGenre = (genre) => {
    setProfileData(prev => ({
      ...prev,
      music_genres: prev.music_genres.filter(g => g !== genre)
    }));
  };

  const addInstrument = () => {
    if (newInstrument.trim() && !profileData.instruments.includes(newInstrument.trim())) {
      setProfileData(prev => ({
        ...prev,
        instruments: [...prev.instruments, newInstrument.trim()]
      }));
      setNewInstrument('');
    }
  };

  const removeInstrument = (instrument) => {
    setProfileData(prev => ({
      ...prev,
      instruments: prev.instruments.filter(i => i !== instrument)
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      
      // Upload avatar if changed
      let avatarUrl = profileData.avatar_url;
      if (avatarFile) {
        avatarUrl = await uploadAvatar();
        if (!avatarUrl) return;
      }

      // Prepare update data
      const updateData = {
        ...profileData,
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString()
      };

      // Remove fields that shouldn't be updated directly
      delete updateData.id;
      delete updateData.created_at;
      delete updateData.profile_completion_percentage;

      // Fix fields that should be null instead of empty strings
      const fieldsToNullify = [
        'date_of_birth', 'country', 'country_name', 'state_province', 
        'city', 'postal_code', 'phone_number', 'website_url', 
        'instagram_handle', 'twitter_handle', 'facebook_url', 
        'youtube_channel', 'tiktok_handle', 'gender', 'artist_name', 
        'record_label', 'bio'
      ];

      fieldsToNullify.forEach(field => {
        if (updateData[field] === '') {
          updateData[field] = null;
        }
      });

      const { data, error } = await supabase
        .from('profiles_emg')
        .update(updateData)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;

      showSuccess('Profile updated', 'Your profile has been successfully updated');
      setAvatarFile(null);
      await loadProfile(); // Reload to get updated completion percentage
      
    } catch (error) {
      console.error('Error updating profile:', error);
      showError('Update failed', 'Failed to update your profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Artist Profile</h1>
        <p className="text-gray-600">Complete your profile to showcase your music and connect with fans</p>
        
        {/* Profile Completion */}
        <div className="mt-4 bg-gray-100 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Profile Completion</span>
            <span className="text-sm font-medium text-gray-900">{profileData.profile_completion_percentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${profileData.profile_completion_percentage}%` }}
            ></div>
          </div>
          {profileData.profile_completion_percentage < 50 && (
            <p className="text-xs text-gray-600 mt-2">
              Complete more fields to improve your profile visibility
            </p>
          )}
        </div>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center mb-6">
            <User className="h-5 w-5 text-purple-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Avatar Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Picture
              </label>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src={avatarPreview || '/default-avatar.png'}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                  />
                  {avatarFile && (
                    <button
                      type="button"
                      onClick={() => {
                        setAvatarFile(null);
                        setAvatarPreview(profileData.avatar_url || '');
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                    id="avatar-upload"
                  />
                  <label
                    htmlFor="avatar-upload"
                    className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {avatarFile ? 'Change Photo' : 'Upload Photo'}
                  </label>
                  <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 5MB</p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username *
              </label>
              <input
                type="text"
                name="username"
                value={profileData.username}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="full_name"
                value={profileData.full_name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Artist Name
              </label>
              <input
                type="text"
                name="artist_name"
                value={profileData.artist_name}
                onChange={handleInputChange}
                placeholder="Your stage name or artist name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Record Label
              </label>
              <input
                type="text"
                name="record_label"
                value={profileData.record_label}
                onChange={handleInputChange}
                placeholder="Associated record label"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                name="bio"
                value={profileData.bio}
                onChange={handleInputChange}
                rows={4}
                placeholder="Tell us about yourself and your music..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Location Information */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center mb-6">
            <MapPin className="h-5 w-5 text-purple-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Location</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              <input
                type="text"
                name="country_name"
                value={profileData.country_name}
                onChange={handleInputChange}
                placeholder="e.g., United States"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State/Province
              </label>
              <input
                type="text"
                name="state_province"
                value={profileData.state_province}
                onChange={handleInputChange}
                placeholder="e.g., California"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                name="city"
                value={profileData.city}
                onChange={handleInputChange}
                placeholder="e.g., Los Angeles"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center mb-6">
            <Phone className="h-5 w-5 text-purple-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone_number"
                value={profileData.phone_number}
                onChange={handleInputChange}
                placeholder="+1234567890"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website
              </label>
              <input
                type="url"
                name="website_url"
                value={profileData.website_url}
                onChange={handleInputChange}
                placeholder="https://yourwebsite.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instagram
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  @
                </span>
                <input
                  type="text"
                  name="instagram_handle"
                  value={profileData.instagram_handle}
                  onChange={handleInputChange}
                  placeholder="username"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Twitter
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  @
                </span>
                <input
                  type="text"
                  name="twitter_handle"
                  value={profileData.twitter_handle}
                  onChange={handleInputChange}
                  placeholder="username"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Facebook
              </label>
              <input
                type="url"
                name="facebook_url"
                value={profileData.facebook_url}
                onChange={handleInputChange}
                placeholder="https://facebook.com/yourpage"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                YouTube Channel
              </label>
              <input
                type="text"
                name="youtube_channel"
                value={profileData.youtube_channel}
                onChange={handleInputChange}
                placeholder="Channel name or URL"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Professional Information */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center mb-6">
            <Music className="h-5 w-5 text-purple-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Professional Information</h2>
          </div>
          
          <div className="space-y-6">
            {/* Music Genres */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Music Genres
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {profileData.music_genres.map((genre, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800"
                  >
                    {genre}
                    <button
                      type="button"
                      onClick={() => removeGenre(genre)}
                      className="ml-2 text-purple-600 hover:text-purple-800"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <select
                  value={newGenre}
                  onChange={(e) => setNewGenre(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select a genre</option>
                  {commonGenres.map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={addGenre}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Instruments */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instruments
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {profileData.instruments.map((instrument, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                  >
                    {instrument}
                    <button
                      type="button"
                      onClick={() => removeInstrument(instrument)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <select
                  value={newInstrument}
                  onChange={(e) => setNewInstrument(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select an instrument</option>
                  {commonInstruments.map(instrument => (
                    <option key={instrument} value={instrument}>{instrument}</option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={addInstrument}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Years of Experience
              </label>
              <input
                type="number"
                name="years_experience"
                value={profileData.years_experience}
                onChange={handleInputChange}
                min="0"
                max="100"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center mb-6">
            <AlertCircle className="h-5 w-5 text-purple-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Privacy Settings</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Visibility
              </label>
              <select
                name="profile_visibility"
                value={profileData.profile_visibility}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="public">Public - Anyone can view</option>
                <option value="private">Private - Only you can view</option>
                <option value="friends_only">Friends Only - Only followers can view</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="show_email"
                  checked={profileData.show_email}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Show email address on profile</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="show_phone"
                  checked={profileData.show_phone}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Show phone number on profile</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="allow_messages"
                  checked={profileData.allow_messages}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Allow direct messages from other users</span>
              </label>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Profile
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArtistProfile;
