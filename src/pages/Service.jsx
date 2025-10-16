import React from "react";
import "../assets/css/bootstrap.min.css";
import "../assets/css/tiny-slider.css";
import "../assets/css/style.css";
import "../assets/js/bootstrap.bundle.min.js";
import "../assets/js/tiny-slider.js";
import "../assets/js/custom.js";

import Header from "../components/partials/Header.jsx";

import af1Img from "../assets/images/jordan4cementwhite.png";
import tryon2dImg from "../assets/images/tryon5-grid.jpg";
import tryonARImg from "../assets/images/tryon4-grid.jpg";
import styleAdvisorImg from "../assets/images/tryon3-grid.png"; 

const Service = () => {
  const services = [
    {
      title: "Try-On AI 2D",
      description:
        "Upload your photo and instantly see a realistic image of yourself wearing the shoes you choose — powered by AI rendering.",
      img: tryon2dImg,
      link: "/tryon2d",
    },
    {
      title: "AR Virtual Try-On",
      description:
        "Use your camera for a real-time 3D experience. Move your feet, change angles, and visualize every shoe in perfect scale and fit.",
      img: tryonARImg,
      link: "/tryonAR",
    },
    {
      title: "Style Advisor",
      description:
        "Let AI help you style your outfit. Receive recommendations for shoes, outfits, and accessories tailored to your preferences.",
      img: styleAdvisorImg,
      link: "/styleadvisor",
    },
  ];

  return (
    <>
      <Header activePage="service" />

      {/* Hero Section */}
      <div className="hero">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-5">
              <div className="intro-excerpt">
                <h1>Our Services</h1>
                <p className="mb-4">
                  Experience a smarter way to shop with ShoeFit’s 3-in-1
                  technology — blending AI and AR to personalize your footwear journey.
                </p>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="hero-img-wrap">
                <img src={af1Img} alt="Service Banner" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="product-section pt-5 pb-5 mt-5 mb-3">
        <div className="container">
          <div className="row">
            {services.map((service, i) => (
              <div
                key={i}
                className="col-12 col-md-6 col-lg-4 mb-5 text-center d-flex flex-column align-items-center"
              >
                <div className="product-item">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="img-fluid product-thumbnail mb-4"
                  />
                  <h2 className="mb-3 section-title">{service.title}</h2>
                  <p className="mb-4">{service.description}</p>
                  <a href={service.link} className="btn btn-dark">
                    Try Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Service;
