import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import Logo from "../assets/logo.png";

const Header = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);


  const getNavigationItems = () => {
    if (!isAuthenticated) {
      return ["Discover", "Artists", "Team", "Shop"];
    }
    return ["Discover", "Artists", "Team", "Shop"];
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? theme === "dark"
              ? "bg-gradient-to-r from-gray-900/95 via-purple-900/95 to-gray-900/95 backdrop-blur-md shadow-2xl border-b border-purple-500/20 transform scale-100"
              : "bg-gradient-to-r from-white/95 via-purple-50/95 to-white/95 backdrop-blur-md shadow-2xl border-b border-purple-200/50 transform scale-100"
            : theme === "dark"
            ? "bg-gradient-to-r from-gray-900 via-purple-900/30 to-gray-900 transform scale-100"
            : "bg-gradient-to-r from-purple-50 via-white to-purple-50 transform scale-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-18 lg:h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="group">
                <div className="relative">
                  <img
                    src={Logo}
                    alt="EMG Music"
                    className="h-10 sm:h-12 lg:h-14 w-auto object-contain transition-all duration-300 group-hover:scale-110"
                  />
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300"></div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex space-x-6 lg:space-x-8 font-medium">
              {getNavigationItems().map((item, index) => {
                const path = `/${item.toLowerCase().replace(" ", "")}`;
                const isActive = activeLink === path;
                return (
                  <li key={index}>
                    <Link
                      to={path}
                      className={`relative px-3 py-2 text-sm lg:text-base transition-all duration-300 ${
                        isActive
                          ? theme === "dark"
                            ? "text-white"
                            : "text-purple-700"
                          : theme === "dark"
                          ? "text-gray-300 hover:text-white"
                          : "text-gray-900 hover:text-purple-700"
                      }`}
                    >
                      {item}
                      {isActive && (
                        <div className={`absolute bottom-0 left-0 w-full h-0.5 ${
                          theme === "dark" ? "bg-purple-400" : "bg-purple-700"
                        }`}></div>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* User Menu / Login Button */}
            <div className="hidden md:block">
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className={`flex items-center space-x-2 px-3 lg:px-4 py-2 rounded-full font-semibold text-sm lg:text-base shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 ${
                      theme === "dark"
                        ? "bg-purple-700 hover:bg-purple-600 text-white"
                        : "bg-purple-600 hover:bg-purple-500 text-white"
                    }`}
                  >
                    <User className="w-4 h-4" />
                    <span>{user?.user_metadata?.username || 'User'}</span>
                  </button>
                  
                  {showUserMenu && (
                    <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-xl py-2 z-50 backdrop-blur-md border ${
                      theme === "dark" 
                        ? "bg-gray-800/95 border-purple-500/20" 
                        : "bg-white/95 border-purple-200/50"
                    }`}>
                      <div className={`px-4 py-2 border-b ${
                        theme === "dark" ? "border-purple-500/20" : "border-gray-200"
                      }`}>
                        <p className={`text-sm font-medium ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}>
                          {user?.user_metadata?.username || 'User'}
                        </p>
                        <p className={`text-xs ${
                          theme === "dark" ? "text-gray-400" : "text-gray-500"
                        }`}>
                          {user?.email || 'User'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/Login"
                  className={`px-4 lg:px-6 py-2.5 rounded-full font-semibold text-sm lg:text-base shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 ${
                    theme === "dark"
                      ? "bg-purple-700 hover:bg-purple-600 text-white"
                      : "bg-purple-600 hover:bg-purple-500 text-white"
                  }`}
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden p-2 rounded-lg transition-all duration-300 ${
                theme === "dark"
                  ? "text-white hover:bg-purple-800/30"
                  : "text-gray-900 hover:bg-purple-200"
              }`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div
            className={`px-6 py-4 space-y-2 ${
              theme === "dark"
                ? "bg-gradient-to-r from-gray-900/95 via-purple-900/95 to-gray-900/95 backdrop-blur-md"
                : "bg-gradient-to-r from-white/95 via-purple-50/95 to-white/95 backdrop-blur-md"
            }`}
          >
            {getNavigationItems().map((item, index) => {
              const path = `/${item.toLowerCase().replace(" ", "")}`;
              const isActive = activeLink === path;
              return (
                <Link
                  key={index}
                  to={path}
                  className={`block px-4 py-3 rounded-lg font-medium text-sm transition-all duration-300 ${
                    isActive
                      ? theme === "dark"
                        ? "text-white bg-purple-700/20"
                        : "text-purple-700 bg-purple-200"
                      : theme === "dark"
                      ? "text-gray-300 hover:text-white hover:bg-purple-800/30"
                      : "text-gray-900 hover:text-purple-700 hover:bg-purple-200"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              );
            })}
            <div className="pt-4">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <div className={`px-4 py-2 rounded-lg ${
                    theme === "dark" 
                      ? "bg-purple-800/30" 
                      : "bg-gray-100"
                  }`}>
                    <p className={`text-sm font-medium ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}>
                      {user?.user_metadata?.username || 'User'}
                    </p>
                    <p className={`text-xs ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}>
                      {user?.email || 'User'}
                    </p>
                  </div>
                </div>
              ) : (
                <Link
                  to="/Login"
                  className={`block w-full text-center px-6 py-3 rounded-lg font-semibold text-sm shadow-lg transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-purple-700 hover:bg-purple-600 text-white"
                      : "bg-purple-600 hover:bg-purple-500 text-white"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed header */}
      <div className="h-16 sm:h-18 lg:h-20"></div>
    </>
  );
};

export default Header;
