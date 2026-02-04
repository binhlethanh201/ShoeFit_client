import React from "react";
import { Link } from "react-router-dom";
import aboutImage from "../../assets/images/Effects/why-choose.jpg";
import "../../assets/css/about/about.css";

const About = () => {
  return (
    <div className="about-page-wrapper">
      <div className="container">
        <section className="about-section">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h2 className="about-title">VỀ SHOEFIT</h2>
              <div className="about-text">
                <p>
                  ShoeFit là một website thương mại điện tử được phát triển như
                  một giải pháp công nghệ để giải quyết khó khăn của người tiêu
                  dùng khi mua giày online:{" "}
                  <strong>
                    không thể đánh giá độ phù hợp của sản phẩm trước khi mua.
                  </strong>
                </p>
                <p>
                  Hiện nay, người dùng chủ yếu dựa vào mô tả đơn thuần và hình
                  ảnh tĩnh - những thứ chưa đủ trực quan, dẫn đến tâm lý do dự
                  và tỷ lệ đổi trả cao.
                </p>
                <p>
                  Chúng tôi ra đời để thu hẹp khoảng cách giữa mua sắm online và
                  offline. Thông qua công nghệ <strong>AI thử giày</strong>, bạn
                  chỉ cần tải ảnh lên và ngay lập tức xem được đôi giày hiển thị
                  trên chân mình.
                </p>
                <p>
                  Đặc biệt, ShoeFit tối ưu hóa cho thị trường Việt Nam với dữ
                  liệu mẫu giày phổ biến và hành vi mua sắm đặc thù trong nước.
                </p>
              </div>
            </div>
            <div className="col-lg-5 offset-lg-1">
              <div className="about-img-container">
                <img src={aboutImage} alt="ShoeFit AI Technology" />
              </div>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2 className="about-title text-center mb-5">VISION & MISSION</h2>
          <div className="row g-4">
            <div className="col-md-6">
              <div className="vm-card">
                <h3 className="vm-title">
                  <i className="fas fa-eye text-primary"></i> Vision - Tầm nhìn
                </h3>
                <p className="about-text">
                  Trở thành nền tảng thử giày ảo và gợi ý trang phục hàng đầu,
                  giúp mọi người thể hiện phong cách cá nhân thông qua công nghệ
                  AI tiên tiến nhất thế giới.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="vm-card">
                <h3 className="vm-title">
                  <i className="fas fa-rocket text-primary"></i> Mission - Sứ
                  mệnh
                </h3>
                <p className="about-text">
                  Mang đến trải nghiệm thời trang thông minh, tiện lợi và chân
                  thực. ShoeFit cung cấp insights về sở thích khách hàng để giúp
                  các thương hiệu hiểu rõ hơn về người tiêu dùng của họ.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2 className="about-title text-center mb-5">SLOGAN</h2>
          <div className="slogan-box shadow-lg">
            <h2 className="slogan-text">"Try On. Fit Right. Shop Smart"</h2>
            <p className="slogan-desc">
              Slogan thể hiện trọn vẹn giá trị cốt lõi: Từ trải nghiệm thử giày
              công nghệ, đến sự phù hợp cá nhân hoá và cuối cùng là quyết định
              mua sắm online thông minh, hiệu quả.
            </p>
            <Link
              to="/"
              className="btn btn-light rounded-pill px-5 mt-4 fw-bold"
            >
              Trải nghiệm ngay
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
