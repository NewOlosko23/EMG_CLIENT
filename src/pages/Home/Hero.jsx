import React, { useState, useEffect } from "react";
import Bg from "../../assets/emg2.jpg";
import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";

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
        <div className="absolute top-16 sm:top-20 left-4 sm:left-10 w-20 sm:w-24 md:w-32 h-20 sm:h-24 md:h-32 bg-purple-500/10 rounded-full animate-pulse"></div>
        <div className="absolute top-32 sm:top-40 right-4 sm:right-20 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 bg-pink-500/10 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 sm:bottom-40 left-1/4 w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 bg-blue-500/10 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 md:py-16 lg:py-20">
        {/* Main Content */}
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Pre-headline Badge */}
          <div className={`inline-flex flex-col sm:flex-row items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold mb-6 sm:mb-8 ${
            theme === "dark" 
              ? "bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-purple-200 border border-purple-400/40" 
              : "bg-gradient-to-r from-white/30 to-purple-100/30 text-purple-800 border border-purple-300/60"
          } backdrop-blur-md shadow-lg`} style={{fontSize: 'clamp(0.75rem, 1.6vw, 0.95rem)'}}>
            <div className="flex items-center">
              <Star size={16} className="mr-2 text-yellow-400" />
              <span className="font-bold text-white">#1 Music Distribution Platform</span>
            </div>
            <span className="mt-1 sm:mt-0 sm:ml-2 px-2 py-1 bg-green-500/20 text-green-300 rounded-full font-medium" style={{fontSize: 'clamp(0.65rem, 1.4vw, 0.8rem)'}}>
              Trusted by 10,000+ Artists
            </span>
          </div>

          {/* Main Headline - H1 */}
          <h1 className={`hero-title font-black leading-tight mb-6 sm:mb-8 text-white ${
            theme === "dark" ? "text-white" : "text-white"
          }`} style={{fontSize: 'clamp(2rem, 7vw, 5.5rem)'}}>
            <span className="block mb-1 sm:mb-2">Transform Your</span>
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Music Career
            </span>
            <span className="block mt-2 sm:mt-4" style={{fontSize: 'clamp(1.5rem, 5vw, 3.5rem)'}}>
              Into a Global Empire
            </span>
          </h1>

          {/* Sub-headline - H2 */}
          <h2 className={`max-w-3xl sm:max-w-4xl mx-auto mb-4 sm:mb-6 text-white/90 font-semibold leading-relaxed px-2`} style={{fontSize: 'clamp(1rem, 2.5vw, 1.8rem)'}}>
            Reach <span className="text-yellow-400 font-bold">2M+ listeners</span> across{" "}
            <span className="text-cyan-400 font-bold">150+ countries</span> and turn your passion into profit
          </h2>

          {/* Description - P */}
          <p className={`max-w-xl sm:max-w-2xl mx-auto mb-8 sm:mb-12 text-white/80 leading-relaxed font-medium px-4`} style={{fontSize: 'clamp(0.9rem, 2.2vw, 1.3rem)'}}>
            Reach millions of listeners worldwide and turn your music into a global success story.
          </p>

          {/* CTA Button */}
          <div className="flex justify-center items-center mb-12 sm:mb-16 px-4">
            <Link to="/signup">
              <button className="group relative px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 text-white font-bold rounded-xl sm:rounded-2xl shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 hover:scale-105 border border-purple-400/30 w-full sm:w-auto" style={{fontSize: 'clamp(0.9rem, 2vw, 1.1rem)'}}>
                <span className="flex items-center justify-center">
                  Start Your Journey
                  <ArrowRight size={20} className="ml-2 sm:ml-3 group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl sm:rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10"></div>
              </button>
            </Link>
          </div>


        </div>
      </div>

    </section>
  );
};

export default Hero;
