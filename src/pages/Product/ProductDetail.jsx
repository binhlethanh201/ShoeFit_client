import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import productService from "../../services/product/productService";

// Import CSS
import "../../assets/css/product/ProductDetail.css";

// Import Components
import ProductGallery from "../../components/product/productDetail/ProductGallery";
import ProductDescription from "../../components/product/productDetail/ProductDescription";
import ProductReviews from "../../components/product/productDetail/ProductReviews";
import ProductInfo from "../../components/product/productDetail/ProductInfo";
import ProductRelated from "../../components/product/productDetail/ProductRelated";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Lấy thông tin sản phẩm (bao gồm cả styleHints đã enrich trong service)
        const productData = await productService.getById(productId);

        // Lấy sản phẩm tương tự (loại trừ sản phẩm hiện tại)
        const relatedData = await productService.getRelated(productId);

        setProduct(productData);
        setRelatedProducts(relatedData);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    window.scrollTo(0, 0);
  }, [productId]);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="spinner-border text-dark" role="status"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container text-center my-5" style={{ minHeight: "60vh" }}>
        <h2 className="mb-4">Sản phẩm không tồn tại</h2>
        <Link
          to="/collection"
          className="btn-pd btn-pd-black"
          style={{
            maxWidth: "200px",
            margin: "0 auto",
            textDecoration: "none",
          }}
        >
          Quay lại cửa hàng
        </Link>
      </div>
    );
  }

  return (
    <div className="pd-container">
      <div className="product-layout">
        {/*  Left Content */}
        <div className="main-content">
          <ProductGallery images={product.images} />

          <ProductDescription
            description={product.description}
            specs={product.specs}
            aiDescription={product.ai_description}
          />

          <ProductReviews
            rating={product.rating}
            count={product.reviews_count}
          />
        </div>

        {/*  Right Content */}
        <div className="sticky-col">
          <ProductInfo product={product} />
        </div>
      </div>

      {/* Bottom Content */}
      <ProductRelated
        styleHints={product.styleHints}
        relatedProducts={relatedProducts}
      />
    </div>
  );
};

export default ProductDetail;
