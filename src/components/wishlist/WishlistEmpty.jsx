import React from "react";
import { Link } from "react-router-dom";

const WishlistEmpty = () => {
  return (
    <div className="wishlist-empty">
      <div className="mb-4">
        <i className="far fa-heart fa-3x" style={{ color: "#ccc" }}></i>
      </div>
      <h3 style={{ textTransform: "uppercase", letterSpacing: "1px" }}>
        Danh sách trống
      </h3>
      <p style={{ fontSize: "14px", color: "#666" }}>
        Bạn chưa có sản phẩm nào trong danh sách yêu thích.
      </p>

      <Link
        to="/collection"
        className="btn mt-3"
        style={{
          background: "#000",
          color: "#fff",
          padding: "12px 40px",
          borderRadius: "0",
        }}
      >
        TIẾP TỤC MUA SẮM
      </Link>
    </div>
  );
};

export default WishlistEmpty;
