import React from "react";
import { Link } from "react-router-dom";

const ProductRelated = ({ styleHints, relatedProducts }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

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
                  style={{ cursor: "pointer", display: "block" }}
                >
                  <img
                    src={style.src}
                    alt={`Outfit ${index}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
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

      <div
        className="bottom-section"
        style={{ border: "none", paddingTop: "20px" }}
      >
        <span className="block-title">Sản phẩm tương tự</span>
        <div className="h-scroll-view">
          {relatedProducts &&
            relatedProducts.map((p) => (
              <Link
                to={`/product/${p.id}`}
                key={p.id}
                className="outfit-card text-decoration-none text-dark"
                style={{
                  background: "#fff",
                  border: "1px solid #eee",
                  height: "auto",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    height: "150px",
                    background: "#f9f9f9",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    style={{
                      objectFit: "contain",
                      width: "80%",
                      height: "80%",
                    }}
                  />
                </div>
                <div style={{ padding: "10px" }}>
                  <div
                    style={{
                      fontWeight: "700",
                      fontSize: "14px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {p.title}
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#e74c3c",
                      fontWeight: "600",
                    }}
                  >
                    {formatPrice(p.price)}
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
};

export default ProductRelated;
