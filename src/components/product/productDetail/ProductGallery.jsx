import React, { useState } from "react";

const ProductGallery = ({ images, onAddToWishlist }) => {
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
        <div className="wishlist-btn" onClick={onAddToWishlist}>
          <i className="far fa-heart"></i>
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
