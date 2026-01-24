import React from "react";
import { Link } from "react-router-dom";
import aboutImage from "../../assets/images/Effects/why-choose.jpg";

const About = () => {
  const headingStyle = {
    color: "var(--text-heading)",
    fontWeight: "800",
    marginBottom: "1.5rem",
  };

  const textStyle = {
    color: "var(--text-main)",
    lineHeight: "1.8",
    fontSize: "1rem",
    marginBottom: "1.5rem",
  };

  const highlightStyle = {
    color: "var(--brand-blue)",
    fontWeight: "600",
  };

  const quoteStyle = {
    borderLeft: "4px solid var(--brand-blue)",
    paddingLeft: "20px",
    fontStyle: "italic",
    color: "var(--text-heading)",
    backgroundColor: "var(--bg-section)",
    padding: "15px 20px",
    borderRadius: "0 10px 10px 0",
    marginBottom: "1.5rem",
  };

  return (
    <>
      <div
        className="untree_co-section"
        style={{ marginTop: "80px", marginBottom: "100px" }}
      >
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-lg-5 mb-5 mb-lg-0">
              <div className="img-wrap position-relative">
                <div
                  style={{
                    position: "absolute",
                    top: "-20px",
                    left: "-20px",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "var(--brand-blue)",
                    opacity: 0.1,
                    zIndex: -1,
                    borderRadius: "20px",
                  }}
                ></div>

                <img
                  src={aboutImage}
                  alt="About ShoeFit"
                  className="img-fluid shadow-lg"
                  style={{
                    borderRadius: "20px",
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <h2 className="section-title" style={headingStyle}>
                About ShoeFit
              </h2>

              <div style={textStyle}>
                <p>
                  <span style={highlightStyle}>ShoeFit</span> là nền tảng thử
                  giày bằng AI, giúp người dùng nhìn thấy hình ảnh mình mang đôi
                  giày yêu thích trước khi mua sắm online. Chúng tôi mang đến
                  trải nghiệm thử giày trực quan thông qua hình ảnh và video AI,
                  giúp việc lựa chọn trở nên dễ dàng và tự tin hơn.
                </p>

                <p>
                  Một trong những thách thức lớn nhất khi mua giày online là
                  người dùng khó hình dung độ phù hợp khi mang lên chân. Hình
                  ảnh sản phẩm truyền thống chưa đủ trực quan, dẫn đến tâm lý do
                  dự và tỷ lệ đổi trả cao.
                </p>

                <p>
                  ShoeFit giải quyết vấn đề đó bằng công nghệ AI thử giày, cho
                  phép người dùng chọn mẫu giày, tải ảnh cá nhân và xem ngay kết
                  quả một cách trực quan. Nền tảng được phát triển dành riêng
                  cho thị trường Việt Nam, với các mẫu giày phổ biến, phù hợp
                  form chân và hành vi mua sắm trong nước.
                </p>

                <div style={quoteStyle}>
                  Thông qua trải nghiệm{" "}
                  <strong>“Try on, Fit right, Shop smart”</strong>, ShoeFit giúp
                  người dùng tự tin hơn trong quyết định mua sắm, đồng thời hỗ
                  trợ các cửa hàng giảm tỷ lệ đổi trả và nâng cao hiệu quả bán
                  hàng online.
                </div>

                <p>
                  ShoeFit được xây dựng bởi đội ngũ đam mê công nghệ và thương
                  mại điện tử, xuất phát từ chính những trải nghiệm mua sắm thực
                  tế. Chúng tôi không ngừng hoàn thiện giải pháp để mang lại
                  những giá trị thiết thực cho người dùng và đối tác.
                </p>

                <p className="mb-4">
                  Khám phá ShoeFit ngay bây giờ để trải nghiệm thử giày bằng AI
                  và tự tin chọn đôi giày phù hợp với bạn nhé!
                </p>
                <Link
                  to="/"
                  className="btn rounded-pill px-5 py-3 fw-bold shadow-sm"
                  style={{
                    backgroundColor: "var(--brand-blue)",
                    color: "#fff",
                    border: "none",
                  }}
                >
                  Khám Phá Ngay
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
