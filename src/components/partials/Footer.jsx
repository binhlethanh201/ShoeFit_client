import React from "react";

// Import ảnh từ thư mục src/assets/images
import sofaImg from "../../assets/images/converse.png";
import envelopeIcon from "../../assets/images/envelope-outline.svg";

const Footer = () => {
  const linkGroups = [
    ["About us", "Services", "Blog", "Contact us"],
    ["Support", "Knowledge base", "Live chat"],
    ["Jobs", "Our team", "Leadership", "Privacy Policy"],
    ["Nike", "Adidas", "Puma", "Vans"],
  ];

  // Hàm tạo slug URL an toàn
  const slugify = (text) =>
    text.toLowerCase().replace(/[^\w]+/g, "-").replace(/^-+|-+$/g, "");

  return (
    <footer className="footer-section">
      <div className="container relative">
        {/* Hình sofa */}
        <div className="sofa-img">
          <img src={sofaImg} alt="Sofa" className="img-fluid" />
        </div>

        {/* Form đăng ký */}
        <div className="row mb-5">
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
                    <span className="fa fa-paper-plane">Send</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Liên kết và logo */}
        <div className="row g-5 mb-5">
          {/* Logo & mạng xã hội */}
          <div className="col-lg-4">
            <div className="mb-4 footer-logo-wrap">
              <a href="/" className="footer-logo">
                ShoeFit<span>.</span>
              </a>
            </div>
            <p className="mb-4">
              Slogan 
            </p>
            <ul className="list-unstyled custom-social">
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="fa fa-brands fa-facebook-f"></span>
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="fa fa-brands fa-twitter"></span>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="fa fa-brands fa-instagram"></span>
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="fa fa-brands fa-linkedin"></span>
                </a>
              </li>
            </ul>
          </div>

          {/* Các nhóm link */}
          <div className="col-lg-8">
            <div className="row links-wrap">
              {linkGroups.map((group, i) => (
                <div key={i} className="col-6 col-sm-6 col-md-3">
                  <ul className="list-unstyled">
                    {group.map((link, j) => (
                      <li key={j}>
                        <a href={`/${slugify(link)}`}>{link}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bản quyền */}
        <div className="border-top copyright">
          <div className="row pt-4 align-items-center">
            <div className="col-lg-6 text-center text-lg-start">
              <p className="mb-2">
                Copyright &copy; {new Date().getFullYear()}. All Rights
                Reserved. 
              </p>
            </div>
            <div className="col-lg-6 text-center text-lg-end">
              <ul className="list-unstyled d-inline-flex ms-auto mb-0">
                <li className="me-4">
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
