import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { 
  Upload, 
  FileAudio, 
  Image, 
  CheckCircle, 
  AlertCircle, 
  X, 
  FileText, 
  Music, 
  Calendar,
  Tag,
  Eye,
  EyeOff,
  Info
} from "lucide-react";
import { supabase, fileHelpers, dbHelpers } from "../lib/supabaseClient";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";

const UploadMusic = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [uploadStep, setUploadStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    genre: "",
    releaseDate: "",
    coverArt: null,
    audioFile: null,
    description: "",
    tags: "",
    explicit: false,
    isrc: "",
    upc: ""
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState({});
  const [dragActive, setDragActive] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState({});
  const audioRef = useRef(null);
  const coverArtRef = useRef(null);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.artist.trim()) newErrors.artist = "Artist name is required";
    if (!formData.genre) newErrors.genre = "Genre is required";
    if (!formData.audioFile) newErrors.audioFile = "Audio file is required";
    
    // File validation
    if (formData.audioFile) {
      const audioTypes = ['audio/mpeg', 'audio/wav', 'audio/flac', 'audio/mp3'];
      if (!audioTypes.includes(formData.audioFile.type)) {
        newErrors.audioFile = "Please upload a valid audio file (MP3, WAV, FLAC)";
      }
      if (formData.audioFile.size > 100 * 1024 * 1024) { // 100MB
        newErrors.audioFile = "Audio file must be less than 100MB";
      }
    }
    
    if (formData.coverArt) {
      const imageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!imageTypes.includes(formData.coverArt.type)) {
        newErrors.coverArt = "Please upload a valid image file (JPEG, PNG)";
      }
      if (formData.coverArt.size > 10 * 1024 * 1024) { // 10MB
        newErrors.coverArt = "Cover art must be less than 10MB";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, [e.target.name]: file }));
      if (errors[e.target.name]) {
        setErrors(prev => ({ ...prev, [e.target.name]: '' }));
      }
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e, fileType) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setFormData(prev => ({ ...prev, [fileType]: file }));
      if (errors[fileType]) {
        setErrors(prev => ({ ...prev, [fileType]: '' }));
      }
    }
  };

  const removeFile = (fileType) => {
    setFormData(prev => ({ ...prev, [fileType]: null }));
    if (fileType === 'audioFile') {
      audioRef.current.value = '';
    } else if (fileType === 'coverArt') {
      coverArtRef.current.value = '';
    }
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (uploadStep === 1) {
      if (validateForm()) {
        setUploadStep(2);
      }
    } else if (uploadStep === 2) {
      if (validateForm()) {
        setUploadStep(3);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    if (!user) {
      showToast("Please log in to upload music", "error");
      return;
    }
    
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      const timestamp = Date.now();
      const userId = user.id;
      
      // Upload audio file
      if (formData.audioFile) {
        setUploadProgress(10);
        const audioPath = `tracks/${userId}/${timestamp}_${formData.audioFile.name}`;
        const { data: audioData, error: audioError } = await fileHelpers.uploadFile(
          'music-files',
          formData.audioFile,
          audioPath
        );
        
        if (audioError) {
          throw new Error(`Audio upload failed: ${audioError.message}`);
        }
        
        setUploadedFiles(prev => ({ ...prev, audioUrl: audioData.path }));
        setUploadProgress(50);
      }
      
      // Upload cover art if provided
      let coverArtUrl = null;
      if (formData.coverArt) {
        setUploadProgress(60);
        const coverPath = `covers/${userId}/${timestamp}_${formData.coverArt.name}`;
        const { data: coverData, error: coverError } = await fileHelpers.uploadFile(
          'music-files',
          formData.coverArt,
          coverPath
        );
        
        if (coverError) {
          console.warn(`Cover art upload failed: ${coverError.message}`);
        } else {
          coverArtUrl = coverData.path;
          setUploadedFiles(prev => ({ ...prev, coverUrl: coverData.path }));
        }
        setUploadProgress(70);
      }
      
      // Create track record in database
      setUploadProgress(80);
      const trackData = {
        title: formData.title,
        artist: formData.artist,
        genre: formData.genre,
        release_date: formData.releaseDate || null,
        description: formData.description || null,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
        explicit: formData.explicit,
        isrc: formData.isrc || null,
        upc: formData.upc || null,
        audio_url: uploadedFiles.audioUrl,
        cover_art_url: coverArtUrl,
        status: 'pending', // Will be reviewed by admin
        user_id: userId,
        file_size: formData.audioFile?.size || 0,
        duration: null // Could be extracted from audio file metadata
      };
      
      const { data: track, error: trackError } = await dbHelpers.createTrack(trackData);
      
      if (trackError) {
        throw new Error(`Failed to create track record: ${trackError.message}`);
      }
      
      setUploadProgress(100);
      showToast("Track uploaded successfully! It will be reviewed before going live.", "success");
      setUploadStep(3);
      
    } catch (error) {
      console.error('Upload error:', error);
      showToast(`Upload failed: ${error.message}`, "error");
      
      // Clean up uploaded files if database operation failed
      if (uploadedFiles.audioUrl) {
        await fileHelpers.deleteFile('music-files', uploadedFiles.audioUrl);
      }
      if (uploadedFiles.coverUrl) {
        await fileHelpers.deleteFile('music-files', uploadedFiles.coverUrl);
      }
    } finally {
      setIsUploading(false);
    }
  };

  const genres = [
    "Electronic", "Pop", "Rock", "Hip-Hop", "R&B", "Jazz", "Classical", 
    "Country", "Folk", "Ambient", "Synthwave", "House", "Techno", "Gospel", "Other"
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Upload Music</h1>
        <p className="text-gray-600 mt-1">Share your music with the world</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center space-x-8">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              uploadStep >= step 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-200 text-gray-600'
            }`}>
              {step}
            </div>
            <span className={`ml-2 text-sm ${
              uploadStep >= step ? 'text-purple-600 font-medium' : 'text-gray-500'
            }`}>
              {step === 1 ? 'Track Info' : step === 2 ? 'Upload Files' : 'Review & Submit'}
            </span>
            {step < 3 && (
              <div className={`w-16 h-0.5 ml-4 ${
                uploadStep > step ? 'bg-purple-600' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Upload Form */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        {uploadStep === 1 && (
          <form onSubmit={handleNextStep} className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Track Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Track Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.title ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter track title"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.title}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Artist Name *
                </label>
                <input
                  type="text"
                  name="artist"
                  value={formData.artist}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.artist ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter artist name"
                />
                {errors.artist && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.artist}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Genre *
                </label>
                <select
                  name="genre"
                  value={formData.genre}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.genre ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select genre</option>
                  {genres.map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
                {errors.genre && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.genre}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Release Date
                </label>
                <input
                  type="date"
                  name="releaseDate"
                  value={formData.releaseDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Describe your track..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter tags separated by commas"
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                name="explicit"
                checked={formData.explicit}
                onChange={handleInputChange}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                This track contains explicit content
              </label>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Next: Upload Files
              </button>
            </div>
          </form>
        )}

        {uploadStep === 2 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Upload Files</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Audio File *
                </label>
                <div 
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    dragActive ? 'border-purple-400 bg-purple-50' : 'border-gray-300'
                  } ${errors.audioFile ? 'border-red-300' : ''}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={(e) => handleDrop(e, 'audioFile')}
                >
                  <FileAudio className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-600 mb-2">Drop your audio file here or click to browse</p>
                  <p className="text-xs text-gray-500 mb-4">Supports MP3, WAV, FLAC (max 100MB)</p>
                  <input
                    ref={audioRef}
                    type="file"
                    name="audioFile"
                    onChange={handleFileUpload}
                    accept="audio/*"
                    required
                    className="hidden"
                    id="audio-upload"
                  />
                  <label
                    htmlFor="audio-upload"
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors cursor-pointer"
                  >
                    Choose Audio File
                  </label>
                  {formData.audioFile && (
                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-green-800">{formData.audioFile.name}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile('audioFile')}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-xs text-green-600 mt-1">
                        {(formData.audioFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  )}
                </div>
                {errors.audioFile && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.audioFile}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Art
                </label>
                <div 
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    dragActive ? 'border-purple-400 bg-purple-50' : 'border-gray-300'
                  } ${errors.coverArt ? 'border-red-300' : ''}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={(e) => handleDrop(e, 'coverArt')}
                >
                  <Image className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-600 mb-2">Drop your cover art here or click to browse</p>
                  <p className="text-xs text-gray-500 mb-4">Supports JPEG, PNG (max 10MB)</p>
                  <input
                    ref={coverArtRef}
                    type="file"
                    name="coverArt"
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                    id="cover-upload"
                  />
                  <label
                    htmlFor="cover-upload"
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors cursor-pointer"
                  >
                    Choose Cover Art
                  </label>
                  {formData.coverArt && (
                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-green-800">{formData.coverArt.name}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile('coverArt')}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-xs text-green-600 mt-1">
                        {(formData.coverArt.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  )}
                </div>
                {errors.coverArt && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.coverArt}
                  </p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ISRC Code
                </label>
                <input
                  type="text"
                  name="isrc"
                  value={formData.isrc}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter ISRC code"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  UPC Code
                </label>
                <input
                  type="text"
                  name="upc"
                  value={formData.upc}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter UPC code"
                />
              </div>
            </div>
            
            {/* Preview Section */}
            {(formData.audioFile || formData.coverArt) && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-900">Preview</h3>
                  <button
                    type="button"
                    onClick={() => setShowPreview(!showPreview)}
                    className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1"
                  >
                    {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    {showPreview ? 'Hide' : 'Show'} Preview
                  </button>
                </div>
                {showPreview && (
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center">
                        {formData.coverArt ? (
                          <img 
                            src={URL.createObjectURL(formData.coverArt)} 
                            alt="Cover" 
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <Music className="h-8 w-8 text-purple-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{formData.title || 'Track Title'}</h4>
                        <p className="text-sm text-gray-600">{formData.artist || 'Artist Name'}</p>
                        <p className="text-xs text-gray-500">{formData.genre || 'Genre'}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">{formData.duration || '0:00'}</p>
                        <p className="text-xs text-gray-500">{formData.releaseDate || 'Release Date'}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setUploadStep(1)}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={!formData.audioFile}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Upload Track
              </button>
            </div>
          </form>
        )}

        {uploadStep === 3 && (
          <div className="text-center py-8">
            {isUploading ? (
              <div className="space-y-6">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <Upload className="h-10 w-10 text-purple-600 animate-bounce" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Uploading your track...</h3>
                  <p className="text-gray-600">Please don't close this page while uploading</p>
                </div>
                <div className="max-w-md mx-auto">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Upload Progress</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <div className="mt-4 text-sm text-gray-500">
                    {uploadProgress < 30 && "Preparing files..."}
                    {uploadProgress >= 30 && uploadProgress < 70 && "Uploading audio..."}
                    {uploadProgress >= 70 && uploadProgress < 90 && "Processing metadata..."}
                    {uploadProgress >= 90 && uploadProgress < 100 && "Finalizing upload..."}
                    {uploadProgress === 100 && "Upload complete!"}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Upload Successful!</h3>
                <p className="text-gray-600">Your track has been uploaded and is being processed.</p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => {
                      setUploadStep(1);
                      setFormData({
                        title: "",
                        artist: "",
                        genre: "",
                        releaseDate: "",
                        coverArt: null,
                        audioFile: null,
                        description: "",
                        tags: "",
                        explicit: false,
                        isrc: "",
                        upc: ""
                      });
                    }}
                    className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Upload Another Track
                  </button>
                  <Link 
                    to="/dashboard/music"
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors inline-block"
                  >
                    View My Music
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadMusic;
