import React from "react";
import Hero from "./Home/Hero";
import About from "./Home/About";
import Platform from "./Home/Platform";
import Services from "./Home/Services";
import Pricing from "./Home/Pricing";
import Presence from "./Home/Presence";
import Newsletter from "./Home/Newsletter";
import SEO from "../components/SEO";

const Home = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "EMG Music Platform",
    "url": "https://emg-build.onrender.com/",
    "description": "The ultimate platform for independent artists to distribute music, track analytics, and monetize their content across global streaming platforms.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://emg-build.onrender.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "EMG Music Platform",
      "url": "https://emg-build.onrender.com/"
    }
  };

  return (
    <div className="overflow-x-hidden">
      <SEO 
        title="EMG Music Platform - Independent Artist Music Distribution & Analytics"
        description="Join EMG Music Platform - the ultimate destination for independent artists to distribute music, track analytics, and monetize their content across global streaming platforms."
        keywords="music distribution, independent artists, music analytics, streaming platforms, music monetization, artist platform, music upload, track analytics, music promotion, Spotify, Apple Music, YouTube Music"
        url="https://emg-build.onrender.com/"
        structuredData={structuredData}
      />
      
      {/* Hero Section - Introduction & Demo */}
      <Hero />
      
      {/* About Section - What We Do */}
      <About />
      
      {/* Platform Section - Where We Distribute */}
      <Platform />
      
      {/* Services Section - How We Help */}
      <Services />
      
      {/* Pricing Section - Main Conversion Point */}
      <Pricing />
      
      {/* Presence Section - Our Global Impact */}
      <Presence />
      
      {/* Newsletter/Footer - Stay Connected */}
      <Newsletter />
    </div>
  );
};

export default Home;
