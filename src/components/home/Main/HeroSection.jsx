import React from "react";
import heroImg from "../../../assets/images/Effects/des_hero.png";

const HeroSection = () => {
  return (
    <section className="hero-section">
      <img src={heroImg} alt="ShoeFit Hero" className="w-100" />
    </section>
  );
};

export default HeroSection;
