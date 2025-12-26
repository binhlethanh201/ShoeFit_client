import React from 'react';
import { Link } from 'react-router-dom';

// Import Images
import footerImg from '../../../assets/images/Effects/footer_img.png';
import envelopeIcon from '../../../assets/images/Effects/envelope-outline.svg';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container relative">
        <div className="sofa-img">
          <img src={footerImg} alt="Footer decoration" className="img-fluid" />
        </div>
        
        {/* Subscription Form */}
        <div className="row">
          <div className="col-lg-8">
            <div className="subscription-form">
              <h3 className="d-flex align-items-center">
                <span className="me-2">
                  <img src={envelopeIcon} alt="Envelope" className="img-fluid" width="24" />
                </span>
                <span>Đăng Ký Nhận Bản Tin</span>
              </h3>
              <form className="row g-3" onSubmit={(e) => e.preventDefault()}>
                <div className="col-auto">
                  <input type="text" className="form-control" placeholder="Nhập tên của bạn" />
                </div>
                <div className="col-auto">
                  <input type="email" className="form-control" placeholder="Nhập email của bạn" />
                </div>
                <div className="col-auto">
                  <button className="btn btn-blue" type="submit">
                    <span className="fa fa-paper-plane"></span> Gửi
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Footer Content */}
        <div className="row g-5 align-items-start justify-content-between">
          <div className="col-lg-4">
            <div className="mb-4 footer-logo-wrap">
              <Link to="/" className="footer-logo"> ShoeFit<span>.</span> </Link>
            </div>
            <p className="mb-4">Try On. Fit Right. Shop Smart</p>
            
            {/* Social Icons */}
            <ul className="list-unstyled custom-social d-flex gap-3 mb-4">
              <li>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
              </li>
              <li>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-x"></i>
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-instagram"></i>
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-linkedin-in"></i>
                </a>
              </li>
            </ul>

            {/* App Store / Google Play Badges */}
            <div className="d-flex justify-content-start gap-3 mt-2">
              <Link to="/tryonar">
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="Download on the App Store"
                  height="45"
                />
              </Link>
              <Link to="/tryonar">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Get it on Google Play"
                  height="45"
                />
              </Link>
            </div>
          </div>

          {/* Footer Links */}
          <div className="col-lg-7 ms-auto">
            <div className="row links-wrap">
              <div className="col-6 col-md-6">
                <ul className="list-unstyled">
                  <li className="mb-2"><Link to="/about">Về Chúng Tôi</Link></li>
                  <li className="mb-2"><Link to="/services">Dịch Vụ</Link></li>
                  <li className="mb-2"><Link to="/blog">Blog</Link></li>
                  <li className="mb-2"><Link to="/contact">Liên Hệ</Link></li>
                </ul>
              </div>
              <div className="col-6 col-md-6">
                <ul className="list-unstyled">
                  <li className="mb-2"><Link to="#">Hỗ Trợ</Link></li>
                  <li className="mb-2"><Link to="#">Đội Ngũ</Link></li>
                  <li className="mb-2"><Link to="#">Lãnh Đạo</Link></li>
                  <li className="mb-2"><Link to="#">Chính Sách Bảo Mật</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="copyright border-top pt-4 mt-4">
          <div className="row align-items-center">
            <div className="col-lg-6 text-center text-lg-start">
              <p className="mb-0">&copy; 2025 ShoeFit. Đã đăng ký Bản quyền.</p>
            </div>
            <div className="col-lg-6 text-center text-lg-end">
              <ul className="list-unstyled d-inline-flex mb-0 gap-4">
                <li><Link to="#">Điều khoản & Điều kiện</Link></li>
                <li><Link to="#">Chính sách Bảo mật</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;