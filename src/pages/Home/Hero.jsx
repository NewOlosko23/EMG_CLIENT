import React from "react";

const Hero = ({ theme }) => {
  return (
    <section
      className={`w-full flex flex-col items-center justify-center text-center transition-all duration-300 px-4 sm:px-6 md:px-8 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-purple-50 text-gray-900"
      }`}
      style={{
        minHeight: "50vh", // Default for small screens
        minHeight: "65vh", // Medium screens
        minHeight: "75vh", // Large screens
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
          theme === "dark" ? "text-gray-300" : "text-gray-700"
        } text-sm sm:text-base md:text-lg lg:text-xl`}
      >
        EMG is your gateway to worldwide music distribution. Join us to reach
        millions of listeners, monetize your tracks, and grow your brand.
      </p>
      <button
        className={`mt-6 rounded-lg font-semibold transition-all duration-300 focus:outline-none shadow-lg ${
          theme === "dark"
            ? "bg-purple-700 hover:bg-purple-600 text-white"
            : "bg-blue-600 hover:bg-blue-500 text-white"
        } text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4`}
      >
        Get Started Now
      </button>
    </section>
  );
};

export default Hero;
