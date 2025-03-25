import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "John Doe",
    country: "Kenya",
    feedback: "EMG Music helped me reach a global audience. Highly recommend!",
  },
  {
    name: "Aisha Mohammed",
    country: "Uganda",
    feedback: "The best platform for artists who want to scale their music.",
  },
  {
    name: "Michael Banda",
    country: "Tanzania",
    feedback:
      "I got my music on Spotify and Apple Music so fast. Amazing service!",
  },
  {
    name: "Sarah Mutua",
    country: "Rwanda",
    feedback:
      "Professional and efficient! My music career has grown tremendously.",
  },
];

// Function to generate avatar with first letter of name
const generateAvatar = (name) => {
  return name.charAt(0).toUpperCase();
};

const Testimonials = ({ theme }) => {
  return (
    <section
      className={`py-12 px-6 text-center transition-all ${
        theme === "dark"
          ? "bg-gray-900 text-gray-300"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-purple-600">
        What Our Artists Say
      </h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        loop={true}
        autoplay={{ delay: 4000 }}
        modules={[Autoplay]}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="w-full max-w-4xl mx-auto"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index} className="p-6">
            <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-purple-500 text-white text-2xl font-bold">
                {generateAvatar(testimonial.name)}
              </div>
              <h3 className="mt-4 font-semibold">{testimonial.name}</h3>
              <p className="text-sm text-gray-500">{testimonial.country}</p>
              <FaQuoteLeft className="text-purple-500 text-2xl my-2" />
              <p className="text-gray-600 italic">{testimonial.feedback}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;
