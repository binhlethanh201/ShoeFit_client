import React from "react";
import { Link } from "react-router-dom";

const WishlistItem = ({ item, onRemove }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="cart-item">
      <div className="c-product">
        <Link to={`/product/${item.id}`}>
          <img src={item.image} className="c-img" alt={item.name} />
        </Link>
        <div className="c-info">
          <h4>
            <Link to={`/product/${item.id}`}>{item.name}</Link>
          </h4>
          <div className="c-meta">
            <span style={{ display: "block", marginBottom: "4px" }}>
              Màu sắc: {item.color || "Tiêu chuẩn"}
            </span>
            <span style={{ display: "block" }}>
              Kích cỡ: {item.size || "42"}
            </span>
            <span
              style={{
                display: "block",
                color: "#999",
                fontSize: "12px",
                marginTop: "5px",
              }}
            >
              Mã SP: {item.id.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      <div className="item-price desktop-only">{formatPrice(item.price)}</div>
      <div className="desktop-only">
        <Link to="/services" className="btn-tryon">
          Thử Ngay
        </Link>
      </div>
      <div
        className="c-remove desktop-only"
        onClick={() => onRemove(item.id, item.name)}
        title="Xóa bỏ"
      >
        <i className="fas fa-times"></i>
      </div>
    </div>
  );
};

export default WishlistItem;
