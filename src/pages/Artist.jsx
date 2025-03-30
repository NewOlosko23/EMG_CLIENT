import React from "react";
import ep1 from "../assets/ep1.jpeg";

const artists = [
  {
    name: "Maeve Kennedy",
    genre: "Pop, R&B",
    country: "Kenya",
    image: ep1,
    music: ["Beyond the Stars", "Midnight Dreams"],
  },
  {
    name: "Ryan Mwesigwa",
    genre: "Afrobeat, Hip-Hop",
    country: "Uganda",
    image: ep1,
    music: ["City Lights EP", "Jungle Fever"],
  },
  {
    name: "Zahara Mbeki",
    genre: "Jazz, Soul",
    country: "South Africa",
    image: ep1,
    music: ["Soulful Nights", "Golden Hour"],
  },
  {
    name: "Kofi Mensah",
    genre: "Highlife, Afro Fusion",
    country: "Ghana",
    image: ep1,
    music: ["African Vibes", "Heritage EP"],
  },
];

// Artist Card Component
const ArtistCard = ({ name, genre, country, image, music }) => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all">
    <img src={image} alt={name} className="w-full h-64 object-cover" />
    <div className="p-4 text-center">
      <h4 className="text-lg font-semibold text-purple-700">{name}</h4>
      <p className="text-gray-600">
        {genre} | {country}
      </p>
      <p className="text-gray-500 text-sm mt-2">
        <strong>Music:</strong> {music.join(", ")}
      </p>
    </div>
  </div>
);

const Artists = () => {
  return (
    <section className="py-16 px-8 mt-24 pt-4 max-w-6xl mx-auto">
      {/* Page Title */}
      <div className="text-center mb-12">
        <h2 className="text-5xl font-bold text-purple-700">Artists</h2>
        <p className="text-gray-600 mt-2 text-lg">
          Discover talented artists distributing their music through our
          platform.
        </p>
      </div>

      {/* Artists Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {artists.map((artist, index) => (
          <ArtistCard key={index} {...artist} />
        ))}
      </div>
    </section>
  );
};

export default Artists;
