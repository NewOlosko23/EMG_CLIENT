import React from "react";
import {
  FaMusic,
  FaChartLine,
  FaHeadphones,
  FaMoneyBillWave,
  FaBroadcastTower,
  FaGlobe,
  FaShieldAlt,
  FaStore,
} from "react-icons/fa";

const Services = ({ theme }) => {
  const services = [
    {
      title: "Global Music Distribution",
      description:
        "Get your music on Spotify, Apple Music, YouTube Music, Boomplay, Deezer, and 150+ digital stores worldwide—quickly and hassle-free.",
      icon: <FaGlobe />,
    },
    {
      title: "Streaming & Earnings Dashboard",
      description:
        "Monitor streams, downloads, and revenue in real-time with our powerful analytics dashboard. Stay in control of your success.",
      icon: <FaChartLine />,
    },
    {
      title: "Full Royalty Collection",
      description:
        "We collect and pay out royalties from streaming platforms, radio, TV, and social media (YouTube Content ID, TikTok, Facebook, Instagram).",
      icon: <FaMoneyBillWave />,
    },
    {
      title: "Playlist & Radio Promotion",
      description:
        "Boost your reach with strategic playlist placements and radio airplay. Get heard by new audiences and grow your fanbase.",
      icon: <FaBroadcastTower />,
    },
    {
      title: "Exclusive Artist Support",
      description:
        "Access expert career advice, branding support, and personalized guidance to help you stand out in the competitive music industry.",
      icon: <FaHeadphones />,
    },
    {
      title: "Content Protection & Licensing",
      description:
        "Protect your music with digital fingerprinting. We help secure rights, prevent unauthorized use, and maximize your revenue.",
      icon: <FaShieldAlt />,
    },
    {
      title: "Merch & Brand Growth",
      description:
        "Expand beyond music! We help you launch and sell branded merchandise, increasing your revenue streams and fan engagement.",
      icon: <FaStore />,
    },
    {
      title: "Empowering Independent Artists",
      description:
        "We provide transparent revenue splits, fair pricing, and a platform that gives every artist a chance to succeed—without losing ownership.",
      icon: <FaMusic />,
    },
  ];

  return (
    <section
      className={`py-12 px-6 md:px-16 transition-all duration-300 ${
        theme === "dark"
          ? "bg-gray-900 text-gray-300"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-purple-500">
          Our Services
        </h2>
        <p className="text-lg md:text-xl mb-8">
          EMG Music empowers artists with seamless music distribution, royalty
          collection, and promotional tools to maximize success.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-6 rounded-lg shadow-lg bg-white text-gray-900 flex flex-col items-center text-center transform hover:scale-105 transition duration-300"
            >
              <div className="text-5xl text-purple-500 mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="mt-3 text-sm leading-6">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
