import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import aboutImage from "../../assets/images/Effects/why-choose.jpg";
import "../../assets/css/about/about.css";

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div className="about-page-wrapper">
      <div className="container">
        <section className="about-section">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0" data-aos="fade-right">
              <h2 className="about-title">VỀ SHOEFIT</h2>
              <div className="about-text">
                <p>
                  <strong>ShoeFit</strong> là nền tảng thử giày bằng công nghệ
                  AI, giúp bạn nhìn thấy hình ảnh mình mang đôi giày yêu thích
                  trước khi quyết định mua sắm online. Trải nghiệm trực quan qua{" "}
                  <strong>hình ảnh và video AI</strong> giúp việc mua sắm trở
                  nên tự tin hơn bao giờ hết.
                </p>
                <p>
                  Chúng mình hiểu rằng việc khó hình dung độ phù hợp khi mang
                  lên chân là rào cản lớn nhất. ShoeFit ra đời để xóa bỏ sự do
                  dự đó. Chỉ cần chọn mẫu, tải ảnh và xem kết quả ngay lập tức.
                </p>
                <p>
                  Nền tảng được tối ưu riêng cho{" "}
                  <strong>thị trường Việt Nam</strong>, thấu hiểu từng form chân
                  và phong cách mua sắm đặc trưng của người trẻ trong nước.
                </p>
              </div>
            </div>
            <div className="col-lg-5 offset-lg-1" data-aos="fade-left">
              <div className="about-img-container">
                <img
                  src={aboutImage}
                  alt="ShoeFit AI Technology"
                  className="about-img"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="about-section text-center">
          <h2 className="about-title" data-aos="fade-up">
            VISION
          </h2>
          <div className="vision-box" data-aos="zoom-in" data-aos-delay="200">
            <p className="about-text text-center large-text">
              ShoeFit hướng tới trở thành nền tảng AI hàng đầu giúp mọi người
              tìm được đôi giày <strong>vừa vặn hoàn hảo</strong> dù mua sắm ở
              bất kỳ đâu hay trên bất kỳ nền tảng nào.
            </p>
          </div>
        </section>

        <section className="about-section">
          <h2 className="about-title text-center mb-5" data-aos="fade-up">
            MISSION
          </h2>
          <div className="row g-4">
            <div className="col-lg-4" data-aos="fade-up" data-aos-delay="100">
              <div className="mission-card-v2">
                <span className="mission-number">01</span>
                <strong className="text-highlight">Người tiêu dùng</strong>
                <p className="about-text small">
                  Giúp người dùng thử giày trực tuyến chính xác, hiểu rõ hình
                  thái bàn chân và chọn đúng size, đúng form, đúng nhu cầu, giảm
                  rủi ro mua sai.
                </p>
              </div>
            </div>
            <div className="col-lg-4" data-aos="fade-up" data-aos-delay="200">
              <div className="mission-card-v2">
                <span className="mission-number">02</span>
                <strong className="text-highlight">Doanh nghiệp</strong>
                <p className="about-text small">
                  Cung cấp giải pháp AI sizing & try-on giúp thương hiệu giảm tỷ
                  lệ hoàn hàng, tăng tỷ lệ chuyển đổi và tối ưu trải nghiệm
                  khách hàng.
                </p>
              </div>
            </div>
            <div className="col-lg-4" data-aos="fade-up" data-aos-delay="300">
              <div className="mission-card-v2">
                <span className="mission-number">03</span>
                <strong className="text-highlight">Ngành thời trang</strong>
                <p className="about-text small">
                  Xây dựng hệ sinh thái mua sắm bền vững, giảm thiểu lãng phí và
                  chi phí logistics, đồng thời góp phần bảo vệ môi trường.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="about-section mb-0" data-aos="zoom-in">
          <div className="slogan-box shadow-lg text-center">
            <h2 className="slogan-text" data-aos="fade-up">
              "Try On. Fit Right. Shop Smart"
            </h2>
            <p className="slogan-desc">
              Thể hiện trọn vẹn giá trị cốt lõi của ShoeFit, từ trải nghiệm thử
              giày ứng dụng công nghệ hiện đại, đảm bảo sự phù hợp mang tính cá
              nhân hoá, đến việc hỗ trợ người dùng đưa ra quyết định mua sắm
              trực tuyến một cách thông minh và hiệu quả hơn.
            </p>
            <div className="mt-4">
              <Link to="/" className="btn-experience-call-to-action">
                Trải nghiệm ngay
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
