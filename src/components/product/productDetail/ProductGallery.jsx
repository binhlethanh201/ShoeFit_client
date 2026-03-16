import React, { useState } from "react";

const ProductGallery = ({ images, onToggleWishlist, isInWishlist }) => {
  const [activeImg, setActiveImg] = useState(
    images && images.length > 0 ? images[0] : "",
  );

  if (!images || images.length === 0) return null;

  return (
    <div className="gallery-wrapper">
      <div className="thumb-list">
        {images.map((img, index) => (
          <div
            key={index}
            className={`thumb ${activeImg === img ? "active" : ""}`}
            onClick={() => setActiveImg(img)}
          >
            <img src={img} alt={`Thumb ${index}`} loading="lazy" />
          </div>
        ))}
      </div>
      <div className="main-img">
        <img src={activeImg} alt="Main Product" />
        <div
          className="wishlist-btn"
          onClick={onToggleWishlist}
          style={{
            color: isInWishlist ? "#ff4757" : "var(--text-heading)",
          }}
        >
          <i className={isInWishlist ? "fas fa-heart" : "far fa-heart"}></i>
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
