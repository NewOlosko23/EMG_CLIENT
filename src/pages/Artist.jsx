import React, { useState } from "react";
import { 
  Play, 
  Heart, 
  Share2, 
  MoreHorizontal, 
  Search, 
  Filter, 
  MapPin, 
  Music, 
  Users,
  Star,
  TrendingUp,
  Calendar,
  Globe,
  Award,
  Mic,
  Headphones,
  Download,
  ExternalLink,
  ChevronRight,
  Grid,
  List
} from "lucide-react";
import ep1 from "../assets/ep1.jpeg";

const artists = [
  {
    id: 1,
    name: "Maeve Kennedy",
    stageName: "Maeve K",
    genre: "Pop, R&B",
    country: "Kenya",
    city: "Nairobi",
    image: ep1,
    coverImage: ep1,
    followers: "125K",
    monthlyListeners: "2.3M",
    verified: true,
    trending: true,
    music: [
      { title: "Beyond the Stars", plays: "1.2M", duration: "3:45", releaseDate: "2025-03-20" },
      { title: "Midnight Dreams", plays: "890K", duration: "4:12", releaseDate: "2025-02-15" }
    ],
    bio: "Maeve Kennedy is a rising pop and R&B artist from Nairobi, Kenya. Known for her soulful voice and contemporary sound, she has quickly gained recognition in the African music scene.",
    socialLinks: {
      instagram: "@maevekennedy",
      twitter: "@maevek_music",
      spotify: "Maeve Kennedy"
    },
    achievements: ["EMG Rising Star 2025", "Best New Artist - Kenya Music Awards"],
    joinDate: "2024-08-15"
  },
  {
    id: 2,
    name: "Ryan Mwesigwa",
    stageName: "Ryan M",
    genre: "Afrobeat, Hip-Hop",
    country: "Uganda",
    city: "Kampala",
    image: ep1,
    coverImage: ep1,
    followers: "89K",
    monthlyListeners: "1.8M",
    verified: true,
    trending: false,
    music: [
      { title: "City Lights EP", plays: "756K", duration: "12:30", releaseDate: "2025-03-18" },
      { title: "Jungle Fever", plays: "634K", duration: "3:28", releaseDate: "2025-01-10" }
    ],
    bio: "Ryan Mwesigwa brings authentic Afrobeat and hip-hop fusion from the heart of Uganda. His music reflects the vibrant culture and energy of East Africa.",
    socialLinks: {
      instagram: "@ryanmwesigwa",
      twitter: "@ryanm_ug",
      spotify: "Ryan Mwesigwa"
    },
    achievements: ["Uganda Music Excellence Award", "East Africa Hip-Hop Champion"],
    joinDate: "2024-06-22"
  },
  {
    id: 3,
    name: "Zahara Mbeki",
    stageName: "Zahara",
    genre: "Jazz, Soul",
    country: "South Africa",
    city: "Cape Town",
    image: ep1,
    coverImage: ep1,
    followers: "156K",
    monthlyListeners: "3.1M",
    verified: true,
    trending: true,
    music: [
      { title: "Soulful Nights", plays: "2.1M", duration: "4:35", releaseDate: "2025-02-28" },
      { title: "Golden Hour", plays: "1.8M", duration: "3:52", releaseDate: "2025-01-20" }
    ],
    bio: "Zahara Mbeki is a soulful jazz artist from Cape Town, South Africa. Her music blends traditional African rhythms with contemporary jazz, creating a unique and captivating sound.",
    socialLinks: {
      instagram: "@zaharamusic",
      twitter: "@zahara_sa",
      spotify: "Zahara Mbeki"
    },
    achievements: ["South African Jazz Award", "Cape Town Music Festival Winner"],
    joinDate: "2024-04-10"
  },
  {
    id: 4,
    name: "Kofi Mensah",
    stageName: "Kofi M",
    genre: "Highlife, Afro Fusion",
    country: "Ghana",
    city: "Accra",
    image: ep1,
    coverImage: ep1,
    followers: "203K",
    monthlyListeners: "4.2M",
    verified: true,
    trending: true,
    music: [
      { title: "African Vibes", plays: "3.2M", duration: "4:18", releaseDate: "2025-03-10" },
      { title: "Heritage EP", plays: "2.8M", duration: "15:45", releaseDate: "2025-02-05" }
    ],
    bio: "Kofi Mensah is a master of Highlife and Afro Fusion music from Accra, Ghana. His work celebrates African heritage while pushing the boundaries of contemporary music.",
    socialLinks: {
      instagram: "@kofimensah",
      twitter: "@kofi_gh",
      spotify: "Kofi Mensah"
    },
    achievements: ["Ghana Music Awards Winner", "Pan-African Music Excellence"],
    joinDate: "2024-03-15"
  },
];

const genres = ["All", "Pop", "R&B", "Afrobeat", "Hip-Hop", "Jazz", "Soul", "Highlife", "Afro Fusion"];
const countries = ["All", "Kenya", "Uganda", "South Africa", "Ghana", "Nigeria", "Tanzania"];

// Modern Artist Card Component
const ArtistCard = ({ artist, viewMode }) => {
  if (viewMode === 'list') {
    return (
      <div className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-1">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <img 
              src={artist.image} 
              alt={artist.name} 
              className="w-20 h-20 rounded-2xl object-cover group-hover:scale-110 transition-transform duration-300" 
            />
            {artist.verified && (
              <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-1">
                <Award className="w-3 h-3" />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-xl font-bold text-gray-900">{artist.stageName}</h3>
              {artist.trending && (
                <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  🔥 Trending
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
              <span className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {artist.city}, {artist.country}
              </span>
              <span className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {artist.followers} followers
              </span>
              <span className="flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                {artist.monthlyListeners} monthly
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                {artist.genre}
              </span>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl font-semibold transition-colors duration-300 flex items-center">
                <Play className="w-4 h-4 mr-2" />
                Play
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 overflow-hidden hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-2">
      <div className="relative overflow-hidden">
        <img 
          src={artist.coverImage} 
          alt={artist.name} 
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white/90 hover:bg-white text-purple-600 rounded-full p-4 shadow-lg hover:scale-110 transition-all duration-300">
            <Play className="w-6 h-6 ml-1" />
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col space-y-2">
          {artist.verified && (
            <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
              <Award className="w-3 h-3 mr-1" />
              Verified
            </span>
          )}
          {artist.trending && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              🔥 Trending
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <button className="bg-white/90 hover:bg-white text-gray-700 rounded-full p-2 shadow-lg hover:scale-110 transition-all duration-300">
            <Heart className="w-4 h-4" />
          </button>
          <button className="bg-white/90 hover:bg-white text-gray-700 rounded-full p-2 shadow-lg hover:scale-110 transition-all duration-300">
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-bold text-xl mb-1">{artist.stageName}</h3>
          <p className="text-white/90 text-sm">{artist.name}</p>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
            {artist.genre}
          </span>
          <div className="flex items-center text-gray-500 text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            {artist.country}
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {artist.followers}
            </span>
            <span className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              {artist.monthlyListeners}
            </span>
          </div>
        </div>

        <div className="flex space-x-2">
          <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-xl font-semibold transition-colors duration-300 flex items-center justify-center">
            <Play className="w-4 h-4 mr-2" />
            Play
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-xl transition-colors duration-300">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Featured Artist Component
const FeaturedArtist = ({ artist }) => (
  <div className="relative bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 rounded-2xl lg:rounded-3xl overflow-hidden">
    <div className="absolute inset-0 bg-black/20" />
    <div className="relative p-4 sm:p-6 lg:p-8 xl:p-12">
      <div className="flex flex-col md:flex-row items-center space-y-4 sm:space-y-6 md:space-y-0 md:space-x-6 lg:space-x-8">
        <div className="relative">
          <img 
            src={artist.image} 
            alt={artist.name} 
            className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-2xl lg:rounded-3xl object-cover border-4 border-white/20" 
          />
          {artist.verified && (
            <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-blue-500 text-white rounded-full p-1.5 sm:p-2">
              <Award className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
            </div>
          )}
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-2 sm:space-y-0 sm:space-x-3 mb-3 sm:mb-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">{artist.stageName}</h2>
            {artist.trending && (
              <span className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                🔥 Trending
              </span>
            )}
          </div>
          
          <p className="text-white/90 text-sm sm:text-base lg:text-lg mb-3 sm:mb-4">{artist.bio}</p>
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4 lg:gap-6 text-white/80 mb-4 sm:mb-6 text-sm sm:text-base">
            <span className="flex items-center">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
              {artist.city}, {artist.country}
            </span>
            <span className="flex items-center">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
              {artist.followers} followers
            </span>
            <span className="flex items-center">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
              {artist.monthlyListeners} monthly
            </span>
          </div>
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3">
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg lg:rounded-xl font-semibold transition-all duration-300 flex items-center text-sm sm:text-base">
              <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
              Play Now
            </button>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg lg:rounded-xl font-semibold transition-all duration-300 flex items-center text-sm sm:text-base">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
              Follow
            </button>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg lg:rounded-xl font-semibold transition-all duration-300 flex items-center text-sm sm:text-base">
              <Share2 className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Artists = () => {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [featuredArtist] = useState(artists[0]); // First artist as featured

  const filteredArtists = artists.filter(artist => {
    const matchesGenre = selectedGenre === "All" || artist.genre.includes(selectedGenre);
    const matchesCountry = selectedCountry === "All" || artist.country === selectedCountry;
    const matchesSearch = searchQuery === "" || 
      artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.stageName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.genre.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesGenre && matchesCountry && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-blue-600/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4 sm:mb-6">
              Discover Artists
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
              Explore talented artists from across Africa and beyond. 
              Discover new sounds, follow your favorites, and support emerging talent.
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="max-w-4xl mx-auto mb-6 sm:mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl lg:rounded-2xl border border-gray-200/50 p-3 sm:p-4 shadow-lg">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    type="text"
                    placeholder="Search for artists, genres, or locations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 bg-transparent border-0 focus:outline-none text-gray-700 placeholder-gray-400 text-sm sm:text-base"
                  />
                </div>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg lg:rounded-xl font-semibold transition-colors duration-300 flex items-center justify-center text-sm sm:text-base">
                  <Filter className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Filter
                </button>
              </div>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 px-4">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-600 mr-2">Genres:</span>
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                    selectedGenre === genre
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                      : 'bg-white/80 text-gray-700 hover:bg-purple-50 hover:text-purple-600'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-600 mr-2">Countries:</span>
              {countries.map((country) => (
                <button
                  key={country}
                  onClick={() => setSelectedCountry(country)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCountry === country
                      ? 'bg-pink-600 text-white shadow-lg shadow-pink-500/30'
                      : 'bg-white/80 text-gray-700 hover:bg-pink-50 hover:text-pink-600'
                  }`}
                >
                  {country}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16 lg:pb-20 mt-6 sm:mt-8 lg:mt-10">
        {/* Featured Artist */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Featured Artist</h2>
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium">
              Spotlight
            </span>
          </div>
          <FeaturedArtist artist={featuredArtist} />
        </section>

        {/* Artists Grid */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">All Artists</h2>
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                {filteredArtists.length} artists
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors duration-300 ${
                  viewMode === "grid" 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors duration-300 ${
                  viewMode === "list" 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {filteredArtists.map((artist) => (
                <ArtistCard key={artist.id} artist={artist} viewMode={viewMode} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredArtists.map((artist) => (
                <ArtistCard key={artist.id} artist={artist} viewMode={viewMode} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Artists;