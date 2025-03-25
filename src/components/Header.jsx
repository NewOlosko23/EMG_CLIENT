import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; 

const Header = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex justify-between items-center px-6 py-4 sm:px-8 sm:py-5 shadow-lg z-50 transition-all duration-300 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-purple-100 text-gray-900"
      }`}
    >
      {/* Logo */}
      <h1
        className={`text-xl sm:text-2xl font-bold drop-shadow-md ${
          theme === "dark" ? "text-purple-400" : "text-blue-600"
        }`}
      >
        <Link to="/">EMG Music</Link>
      </h1>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex space-x-6 font-medium">
        {["Home", "Feed", "Artists", "Sign Up"].map((item, index) => (
          <li key={index}>
            <Link
              to={`/${item.toLowerCase().replace(" ", "")}`}
              className={`transition-colors duration-300 hover:opacity-75 ${
                theme === "dark"
                  ? "hover:text-purple-400"
                  : "hover:text-blue-500"
              }`}
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>

      {/* Login Button */}
      <button
        className={`hidden md:block px-4 py-2 rounded-full font-semibold shadow-md transition-all duration-300 ${
          theme === "dark"
            ? "bg-purple-700 hover:bg-purple-600 text-white"
            : "bg-blue-600 hover:bg-blue-500 text-white"
        }`}
      >
        <Link to="/login">Login</Link>
      </button>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden focus:outline-none"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute top-16 left-0 w-full flex flex-col items-center gap-4 py-6 shadow-md ${
            theme === "dark"
              ? "bg-gray-900 text-white"
              : "bg-blue-100 text-gray-900"
          } md:hidden`}
        >
          {["Home", "Feed", "Artist", "Sign Up"].map((item, index) => (
            <Link
              key={index}
              to={`/${item.toLowerCase().replace(" ", "")}`}
              className="text-lg transition-colors duration-300 hover:opacity-75"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </Link>
          ))}
          <Link
            to="/login"
            className={`px-6 py-2 rounded-full font-semibold shadow-md transition-all duration-300 ${
              theme === "dark"
                ? "bg-purple-700 hover:bg-purple-600 text-white"
                : "bg-blue-600 hover:bg-blue-500 text-white"
            }`}
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Header;
