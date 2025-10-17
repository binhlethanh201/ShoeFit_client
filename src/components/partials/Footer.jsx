import React from "react";
import converseImg from "../../assets/images/converse.png";
import envelopeIcon from "../../assets/images/envelope-outline.svg";
import "../../assets/css/style.css"; // đảm bảo đã import css chứa fontawesome

const Footer = () => {
  // Các liên kết hiển thị trong footer (2 cột)
  const linkGroups = [
    ["About us", "Services", "Blog", "Contact us"],
    ["Support", "Our team", "Leadership", "Privacy Policy"],
  ];

  // Hàm tạo slug URL an toàn
  const slugify = (text) =>
    text.toLowerCase().replace(/[^\w]+/g, "-").replace(/^-+|-+$/g, "");

  return (
    <footer className="footer-section">
      <div className="container relative">
        {/* Ảnh minh họa */}
        <div className="sofa-img">
          <img src={converseImg} alt="Sofa" className="img-fluid" />
        </div>

        {/* Form đăng ký */}
        <div className="row">
          <div className="col-lg-8">
            <div className="subscription-form">
              <h3 className="d-flex align-items-center">
                <span className="me-2">
                  <img
                    src={envelopeIcon}
                    alt="Envelope"
                    className="img-fluid"
                    width="24"
                  />
                </span>
                <span>Subscribe to Newsletter</span>
              </h3>
              <form className="row g-3">
                <div className="col-auto">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="col-auto">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="col-auto">
                  <button className="btn btn-primary" type="submit">
                    <span className="fa fa-paper-plane"></span> Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Logo & Mạng xã hội + Link Groups */}
        <div className="row g-5 align-items-start justify-content-between">
          {/* Logo & Mạng xã hội */}
          <div className="col-lg-4">
            <div className="mb-4 footer-logo-wrap">
              <a href="/" className="footer-logo">
                ShoeFit<span>.</span>
              </a>
            </div>
            <p className="mb-4">Slogan.</p>
            <ul className="list-unstyled custom-social d-flex gap-3 mb-4">
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-x"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-instagram"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-linkedin-in"></i>
                </a>
              </li>
            </ul>

            {/* Download App Section (ngay bên dưới logo & mạng xã hội) */}
            <div className="d-flex justify-content-start gap-3 mt-2">
              <a
                href="/tryonAR"
                target="_self"
                rel="noopener noreferrer"
              >
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="Download on the App Store"
                  height="45"
                />
              </a>
              <a
                href="/tryonAR"
                target="_self"
                rel="noopener noreferrer"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Get it on Google Play"
                  height="45"
                />
              </a>
            </div>
          </div>

          {/* Link Groups (2 cột đều nhau, canh phải) */}
          <div className="col-lg-7 ms-auto">
            <div className="row links-wrap">
              {linkGroups.map((group, i) => (
                <div key={i} className="col-6 col-md-6">
                  <ul className="list-unstyled">
                    {group.map((link, j) => (
                      <li key={j} className="mb-2">
                        <a href={`/${slugify(link)}`}>{link}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="copyright border-top pt-4 mt-4">
          <div className="row align-items-center">
            <div className="col-lg-6 text-center text-lg-start">
              <p className="mb-0">
                &copy; {new Date().getFullYear()} ShoeFit. All Rights Reserved.
              </p>
            </div>
            <div className="col-lg-6 text-center text-lg-end">
              <ul className="list-unstyled d-inline-flex mb-0 gap-4">
                <li>
                  <a href="/terms-conditions">Terms &amp; Conditions</a>
                </li>
                <li>
                  <a href="/privacy-policy">Privacy Policy</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
