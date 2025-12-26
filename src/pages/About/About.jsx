import React from 'react';
// Import hình ảnh từ thư mục assets
import aboutImage from '../../assets/images/Effects/why-choose.jpg';

const About = () => {
  return (
    <>
      {/* Start Why Choose Us Section */}
      <div className="why-choose-section mt-5">
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-lg-5">
              <div className="img-wrap">
                <img 
                  src={aboutImage} 
                  alt="ShoeFit AR and AI Technology Showcase" 
                  className="img-fluid" 
                />
              </div>
            </div>

            <div className="col-lg-6">
              <h2 className="section-title">Thử Giày Ảo AI & AR</h2>
              <p>
                ShoeFit là ứng dụng đầu tiên tại Việt Nam kết hợp công nghệ AI và
                3D. Thử giày ảo, tìm kích cỡ hoàn hảo và nhận tư vấn phong cách cá
                nhân hóa — mang đến trải nghiệm mua sắm giày trực tuyến tự tin và
                tiện lợi.
              </p>

              <div className="row my-5">
                <div className="col-6 col-md-6">
                  <div className="feature">
                    <div className="icon">
                      {/* Có thể thêm icon img ở đây nếu cần */}
                    </div>
                    <h3>Thử giày AR</h3>
                    <p>
                      Thử giày 3D ngay lập tức bằng camera điện thoại của bạn.
                      Mang đến trải nghiệm thực tế như tại cửa hàng ngay tại nhà.
                    </p>
                  </div>
                </div>

                <div className="col-6 col-md-6">
                  <div className="feature">
                    <div className="icon"></div>
                    <h3>Tư vấn Phong cách</h3>
                    <p>
                      Nhận gợi ý trang phục cá nhân hóa từ AI của chúng tôi. Chúng
                      tôi sẽ giúp bạn tìm ra vẻ ngoài hoàn hảo để phối với đôi
                      giày.
                    </p>
                  </div>
                </div>

                <div className="col-6 col-md-6">
                  <div className="feature">
                    <div className="icon"></div>
                    <h3>Thử Giày AI 2D</h3>
                    <p>
                      Tải ảnh của bạn lên và xem ngay hình ảnh thực tế của bạn khi mang đôi giày bạn chọn — được hỗ trợ bởi
                      công nghệ AI tiên tiến.
                    </p>
                  </div>
                </div>

                <div className="col-6 col-md-6">
                  <div className="feature">
                    <div className="icon"></div>
                    <h3>Hình ảnh AI Siêu thực</h3>
                    <p>
                      Xem hình ảnh 2D siêu thực của mọi sản phẩm. AI của chúng tôi
                      đảm bảo bạn thấy rõ mọi chi tiết.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Why Choose Us Section */}
    </>
  );
};

export default About;