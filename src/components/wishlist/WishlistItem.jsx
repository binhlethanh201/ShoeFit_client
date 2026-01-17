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
      {/* Product Info */}
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

      {/*  Price  */}
      <div className="item-price desktop-only">{formatPrice(item.price)}</div>

      {/* Actions  */}
      <div className="desktop-only">
        <Link to="/services" className="btn-tryon">
          Thử Ngay
        </Link>
      </div>

      {/* Remove Button */}
      <div
        className="c-remove desktop-only"
        onClick={() => onRemove(item.id, item.name)}
        title="Xóa bỏ"
      >
        <i className="fas fa-times"></i>
      </div>

      {/* --- MOBILE LAYOUT ---
      <div className="mobile-actions d-md-none w-100">
         <div className="d-flex justify-content-between w-100 align-items-center mb-3">
             <div className="item-price">{formatPrice(item.price)}</div>
         </div>
         <Link to="/services" className="btn-tryon w-100">
            Thử Ngay
         </Link>
         <div className="c-remove d-md-none" onClick={() => onRemove(item.id, item.name)}></div>
      </div> */}
    </div>
  );
};

export default WishlistItem;
