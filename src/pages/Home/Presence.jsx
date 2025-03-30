import React from "react";
import { FiMapPin } from "react-icons/fi";
import Map from "../../assets/map.jpeg";

const countries = [
  { name: "Kenya", flag: "🇰🇪" },
  { name: "Uganda", flag: "🇺🇬" },
  { name: "Tanzania", flag: "🇹🇿" },
  { name: "Rwanda", flag: "🇷🇼" },
  { name: "Burundi", flag: "🇧🇮" },
  { name: "Zambia", flag: "🇿🇲" },
  { name: "Sierra Leone", flag: "🇸🇱" },
  { name: "Eswatini", flag: "🇸🇿" },
];

const Presence = ({ theme }) => {
  return (
    <section
      className={`py-12 px-6 text-center transition-all relative ${
        theme === "dark" ? "text-gray-300" : "text-gray-800"
      }`}
      style={{
        backgroundImage: `url(${Map})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-opacity-50"></div>

      <div className="relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-purple-600">
          Our Presence
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-900 mb-8">
          EMG Music empowers artists across Africa, helping them distribute
          their music globally from these locations.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {countries.map((country, index) => (
            <div
              key={index}
              className={`flex flex-col cursor-pointer items-center p-6 rounded-2xl shadow-lg backdrop-blur-md transition-all transform hover:scale-105 ${
                theme === "dark"
                  ? "bg-transparent border border-gray-600"
                  : "bg-white"
              }`}
            >
              <div className="text-5xl">{country.flag}</div>
              <p className="mt-3 text-xl font-semibold">{country.name}</p>
              <FiMapPin className="mt-2 text-purple-600 text-2xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Presence;
