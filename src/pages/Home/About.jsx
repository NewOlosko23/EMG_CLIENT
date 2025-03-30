import React from "react";

const About = ({ theme }) => {
  return (
    <section
      id="about"
      className={`py-12 px-6 md:px-16 text-center transition-all duration-300 ${
        theme === "dark"
          ? "bg-gray-900 text-gray-300"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-purple-500">
          About EMG Music
        </h2>
        <p className="text-lg md:text-xl leading-relaxed">
          EMG Music is a leading music distribution empire built to help artists
          scale their music to a continental level. We provide a seamless
          platform for independent artists and labels to distribute, promote,
          and monetize their music across global streaming services.
        </p>
        <p className="mt-4 text-lg md:text-xl">
          Whether you're an upcoming artist or an established name, EMG Music
          ensures your sound reaches the right audience.
        </p>
      </div>
    </section>
  );
};

export default About;
