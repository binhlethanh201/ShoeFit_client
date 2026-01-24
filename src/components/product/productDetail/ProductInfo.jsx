import React, { useState } from "react";
import { Link } from "react-router-dom";

const ProductInfo = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(0);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="product-info-box">
      <div style={{ fontSize: "12px", color: "#666", marginBottom: "5px" }}>
        NEW ARRIVAL
      </div>
      <h1 className="p-title">{product.title}</h1>

      <div className="p-price">{formatPrice(product.price)}</div>

      <div className="selector-group">
        <span className="lbl">Màu sắc</span>
        <div className="color-list">
          {product.colors &&
            product.colors.map((color, index) => (
              <div
                key={index}
                className={`c-item ${
                  selectedColor === index ? "selected" : ""
                }`}
                onClick={() => setSelectedColor(index)}
              >
                <div
                  className="c-in"
                  style={{
                    background: color,
                    border: color === "#fff" ? "1px solid #ddd" : "none",
                  }}
                ></div>
              </div>
            ))}
        </div>
      </div>

      <div className="selector-group">
        <span className="lbl">Kích cỡ (EU)</span>
        <div className="size-grid">
          {product.sizes &&
            product.sizes.map((size) => (
              <div
                key={size}
                className={`s-item ${selectedSize === size ? "selected" : ""}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </div>
            ))}
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            alert("Chức năng hướng dẫn chọn size đang phát triển");
          }}
          style={{
            fontSize: "12px",
            textDecoration: "underline",
            marginTop: "8px",
            display: "block",
            background: "transparent",
            border: "none",
            padding: 0,
            cursor: "pointer",
            color: "inherit",
            textAlign: "left",
          }}
        >
          Hướng dẫn chọn size
        </button>
      </div>

      <div className="action-btns">
        <button className="btn-pd btn-pd-black">THÊM VÀO GIỎ</button>
        <Link
          to="/tryon2d"
          className="btn-pd btn-pd-outline text-decoration-none"
        >
          <i className="fas fa-camera me-2"></i> THỬ GIÀY AI (Try-On)
        </Link>
      </div>

      <div
        style={{
          marginTop: "20px",
          fontSize: "12px",
          color: "#555",
          lineHeight: "1.5",
        }}
      >
        <i className="fas fa-check-circle me-1"></i> Miễn phí giao hàng toàn
        quốc
        <br />
        <i className="fas fa-undo me-1"></i> Đổi trả trong vòng 30 ngày
      </div>
    </div>
  );
};

export default ProductInfo;
