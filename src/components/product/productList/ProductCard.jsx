import React from "react";
import { Link } from "react-router-dom";

const SearchProductCard = ({ product }) => {
  const formatPrice = (price) => {
    if (!price) return "Liên hệ";
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <Link to={`/product/${product.id}`} className="p-card text-decoration-none">
      <div className="p-img-box">
        {Math.random() > 0.7 && <span className="badge-new">Mới</span>}

        {product.image ? (
          <img src={product.image} alt={product.title} />
        ) : (
          <div style={{ color: "#ccc" }}>
            <i className="fas fa-image fa-2x"></i>
          </div>
        )}
      </div>

      <div className="p-info">
        <div className="category">Shoes</div>
        <h3>{product.title}</h3>
        <div className="price">{formatPrice(product.price)}</div>
      </div>
    </Link>
  );
};

export default SearchProductCard;
