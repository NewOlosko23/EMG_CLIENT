import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import {
  FaSpotify,
  FaGooglePlay,
  FaDeezer,
  FaSoundcloud,
  FaYoutube,
  FaAmazon,
} from "react-icons/fa";
import { SiTidal, SiApplemusic } from "react-icons/si";
import { 
  Globe, 
  Users, 
  TrendingUp, 
  Zap, 
  ArrowRight, 
  CheckCircle,
  Play,
  Music
} from "lucide-react";

const platforms = [
  { 
    name: "Spotify", 
    icon: FaSpotify, 
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
    users: "456M+",
    description: "World's largest music streaming platform"
  },
  {
    name: "Apple Music",
    icon: SiApplemusic,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20",
    users: "88M+",
    description: "Premium music streaming service"
  },
  {
    name: "YouTube Music",
    icon: FaYoutube,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20",
    users: "2B+",
    description: "Music videos and audio streaming"
  },
  { 
    name: "Tidal", 
    icon: SiTidal, 
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    users: "3M+",
    description: "High-fidelity music streaming"
  },
  { 
    name: "Deezer", 
    icon: FaDeezer, 
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    users: "16M+",
    description: "Global music streaming platform"
  },
  {
    name: "SoundCloud",
    icon: FaSoundcloud,
    color: "text-orange-600",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20",
    users: "76M+",
    description: "Community-driven music platform"
  },
  {
    name: "Amazon Music",
    icon: FaAmazon,
    color: "text-yellow-600",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20",
    users: "55M+",
    description: "Music streaming with Prime benefits"
  },
  {
    name: "Google Play Music",
    icon: FaGooglePlay,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20",
    users: "15M+",
    description: "Google's music streaming service"
  },
];

const stats = [
  { icon: Globe, value: "150+", label: "Countries" },
  { icon: Users, value: "10M+", label: "Artists" },
  { icon: TrendingUp, value: "99.9%", label: "Uptime" },
  { icon: Music, value: "50K+", label: "Tracks/Month" }
];

const Platform = ({ theme }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activePlatform, setActivePlatform] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("platform");
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="platform"
      className={`relative py-20 px-6 md:px-16 overflow-hidden transition-all duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900"
          : "bg-gradient-to-br from-gray-50 via-blue-50/50 to-gray-100"
      }`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header Section */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6 ${
            theme === "dark" 
              ? "bg-blue-600/20 text-blue-300 border border-blue-500/30" 
              : "bg-blue-100 text-blue-700 border border-blue-200"
          }`}>
            <Globe size={16} className="mr-2" />
            Global Distribution Network
          </div>
          
          <h2 className={`font-bold mb-6 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          } text-4xl md:text-5xl lg:text-6xl`}>
            Get Your Music On{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Every Platform
            </span>
          </h2>
          
          <p className={`max-w-4xl mx-auto text-lg md:text-xl leading-relaxed ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}>
            Distribute your music to all major streaming platforms worldwide with just one click. 
            Reach billions of listeners across 150+ countries and maximize your revenue potential.
          </p>
        </div>

        {/* Stats Section */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:-translate-y-1 ${
                theme === "dark"
                  ? "bg-white/5 border-white/10 hover:bg-white/10"
                  : "bg-white/50 border-gray-200/50 hover:bg-white/80"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-center mb-3">
                <div className={`p-3 rounded-xl ${
                  theme === "dark" 
                    ? "bg-blue-600/20 text-blue-400" 
                    : "bg-blue-100 text-blue-600"
                }`}>
                  <stat.icon size={24} />
                </div>
              </div>
              <div className={`text-2xl font-bold mb-1 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>
                {stat.value}
              </div>
              <div className={`text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Platform Carousel */}
        <div className={`mb-16 transition-all duration-1000 delay-400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            modules={[Autoplay]}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
            }}
            className="max-w-7xl mx-auto"
            onSlideChange={(swiper) => setActivePlatform(swiper.realIndex)}
          >
            {platforms.map((platform, index) => (
              <SwiperSlide key={index}>
                <div
                  className={`group p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer ${
                    theme === "dark"
                      ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-blue-500/30"
                      : "bg-white/50 border-gray-200/50 hover:bg-white/80 hover:border-blue-300/50"
                  }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`p-4 rounded-2xl mb-4 transition-all duration-300 group-hover:scale-110 ${
                      theme === "dark" 
                        ? `${platform.bgColor} ${platform.borderColor} border` 
                        : `${platform.bgColor} ${platform.borderColor} border`
                    }`}>
                      <platform.icon className={`w-12 h-12 ${platform.color}`} />
                    </div>
                    <h3 className={`font-semibold text-lg mb-2 ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}>
                      {platform.name}
                    </h3>
                    <div className={`text-2xl font-bold mb-1 ${
                      theme === "dark" ? "text-blue-400" : "text-blue-600"
                    }`}>
                      {platform.users}
                    </div>
                    <p className={`text-xs leading-relaxed ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}>
                      {platform.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Features Section */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className={`p-6 rounded-2xl backdrop-blur-sm border ${
            theme === "dark"
              ? "bg-white/5 border-white/10"
              : "bg-white/50 border-gray-200/50"
          }`}>
            <div className="flex items-center mb-4">
              <div className={`p-3 rounded-xl mr-4 ${
                theme === "dark" 
                  ? "bg-green-600/20 text-green-400" 
                  : "bg-green-100 text-green-600"
              }`}>
                <CheckCircle size={24} />
              </div>
              <h3 className={`font-semibold text-lg ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>
                One-Click Distribution
              </h3>
            </div>
            <p className={`text-sm leading-relaxed ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}>
              Upload once, distribute everywhere. No need to submit to each platform individually.
            </p>
          </div>

          <div className={`p-6 rounded-2xl backdrop-blur-sm border ${
            theme === "dark"
              ? "bg-white/5 border-white/10"
              : "bg-white/50 border-gray-200/50"
          }`}>
            <div className="flex items-center mb-4">
              <div className={`p-3 rounded-xl mr-4 ${
                theme === "dark" 
                  ? "bg-purple-600/20 text-purple-400" 
                  : "bg-purple-100 text-purple-600"
              }`}>
                <TrendingUp size={24} />
              </div>
              <h3 className={`font-semibold text-lg ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>
                Real-Time Analytics
              </h3>
            </div>
            <p className={`text-sm leading-relaxed ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}>
              Track your performance across all platforms with detailed analytics and insights.
            </p>
          </div>

          <div className={`p-6 rounded-2xl backdrop-blur-sm border ${
            theme === "dark"
              ? "bg-white/5 border-white/10"
              : "bg-white/50 border-gray-200/50"
          }`}>
            <div className="flex items-center mb-4">
              <div className={`p-3 rounded-xl mr-4 ${
                theme === "dark" 
                  ? "bg-blue-600/20 text-blue-400" 
                  : "bg-blue-100 text-blue-600"
              }`}>
                <Zap size={24} />
              </div>
              <h3 className={`font-semibold text-lg ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>
                Fast Processing
              </h3>
            </div>
            <p className={`text-sm leading-relaxed ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}>
              Your music goes live within 24-48 hours on most platforms. No waiting weeks.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Platform;
