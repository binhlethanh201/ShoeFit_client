import React from "react";

// Import Components
import HeroSection from "../components/home/Main/HeroSection";
import ServiceSection from "../components/home/Main/ServiceSection";
import FeaturedProducts from "../components/home/Main/FeaturedProducts";
import BlogSection from "../components/home/Main/BlogSection";

const Home = () => {
  return (
    <>
      <HeroSection />
      <ServiceSection />
      <FeaturedProducts />
      <BlogSection />
    </>
  );
};

export default Home;