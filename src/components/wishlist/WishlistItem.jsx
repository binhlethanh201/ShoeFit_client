import React from "react";
import { Link } from "react-router-dom";

const WishlistItem = ({ item, onRemove }) => {
  return (
    <div className="cart-item">
      <div className="c-product">
        <Link to={`/product/${item.shoeId}`}>
          <img src={item.image} className="c-img" alt={item.name} />
        </Link>
        <div className="c-info">
          <h4>
            <Link to={`/product/${item.shoeId}`}>{item.name}</Link>
          </h4>
          <div className="c-meta">
            <p
              style={{
                color: "var(--text-main)",
                margin: "4px 0 8px 0",
                display: "-webkit-box",
                WebkitLineClamp: "1",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                maxWidth: "85%",
                fontSize: "13px",
              }}
            >
              {item.description}
            </p>
            <span
              style={{
                color: "var(--text-main)",
                fontSize: "11px",
                fontWeight: "600",
                opacity: 0.6,
              }}
            >
              MÃ SP: {item.id.split("-")[0].toUpperCase()}
            </span>
          </div>
        </div>
      </div>
      <div className="desktop-only text-center">
        <Link to={`/services?shoeId=${item.shoeId}`} className="btn-tryon">
          Thử Ngay
        </Link>
      </div>
      <div
        className="c-remove desktop-only"
        onClick={() => onRemove(item.shoeId, item.name, item.id)}
        title="Xóa khỏi danh sách"
      >
        <i className="fas fa-trash-alt"></i>
      </div>
    </div>
  );
};

export default WishlistItem;
