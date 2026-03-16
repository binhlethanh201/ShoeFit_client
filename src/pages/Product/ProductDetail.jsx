import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "sonner";
import productService from "../../services/product/productService";
import wishlistService from "../../services/wishlistService";
import "../../assets/css/product/ProductDetail.css";

import ProductGallery from "../../components/product/productDetail/ProductGallery";
import ProductDescription from "../../components/product/productDetail/ProductDescription";
import ProductInfo from "../../components/product/productDetail/ProductInfo";
import ProductRelated from "../../components/product/productDetail/ProductRelated";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [productData, relatedData, wishlistData] = await Promise.all([
          productService.getById(productId),
          productService.getRelated(productId),
          wishlistService.getAll(1, 100),
        ]);

        setProduct(productData);
        setRelatedProducts(relatedData);
        const isFavorite = wishlistData.some(
          (item) => item.shoeId === productId,
        );
        setIsInWishlist(isFavorite);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Không thể tải thông tin sản phẩm");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    window.scrollTo({ top: 0, behavior: "smooth" });
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

  const handleToggleWishlist = async () => {
    try {
      await wishlistService.addToWishlist(product.id);
      if (isInWishlist) {
        setIsInWishlist(false);
        toast.success("Đã xóa khỏi danh sách yêu thích!");
      } else {
        setIsInWishlist(true);
        toast.success("Đã thêm vào danh sách yêu thích!");
      }
    } catch (error) {
      toast.error("Lỗi cập nhật danh sách yêu thích.");
    }
  };

  return (
    <div className="pd-container">
      <div className="product-layout">
        <div className="main-content">
          <ProductGallery
            images={product.images}
            onToggleWishlist={handleToggleWishlist}
            isInWishlist={isInWishlist}
          />
          <ProductDescription
            description={product.description}
            specs={product.specs}
            aiDescription={product.ai_description}
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
