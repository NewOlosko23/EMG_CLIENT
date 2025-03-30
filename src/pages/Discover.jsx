import React from "react";
import Thumbnail from "../assets/emg1.jpg"; 
import ads from "../assets/ad.jpeg"
import ep1 from "../assets/ep1.jpeg"
import ep2 from "../assets/ep2.jpeg"


const latestNews = [
  {
    title: "EMG Signs New Distribution Deal",
    summary: "We've partnered with top streaming platforms to expand reach.",
    date: "March 28, 2025",
    cover: ads,
  },
  {
    title: "Exclusive Interview with Justus Klein",
    summary: "Our CEO shares insights on the future of music distribution.",
    date: "March 25, 2025",
    cover: Thumbnail,
  },
];

const latestMusic = [
  {
    title: "Beyond the Stars",
    artist: "Blessing Official",
    cover: ep1,
    releaseDate: "March 20, 2025",
  },
  {
    title: "The sun of SL",
    artist: "Ryan Mwesigwa",
    cover: ep2,
    releaseDate: "March 18, 2025",
  },
];

const latestInfo = [
  {
    title: "New Feature: Real-Time Streaming Stats",
    text: "Artists can now track their music streams in real-time, giving them insights into their audience engagement and helping them plan better music strategies.",
  },
  {
    title: "EMG Mobile App Launching Next Month",
    text: "We're thrilled to announce that EMG's official mobile app is launching soon! Get ready to manage your music, track earnings, and distribute seamlessly on the go.",
  },
  {
    title: "Monetization Tools Coming Soon",
    text: "We are working on new monetization features, allowing artists to earn directly through exclusive content sales and fan subscriptions.",
  },
];

// News Card Component
const NewsCard = ({ title, summary, date, cover }) => (
  <div className="bg-white shadow-md rounded-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all">
    <img src={cover} alt={title} className="w-full h-56 object-cover" />
    <div className="p-6">
      <h4 className="text-xl font-semibold text-purple-700">{title}</h4>
      <p className="text-gray-600 mt-2">{summary}</p>
      <p className="text-sm text-gray-400 mt-3">{date}</p>
    </div>
  </div>
);

// Music Card Component
const MusicCard = ({ title, artist, cover, releaseDate }) => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all">
    <img src={cover} alt={title} className="w-full h-56 object-cover" />
    <div className="p-4">
      <h4 className="text-lg font-semibold text-purple-700">{title}</h4>
      <p className="text-gray-600">{artist}</p>
      <p className="text-sm text-gray-400 mt-1">Released: {releaseDate}</p>
    </div>
  </div>
);

// Latest Info Card
const InfoCard = ({ title, text }) => (
  <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-all">
    <h4 className="text-lg font-semibold text-purple-700">{title}</h4>
    <p className="text-gray-600 mt-2">{text}</p>
  </div>
);

const Discover = () => {
  return (
    <section className="py-16 px-8 mt-16 max-w-6xl mx-auto">
      {/* Page Title */}
      <div className="text-center mb-12">
        <h2 className="text-5xl font-bold text-purple-700">Discover</h2>
        <p className="text-gray-600 mt-2 text-lg">
          Stay updated with the latest in music & news
        </p>
      </div>

      {/* Latest News Section */}
      <div className="mb-16">
        <h3 className="text-3xl font-semibold text-purple-700 mb-6">
          Latest News
        </h3>
        <div className="grid md:grid-cols-2 gap-8">
          {latestNews.map((news, index) => (
            <NewsCard key={index} {...news} />
          ))}
        </div>
      </div>

      {/* Latest Music Section */}
      <div className="mb-16">
        <h3 className="text-3xl font-semibold text-purple-700 mb-6">
          Latest Music
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestMusic.map((music, index) => (
            <MusicCard key={index} {...music} />
          ))}
        </div>
      </div>

      {/* Latest Info Section */}
      <div className="mb-16">
        <h3 className="text-3xl font-semibold text-purple-700 mb-6">
          Latest Updates
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestInfo.map((info, index) => (
            <InfoCard key={index} {...info} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Discover;
