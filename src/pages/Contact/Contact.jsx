import React from "react";
import { useTranslation } from "react-i18next";

// Import Social Icons (PNG)
import emailIcon from "../../assets/images/Effects/email.png";
import hotlineIcon from "../../assets/images/Effects/hotline.png";
import locationIcon from "../../assets/images/Effects/location.png";

const Contact = () => {
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(t('contact.alert_success'));
  };

  const inputStyle = {
    backgroundColor: 'var(--input-bg)',
    color: 'var(--text-main)',
    borderColor: 'var(--border-color)'
  };

  const headingStyle = {
    color: 'var(--text-heading)'
  };

  const textStyle = {
    color: 'var(--text-main)',
    marginBottom: 0
  };

  const iconBgStyle = {
    backgroundColor: 'var(--bg-section)',
    width: '60px',
    height: '60px'
  };

  return (
    <>
      <div className="untree_co-section " style={{ marginBottom: '100px' }}>
        <div className="container">
          <div className="block">

            {/* --- ROW 1: Form & Social Banner --- */}
            <div className="row justify-content-between mb-5">

              <div className="col-lg-7 mb-5 mb-lg-0">
                <h3 className="mb-4 fw-bold " style={headingStyle}>{t('contact.title')}</h3>
                <form onSubmit={handleSubmit}>

                  {/* Họ và tên */}
                  <div className="form-group mb-3">
                    <label className="fw-bold mb-1" htmlFor="fullname" style={headingStyle}>
                      {t('contact.label_fullname')}
                    </label>
                    <input type="text" className="form-control" id="fullname" required style={inputStyle} />
                  </div>

                  {/* Email & Số điện thoại */}
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="fw-bold mb-1" htmlFor="email" style={headingStyle}>
                          {t('contact.label_email')}
                        </label>
                        <input type="email" className="form-control" id="email" required style={inputStyle} />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="fw-bold mb-1" htmlFor="phone" style={headingStyle}>
                          {t('contact.label_phone')}
                        </label>
                        <input type="tel" className="form-control" id="phone" required style={inputStyle} />
                      </div>
                    </div>
                  </div>

                  {/* Nội dung */}
                  <div className="form-group mb-4">
                    <label className="fw-bold mb-1" htmlFor="message" style={headingStyle}>
                      {t('contact.label_message')}
                    </label>
                    <textarea name="message" className="form-control" id="message" cols="30" rows="5" required style={inputStyle}></textarea>
                  </div>

                  <button type="submit" className="btn rounded-pill py-3 px-5 fw-bold" style={{ backgroundColor: 'var(--brand-blue)', color: '#fff', border: 'none' }}>
                    {t('contact.btn_send')}
                  </button>
                </form>
              </div>

              {/* COL 2: Banner Theo Dõi (Socials) */}
              <div className="col-lg-4 m-5">
                <div
                  className="p-4"
                  style={{
                    border: '1px solid #17238b',
                    backgroundColor: 'var(--bg-card)',
                    borderRadius: '20px',
                    width: 'fit-content',
                    minWidth: '280px'
                  }}
                >
                  <h3 className="h3 mb-4 fw-bold" style={headingStyle}>{t('contact.follow_us')}</h3>

                  <ul className="list-unstyled social-icons m-0">
                    {/* Instagram */}
                    <li className="mb-4">
                      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="d-flex align-items-center text-decoration-none">
                        <span className="icon-wrap rounded-circle d-flex align-items-center justify-content-center me-3 shadow-sm" style={iconBgStyle}>
                          <i className="fa-brands fa-instagram fs-2" style={{ color: '#C13584' }}></i>
                        </span>
                        <span className="h5 mb-0 fw-semibold" style={headingStyle}>Instagram</span>
                      </a>
                    </li>

                    {/* Facebook */}
                    <li className="mb-4">
                      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="d-flex align-items-center text-decoration-none">
                        <span className="icon-wrap rounded-circle d-flex align-items-center justify-content-center me-3 shadow-sm" style={iconBgStyle}>
                          <i className="fa-brands fa-facebook-f fs-2" style={{ color: '#1877F2' }}></i>
                        </span>
                        <span className="h5 mb-0 fw-semibold" style={headingStyle}>Facebook</span>
                      </a>
                    </li>

                    {/* TikTok */}
                    <li className="mb-4">
                      <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="d-flex align-items-center text-decoration-none">
                        <span className="icon-wrap rounded-circle d-flex align-items-center justify-content-center me-3 shadow-sm" style={iconBgStyle}>
                          <i className="fa-brands fa-tiktok fs-2" style={{ color: 'var(--text-heading)' }}></i>
                        </span>
                        <span className="h5 mb-0 fw-semibold" style={headingStyle}>TikTok</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* --- ROW 2: Thông tin liên hệ (Email, Hotline, Location) --- */}
            <div className="row mt-5 pt-5 border-top" style={{ borderColor: 'var(--border-color)' }}>

              {/* Email */}
              <div className="col-md-4 mb-4 mb-md-0 d-flex align-items-center justify-content-center justify-content-md-start">
                <img src={emailIcon} alt="Email" className="me-2" style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
                <div>
                  <h6 className="fw-bold mb-1" style={headingStyle}>Email</h6>
                  <p style={textStyle}>contact.shoefit@gmail.com</p>
                </div>
              </div>

              {/* Hotline */}
              <div className="col-md-4 mb-4 mb-md-0 d-flex align-items-center justify-content-center justify-content-md-start">
                <img src={hotlineIcon} alt="Hotline" className="me-2" style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
                <div>
                  <h6 className="fw-bold mb-1" style={headingStyle}>Hotline</h6>
                  <p style={textStyle}>+1 294 3925 3939</p>
                </div>
              </div>

              {/* Location */}
              <div className="col-md-4 d-flex align-items-center justify-content-center justify-content-md-start">
                <img src={locationIcon} alt="Location" className="me-2" style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
                <div>
                  <h6 className="fw-bold mb-1" style={headingStyle}>Location</h6>
                  <p style={textStyle}>{t('contact.address')}</p>
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