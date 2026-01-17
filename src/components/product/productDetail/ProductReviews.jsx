import React from "react";

const ProductReviews = ({ rating, count }) => {
  return (
    <div className="content-block" id="reviews">
      <span className="block-title">Đánh giá từ khách hàng</span>

      <div className="review-summary">
        <div className="big-rating">{rating || 5.0}</div>
        <div>
          <div className="star-row">
            <i className="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star-half-alt"></i>
          </div>
          <div style={{ fontSize: "13px", color: "#666", marginTop: "4px" }}>
            Dựa trên {count || 0} đánh giá
          </div>
        </div>
      </div>

      <div className="review-list">
        <div className="review-item">
          <div className="r-user">
            Nguyễn Văn A <span className="r-date">2 ngày trước</span>
          </div>
          <div className="star-row text-warning">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
          </div>
          <div className="r-tags">Size: 42 - Màu: Trắng</div>
          <p className="r-content">
            Giày đẹp, form chuẩn, đóng gói rất cẩn thận. Giao hàng nhanh hơn dự
            kiến.
          </p>
        </div>
      </div>

      <button
        className="btn-pd-outline"
        style={{
          width: "100%",
          marginTop: "20px",
          border: "none",
          borderBottom: "1px solid #000",
          borderRadius: 0,
          height: "auto",
          padding: "10px",
        }}
      >
        Xem thêm
      </button>
    </div>
  );
};

export default ProductReviews;
