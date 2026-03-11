import React from "react";
import { instagramPosts } from "../../../data/mockData";

const InstagramSection = () => {
  return (
    <div className="product-section">
      <div className="container">
        <div className="row mb-5 align-items-center">
          <div className="col-md-6">
            <h2 className="section-title">Bài viết Instagram</h2>
          </div>
          <div className="col-md-6 text-start text-md-end">
            <a
              href="https://www.instagram.com/shoefit.tryon/"
              target="_blank"
              rel="noopener noreferrer"
              className="more"
            >
              Xem tất cả
            </a>
          </div>
        </div>

        <div className="row">
          {instagramPosts.slice(0, 4).map((post) => (
            <div
              key={post.id}
              className="col-12 col-md-6 col-lg-4 mb-5 text-center d-flex flex-column align-items-center"
            >
              <a
                href={post.igLink}
                target="_blank"
                rel="noopener noreferrer"
                className="feature product-item"
                style={{
                  textDecoration: "none",
                  width: "100%",
                  display: "block",
                }}
              >
                <div
                  className="icon"
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={post.imageUrl}
                    alt={`Instagram post ${post.id}`}
                    className="img-fluid product-thumbnail mb-3"
                    style={{
                      width: "85%",
                      aspectRatio: "3 / 4",
                      objectFit: "cover",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                      position: "relative",
                      zIndex: 1,
                    }}
                  />
                </div>

                <div style={{ color: "#333", padding: "0 10px" }}>
                  <p className="mb-0">{post.caption}</p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstagramSection;
