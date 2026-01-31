import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductInfo = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const navigate = useNavigate();

  const formatPrice = (price) => {
    if (!price) return "Liên hệ";
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleTryOnNow = (e) => {
    e.preventDefault();
    navigate("/tryon2d", {
      state: {
        selectedShoeFromDetail: {
          id: product.id,
          name: product.title,
          imageUrl: product.image,
          sku: product.sku,
        },
      },
    });
  };

  return (
    <div className="product-info-box">
      <div style={{ fontSize: "12px", color: "#666", marginBottom: "5px" }}>
        NEW ARRIVAL
      </div>
      <h1 className="p-title">{product.title}</h1>
      <div className="p-price">{formatPrice(product.price)}</div>

      <div className="selector-group">
        <span className="lbl">Kích cỡ (EU)</span>
        <div className="size-grid">
          {product.sizes?.map((size) => (
            <div
              key={size}
              className={`s-item ${selectedSize === size ? "selected" : ""}`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </div>
          ))}
        </div>
      </div>

      <div className="action-btns">
        <button className="btn-pd btn-pd-black">THÊM VÀO GIỎ</button>
        <button
          onClick={handleTryOnNow}
          className="btn-pd btn-pd-outline w-100 mt-2"
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <i className="fas fa-camera me-2"></i> THỬ GIÀY AI (Try-On)
        </button>
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
