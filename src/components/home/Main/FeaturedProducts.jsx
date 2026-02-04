import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import productService from "../../../services/product/productService";
import crossIcon from "../../../assets/images/Effects/cross.svg";

const FeaturedProducts = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      setLoading(true);
      try {
        const data = await productService.getProducts();
        const newestProducts = data
          .sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate))
          .slice(0, 4);

        setProducts(newestProducts);
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm nổi bật:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

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
          {products.map((product) => (
            <div key={product.id} className="col-12 col-md-4 col-lg-3 mb-5">
              <Link to={`/product/${product.id}`} className="product-item">
                <img
                  src={product.image}
                  alt={product.title}
                  className="img-fluid product-thumbnail"
                  style={{ aspectRatio: "1/1", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.src = "https://placehold.co/600x600?text=ShoeFit";
                  }}
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
