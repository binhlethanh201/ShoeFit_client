import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "sonner";
import productService from "../../services/product/productService";
import wishlistService from "../../services/wishlist/wishlistService";
import "../../assets/css/product/ProductDetail.css";

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
        const productData = await productService.getById(productId);
        const relatedData = await productService.getRelated(productId);
        setProduct(productData);
        setRelatedProducts(relatedData);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Không thể tải thông tin sản phẩm");
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
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
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
          className="btn-pd btn-pd-black text-decoration-none"
        >
          Quay lại cửa hàng
        </Link>
      </div>
    );
  }

  const handleAddToWishlist = async () => {
    try {
      await wishlistService.addToWishlist(productId);
      toast.success("Đã thêm vào danh sách yêu thích!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Không thể thêm vào danh sách.",
      );
    }
  };

  return (
    <div className="pd-container">
      <div className="product-layout">
        <div className="main-content">
          <ProductGallery
            images={product.images}
            onAddToWishlist={handleAddToWishlist}
          />
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
        <div className="sticky-col">
          <ProductInfo product={product} />
        </div>
      </div>
      <ProductRelated
        styleHints={product.styleHints}
        relatedProducts={relatedProducts}
      />
    </div>
  );
};

export default ProductDetail;
