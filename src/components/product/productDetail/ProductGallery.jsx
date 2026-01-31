import React, { useState } from "react";

const ProductGallery = ({ images, onAddToWishlist }) => {
  const [activeImg, setActiveImg] = useState(images[0]);

  return (
    <div className="gallery-wrapper">
      <div className="thumb-list">
        {images.map((img, index) => (
          <div
            key={index}
            className={`thumb ${activeImg === img ? "active" : ""}`}
            onClick={() => setActiveImg(img)}
          >
            <img src={img} alt={`Thumb ${index}`} />
          </div>
        ))}
      </div>
      <div className="main-img">
        <img src={activeImg} alt="Main Product" />
        <div
          onClick={onAddToWishlist}
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            fontSize: "25px",
            cursor: "pointer",
            zIndex: 10,
            color: "#ff4757",
          }}
        >
          <i className="far fa-heart"></i>
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
