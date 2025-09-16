import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "../assets/logo.png";

const Header = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const location = useLocation();

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

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? theme === "dark"
              ? "bg-gray-900/95 backdrop-blur-md shadow-xl"
              : "bg-purple-100/95 backdrop-blur-md shadow-xl"
            : theme === "dark"
            ? "bg-gray-900"
            : "bg-purple-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="group">
                <div className="relative">
                  <img
                    src={Logo}
                    alt="EMG Music"
                    className="h-12 sm:h-16 w-auto object-contain transition-all duration-300 group-hover:scale-110"
                  />
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300"></div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex space-x-8 font-medium">
              {["Discover", "Artists", "Team", "Shop"].map((item, index) => {
                const path = `/${item.toLowerCase().replace(" ", "")}`;
                const isActive = activeLink === path;
                return (
                  <li key={index}>
                    <Link
                      to={path}
                      className={`relative px-3 py-2 transition-all duration-300 ${
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

            {/* Login Button */}
            <div className="hidden md:block">
              <Link
                to="/login"
                className={`px-6 py-2.5 rounded-full font-semibold shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 ${
                  theme === "dark"
                    ? "bg-purple-700 hover:bg-purple-600 text-white"
                    : "bg-purple-600 hover:bg-purple-500 text-white"
                }`}
              >
                Login
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden p-2 rounded-lg transition-all duration-300 ${
                theme === "dark"
                  ? "text-white hover:bg-gray-800"
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
                ? "bg-gray-900/95 backdrop-blur-md"
                : "bg-purple-100/95 backdrop-blur-md"
            }`}
          >
            {["Discover", "Artists", "Team", "Shop"].map((item, index) => {
              const path = `/${item.toLowerCase().replace(" ", "")}`;
              const isActive = activeLink === path;
              return (
                <Link
                  key={index}
                  to={path}
                  className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                    isActive
                      ? theme === "dark"
                        ? "text-white bg-purple-700/20"
                        : "text-purple-700 bg-purple-200"
                      : theme === "dark"
                      ? "text-gray-300 hover:text-white hover:bg-gray-800/50"
                      : "text-gray-900 hover:text-purple-700 hover:bg-purple-200"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              );
            })}
            <div className="pt-4">
              <Link
                to="/login"
                className={`block w-full text-center px-6 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-purple-700 hover:bg-purple-600 text-white"
                    : "bg-purple-600 hover:bg-purple-500 text-white"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed header */}
      <div className="h-16 sm:h-20"></div>
    </>
  );
};

export default Header;
