import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "../../../assets/css/home/partial/hero.css";

import heroImg from "../../../assets/images/Effects/des_hero.png";
import tamThangBaImg from "../../../assets/images/Effects/sukien8thang31.png";

const HeroSection = () => {
  const slides = [
    { id: 1, image: tamThangBaImg },
    { id: 2, image: heroImg },
  ];

  return (
    <section className="hero-carousel">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        effect="fade"
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        loop={true}
        speed={1000}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <img src={slide.image} alt={`ShoeFit Hero Slide ${slide.id}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSection;
