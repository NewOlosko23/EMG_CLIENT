import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaSpotify,
  FaLinkedin,
  FaTiktok,
  FaDiscord,
} from "react-icons/fa";
import { 
  ArrowRight, 
  CheckCircle, 
  Star, 
  TrendingUp, 
  Users, 
  Award,
  Zap,
  Target,
  Mail,
  Phone,
  MapPin,
  Music,
  Globe,
  Shield,
  Gift
} from "lucide-react";

const Newsletter = ({ theme }) => {
  const [email, setEmail] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("newsletter");
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setIsSubscribed(true);
    setEmail("");
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  const footerLinks = {
    services: [
      { name: "Music Distribution", href: "/services#distribution" },
      { name: "Analytics Dashboard", href: "/services#analytics" },
      { name: "Royalty Collection", href: "/services#royalties" },
      { name: "Artist Support", href: "/services#support" },
      { name: "Merch & Branding", href: "/services#merch" }
    ],
    resources: [
      { name: "Help Center", href: "/help" },
      { name: "API Documentation", href: "/docs" },
      { name: "Community", href: "/community" },
      { name: "Success Stories", href: "/success" },
      { name: "Industry Reports", href: "/reports" }
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "DMCA", href: "/dmca" },
      { name: "Accessibility", href: "/accessibility" }
    ]
  };

  const companyLinks = [
    { name: "About Us", href: "/about" },
    { name: "Our Team", href: "/team" },
    { name: "Careers", href: "/careers" },
    { name: "Press Kit", href: "/press" },
    { name: "Blog", href: "/blog" }
  ];

  const socialLinks = [
    { icon: FaFacebookF, href: "#", label: "Facebook" },
    { icon: FaTwitter, href: "#", label: "Twitter" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
    { icon: FaYoutube, href: "#", label: "YouTube" },
    { icon: FaSpotify, href: "#", label: "Spotify" },
    { icon: FaTiktok, href: "#", label: "TikTok" },
    { icon: FaLinkedin, href: "#", label: "LinkedIn" },
    { icon: FaDiscord, href: "#", label: "Discord" }
  ];

  const stats = [
    { icon: Users, value: "10,000+", label: "Active Artists" },
    { icon: Globe, value: "150+", label: "Countries" },
    { icon: Music, value: "50K+", label: "Tracks Distributed" },
    { icon: TrendingUp, value: "500M+", label: "Total Streams" }
  ];

  return (
    <footer
      id="newsletter"
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
        {/* Newsletter CTA Section */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6 ${
            theme === "dark" 
              ? "bg-purple-600/20 text-purple-300 border border-purple-500/30" 
              : "bg-purple-100 text-purple-700 border border-purple-200"
          }`}>
            <Mail size={16} className="mr-2" />
            Stay Connected
          </div>
          
          <h2 className={`font-bold mb-6 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          } text-4xl md:text-5xl lg:text-6xl`}>
            Ready to Start Your{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Music Journey?
            </span>
          </h2>
          
          <p className={`max-w-4xl mx-auto text-lg md:text-xl leading-relaxed mb-8 ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}>
            Join thousands of successful artists who trust EMG Music. Get exclusive updates, 
            industry insights, and special offers delivered to your inbox.
          </p>

          {/* Newsletter Signup */}
          <div className={`max-w-2xl mx-auto mb-8 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className={`p-8 rounded-3xl backdrop-blur-sm border ${
              theme === "dark"
                ? "bg-gradient-to-r from-purple-600/10 to-blue-600/10 border-purple-500/20"
                : "bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200/50"
            }`}>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className={`w-full px-6 py-4 rounded-full text-lg border-2 transition-all duration-300 focus:outline-none focus:ring-4 ${
                      theme === "dark"
                        ? "bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500/20"
                    }`}
                  />
                </div>
                <button
                  type="submit"
                  className={`group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:-translate-y-1 hover:scale-105 ${
                    isSubscribed ? 'bg-green-600 hover:bg-green-700' : ''
                  }`}
                >
                  <span className="flex items-center justify-center">
                    {isSubscribed ? (
                      <>
                        <CheckCircle size={20} className="mr-2" />
                        Subscribed!
                      </>
                    ) : (
                      <>
                        Get Started
                        <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                </button>
              </form>
              
              <div className={`mt-4 text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}>
                <Shield className="inline mr-2" size={16} />
                We respect your privacy. Unsubscribe at any time.
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center p-4 rounded-2xl backdrop-blur-sm border ${
                  theme === "dark"
                    ? "bg-white/5 border-white/10"
                    : "bg-white/50 border-gray-200/50"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-center mb-2">
                  <div className={`p-2 rounded-xl ${
                    theme === "dark" 
                      ? "bg-purple-600/20 text-purple-400" 
                      : "bg-purple-100 text-purple-600"
                  }`}>
                    <stat.icon size={20} />
                  </div>
                </div>
                <div className={`text-xl font-bold mb-1 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}>
                  {stat.value}
                </div>
                <div className={`text-xs ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Company Profile Section */}
        <div className={`text-center mb-16 transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className={`text-3xl font-bold mb-4 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              EMG Music
            </span>
          </h2>
          <p className={`max-w-2xl mx-auto text-lg leading-relaxed mb-8 ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}>
            The ultimate music distribution platform helping artists scale their
            careers globally. From distribution to analytics, we've got you covered.
          </p>
          
          {/* Social Links */}
          <div className="flex flex-wrap justify-center gap-3">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className={`p-3 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:scale-110 ${
                  theme === "dark"
                    ? "bg-white/10 text-gray-400 hover:bg-purple-600/20 hover:text-purple-400"
                    : "bg-white/50 text-gray-600 hover:bg-purple-100 hover:text-purple-600"
                }`}
                aria-label={social.label}
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Footer Links Section */}
        <div className={`grid grid-cols-1 items-center md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 transition-all duration-1000 delay-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {/* Company Links */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}>
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className={`text-sm transition-colors duration-300 hover:text-purple-500 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Other Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className={`text-lg font-semibold mb-4 capitalize ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className={`text-sm transition-colors duration-300 hover:text-purple-500 ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className={`mb-12 transition-all duration-1000 delay-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className={`p-8 rounded-2xl backdrop-blur-sm border ${
            theme === "dark"
              ? "bg-white/5 border-white/10"
              : "bg-white/50 border-gray-200/50"
          }`}>
            <h3 className={`text-xl font-semibold mb-6 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}>
              Get in Touch
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-xl mr-4 ${
                  theme === "dark" 
                    ? "bg-purple-600/20 text-purple-400" 
                    : "bg-purple-100 text-purple-600"
                }`}>
                  <Mail size={20} />
                </div>
                <div>
                  <div className={`font-medium ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}>
                    Email Us
                  </div>
                  <a
                    href="mailto:support@emgmusic.com"
                    className={`text-sm transition-colors duration-300 hover:text-purple-500 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    support@emgmusic.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className={`p-3 rounded-xl mr-4 ${
                  theme === "dark" 
                    ? "bg-blue-600/20 text-blue-400" 
                    : "bg-blue-100 text-blue-600"
                }`}>
                  <Phone size={20} />
                </div>
                <div>
                  <div className={`font-medium ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}>
                    Call Us
                  </div>
                  <a
                    href="tel:+254700123456"
                    className={`text-sm transition-colors duration-300 hover:text-purple-500 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    +254 700 123 456
                  </a>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className={`p-3 rounded-xl mr-4 ${
                  theme === "dark" 
                    ? "bg-green-600/20 text-green-400" 
                    : "bg-green-100 text-green-600"
                }`}>
                  <MapPin size={20} />
                </div>
                <div>
                  <div className={`font-medium ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}>
                    Visit Us
                  </div>
                  <div className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}>
                    Nairobi, Kenya
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`pt-8 border-t transition-all duration-1000 delay-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        } ${
          theme === "dark" ? "border-white/10" : "border-gray-200"
        }`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className={`text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}>
              © {new Date().getFullYear()} EMG Music. All rights reserved. Empowering artists worldwide.
            </div>
            <div className="flex items-center gap-6">
              <div className={`text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}>
                Made with ❤️ for artists
              </div>
              <div className="flex items-center gap-2">
                <Shield size={16} className={theme === "dark" ? "text-green-400" : "text-green-600"} />
                <span className={`text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}>
                  Secure & Trusted
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Newsletter;
