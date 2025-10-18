import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/bootstrap.min.css";
import "../assets/css/tiny-slider.css";
import "../assets/css/style.css";
import Header from "../components/partials/Header.jsx";
import cross from "../assets/images/cross.svg";

const Collection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://shoefit-backend.onrender.com/api/products") //ở trong laptop cá nhân sẽ thay đổi thành 'http://localhost:9999/api/products'
      .then((res) => res.json())
      .then((data) => setProducts(Array.isArray(data) ? data : data.products || []))
      .catch((err) => console.error("Error fetching products:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <>
        <Header activePage="collection" />
        <div className="text-center mt-5">Loading products...</div>
      </>
    );
  }

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
            {products.length === 0 ? (
              <div className="text-center">No products found.</div>
            ) : (
              products.map((product, i) => (
                <div key={product._id || i} className="col-12 col-md-4 col-lg-3 mb-5">
                  <a
                    href={product.external_link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="product-item"
                  >
                    <Link to={`/collection/${product._id}`} className="product-item">
                      <img
                        src={
                          product.image_url ||
                          "https://via.placeholder.com/300x300?text=No+Image"
                        }
                        alt={product.name}
                        className="img-fluid product-thumbnail"
                      />
                      <h3 className="product-title">{product.name}</h3>
                    </Link>

                    <p className="text-muted small">{product.description}</p>

                    <span className="icon-cross">
                      <img src={cross} alt="Add to cart" className="img-fluid" />
                    </span>
                  </a>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Collection;
