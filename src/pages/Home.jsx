import React from "react";
import { Link } from "react-router-dom";
import { servicesData, productsData, blogsData } from "../data/mockData";
import { useTranslation } from "react-i18next";

// Import Images
import heroImg from "../assets/images/Effects/des_hero.png";
import crossIcon from "../assets/images/Effects/cross.svg";

const Home = () => {
  const { t } = useTranslation();
  return (
    <>
      {/* Hero Section */}
      <img src={heroImg} alt="ShoeFit Hero" className="w-100" />

      {/* Services Section */}
      <div className="product-section mt-5">
        <div className="container">
          <div className="row">
            {servicesData.map((item) => (
              <div
                key={item.id}
                className="col-12 col-md-6 col-lg-4 mb-5 text-center d-flex flex-column align-items-center"
              >
                <div className="product-item product-item-full-image">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="img-fluid product-thumbnail mb-4"
                  />
                  <Link to={item.link} className="btn btn-blue">
                    {t('home.try_now')}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Section */}
      <div className="untree_co-section product-section before-footer-section">
        <div className="container">
          <div className="row mb-2 align-items-center">
            <div className="col-md-6">
              <h2 className="section-title">{t('home.trending')}</h2>
            </div>
            <div className="col-md-6 text-start text-md-end">
              <Link to="/collection" className="more">
                {t('home.view_all_products')}
              </Link>
            </div>
          </div>

          <div className="row" id="product-list">
            {productsData.slice(0, 4).map((product) => (
              <div key={product.id} className="col-12 col-md-4 col-lg-3 mb-5">
                <Link to={`/product/${product.id}`} className="product-item">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="img-fluid product-thumbnail"
                  />
                  <h3 className="product-title">{product.title}</h3>
                </Link>
                <span className="icon-cross">
                  <img
                    src={crossIcon}
                    alt="Add to cart"
                    className="img-fluid"
                  />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Section */}
      <div className="blog-section">
        <div className="container">
          <div className="row mb-2 align-items-center">
            <div className="col-md-6">
              <h2 className="section-title">{t('home.from_journal')}</h2>
            </div>
            <div className="col-md-6 text-start text-md-end">
              <Link to="/blog" className="more">
               {t('home.view_all_posts')}
              </Link>
            </div>
          </div>
          <div className="row">
            {blogsData.map((blog) => (
              <div
                key={blog.id}
                className="col-12 col-sm-6 col-md-4 mb-4 mb-md-0"
              >
                <div className="post-entry">
                  <Link to={blog.link} className="post-thumbnail">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="img-fluid"
                    />
                  </Link>
                  <div className="post-content-entry">
                    <h3>
                      <Link to={blog.link}>{blog.title}</Link>
                    </h3>
                    <div className="meta">
                      <span>
                        {t('home.written_by')} <Link to="#">{blog.author}</Link>
                      </span>
                      <span>
                        - {t('home.on_date')} <Link to="#">{blog.date}</Link>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
