import React from "react";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Pricing = ({ theme }) => {
  const navigate = useNavigate();

  return (
    <section
      className={`py-12 px-6 text-center transition-all ${
        theme === "dark"
          ? "bg-gray-900 text-gray-300"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-purple-500">
        Join EMG Music for Just $7!
      </h2>
      <p className="text-lg md:text-xl mb-8">
        Get unlimited music distribution, full analytics, royalty collection,
        and promo tools for a flat $7 fee—no hidden costs!
      </p>

      <div className="max-w-3xl mx-auto p-8 rounded-lg shadow-lg bg-purple-500 text-white transform hover:scale-105 transition duration-300">
        <h3 className="text-2xl font-bold mb-3">EMG Music Plan</h3>
        <p className="text-xl font-semibold mb-4">$7 One-Time Payment</p>

        <ul className="space-y-2 text-lg text-gray-200">
          <li>
            <FaCheck className="inline mr-2 text-green-300" /> Unlimited Song
            Uploads
          </li>
          <li>
            <FaCheck className="inline mr-2 text-green-300" /> Full Streaming &
            Earnings Dashboard
          </li>
          <li>
            <FaCheck className="inline mr-2 text-green-300" /> Global Music
            Distribution
          </li>
          <li>
            <FaCheck className="inline mr-2 text-green-300" /> Royalty
            Collection & Monetization
          </li>
          <li>
            <FaCheck className="inline mr-2 text-green-300" /> Playlist & Radio
            Promotion
          </li>
          <li>
            <FaCheck className="inline mr-2 text-green-300" /> Artist Support &
            Branding
          </li>
        </ul>

        <button
          className="mt-6 px-6 py-3 bg-black text-white rounded-full text-lg font-semibold hover:bg-gray-800 transition duration-300"
          onClick={() => navigate("/signup")}
        >
          Get Started for $7
        </button>
      </div>
    </section>
  );
};

export default Pricing;
