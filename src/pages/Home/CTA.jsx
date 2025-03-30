import React from "react";
import { Link } from "react-router-dom";

const CTA = ({ theme }) => {
  return (
    <section
      className={`py-12 px-6 text-center transition-all ${
        theme === "dark"
          ? "bg-gray-900 text-gray-300"
          : "bg-purple-100 text-gray-800"
      }`}
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-purple-600">
          Ready to Take Your Music Global?
        </h2>
        <p className="mt-4 text-lg text-gray-500">
          Join EMG Music today and get your tracks on major streaming platforms
          worldwide.
        </p>
        <Link to="/signup">
          <button className="mt-6 px-6 py-3 cursor-pointer text-lg font-semibold text-white rounded-full bg-gradient-to-r from-purple-600 to-purple-800 shadow-lg hover:scale-105 transition-transform">
            Get Started
          </button>
        </Link>
      </div>
    </section>
  );
};

export default CTA;
