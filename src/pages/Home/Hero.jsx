import React from "react";
import Bg from "../../assets/emg2.jpg";
import { Link } from "react-router-dom";

const Hero = ({ theme }) => {
  return (
    <section
      className={`w-full flex flex-col items-center justify-center text-center transition-all duration-300 px-4 sm:px-6 md:px-8 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-purple-50 text-gray-900"
      }`}
      style={{
        backgroundImage: `url(${Bg})`,
        backgroundSize: "cover", // Ensures the image covers the entire section
        backgroundPosition: "center", // Centers the image
        backgroundRepeat: "no-repeat", // Prevents repetition
        width: "100%",
        minHeight: "75vh", // Ensures the section takes up most of the viewport
      }}
    >
      <h1
        className={`font-extrabold leading-tight drop-shadow-lg ${
          theme === "dark" ? "text-white" : "text-purple-600"
        } text-3xl sm:text-4xl md:text-5xl lg:text-6xl`}
      >
        Your Music, Global Audience
      </h1>
      <p
        className={`mt-4 max-w-2xl ${
          theme === "dark" ? "text-gray-300" : "text-gray-200"
        } text-sm sm:text-base md:text-lg lg:text-xl`}
      >
        EMG is your gateway to worldwide music distribution. Join us to reach
        millions of listeners, monetize your tracks, and grow your brand.
      </p>
      <Link to="/signup">
        <button className="mt-6 cursor-pointer px-6 py-3 text-lg font-semibold text-white rounded-full bg-gradient-to-r from-purple-600 to-purple-800 shadow-lg hover:scale-105 transition-transform">
          Get Started
        </button>
      </Link>
    </section>
  );
};

export default Hero;
