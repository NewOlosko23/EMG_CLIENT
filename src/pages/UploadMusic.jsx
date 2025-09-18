import React, { useState } from "react";
import { Upload, Music, FileAudio, Image, Calendar, Globe, Tag, AlertCircle, CheckCircle } from "lucide-react";

const UploadMusic = () => {
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

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, [e.target.name]: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    setIsUploading(false);
    setUploadStep(3);
  };

  const genres = [
    "Electronic", "Pop", "Rock", "Hip-Hop", "R&B", "Jazz", "Classical", 
    "Country", "Folk", "Ambient", "Synthwave", "House", "Techno", "Other"
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
          <form onSubmit={(e) => { e.preventDefault(); setUploadStep(2); }} className="space-y-6">
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter track title"
                />
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter artist name"
                />
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select genre</option>
                  {genres.map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
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
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                  <FileAudio className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-600 mb-2">Drop your audio file here or click to browse</p>
                  <input
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
                    <p className="text-sm text-green-600 mt-2">
                      ✓ {formData.audioFile.name}
                    </p>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Art
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                  <Image className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-600 mb-2">Drop your cover art here or click to browse</p>
                  <input
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
                    <p className="text-sm text-green-600 mt-2">
                      ✓ {formData.coverArt.name}
                    </p>
                  )}
                </div>
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
              <div className="space-y-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <Upload className="h-8 w-8 text-purple-600 animate-pulse" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Uploading your track...</h3>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">{uploadProgress}% complete</p>
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
                  <button className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors">
                    View My Music
                  </button>
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
