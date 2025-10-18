import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import "../../assets/css/bootstrap.min.css";
import "../../assets/css/tiny-slider.css";
import "../../assets/css/style.css";

import Header from "../partials/Header.jsx";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://shoefit-backend.onrender.com/api/products/${id}`); //ở trong laptop cá nhân sẽ thay đổi thành 'http://localhost:9999/api/products/${id}'
        if (!res.ok) throw new Error("Failed to fetch product details");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <>
        <Header activePage="collection" />
        <div className="text-center mt-5">Loading product details...</div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header activePage="collection" />
        <div className="text-center mt-5">Product not found.</div>
      </>
    );
  }

  return (
    <>
      <Header activePage="collection" />

      {/* Product Detail Section */}
      <div className="product-section m-5">
        <div className="container">
          <div className="row align-items-center">
            {/* Image */}
            <div className="col-md-6 mb-4 mb-md-0 text-center">
              <img
                src={
                  product.image_url ||
                  "https://via.placeholder.com/500x500?text=No+Image"
                }
                alt={product.name}
                className="img-fluid rounded shadow"
                style={{ maxHeight: "450px", objectFit: "contain" }}
              />

            </div>

            {/* Info */}
            <div className="col-md-6">
              <h2 className="mb-3">{product.name}</h2>
              {product.description && (
                <p className="text-muted">{product.description}</p>
              )} {product.ai_description && (
                <div className="mb-3">
                  <p className="fst-italic">{product.ai_description}</p>
                </div>
              )}

              <div className="mb-3">
                {product.preferred_lighting && (
                  <p>
                    <strong>Preferred Lighting:</strong>{" "}
                    {product.preferred_lighting}
                  </p>
                )}
                {product.preferred_angle && (
                  <p>
                    <strong>Preferred Angle:</strong> {product.preferred_angle}
                  </p>
                )}
              </div>

              {product.model_3d_url && (
                <div className="mb-3">
                  <strong>3D Model:</strong>{" "}
                  <a
                    href={product.model_3d_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none"
                  >
                    View 3D Model
                  </a>
                </div>
              )}

              {product.external_link && (
                <div className="mb-3">
                  <strong>Shop Now:</strong>{" "}
                  <a
                    href={product.external_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none"
                  >
                    {product.external_link}
                  </a>
                </div>
              )}

              <div className="mt-4">
                <button className="btn btn-success me-3">Add to Cart</button>
                <button className="btn btn-success me-3">Try Now</button>
                <Link to="/collection" className="btn btn-outline-dark">
                  Back to Collection
                </Link>
              </div>

           
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
