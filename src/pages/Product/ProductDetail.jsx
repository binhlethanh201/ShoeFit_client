import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productsData } from '../../data/mockData';

const ProductDetail = () => {
  const { productId } = useParams(); // Lấy ID từ URL (định nghĩa trong Route là :productId)
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Giả lập việc fetch dữ liệu
    setLoading(true);
    setTimeout(() => {
      const foundProduct = productsData.find(p => p.id === productId);
      setProduct(foundProduct);
      setLoading(false);
    }, 500); // Delay nhẹ để thấy hiệu ứng loading
  }, [productId]);

  return (
    <>
      {/* Product Detail Section */}
      <div className="product-section m-5" style={{ minHeight: '60vh' }}>
        <div className="container">
          
          {/* Loading State */}
          {loading && (
            <div id="loading" className="text-center my-5">
              <div className="spinner-border text-success" role="status"></div>
              <p className="mt-3 text-muted">Loading product details...</p>
            </div>
          )}

          {/* Not Found State */}
          {!loading && !product && (
            <div className="text-center my-5">
              <p className="text-danger mt-4 fs-4">Product not found 😢</p>
              <Link to="/collection" className="btn btn-outline-dark mt-3">Back to Collection</Link>
            </div>
          )}

          {/* Product Detail Content */}
          {!loading && product && (
            <div id="productDetail" className="row align-items-center">
              <div className="col-md-6 mb-4 mb-md-0 text-center">
                <img 
                  id="productImage" 
                  src={product.image} 
                  alt={product.title} 
                  className="img-fluid rounded shadow"
                  style={{ maxHeight: '450px', objectFit: 'contain' }} 
                />
              </div>
              <div className="col-md-6">
                <h2 id="productName" className="mb-3">{product.title}</h2>
                <p id="productDesc" className="text-muted">
                  {product.description || "Mô tả đang được cập nhật..."}
                </p>
                
                {product.ai_description && (
                  <div className="alert alert-light border mt-3">
                    <strong><i className="fas fa-robot me-2"></i>AI Analysis:</strong>
                    <p id="productAIDesc" className="fst-italic mb-0 mt-1">
                      "{product.ai_description}"
                    </p>
                  </div>
                )}

                <div className="mb-3">
                  {/* Placeholder cho thông tin ánh sáng/góc độ nếu cần */}
                  {/* <p id="lighting"></p> */}
                  {/* <p id="angle"></p> */}
                </div>

                <div className="mb-3" id="model3d"></div>
                <div className="mb-3" id="shopLink"></div>

                <div className="mt-4 d-flex gap-2">
                  <Link to="/wishlist" className="btn btn-outline-dark">
                    <i className="far fa-heart me-2"></i> Thêm vào Yêu Thích
                  </Link>
                  <Link to="/tryon2d" className="btn btn-success text-white">
                    <i className="fas fa-camera me-2"></i> Thử Ngay
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;