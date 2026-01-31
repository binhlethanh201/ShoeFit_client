import React from "react";
import { Link } from "react-router-dom";

const SearchProductCard = ({ product }) => {
  const isNew =
    product.createdDate &&
    (new Date() - new Date(product.createdDate)) / (1000 * 3600 * 24) < 30;

  return (
    <Link to={`/product/${product.id}`} className="p-card text-decoration-none">
      <div className="p-img-box">
        {isNew && <span className="badge-new">Mới</span>}
        {product.image && !product.image.includes("example.com") ? (
          <img src={product.image} alt={product.title} loading="lazy" />
        ) : (
          <div className="d-flex align-items-center justify-content-center h-100 bg-light text-muted">
            <i className="fas fa-image fa-2x"></i>
          </div>
        )}
      </div>

      <div className="p-info">
        <div className="category d-flex justify-content-between">
          <span>{product.brand || "Shoes"}</span>
          <span
            className="text-muted font-monospace"
            style={{ fontSize: "10px" }}
          >
            {product.sku}
          </span>
        </div>

        <h3
          className="text-truncate"
          style={{ fontSize: "15px", margin: "5px 0" }}
        >
          {product.title}
        </h3>
        <div className="product-card-footer d-flex justify-content-between align-items-center mt-2">
          <div
            className="size-info"
            style={{ fontSize: "12px", color: "#666" }}
          >
            <i className="fas fa-ruler-horizontal me-1"></i> Size:{" "}
            {product.size || "N/A"}
          </div>
          <div className="text-dark fw-bold" style={{ fontSize: "13px" }}>
            Xem chi tiết
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchProductCard;
