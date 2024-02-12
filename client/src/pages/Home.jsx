import React, { useEffect } from "react";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Facts from "../sections/Facts";
import Contact from "../sections/Contact";
import Service from "../sections/Service";
import Testimonials from "../sections/Testimonials";
import Meta from "../components/Meta";

const Home = () => {
  return (
    <div>
      <Meta title="Tim Hortons | Always Fresh Coffee & Baked Goods" />

      <Hero />
      <About />
      <Facts />
      <Contact />
      <Service />
      <Testimonials />
    </div>
  );
};

export default Home;
