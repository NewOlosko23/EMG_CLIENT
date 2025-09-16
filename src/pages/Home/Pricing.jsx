import React, { useState, useEffect } from "react";
import { FaCheck, FaCrown, FaShieldAlt, FaRocket, FaGlobe, FaChartLine, FaHeadphones, FaMoneyBillWave, FaBroadcastTower, FaStore } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { 
  ArrowRight, 
  CheckCircle, 
  Star, 
  TrendingUp, 
  Users, 
  Award,
  Zap,
  Target,
  Clock,
  DollarSign,
  Gift,
  Shield
} from "lucide-react";

const Pricing = ({ theme }) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("pricing");
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: FaGlobe,
      title: "Global Distribution",
      description: "150+ platforms worldwide"
    },
    {
      icon: FaChartLine,
      title: "Real-time Analytics",
      description: "Track streams & revenue"
    },
    {
      icon: FaMoneyBillWave,
      title: "Full Royalty Collection",
      description: "All revenue streams"
    },
    {
      icon: FaBroadcastTower,
      title: "Playlist Promotion",
      description: "Boost your reach"
    },
    {
      icon: FaHeadphones,
      title: "Artist Support",
      description: "1-on-1 mentorship"
    },
    {
      icon: FaStore,
      title: "Merch & Branding",
      description: "Expand your business"
    }
  ];

  const competitorComparison = [
    { feature: "Unlimited Uploads", emg: true, competitor1: false, competitor2: "Limited" },
    { feature: "Global Distribution", emg: "150+", competitor1: "100+", competitor2: "50+" },
    { feature: "Real-time Analytics", emg: true, competitor1: true, competitor2: false },
    { feature: "Royalty Collection", emg: "All Sources", competitor1: "Limited", competitor2: "Basic" },
    { feature: "Artist Support", emg: "1-on-1", competitor1: "Email Only", competitor2: "Community" },
    { feature: "Setup Fees", emg: "None", competitor1: "$50", competitor2: "$25" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Independent Artist",
      content: "Best $25 I ever spent! EMG helped me reach 1M+ streams in 6 months.",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Music Producer",
      content: "The value is incredible. Other platforms charge $50+ for less features.",
      rating: 5
    }
  ];

  return (
    <section
      id="pricing"
      className={`relative py-20 px-6 md:px-16 overflow-hidden transition-all duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-green-900/20 to-gray-900"
          : "bg-gradient-to-br from-gray-50 via-green-50/50 to-gray-100"
      }`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-green-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header Section */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6 ${
            theme === "dark" 
              ? "bg-green-600/20 text-green-300 border border-green-500/30" 
              : "bg-green-100 text-green-700 border border-green-200"
          }`}>
            <DollarSign size={16} className="mr-2" />
            Simple, Transparent Pricing
          </div>
          
          <h2 className={`font-bold mb-6 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          } text-4xl md:text-5xl lg:text-6xl`}>
            Start Your Music Career for{" "}
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Just $25
            </span>
          </h2>
          
          <p className={`max-w-4xl mx-auto text-lg md:text-xl leading-relaxed ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}>
            One flat fee. No hidden costs. No monthly subscriptions. Get everything you need 
            to distribute, promote, and monetize your music worldwide.
          </p>
        </div>

        {/* Value Proposition */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className={`text-center p-6 rounded-2xl backdrop-blur-sm border ${
            theme === "dark"
              ? "bg-white/5 border-white/10"
              : "bg-white/50 border-gray-200/50"
          }`}>
            <div className="flex justify-center mb-4">
              <div className={`p-3 rounded-xl ${
                theme === "dark" 
                  ? "bg-green-600/20 text-green-400" 
                  : "bg-green-100 text-green-600"
              }`}>
                <Shield size={24} />
              </div>
            </div>
            <h3 className={`font-semibold text-lg mb-2 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}>
              No Hidden Fees
            </h3>
            <p className={`text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}>
              What you see is what you pay. No setup fees, no monthly charges, no surprises.
            </p>
          </div>

          <div className={`text-center p-6 rounded-2xl backdrop-blur-sm border ${
            theme === "dark"
              ? "bg-white/5 border-white/10"
              : "bg-white/50 border-gray-200/50"
          }`}>
            <div className="flex justify-center mb-4">
              <div className={`p-3 rounded-xl ${
                theme === "dark" 
                  ? "bg-blue-600/20 text-blue-400" 
                  : "bg-blue-100 text-blue-600"
              }`}>
                <Zap size={24} />
              </div>
            </div>
            <h3 className={`font-semibold text-lg mb-2 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}>
              Lifetime Access
            </h3>
            <p className={`text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}>
              Pay once, use forever. No recurring charges or subscription renewals.
            </p>
          </div>

          <div className={`text-center p-6 rounded-2xl backdrop-blur-sm border ${
            theme === "dark"
              ? "bg-white/5 border-white/10"
              : "bg-white/50 border-gray-200/50"
          }`}>
            <div className="flex justify-center mb-4">
              <div className={`p-3 rounded-xl ${
                theme === "dark" 
                  ? "bg-purple-600/20 text-purple-400" 
                  : "bg-purple-100 text-purple-600"
              }`}>
                <Award size={24} />
              </div>
            </div>
            <h3 className={`font-semibold text-lg mb-2 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}>
              30-Day Guarantee
            </h3>
            <p className={`text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}>
              Not satisfied? Get your money back within 30 days, no questions asked.
            </p>
          </div>
        </div>

        {/* Main Pricing Card */}
        <div className={`max-w-4xl mx-auto mb-16 transition-all duration-1000 delay-400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className={`relative p-8 md:p-12 rounded-3xl backdrop-blur-sm border-2 ${
            theme === "dark"
              ? "bg-gradient-to-br from-green-600/20 to-blue-600/20 border-green-500/30"
              : "bg-gradient-to-br from-green-50 to-blue-50 border-green-200/50"
          }`}>
            {/* Popular Badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className={`px-6 py-2 rounded-full text-sm font-bold ${
                theme === "dark" 
                  ? "bg-gradient-to-r from-green-500 to-blue-500 text-white" 
                  : "bg-gradient-to-r from-green-500 to-blue-500 text-white"
              }`}>
                <FaCrown className="inline mr-2" />
                Most Popular Choice
              </div>
            </div>

            <div className="text-center mb-8">
              <h3 className={`text-3xl md:text-4xl font-bold mb-4 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>
                EMG Music Pro
              </h3>
              
              <div className="mb-6">
                <div className={`text-6xl md:text-7xl font-bold mb-2 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}>
                  $25
                </div>
                <div className={`text-lg ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}>
                  One-time payment • Lifetime access
                </div>
              </div>

              <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6 ${
                theme === "dark" 
                  ? "bg-green-600/20 text-green-300 border border-green-500/30" 
                  : "bg-green-100 text-green-700 border border-green-200"
              }`}>
                <Gift size={16} className="mr-2" />
                Save $200+ compared to competitors
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <div className={`p-2 rounded-lg mr-4 ${
                    theme === "dark" 
                      ? "bg-green-600/20 text-green-400" 
                      : "bg-green-100 text-green-600"
                  }`}>
                    <feature.icon size={20} />
                  </div>
                  <div>
                    <div className={`font-semibold ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}>
                      {feature.title}
                    </div>
                    <div className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}>
                      {feature.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <button
                onClick={() => navigate("/signup")}
                className="group relative px-12 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold text-xl rounded-full shadow-2xl hover:shadow-green-500/25 transition-all duration-300 hover:-translate-y-1 hover:scale-105"
              >
                <span className="flex items-center justify-center">
                  Get Started for $25
                  <ArrowRight size={24} className="ml-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              
              <div className={`mt-4 text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}>
                <Shield className="inline mr-2" size={16} />
                30-day money-back guarantee
              </div>
            </div>
          </div>
        </div>

        {/* Main CTA Section */}
        <div className={`text-center transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className={`max-w-5xl mx-auto p-12 rounded-3xl backdrop-blur-sm border-2 ${
            theme === "dark"
              ? "bg-gradient-to-r from-green-600/20 to-blue-600/20 border-green-500/30"
              : "bg-gradient-to-r from-green-50 to-blue-50 border-green-200/50"
          }`}>
            <div className="flex justify-center mb-8">
              <div className={`p-6 rounded-3xl ${
                theme === "dark" 
                  ? "bg-gradient-to-r from-green-600 to-blue-600" 
                  : "bg-gradient-to-r from-green-500 to-blue-500"
              }`}>
                <Zap size={48} className="text-white" />
              </div>
            </div>
            <h3 className={`font-bold text-3xl md:text-4xl mb-6 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}>
              Ready to Launch Your Music Career?
            </h3>
            <p className={`text-xl md:text-2xl leading-relaxed mb-10 ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}>
              Join thousands of successful artists who chose EMG Music. 
              Start distributing your music worldwide for just $25.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                onClick={() => navigate("/signup")}
                className="group relative px-12 py-6 bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold text-xl rounded-full shadow-2xl hover:shadow-green-500/25 transition-all duration-300 hover:-translate-y-2 hover:scale-105"
              >
                <span className="flex items-center justify-center">
                  Start Now for $25
                  <ArrowRight size={24} className="ml-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <div className={`text-center ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}>
                <div className="text-sm">30-day money-back guarantee</div>
                <div className="text-xs">No hidden fees • Lifetime access</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
