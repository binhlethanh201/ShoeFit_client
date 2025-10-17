import React from "react";
import "../assets/css/bootstrap.min.css";
import "../assets/css/tiny-slider.css";
import "../assets/css/style.css";
import "../assets/js/bootstrap.bundle.min.js";
import "../assets/js/tiny-slider.js";
import "../assets/js/custom.js";

import Header from "../components/partials/Header";

const TryonAR = () => {
  return (
    <>
      <Header activePage="tryonAR" />
      <div className="untree_co-section before-footer-section text-center py-5">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-8 col-lg-6">
              {/* Hình ảnh minh họa */}
              <img
                src="https://cdn-icons-png.flaticon.com/512/620/620851.png"
                alt="Under Construction"
                className="img-fluid mb-4"
                style={{ maxWidth: "180px", opacity: "0.9" }}
              />

              {/* Tiêu đề chính */}
              <h2 className="text-black fw-bold mb-3">
                Sorry! We’ll Be Back Soon
              </h2>

              {/* Nội dung phụ */}
              <p className="text-muted fs-5 mb-4">
              We are currently developing our mobile app.
              Please bear with us for a little longer to experience the better AR Try-on feature!
              </p>

              {/* Nút quay lại trang chủ */}
              <a href="/" className="btn btn-primary rounded-pill px-4 py-2 fw-semibold">
                ← Back to Homepage
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TryonAR;
