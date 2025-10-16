import React from "react";
import "../assets/css/bootstrap.min.css";
import "../assets/css/tiny-slider.css";
import "../assets/css/style.css";
import "../assets/js/bootstrap.bundle.min.js";
import "../assets/js/tiny-slider.js";
import "../assets/js/custom.js";

import Header from "../components/partials/Header.jsx";

import af1Img from "../assets/images/af1.png";
import whyChooseUsImg from "../assets/images/why-choose.jpg";
import person1 from "../assets/images/person_1.jpg";
import person2 from "../assets/images/person_2.jpg";
import person3 from "../assets/images/person_3.jpg";
import person4 from "../assets/images/person_4.jpg";
import truckIcon from "../assets/images/truck.svg";
import bagIcon from "../assets/images/bag.svg";
import supportIcon from "../assets/images/support.svg";
import returnIcon from "../assets/images/return.svg";

const About = () => {
  const features = [
    { img: truckIcon, title: "Fast & Free Shipping" },
    { img: bagIcon, title: "Easy to Shop" },
    { img: supportIcon, title: "24/7 Support" },
    { img: returnIcon, title: "Hassle Free Returns" },
  ];

  const teamMembers = [
    { name: "Lawson Arnold", img: person1 },
    { name: "Jeremy Walker", img: person2 },
    { name: "Patrik White", img: person3 },
    { name: "Kathryn Ryan", img: person4 },
  ];

  return (
    <>
      <Header activePage="about" />

      {/* Hero Section */}
      <div className="hero">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-5">
              <div className="intro-excerpt">
                <h1>About Us</h1>
                <p className="mb-4">
                  Donec vitae odio quis nisl dapibus malesuada. Nullam ac
                  aliquet velit. Aliquam vulputate velit imperdiet dolor tempor
                  tristique.
                </p>
                <p>
                  <a href="/" className="btn btn-secondary me-2">
                    Shop Now
                  </a>
                  <a href="/" className="btn btn-white-outline">
                    Explore
                  </a>
                </p>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="hero-img-wrap">
                <img src={af1Img} alt="Couch" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="why-choose-section">
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-lg-6">
              <h2 className="section-title">Why Choose Us</h2>
              <p>
                ShoeFit is the first application in Vietnam that combines AI and 3D technology to help users virtually try on real shoes, choose the right size, and suggest personalized outfits – bringing a confident, convenient, and stylish online shoe shopping experience.
              </p>

              <div className="row my-5">
                {features.map((feature, i) => (
                  <div key={i} className="col-6 col-md-6">
                    <div className="feature">
                      <div className="icon">
                        <img
                          src={feature.img}
                          alt={feature.title}
                          className="img-fluid"
                        />
                      </div>
                      <h3>{feature.title}</h3>
                      <p>
                        Donec vitae odio quis nisl dapibus malesuada. Nullam ac
                        aliquet velit. Aliquam vulputate.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-5">
              <div className="img-wrap">
                <img
                  src={whyChooseUsImg}
                  alt="Why Choose Us"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="untree_co-section">
        <div className="container">
          <div className="row mb-5">
            <div className="col-lg-5 mx-auto text-center">
              <h2 className="section-title">Our Team</h2>
            </div>
          </div>

          <div className="row">
            {teamMembers.map((member, i) => (
              <div key={i} className="col-12 col-md-6 col-lg-3 mb-5 mb-md-0">
                <img
                  src={member.img}
                  alt={member.name}
                  className="img-fluid mb-5"
                />
                <h3>
                  <a href="/">
                    <span>{member.name}</span>
                  </a>
                </h3>
                <span className="d-block position mb-4">CEO, Founder, Atty.</span>
                <p>
                  Separated they live in Bookmarksgrove right at the coast of
                  the Semantics, a large language ocean.
                </p>
                <p className="mb-0">
                  <a href="/" className="more dark">
                    Learn More <span className="icon-arrow_forward"></span>
                  </a>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
