import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "../assets/logo.png";

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
      <div className="flex items-center">
        <Link to="/">
          <img
            src={Logo}
            alt="EMG Music"
            className="h-10 sm:h-12 w-auto object-contain"
          />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex space-x-6 font-medium">
        {["Home", "Discover", "Artists", "Team", "Merch"].map((item, index) => (
          <li key={index}>
            <Link
              to={`/${item.toLowerCase().replace(" ", "")}`}
              className={`transition-colors duration-300 hover:opacity-75 ${
                theme === "dark"
                  ? "hover:text-purple-400"
                  : "hover:text-purple-700"
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
            : "bg-purple-600 hover:bg-purple-500 text-white"
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
      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full flex flex-col items-start gap-4 py-6 px-6 shadow-md bg-purple-100 text-gray-900 md:hidden">
          {["Home", "Discover", "Artists", "Team", "Merch"].map(
            (item, index) => (
              <Link
                key={index}
                to={`/${item.toLowerCase().replace(" ", "")}`}
                className="text-lg w-full py-2 transition-colors duration-300 hover:bg-purple-200 rounded-md pl-4"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </Link>
            )
          )}
          <Link
            to="/login"
            className="px-6 py-3 w-full text-center bg-purple-700 hover:bg-purple-600 text-white font-semibold shadow-md rounded-md transition-all duration-300"
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
