import React, { useState, useEffect } from "react";
import { Music, Globe, Users, TrendingUp, Award, Zap } from "lucide-react";

const About = ({ theme }) => {
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

    const element = document.getElementById("about");
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Globe,
      title: "Global Reach",
      description: "Distribute to 150+ countries and major streaming platforms worldwide"
    },
    {
      icon: Users,
      title: "Artist Community",
      description: "Join 10,000+ artists who trust EMG for their music distribution"
    },
    {
      icon: TrendingUp,
      title: "Growth Focused",
      description: "Advanced analytics and promotion tools to grow your audience"
    },
    {
      icon: Award,
      title: "Industry Recognition",
      description: "Trusted by labels and artists for professional music distribution"
    }
  ];

  return (
    <section
      id="about"
      className={`relative py-20 px-6 md:px-16 overflow-hidden transition-all duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900"
          : "bg-gradient-to-br from-gray-50 via-purple-50/50 to-gray-100"
      }`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
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
            <Music size={16} className="mr-2" />
            About EMG Music
          </div>
          
          <h2 className={`font-bold mb-6 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          } text-4xl md:text-5xl lg:text-6xl`}>
            Your Music Distribution{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Empire
            </span>
          </h2>
          
          <p className={`max-w-4xl mx-auto text-lg md:text-xl leading-relaxed ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}>
            EMG Music is a leading music distribution empire built to help artists
            scale their music to a continental level. We provide a seamless
            platform for independent artists and labels to distribute, promote,
            and monetize their music across global streaming services.
          </p>
        </div>

        {/* Features Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                theme === "dark"
                  ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-purple-500/30"
                  : "bg-white/50 border-gray-200/50 hover:bg-white/80 hover:border-purple-300/50"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-center mb-4">
                <div className={`p-3 rounded-xl ${
                  theme === "dark" 
                    ? "bg-purple-600/20 text-purple-400" 
                    : "bg-purple-100 text-purple-600"
                } group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon size={24} />
                </div>
              </div>
              <h3 className={`font-semibold text-lg mb-2 text-center ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>
                {feature.title}
              </h3>
              <p className={`text-sm text-center leading-relaxed ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div className={`text-center transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className={`max-w-4xl mx-auto p-8 rounded-3xl backdrop-blur-sm border ${
            theme === "dark"
              ? "bg-gradient-to-r from-purple-600/10 to-pink-600/10 border-purple-500/20"
              : "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200/50"
          }`}>
            <div className="flex justify-center mb-6">
              <div className={`p-4 rounded-2xl ${
                theme === "dark" 
                  ? "bg-gradient-to-r from-purple-600 to-pink-600" 
                  : "bg-gradient-to-r from-purple-500 to-pink-500"
              }`}>
                <Zap size={32} className="text-white" />
              </div>
            </div>
            <h3 className={`font-bold text-2xl md:text-3xl mb-4 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}>
              Our Mission
            </h3>
            <p className={`text-lg md:text-xl leading-relaxed ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}>
              Whether you're an upcoming artist or an established name, EMG Music
              ensures your sound reaches the right audience. We're committed to
              democratizing music distribution and empowering artists worldwide.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
