import React from "react";
import { Link } from "react-router-dom";

const ProductRelated = ({ styleHints, relatedProducts }) => {
  return (
    <>
      <div className="bottom-section">
        <span className="block-title">Phối đồ cực chất</span>
        <div className="h-scroll-view">
          {styleHints && styleHints.length > 0 ? (
            styleHints.map((style, index) => {
              const gender = style.gender || "MEN";
              const occasion = style.occasion || "everyday";
              const styleId = `${gender}_${occasion}_${index + 1}`;
              const shoeId = style.shoeId || "";
              const detailLink = `/styledetail/${styleId}?gender=${gender}&occasion=${occasion}&shoeId=${shoeId}`;

              return (
                <Link
                  to={detailLink}
                  key={index}
                  className="outfit-card text-decoration-none"
                >
                  <img src={style.src} alt={`Outfit ${index}`} loading="lazy" />
                  <div className="user-tag">@shoefit.style</div>
                </Link>
              );
            })
          ) : (
            <p className="text-muted">
              Chưa có gợi ý phối đồ cho sản phẩm này.
            </p>
          )}
        </div>
      </div>

      <div className="bottom-section related-container">
        <span className="block-title">Sản phẩm tương tự</span>
        <div className="h-scroll-view">
          {relatedProducts &&
            relatedProducts.map((p) => (
              <Link
                to={`/product/${p.id}`}
                key={p.id}
                className="related-card text-decoration-none"
              >
                <div className="related-img-box">
                  <img src={p.image} alt={p.title} loading="lazy" />
                </div>
                <div className="related-info">
                  <h4 className="related-name">{p.title}</h4>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
};

export default ProductRelated;
