import React, { useState, useEffect } from "react";
import Bg from "../../assets/emg2.jpg";
import { Link } from "react-router-dom";
import { Play, ArrowRight, Music, Users, Globe } from "lucide-react";

const Hero = ({ theme }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      className={`relative w-full flex flex-col items-center justify-center text-center overflow-hidden ${
        theme === "dark" ? "bg-gray-900" : "bg-purple-50"
      }`}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${Bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-pink-500/10 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-blue-500/10 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-16 py-14 md:py-20">
        {/* Main Content */}
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Badge */}
          <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-8 ${
            theme === "dark" 
              ? "bg-purple-600/20 text-purple-300 border border-purple-500/30" 
              : "bg-white/20 text-purple-700 border border-purple-200/50"
          } backdrop-blur-sm`}>
            <Music size={16} className="mr-2" />
            Trusted by 10,000+ Artists Worldwide
          </div>

          {/* Main Heading */}
          <h1 className={`hero-title font-bold leading-tight mb-6 ${
            theme === "dark" ? "text-white" : "text-white"
          } text-4xl sm:text-5xl md:text-6xl lg:text-7xl`}>
            Your Music,{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Global Audience
            </span>
          </h1>

          {/* Subtitle */}
          <p className={`max-w-3xl mx-auto mb-12 ${
            theme === "dark" ? "text-gray-300" : "text-gray-200"
          } text-lg sm:text-xl md:text-2xl leading-relaxed`}>
            EMG is your gateway to worldwide music distribution. Join us to reach
            millions of listeners, monetize your tracks, and grow your brand.
          </p>

          {/* Get Started Button */}
          <div className="flex justify-center items-center mb-16">
            <Link to="/signup">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:-translate-y-1 hover:scale-105">
                <span className="flex items-center">
                  Get Started
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className={`group text-center p-8 rounded-3xl backdrop-blur-sm border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
              theme === "dark" 
                ? "bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20 hover:border-purple-400/40" 
                : "bg-gradient-to-br from-purple-50/80 to-pink-50/80 border-purple-200/50 hover:border-purple-300/70"
            }`}>
              <div className="flex justify-center mb-4">
                <div className={`p-4 rounded-2xl transition-all duration-300 group-hover:scale-110 ${
                  theme === "dark" 
                    ? "bg-gradient-to-r from-purple-600/20 to-pink-600/20" 
                    : "bg-gradient-to-r from-purple-100 to-pink-100"
                }`}>
                  <Globe size={36} className="text-purple-500" />
                </div>
              </div>
              <div className={`text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent`}>
                150+
              </div>
              <div className={`text-sm md:text-base font-semibold mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Global Reach
              </div>
              <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                Countries & territories worldwide
              </div>
            </div>

            <div className={`group text-center p-8 rounded-3xl backdrop-blur-sm border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
              theme === "dark" 
                ? "bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20 hover:border-blue-400/40" 
                : "bg-gradient-to-br from-blue-50/80 to-cyan-50/80 border-blue-200/50 hover:border-blue-300/70"
            }`}>
              <div className="flex justify-center mb-4">
                <div className={`p-4 rounded-2xl transition-all duration-300 group-hover:scale-110 ${
                  theme === "dark" 
                    ? "bg-gradient-to-r from-blue-600/20 to-cyan-600/20" 
                    : "bg-gradient-to-r from-blue-100 to-cyan-100"
                }`}>
                  <Users size={36} className="text-blue-500" />
                </div>
              </div>
              <div className={`text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent`}>
                100+
              </div>
              <div className={`text-sm md:text-base font-semibold mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Active Artists
              </div>
              <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                Growing community worldwide
              </div>
            </div>

            <div className={`group text-center p-8 rounded-3xl backdrop-blur-sm border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
              theme === "dark" 
                ? "bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20 hover:border-green-400/40" 
                : "bg-gradient-to-br from-green-50/80 to-emerald-50/80 border-green-200/50 hover:border-green-300/70"
            }`}>
              <div className="flex justify-center mb-4">
                <div className={`p-4 rounded-2xl transition-all duration-300 group-hover:scale-110 ${
                  theme === "dark" 
                    ? "bg-gradient-to-r from-green-600/20 to-emerald-600/20" 
                    : "bg-gradient-to-r from-green-100 to-emerald-100"
                }`}>
                  <Music size={36} className="text-green-500" />
                </div>
              </div>
              <div className={`text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent`}>
                2M+
              </div>
              <div className={`text-sm md:text-base font-semibold mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Total Streams
              </div>
              <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                Music reaching global audiences
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
