import React, { useState, useEffect } from "react";
import { FiMapPin } from "react-icons/fi";
import Map from "../../assets/map.jpeg";
import { 
  Globe, 
  Users, 
  TrendingUp, 
  Award,
  Zap,
  Target,
  Music,
  ArrowRight,
  CheckCircle,
  Star
} from "lucide-react";

const countries = [
  { 
    name: "Kenya", 
    flag: "🇰🇪", 
    artists: "2,500+", 
    streams: "50M+",
    established: "2019"
  },
  { 
    name: "Uganda", 
    flag: "🇺🇬", 
    artists: "1,800+", 
    streams: "35M+",
    established: "2020"
  },
  { 
    name: "Tanzania", 
    flag: "🇹🇿", 
    artists: "2,200+", 
    streams: "42M+",
    established: "2019"
  },
  { 
    name: "Rwanda", 
    flag: "🇷🇼", 
    artists: "1,200+", 
    streams: "25M+",
    established: "2021"
  },
  { 
    name: "Burundi", 
    flag: "🇧🇮", 
    artists: "800+", 
    streams: "15M+",
    established: "2021"
  },
  { 
    name: "Zambia", 
    flag: "🇿🇲", 
    artists: "1,500+", 
    streams: "30M+",
    established: "2020"
  },
  { 
    name: "Sierra Leone", 
    flag: "🇸🇱", 
    artists: "900+", 
    streams: "18M+",
    established: "2022"
  },
  { 
    name: "Eswatini", 
    flag: "🇸🇿", 
    artists: "600+", 
    streams: "12M+",
    established: "2022"
  },
];

const globalStats = [
  { icon: Globe, value: "150+", label: "Countries Reached" },
  { icon: Users, value: "10,000+", label: "Active Artists" },
  { icon: Music, value: "50K+", label: "Tracks Distributed" },
  { icon: TrendingUp, value: "500M+", label: "Total Streams" }
];

const Presence = ({ theme }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCountry, setHoveredCountry] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("presence");
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="presence"
      className={`relative py-20 px-6 md:px-16 overflow-hidden transition-all duration-300 ${
        theme === "dark" ? "text-gray-300" : "text-gray-800"
      }`}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${Map})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Additional Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header Section */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6 ${
            theme === "dark" 
              ? "bg-purple-600/20 text-purple-300 border border-purple-500/30" 
              : "bg-white/20 text-purple-700 border border-purple-200/50"
          } backdrop-blur-sm`}>
            <Globe size={16} className="mr-2" />
            Global Music Distribution Network
          </div>
          
          <h2 className={`font-bold mb-6 ${
            theme === "dark" ? "text-white" : "text-white"
          } text-4xl md:text-5xl lg:text-6xl`}>
            Our Global{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Presence
            </span>
          </h2>
          
          <p className={`max-w-4xl mx-auto text-lg md:text-xl leading-relaxed ${
            theme === "dark" ? "text-gray-300" : "text-gray-200"
          }`}>
            EMG Music empowers artists across Africa and beyond, helping them distribute
            their music globally. From local talent to international recognition, 
            we're building bridges between cultures through music.
          </p>
        </div>

        {/* Global Stats */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {globalStats.map((stat, index) => (
            <div
              key={index}
              className={`text-center p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:-translate-y-1 ${
                theme === "dark"
                  ? "bg-white/5 border-white/10 hover:bg-white/10"
                  : "bg-white/20 border-white/30 hover:bg-white/30"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-center mb-3">
                <div className={`p-3 rounded-xl ${
                  theme === "dark" 
                    ? "bg-purple-600/20 text-purple-400" 
                    : "bg-white/30 text-purple-600"
                }`}>
                  <stat.icon size={24} />
                </div>
              </div>
              <div className={`text-2xl font-bold mb-1 ${
                theme === "dark" ? "text-white" : "text-white"
              }`}>
                {stat.value}
              </div>
              <div className={`text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-300"
              }`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Countries Grid */}
        <div className={`mb-16 transition-all duration-1000 delay-400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h3 className={`text-center text-2xl md:text-3xl font-bold mb-12 ${
            theme === "dark" ? "text-white" : "text-white"
          }`}>
            Where We Make Music Happen
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {countries.map((country, index) => (
              <div
                key={index}
                className={`group relative flex flex-col items-center p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer ${
                  theme === "dark"
                    ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-purple-500/30"
                    : "bg-white/20 border-white/30 hover:bg-white/30 hover:border-purple-300/50"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredCountry(index)}
                onMouseLeave={() => setHoveredCountry(null)}
              >
                {/* Flag */}
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {country.flag}
                </div>
                
                {/* Country Name */}
                <h4 className={`text-xl font-bold mb-2 ${
                  theme === "dark" ? "text-white" : "text-white"
                }`}>
                  {country.name}
                </h4>
                
                {/* Stats */}
                <div className="text-center space-y-1">
                  <div className={`text-sm ${
                    theme === "dark" ? "text-purple-400" : "text-purple-300"
                  }`}>
                    <Users size={14} className="inline mr-1" />
                    {country.artists} Artists
                  </div>
                  <div className={`text-sm ${
                    theme === "dark" ? "text-blue-400" : "text-blue-300"
                  }`}>
                    <Music size={14} className="inline mr-1" />
                    {country.streams} Streams
                  </div>
                  <div className={`text-xs ${
                    theme === "dark" ? "text-gray-400" : "text-gray-300"
                  }`}>
                    Since {country.established}
                  </div>
                </div>
                
                {/* Map Pin */}
                <FiMapPin className={`mt-3 text-2xl transition-colors duration-300 ${
                  hoveredCountry === index 
                    ? "text-purple-400" 
                    : theme === "dark" 
                    ? "text-purple-500" 
                    : "text-purple-400"
                }`} />
                
                {/* Hover Effect Overlay */}
                {hoveredCountry === index && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 pointer-events-none"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Impact Section */}
        <div className={`mb-16 transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className={`max-w-4xl mx-auto p-8 rounded-3xl backdrop-blur-sm border ${
            theme === "dark"
              ? "bg-white/5 border-white/10"
              : "bg-white/20 border-white/30"
          }`}>
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className={`p-4 rounded-2xl ${
                  theme === "dark" 
                    ? "bg-gradient-to-r from-purple-600 to-blue-600" 
                    : "bg-gradient-to-r from-purple-500 to-blue-500"
                }`}>
                  <Target size={32} className="text-white" />
                </div>
              </div>
              <h3 className={`font-bold text-2xl md:text-3xl mb-4 ${
                theme === "dark" ? "text-white" : "text-white"
              }`}>
                Making Music Accessible Worldwide
              </h3>
              <p className={`text-lg leading-relaxed ${
                theme === "dark" ? "text-gray-300" : "text-gray-200"
              }`}>
                From the bustling streets of Nairobi to the vibrant music scene in Kampala, 
                EMG Music is breaking down barriers and connecting African artists with 
                global audiences. We're not just distributing music – we're building 
                cultural bridges.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className={`text-3xl font-bold mb-2 ${
                  theme === "dark" ? "text-purple-400" : "text-purple-300"
                }`}>
                  8
                </div>
                <div className={`text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-300"
                }`}>
                  African Countries
                </div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold mb-2 ${
                  theme === "dark" ? "text-blue-400" : "text-blue-300"
                }`}>
                  217M+
                </div>
                <div className={`text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-300"
                }`}>
                  Total Streams
                </div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold mb-2 ${
                  theme === "dark" ? "text-green-400" : "text-green-300"
                }`}>
                  11,500+
                </div>
                <div className={`text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-300"
                }`}>
                  Artists Supported
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Presence;
