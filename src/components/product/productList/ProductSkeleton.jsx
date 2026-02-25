import React from "react";

const ProductSkeleton = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-box skeleton-img"></div>
      <div className="skeleton-info">
        <div className="skeleton-box skeleton-text"></div>
        <div className="skeleton-box skeleton-title"></div>
        <div className="skeleton-box skeleton-price"></div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
