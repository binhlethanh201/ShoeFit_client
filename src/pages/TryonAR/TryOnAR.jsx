import React from "react";
// Import hình ảnh từ assets
import scratchImg from "../../assets/images/Effects/scratch.png";

const TryOnAR = () => {
  return (
    <>
      {/* Main content */}
      <div className="untree_co-section before-footer-section text-center py-5 mb-5">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-8 col-lg-6">
              <img
                src={scratchImg}
                alt="Cat Icon"
                className="img-fluid mb-4"
                style={{ maxWidth: "200px", opacity: 0.9 }}
              />
              <h2 className="text-black fw-bold mb-3">
                Trải nghiệm VR/AR Tốt Nhất có trên Ứng dụng Di động!
              </h2>

              <p className="text-muted fs-5 mb-4">
                Vui lòng tải xuống phiên bản mới nhất của ứng dụng di động
                Shoefit để trải nghiệm công nghệ thử giày ảo chân thực nhất.
              </p>

              <div className="d-flex justify-content-center gap-3 mt-4">
                <a
                  href="https://www.apple.com/app-store/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                    alt="Download on the App Store"
                    height="60"
                  />
                </a>
                <a
                  href="https://play.google.com/store"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Get it on Google Play"
                    height="60"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TryOnAR;
