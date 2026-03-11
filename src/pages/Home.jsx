import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import HeroSection from "../components/home/Main/HeroSection";
import ServiceSection from "../components/home/Main/ServiceSection";
import FeaturedProducts from "../components/home/Main/FeaturedProducts";
import BlogSection from "../components/home/Main/BlogSection";
import InstagramSection from "../components/home/Main/InstagramSection";
import DailyOutfitSection from "../components/home/Main/DailyOutfitSection";

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: true,
      easing: "ease-out-quart",
      offset: 150,
    });
  }, []);

  return (
    <div className="home-page-wrapper">
      <div data-aos="zoom-out" data-aos-duration="1500">
        <HeroSection />
      </div>

      <div data-aos="fade-up">
        <ServiceSection />
      </div>

      <div data-aos="fade-up">
        <FeaturedProducts />
      </div>

      <div data-aos="fade-up">
        <InstagramSection />
      </div>

      <div data-aos="fade-up">
        <DailyOutfitSection />
      </div>

      <div data-aos="fade-up">
        <BlogSection />
      </div>
    </div>
  );
};

export default Home;
