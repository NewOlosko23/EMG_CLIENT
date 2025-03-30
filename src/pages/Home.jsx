import React from "react";
import Hero from "./Home/Hero";
import About from "./Home/About";
import Services from "./Home/Services";
import Platform from "./Home/Platform";
import Pricing from "./Home/Pricing";
import Presence from "./Home/Presence";
import Testimonials from "./Home/Testimonials";
import CTA from "./Home/CTA";
import Newsletter from "./Home/Newsletter";

const Home = () => {
  return (
    <div>
      <Hero />
      <About />
      <Platform />
      <Services />
      <Pricing />
      <Presence />
      <Testimonials />
      <CTA />
      <Newsletter />
    </div>
  );
};

export default Home;
