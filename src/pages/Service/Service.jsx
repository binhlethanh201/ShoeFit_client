import React from "react";
import { Link } from "react-router-dom";

// Import images từ thư mục assets
import tryon2dImg from "../../assets/images/TryOnGrids/tryon5-grid.jpg";
import tryonArImg from "../../assets/images/TryOnGrids/tryon4-grid.jpg";
import styleAdvisorImg from "../../assets/images/TryOnGrids/tryon3-grid.png";

const Service = () => {
  return (
    <>
      {/* Services Section */}
      <div className="product-section mt-5" style={{ marginBottom: "200px" }}>
        <div className="container">
          <div className="row">
            {/* Try-On AI 2D */}
            <div className="col-12 col-md-6 col-lg-4 mb-5 text-center d-flex flex-column align-items-center">
              <div className="product-item">
                <img
                  src={tryon2dImg}
                  alt="Try-On AI 2D"
                  className="img-fluid product-thumbnail mb-4"
                />
                <h2 className="mb-3 section-title">Thử Giày AI 2D</h2>
                <p className="mb-4">
                  Tải ảnh của bạn lên và xem ngay hình ảnh thực tế của bạn khi
                  mang đôi giày bạn chọn — được hỗ trợ bởi công nghệ AI tiên
                  tiến.
                </p>
                <Link to="/tryon2d" className="btn btn-dark">
                  THỬ NGAY
                </Link>
              </div>
            </div>

            {/* AR Virtual Try-On */}
            <div className="col-12 col-md-6 col-lg-4 mb-5 text-center d-flex flex-column align-items-center">
              <div className="product-item">
                <img
                  src={tryonArImg}
                  alt="AR Virtual Try-On"
                  className="img-fluid product-thumbnail mb-4"
                />
                <h2 className="mb-3 section-title">Thử Giày Ảo AR</h2>
                <p className="mb-4">
                  Sử dụng camera của bạn để trải nghiệm 3D thời gian thực. Di
                  chuyển chân, thay đổi góc độ và hình dung mọi đôi giày với tỷ
                  lệ và độ vừa vặn hoàn hảo.
                </p>
                <Link to="/tryonar" className="btn btn-dark">
                  THỬ NGAY
                </Link>
              </div>
            </div>

            {/* Style Advisor */}
            <div className="col-12 col-md-6 col-lg-4 mb-5 text-center d-flex flex-column align-items-center">
              <div className="product-item">
                <img
                  src={styleAdvisorImg}
                  alt="Style Advisor"
                  className="img-fluid product-thumbnail mb-4"
                />
                <h2 className="mb-3 section-title">Tư Vấn Phong Cách</h2>
                <p className="mb-4">
                  Hãy để AI giúp bạn định hình phong cách đề xuất về giày, trang
                  phục và phụ kiện phù hợp với sở thích của bạn.
                </p>
                <Link to="/styleadvisor" className="btn btn-dark">
                  THỬ NGAY
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Service;
