import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import {
  FaSpotify,
  FaGooglePlay,
  FaDeezer,
  FaSoundcloud,
  FaYoutube,
  FaAmazon,
} from "react-icons/fa";
import { SiTidal, SiApplemusic } from "react-icons/si";

const platforms = [
  { name: "Spotify", icon: <FaSpotify className="w-16 h-16 text-green-500" /> },
  {
    name: "Apple Music",
    icon: <SiApplemusic className="w-16 h-16 text-red-500" />,
  },
  {
    name: "Google Play Music",
    icon: <FaGooglePlay className="w-16 h-16 text-orange-500" />,
  },
  { name: "Tidal", icon: <SiTidal className="w-16 h-16 text-blue-500" /> },
  { name: "Deezer", icon: <FaDeezer className="w-16 h-16 text-purple-500" /> },
  {
    name: "SoundCloud",
    icon: <FaSoundcloud className="w-16 h-16 text-orange-600" />,
  },
  {
    name: "YouTube Music",
    icon: <FaYoutube className="w-16 h-16 text-red-500" />,
  },
  {
    name: "Amazon Music",
    icon: <FaAmazon className="w-16 h-16 text-yellow-600" />,
  },
];

const Platform = ({ theme }) => {
  return (
    <section
      className={`py-12 px-6 text-center transition-all ${
        theme === "dark"
          ? "bg-gray-900 text-gray-300"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-purple-500 pb-5">
        Get Your Music On
      </h2>
      <Swiper
        slidesPerView={3}
        spaceBetween={20}
        loop={true}
        autoplay={{ delay: 2000 }}
        modules={[Autoplay]}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
        className="max-w-6xl"
      >
        {platforms.map((platform, index) => (
          <SwiperSlide
            key={index}
            className="flex flex-col items-center justify-center gap-2"
          >
            {platform.icon}
            {/*} <p className="text-sm font-medium">{platform.name}</p>*/}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Platform;
