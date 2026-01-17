import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { productsData } from "../../../data/mockData";
import crossIcon from "../../../assets/images/Effects/cross.svg";

const FeaturedProducts = () => {
  const { t } = useTranslation();

  return (
    <div className="untree_co-section product-section before-footer-section">
      <div className="container">
        <div className="row mb-2 align-items-center">
          <div className="col-md-6">
            <h2 className="section-title">{t("home.trending")}</h2>
          </div>
          <div className="col-md-6 text-start text-md-end">
            <Link to="/collection" className="more">
              {t("home.view_all_products")}
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
