import React, { useState } from "react";
import { 
  Play, 
  Heart, 
  Share2, 
  MoreHorizontal, 
  Search, 
  Filter, 
  TrendingUp, 
  Clock, 
  Users,
  Music,
  Calendar,
  Star,
  Download,
  Volume2
} from "lucide-react";
import Thumbnail from "../assets/emg1.jpg"; 
import ads from "../assets/ad.jpeg";
import ep1 from "../assets/ep1.jpeg";
import ep2 from "../assets/ep2.jpeg";

const latestNews = [
  {
    id: 1,
    title: "EMG Signs New Distribution Deal",
    summary: "We've partnered with top streaming platforms to expand reach and provide better opportunities for our artists.",
    date: "March 28, 2025",
    cover: ads,
    category: "Industry News",
    readTime: "3 min read",
    trending: true
  },
  {
    id: 2,
    title: "Exclusive Interview with Justus Klein",
    summary: "Our CEO shares insights on the future of music distribution and emerging trends in the industry.",
    date: "March 25, 2025",
    cover: Thumbnail,
    category: "Interview",
    readTime: "5 min read",
    trending: false
  },
];

const latestMusic = [
  {
    id: 1,
    title: "Beyond the Stars",
    artist: "Blessing Official",
    cover: ep1,
    releaseDate: "March 20, 2025",
    genre: "Electronic",
    duration: "3:45",
    plays: "125K",
    likes: "2.3K",
    isNew: true,
    isTrending: true
  },
  {
    id: 2,
    title: "The Sun of SL",
    artist: "Ryan Mwesigwa",
    cover: ep2,
    releaseDate: "March 18, 2025",
    genre: "Afrobeat",
    duration: "4:12",
    plays: "89K",
    likes: "1.8K",
    isNew: true,
    isTrending: false
  },
];

const latestInfo = [
  {
    id: 1,
    title: "Real-Time Streaming Stats",
    description: "Track your music streams in real-time with detailed analytics and audience insights.",
    icon: TrendingUp,
    category: "Feature Update",
    status: "Live Now"
  },
  {
    id: 2,
    title: "EMG Mobile App",
    description: "Manage your music, track earnings, and distribute seamlessly on the go.",
    icon: Music,
    category: "Product Launch",
    status: "Coming Soon"
  },
  {
    id: 3,
    title: "Monetization Tools",
    description: "Earn directly through exclusive content sales and fan subscriptions.",
    icon: Star,
    category: "New Feature",
    status: "In Development"
  },
];

const genres = ["All", "Electronic", "Afrobeat", "Hip-Hop", "Pop", "Rock", "Jazz", "Classical"];

// Modern News Card Component
const NewsCard = ({ news }) => (
  <div className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 overflow-hidden hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-2">
    <div className="relative overflow-hidden">
      <img 
        src={news.cover} 
        alt={news.title} 
        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div className="absolute top-4 left-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          news.trending 
            ? 'bg-red-500 text-white' 
            : 'bg-white/90 text-gray-700'
        }`}>
          {news.trending ? '🔥 Trending' : news.category}
        </span>
      </div>
      <div className="absolute bottom-4 left-4 right-4">
        <h4 className="text-white font-bold text-xl mb-2 line-clamp-2">{news.title}</h4>
        <div className="flex items-center text-white/80 text-sm space-x-4">
          <span className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {news.date}
          </span>
          <span className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {news.readTime}
          </span>
        </div>
      </div>
    </div>
    <div className="p-6">
      <p className="text-gray-600 leading-relaxed">{news.summary}</p>
      <button className="mt-4 text-purple-600 font-semibold hover:text-purple-700 transition-colors">
        Read More →
      </button>
    </div>
  </div>
);

// Modern Music Card Component
const MusicCard = ({ music }) => (
  <div className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 overflow-hidden hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-2">
    <div className="relative overflow-hidden">
      <img 
        src={music.cover} 
        alt={music.title} 
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
        {music.isNew && (
          <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            New
          </span>
        )}
        {music.isTrending && (
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
        <h4 className="text-white font-bold text-lg mb-1">{music.title}</h4>
        <p className="text-white/90 text-sm">{music.artist}</p>
      </div>
    </div>
    
    <div className="p-6">
      <div className="flex items-center justify-between mb-3">
        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
          {music.genre}
        </span>
        <span className="text-gray-500 text-sm">{music.duration}</span>
      </div>
      
      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center space-x-4">
          <span className="flex items-center">
            <Volume2 className="w-4 h-4 mr-1" />
            {music.plays}
          </span>
          <span className="flex items-center">
            <Heart className="w-4 h-4 mr-1" />
            {music.likes}
          </span>
        </div>
        <span className="text-gray-500">{music.releaseDate}</span>
      </div>
    </div>
  </div>
);

// Modern Info Card Component
const InfoCard = ({ info }) => {
  const IconComponent = info.icon;
  return (
    <div className="group bg-gradient-to-br from-white/80 to-purple-50/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-2">
      <div className="flex items-start space-x-4">
        <div className="bg-purple-100 p-3 rounded-xl group-hover:bg-purple-200 transition-colors duration-300">
          <IconComponent className="w-6 h-6 text-purple-600" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
              {info.category}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              info.status === 'Live Now' 
                ? 'bg-green-100 text-green-700'
                : info.status === 'Coming Soon'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-yellow-100 text-yellow-700'
            }`}>
              {info.status}
            </span>
          </div>
          <h4 className="text-lg font-bold text-gray-900 mb-2">{info.title}</h4>
          <p className="text-gray-600 leading-relaxed">{info.description}</p>
        </div>
      </div>
  </div>
);
};

const Discover = () => {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-blue-600/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
      <div className="text-center mb-8 sm:mb-12">
            <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4 sm:mb-6">
              Discover Music
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
              Explore the latest tracks, trending artists, and industry news. 
              Your gateway to the world of music discovery.
        </p>
      </div>

          {/* Search and Filter Bar */}
          <div className="max-w-4xl mx-auto mb-8 sm:mb-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl lg:rounded-2xl border border-gray-200/50 p-3 sm:p-4 shadow-lg">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    type="text"
                    placeholder="Search for music, artists, or news..."
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

          {/* Genre Filter */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 px-4">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 text-sm sm:text-base ${
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
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16 lg:pb-20 mt-6 sm:mt-8 lg:mt-10">
        {/* Latest Music Section */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Latest Music</h2>
            <button className="text-purple-600 hover:text-purple-700 font-semibold flex items-center">
              View All
              <MoreHorizontal className="w-5 h-5 ml-1" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {latestMusic.map((music) => (
              <MusicCard key={music.id} music={music} />
            ))}
          </div>
        </section>

        {/* Latest News Section */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Latest News</h2>
            <button className="text-purple-600 hover:text-purple-700 font-semibold flex items-center">
              View All
              <MoreHorizontal className="w-5 h-5 ml-1" />
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {latestNews.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        </section>

        {/* Latest Updates Section */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Platform Updates</h2>
            <button className="text-purple-600 hover:text-purple-700 font-semibold flex items-center">
              View All
              <MoreHorizontal className="w-5 h-5 ml-1" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {latestInfo.map((info) => (
              <InfoCard key={info.id} info={info} />
          ))}
        </div>
        </section>
      </div>
    </div>
  );
};

export default Discover;