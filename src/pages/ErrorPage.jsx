import React from "react";
import { useRouteError, Link } from "react-router-dom";
import "../assets/css/error/error.css"; // Import CSS riêng

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="error-page-container">
      <div className="error-content">
        <div className="error-icon">
          <i className="fa-regular fa-face-frown-open"></i>
        </div>

        <h1 className="error-title">RẤT TIẾC!</h1>

        <p className="error-message">
          Đã có lỗi xảy ra hoặc trang bạn tìm kiếm không tồn tại.
        </p>
        <p className="error-detail">
          <i>
            Code: {error?.status || "Unknown"} -{" "}
            {error?.statusText || error?.message}
          </i>
        </p>
        <Link to="/" className="btn-back-home">
          QUAY VỀ TRANG CHỦ
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
