import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogIn } from "lucide-react";
import Logo from "../assets/logo.png";
import Container from "./Container";

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


  const getNavigationItems = () => {
    return ["Discover", "Artists", "Team", "Shop"];
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200"
            : "bg-white/80 backdrop-blur-sm"
        }`}
      >
        <Container>
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="group">
                <img
                  src={Logo}
                  alt="EMG Music"
                  className="h-8 w-auto object-contain transition-all duration-300 group-hover:scale-105"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex space-x-8 font-medium">
              {getNavigationItems().map((item, index) => {
                const path = `/${item.toLowerCase().replace(" ", "")}`;
                const isActive = activeLink === path;
                return (
                  <li key={index}>
                    <Link
                      to={path}
                      className={`relative px-3 py-2 text-sm transition-all duration-300 ${
                        isActive
                          ? "text-purple-600"
                          : "text-gray-700 hover:text-purple-600"
                      }`}
                    >
                      {item}
                      {isActive && (
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600"></div>
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
                className="flex items-center gap-2 px-6 py-2.5 bg-purple-600 text-white rounded-lg font-medium text-sm transition-all duration-300 hover:bg-purple-700 hover:shadow-lg hover:scale-105"
              >
                <LogIn size={18} />
                Login
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg transition-all duration-300 text-gray-700 hover:bg-gray-100"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </Container>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white/95 backdrop-blur-md border-t border-gray-200 px-6 py-4 space-y-2">
            {getNavigationItems().map((item, index) => {
              const path = `/${item.toLowerCase().replace(" ", "")}`;
              const isActive = activeLink === path;
              return (
                <Link
                  key={index}
                  to={path}
                  className={`block px-4 py-3 rounded-lg font-medium text-sm transition-all duration-300 ${
                    isActive
                      ? "text-purple-600 bg-purple-50"
                      : "text-gray-700 hover:text-purple-600 hover:bg-gray-50"
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
                className="flex items-center justify-center gap-2 w-full text-center px-6 py-3 bg-purple-600 text-white rounded-lg font-medium text-sm transition-all duration-300 hover:bg-purple-700"
                onClick={() => setIsOpen(false)}
              >
                <LogIn size={18} />
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed header */}
      <div className="h-16"></div>
    </>
  );
};

export default Header;
