import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaSpotify,
} from "react-icons/fa";

const Newsletter = ({ theme }) => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Subscribed successfully with: ${email}`);
    setEmail(""); 
  };

  return (
    <footer
      className={`py-12 px-6 transition-all ${
        theme === "dark"
          ? "bg-gray-900 text-gray-300"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold text-purple-500">EMG Music</h2>
          <p className="mt-3 text-sm text-gray-500">
            The ultimate music distribution platform helping artists scale their
            careers globally.
          </p>
          <div className="flex justify-start space-x-4 mb-3 py-2">
            <a
              href="#"
              className="text-purple-500 hover:scale-110 transition-transform"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="#"
              className="text-purple-500 hover:scale-110 transition-transform"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="#"
              className="text-purple-500 hover:scale-110 transition-transform"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="#"
              className="text-purple-500 hover:scale-110 transition-transform"
            >
              <FaYoutube size={20} />
            </a>
            <a
              href="#"
              className="text-purple-500 hover:scale-110 transition-transform"
            >
              <FaSpotify size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-purple-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-purple-500">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-purple-500">
                Services
              </Link>
            </li>
            <li>
              <Link to="/pricing" className="hover:text-purple-500">
                Pricing
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-purple-500">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold">Contact Us</h3>
          <ul className="mt-3 text-sm space-y-2">
            <li>
              Email:{" "}
              <a
                href="mailto:support@emgmusic.com"
                className="hover:text-purple-500"
              >
                support@emgmusic.com
              </a>
            </li>
            <li>
              Phone:{" "}
              <a href="tel:+254700123456" className="hover:text-purple-500">
                +254 700 123 456
              </a>
            </li>
            <li>Address: Nairobi, Kenya</li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h3 className="text-lg font-semibold">Join Our Newsletter</h3>
          <p className="mt-3 text-sm text-gray-500">
            Get the latest music distribution updates, offers, and industry
            insights.
          </p>
          <form onSubmit={handleSubscribe} className="mt-3 flex">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-3 py-2 text-sm rounded-l-md border border-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-purple-500 text-white rounded-r-md hover:bg-purple-600"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Social Media & Copyright */}
    </footer>
  );
};

export default Newsletter;
