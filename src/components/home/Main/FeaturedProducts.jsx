import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import productService from "../../../services/product/productService";
import crossIcon from "../../../assets/images/Effects/cross.svg";

const seededRandom = (seed) => {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};

const shuffleWithSeed = (array, seed) => {
  let m = array.length,
    t,
    i;
  let currentSeed = seed;
  while (m) {
    i = Math.floor(seededRandom(currentSeed++) * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
};

const FeaturedProducts = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      setLoading(true);
      try {
        const result = await productService.getProducts("", {}, 1, 50);
        const rawItems = result.items || [];

        if (rawItems.length > 0) {
          const today = new Date();
          const dateSeed =
            today.getFullYear() * 10000 +
            (today.getMonth() + 1) * 100 +
            today.getDate();

          const randomDaily = shuffleWithSeed([...rawItems], dateSeed).slice(
            0,
            10,
          );
          setProducts(randomDaily);
        }
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm nổi bật:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.offsetWidth / 2;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (loading && products.length === 0) {
    return (
      <div className="text-center py-5">
        <div
          className="spinner-border spinner-border-sm text-secondary"
          role="status"
        ></div>
      </div>
    );
  }

  return (
    <div className="untree_co-section product-section before-footer-section position-relative mb-5">
      <style>
        {`
          .custom-slider-container {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            gap: 24px;
            padding-bottom: 20px;
            -ms-overflow-style: none;
            scrollbar-width: none;
            scroll-behavior: smooth;
          }
          .custom-slider-container::-webkit-scrollbar {
            display: none;
          }
          
          .slider-item {
            flex: 0 0 calc(25% - 18px);
            scroll-snap-align: start;
            position: relative;
          }

          .slider-btn {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 44px;
            height: 44px;
            background-color: #fff;
            border: 1px solid #ddd;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 10;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
          }
          .slider-btn:hover {
            background-color: #111;
            color: #fff;
            border-color: #111;
          }
          .slider-btn-left { left: 10px; }
          .slider-btn-right { right: 10px; }

          @media (max-width: 991px) {
            .slider-item { flex: 0 0 calc(33.333% - 16px); }
            .slider-btn { display: none; } 
          }
          @media (max-width: 768px) {
            .slider-item { flex: 0 0 calc(50% - 12px); }
          }
          @media (max-width: 576px) {
            .slider-item { flex: 0 0 calc(65% - 12px); }
          }
        `}
      </style>

      <div className="container position-relative">
        <div className="row mb-5 align-items-center">
          <div className="col-md-6">
            <h2 className="section-title">{t("home.trending")}</h2>
          </div>
          <div className="col-md-6 text-start text-md-end">
            <Link to="/collection" className="more">
              {t("home.view_all_products")}
            </Link>
          </div>
        </div>

        <button
          className="slider-btn slider-btn-left d-none d-lg-flex"
          onClick={() => scroll("left")}
        >
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
            <path
              fillRule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
            />
          </svg>
        </button>

        <button
          className="slider-btn slider-btn-right d-none d-lg-flex"
          onClick={() => scroll("right")}
        >
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
            <path
              fillRule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </button>

        <div className="custom-slider-container" ref={sliderRef}>
          {products.map((product) => (
            <div key={product.id} className="slider-item">
              <Link to={`/product/${product.id}`} className="product-item">
                <img
                  src={product.image}
                  alt={product.title}
                  className="img-fluid product-thumbnail w-100"
                  style={{
                    aspectRatio: "1/1",
                    objectFit: "cover",
                    borderRadius: "12px",
                  }}
                  onError={(e) => {
                    e.target.src = "https://placehold.co/600x600?text=ShoeFit";
                  }}
                />
                <h3 className="product-title mt-3">{product.title}</h3>
              </Link>

              <span className="icon-cross">
                <img src={crossIcon} alt="Add to cart" className="img-fluid" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
