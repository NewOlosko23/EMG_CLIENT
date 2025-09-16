import React from "react";
import Hero from "./Home/Hero";
import About from "./Home/About";
import Platform from "./Home/Platform";
import Services from "./Home/Services";
import Pricing from "./Home/Pricing";
import Presence from "./Home/Presence";
import Newsletter from "./Home/Newsletter";

const Home = () => {
  return (
    <div className="overflow-x-hidden">
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
