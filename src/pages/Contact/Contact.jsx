import React from "react";
import { useTranslation } from "react-i18next";
import "../../assets/css/contact/contact.css";

import emailIcon from "../../assets/images/Effects/email.png";
import hotlineIcon from "../../assets/images/Effects/hotline.png";
import locationIcon from "../../assets/images/Effects/location.png";

const Contact = () => {
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(t("contact.alert_success"));
  };

  const inputStyle = {
    backgroundColor: "var(--input-bg)",
    color: "var(--text-main)",
    borderColor: "var(--border-color)",
  };

  const headingStyle = {
    color: "var(--text-heading)",
  };

  const textStyle = {
    color: "var(--text-main)",
    marginBottom: 0,
  };

  const iconBgStyle = {
    backgroundColor: "var(--bg-section)",
    width: "45px",
    height: "45px",
  };

  return (
    <>
      <div
        className="untree_co-section "
        style={{ marginBottom: "100px", marginTop: "30px" }}
      >
        <div className="container">
          <div className="block">
            <div className="row justify-content-between mb-5">
              <div className="col-lg-7 mb-5 mb-lg-0">
                <h3 className=" h2 mb-4 fw-bold mt-4" style={headingStyle}>
                  {t("contact.title")}
                </h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <label
                      className="h7 fw-bold mb-1"
                      htmlFor="fullname"
                      style={headingStyle}
                    >
                      {t("contact.label_fullname")}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="fullname"
                      required
                      style={inputStyle}
                    />
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label
                          className="h7 fw-bold mb-1"
                          htmlFor="email"
                          style={headingStyle}
                        >
                          {t("contact.label_email")}
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          required
                          style={inputStyle}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label
                          className="h7 fw-bold mb-1"
                          htmlFor="phone"
                          style={headingStyle}
                        >
                          {t("contact.label_phone")}
                        </label>
                        <input
                          type="tel"
                          className="form-control"
                          id="phone"
                          required
                          style={inputStyle}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group mb-4">
                    <label
                      className="h7 fw-bold mb-1"
                      htmlFor="message"
                      style={headingStyle}
                    >
                      {t("contact.label_message")}
                    </label>
                    <textarea
                      name="message"
                      className="form-control"
                      id="message"
                      cols="30"
                      rows="5"
                      required
                      style={inputStyle}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn rounded-pill py-3 px-5 fw-bold"
                    style={{
                      backgroundColor: "var(--brand-blue)",
                      color: "#fff",
                      border: "none",
                    }}
                  >
                    {t("contact.btn_send")}
                  </button>
                </form>
              </div>

              <div className="col-lg-4 d-flex justify-content-lg-end justify-content-center">
                <div className="p-4">
                  <h3 className="h3 mb-4 fw-bold" style={headingStyle}>
                    {t("contact.follow_us")}
                  </h3>

                  <ul className="list-unstyled social-icons m-0">
                    <li className="mb-4">
                      <a
                        href="https://www.instagram.com/shoefit.tryon"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="d-flex align-items-center text-decoration-none"
                      >
                        <span
                          className="icon-wrap rounded-circle d-flex align-items-center justify-content-center me-3 shadow-sm"
                          style={iconBgStyle}
                        >
                          <i
                            className="fa-brands fa-instagram fs-4"
                            style={{ color: "#C13584" }}
                          ></i>
                        </span>
                        <span
                          className="fs-6 mb-0 fw-semibold"
                          style={headingStyle}
                        >
                          Instagram
                        </span>
                      </a>
                    </li>
                    <li className="mb-4">
                      <a
                        href="https://www.tiktok.com/@shoefit.tryon"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="d-flex align-items-center text-decoration-none"
                      >
                        <span
                          className="icon-wrap rounded-circle d-flex align-items-center justify-content-center me-3 shadow-sm"
                          style={iconBgStyle}
                        >
                          <i
                            className="fa-brands fa-tiktok fs-4"
                            style={{ color: "var(--text-heading)" }}
                          ></i>
                        </span>
                        <span
                          className="fs-6 mb-0 fw-semibold"
                          style={headingStyle}
                        >
                          TikTok
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div
              className="row mt-5 pt-5 border-top"
              style={{ borderColor: "var(--border-color)" }}
            >
              <div className="col-md-4 mb-4 mb-md-0 d-flex align-items-center justify-content-center justify-content-md-start">
                <img
                  src={emailIcon}
                  alt="Email"
                  className="me-2"
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "contain",
                  }}
                />
                <div>
                  <h6 className="fw-bold mb-1" style={headingStyle}>
                    Email
                  </h6>
                  <p style={textStyle}>contact.shoefit@gmail.com</p>
                </div>
              </div>

              <div className="col-md-4 mb-4 mb-md-0 d-flex align-items-center justify-content-center justify-content-md-start">
                <img
                  src={hotlineIcon}
                  alt="Hotline"
                  className="me-2"
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "contain",
                  }}
                />
                <div>
                  <h6 className="fw-bold mb-1" style={headingStyle}>
                    Hotline
                  </h6>
                  <p style={textStyle}>+84 971 009 866</p>
                </div>
              </div>

              <div className="col-md-4 d-flex align-items-center justify-content-center justify-content-md-start">
                <img
                  src={locationIcon}
                  alt="Location"
                  className="me-2"
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "contain",
                  }}
                />
                <div>
                  <h6 className="fw-bold mb-1" style={headingStyle}>
                    Location
                  </h6>
                  <p style={textStyle}>{t("contact.address")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
