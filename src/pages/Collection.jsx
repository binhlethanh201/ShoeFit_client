import React from "react";
import "../assets/css/bootstrap.min.css";
import "../assets/css/tiny-slider.css";
import "../assets/css/style.css";

import Header from "../components/partials/Header.jsx";

import product1 from "../assets/images/jordan4cementwhite.png";
import product2 from "../assets/images/samba.png";
import product3 from "../assets/images/af1.png";
import cross from "../assets/images/cross.svg";

const Collection = () => {
  const products = [
    { img: product3, title: "Jordan 4 Retro", price: "$50.00" },
    { img: product1, title: "Jordan 4 Retro", price: "$50.00" },
    { img: product2, title: "Adidas Samba OG", price: "$78.00" },
    { img: product3, title: "Nike Air Force 1 Low", price: "$43.00" },
    { img: product3, title: "Jordan 4 Retro", price: "$50.00" },
    { img: product1, title: "Jordan 4 Retro", price: "$50.00" },
    { img: product2, title: "Adidas Samba OG", price: "$78.00" },
    { img: product3, title: "Nike Air Force 1 Low", price: "$43.00" },
  ];

  return (
    <>
      <Header activePage="collection" />

      {/* Hero Section */}
      <div className="hero">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-5">
              <div className="intro-excerpt">
                <h1>The Most Popular Sneaker Trends Right Now</h1>
              </div>
            </div>
            <div className="col-lg-7"></div>
          </div>
        </div>
      </div>

      {/* Product Section */}
      <div className="untree_co-section product-section before-footer-section">
        <div className="container">
          <div className="row">
            {products.map((product, i) => (
              <div key={i} className="col-12 col-md-4 col-lg-3 mb-5">
                <a href="/" className="product-item">
                  <img
                    src={product.img}
                    alt={product.title}
                    className="img-fluid product-thumbnail"
                  />
                  <h3 className="product-title">{product.title}</h3>
                  <strong className="product-price">{product.price}</strong>
                  <span className="icon-cross">
                    <img src={cross} alt="Add to cart" className="img-fluid" />
                  </span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Collection;
