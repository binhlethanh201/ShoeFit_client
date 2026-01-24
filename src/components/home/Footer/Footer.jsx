import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import footerImg from "../../../assets/images/Effects/footer_img.png";
import envelopeIcon from "../../../assets/images/Effects/envelope-outline.svg";
import "../../../assets/css/home/footer/footer.css";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer-section">
      <div className="container relative">
        <div className="sofa-img">
          <img src={footerImg} alt="Footer decoration" className="img-fluid" />
        </div>
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
                <span>{t("footer.subscribe_title")}</span>
              </h3>
              <form className="row g-3" onSubmit={(e) => e.preventDefault()}>
                <div className="col-auto">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={t("footer.placeholder_name")}
                  />
                </div>
                <div className="col-auto">
                  <input
                    type="email"
                    className="form-control"
                    placeholder={t("footer.placeholder_email")}
                  />
                </div>
                <div className="col-auto">
                  <button className="btn btn-blue" type="submit">
                    <span className="fa fa-paper-plane"></span>{" "}
                    {t("footer.send")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="row g-5 align-items-start justify-content-between">
          <div className="col-lg-4">
            <div className="mt-4 footer-logo-wrap">
              <Link to="/" className="footer-logo">
                {" "}
                ShoeFit<span>.</span>{" "}
              </Link>
            </div>
            <p className="mb-4">{t("footer.slogan")}</p>

            <ul className="list-unstyled custom-social d-flex gap-3 mb-4">
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-facebook"></i>
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
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-tiktok"></i>
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-7 ms-auto">
            <div className="row links-wrap">
              <div className="col-6 col-md-4 mb-4 mb-md-0">
                <ul className="list-unstyled">
                  <li className="mb-3">
                    <h6
                      className="fw-bold text-uppercase"
                      style={{
                        color: "var(--text-heading)",
                        fontSize: "1rem",
                        letterSpacing: "1px",
                      }}
                    >
                      Khám phá
                    </h6>
                  </li>
                  <li className="mb-2">
                    <Link to="/about" className="footer-link">
                      {t("footer.about_us")}
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/services" className="footer-link">
                      {t("footer.services")}
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="col-6 col-md-4 mb-4 mb-md-0">
                <ul className="list-unstyled">
                  <li className="mb-3">
                    <h6
                      className="fw-bold text-uppercase"
                      style={{
                        color: "var(--text-heading)",
                        fontSize: "0.9rem",
                        letterSpacing: "1px",
                      }}
                    >
                      Kết nối
                    </h6>
                  </li>
                  <li className="mb-2">
                    <Link to="/blog" className="footer-link">
                      {t("footer.blog")}
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/contact" className="footer-link">
                      {t("footer.contact")}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="copyright border-top pt-4 mt-4">
          <div className="row align-items-center">
            <div className="col-lg-6 text-center text-lg-start">
              <p className="mb-0">
                &copy; 2025 ShoeFit. {t("footer.copyright")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
