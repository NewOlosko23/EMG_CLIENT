import React, { useState, useEffect } from "react";
import {
  FaMusic,
  FaChartLine,
  FaHeadphones,
  FaMoneyBillWave,
  FaBroadcastTower,
  FaGlobe,
  FaShieldAlt,
  FaStore,
} from "react-icons/fa";
import { 
  ArrowRight, 
  CheckCircle, 
  Star, 
  TrendingUp, 
  Users, 
  Award,
  Zap,
  Target
} from "lucide-react";

const Services = ({ theme }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("distribution");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("services");
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const serviceCategories = {
    distribution: {
      title: "Distribution & Publishing",
      color: "blue",
      services: [
        {
          title: "Global Music Distribution",
          description: "Get your music on Spotify, Apple Music, YouTube Music, Boomplay, Deezer, and 150+ digital stores worldwide—quickly and hassle-free.",
          icon: FaGlobe,
          features: ["150+ Platforms", "24-48hr Delivery", "No Setup Fees"],
          popular: true
        },
        {
          title: "Full Royalty Collection",
          description: "We collect and pay out royalties from streaming platforms, radio, TV, and social media (YouTube Content ID, TikTok, Facebook, Instagram).",
          icon: FaMoneyBillWave,
          features: ["All Revenue Streams", "Transparent Reporting", "Fast Payouts"],
          popular: false
        },
        {
          title: "Content Protection & Licensing",
          description: "Protect your music with digital fingerprinting. We help secure rights, prevent unauthorized use, and maximize your revenue.",
          icon: FaShieldAlt,
          features: ["Digital Fingerprinting", "Rights Management", "Revenue Protection"],
          popular: false
        }
      ]
    },
    analytics: {
      title: "Analytics & Insights",
      color: "purple",
      services: [
        {
          title: "Streaming & Earnings Dashboard",
          description: "Monitor streams, downloads, and revenue in real-time with our powerful analytics dashboard. Stay in control of your success.",
          icon: FaChartLine,
          features: ["Real-time Data", "Revenue Tracking", "Performance Insights"],
          popular: true
        },
        {
          title: "Playlist & Radio Promotion",
          description: "Boost your reach with strategic playlist placements and radio airplay. Get heard by new audiences and grow your fanbase.",
          icon: FaBroadcastTower,
          features: ["Playlist Pitching", "Radio Airplay", "Audience Growth"],
          popular: false
        }
      ]
    },
    support: {
      title: "Artist Support & Growth",
      color: "green",
      services: [
        {
          title: "Exclusive Artist Support",
          description: "Access expert career advice, branding support, and personalized guidance to help you stand out in the competitive music industry.",
          icon: FaHeadphones,
          features: ["1-on-1 Mentorship", "Career Guidance", "Brand Development"],
          popular: false
        },
        {
          title: "Merch & Brand Growth",
          description: "Expand beyond music! We help you launch and sell branded merchandise, increasing your revenue streams and fan engagement.",
          icon: FaStore,
          features: ["Merch Design", "E-commerce Setup", "Fan Engagement"],
          popular: false
        },
        {
          title: "Empowering Independent Artists",
          description: "We provide transparent revenue splits, fair pricing, and a platform that gives every artist a chance to succeed—without losing ownership.",
          icon: FaMusic,
          features: ["Fair Revenue Splits", "No Hidden Fees", "Artist Ownership"],
          popular: true
        }
      ]
    }
  };

  const stats = [
    { icon: Users, value: "10,000+", label: "Active Artists" },
    { icon: TrendingUp, value: "99.9%", label: "Success Rate" },
    { icon: Award, value: "150+", label: "Platforms" },
    { icon: Zap, value: "24hr", label: "Average Delivery" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Independent Artist",
      content: "EMG Music transformed my career. Their distribution network and support helped me reach 1M+ streams in just 6 months.",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Music Producer",
      content: "The analytics dashboard is incredible. I can track my revenue across all platforms in real-time. Game changer!",
      rating: 5
    },
    {
      name: "Alex Rodriguez",
      role: "Singer-Songwriter",
      content: "The artist support team is amazing. They helped me develop my brand and connect with the right audience.",
      rating: 5
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
        text: "text-blue-400",
        button: "bg-blue-600 hover:bg-blue-700"
      },
      purple: {
        bg: "bg-purple-500/10",
        border: "border-purple-500/20",
        text: "text-purple-400",
        button: "bg-purple-600 hover:bg-purple-700"
      },
      green: {
        bg: "bg-green-500/10",
        border: "border-green-500/20",
        text: "text-green-400",
        button: "bg-green-600 hover:bg-green-700"
      }
    };
    return colors[color] || colors.blue;
  };

  return (
    <section
      id="services"
      className={`relative py-20 px-6 md:px-16 overflow-hidden transition-all duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900"
          : "bg-gradient-to-br from-gray-50 via-purple-50/50 to-gray-100"
      }`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header Section */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6 ${
            theme === "dark" 
              ? "bg-purple-600/20 text-purple-300 border border-purple-500/30" 
              : "bg-purple-100 text-purple-700 border border-purple-200"
          }`}>
            <Target size={16} className="mr-2" />
            Comprehensive Music Services
          </div>
          
          <h2 className={`font-bold mb-6 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          } text-2xl md:text-3xl lg:text-4xl`}>
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Succeed
            </span>
          </h2>
          
          <p className={`max-w-4xl mx-auto text-sm md:text-base leading-relaxed ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}>
            EMG Music empowers artists with seamless music distribution, royalty
            collection, and promotional tools to maximize success. From distribution to analytics, 
            we've got you covered.
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
                    ? "bg-purple-600/20 text-purple-400" 
                    : "bg-purple-100 text-purple-600"
                }`}>
                  <stat.icon size={24} />
                </div>
              </div>
              <div className={`text-lg md:text-xl font-bold mb-1 ${
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

        {/* Category Tabs */}
        <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {Object.entries(serviceCategories).map(([key, category]) => {
            const colorClasses = getColorClasses(category.color);
            return (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeCategory === key
                    ? `${colorClasses.button} text-white shadow-lg`
                    : theme === "dark"
                    ? "bg-white/10 text-gray-300 hover:bg-white/20"
                    : "bg-white/50 text-gray-600 hover:bg-white/80"
                }`}
              >
                {category.title}
              </button>
            );
          })}
        </div>

        {/* Services Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 transition-all duration-1000 delay-400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {serviceCategories[activeCategory].services.map((service, index) => {
            const colorClasses = getColorClasses(serviceCategories[activeCategory].color);
            return (
              <div
                key={index}
                className={`group relative p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                  theme === "dark"
                    ? "bg-white/5 border-white/10 hover:bg-white/10"
                    : "bg-white/50 border-gray-200/50 hover:bg-white/80"
                } ${service.popular ? 'ring-2 ring-purple-500/50' : ''}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      theme === "dark" 
                        ? "bg-purple-600 text-white" 
                        : "bg-purple-100 text-purple-700"
                    }`}>
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="flex items-start mb-4">
                  <div className={`p-3 rounded-xl mr-4 transition-all duration-300 group-hover:scale-110 ${
                    theme === "dark" 
                      ? `${colorClasses.bg} ${colorClasses.border} border ${colorClasses.text}` 
                      : `${colorClasses.bg} ${colorClasses.border} border ${colorClasses.text}`
                  }`}>
                    <service.icon size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold text-sm md:text-base mb-2 ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}>
                      {service.title}
                    </h3>
                  </div>
                </div>
                
                <p className={`text-sm leading-relaxed mb-4 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}>
                  {service.description}
                </p>
                
                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <CheckCircle size={16} className={`mr-2 ${colorClasses.text}`} />
                      <span className={`text-xs ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Testimonials Section */}
        <div className={`mb-16 transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h3 className={`text-center text-lg md:text-xl font-bold mb-12 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>
            What Artists Say About Us
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl backdrop-blur-sm border ${
                  theme === "dark"
                    ? "bg-white/5 border-white/10"
                    : "bg-white/50 border-gray-200/50"
                }`}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className={`text-sm leading-relaxed mb-4 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}>
                  "{testimonial.content}"
                </p>
                <div>
                  <div className={`font-semibold ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}>
                    {testimonial.name}
                  </div>
                  <div className={`text-xs ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}>
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Services;
