import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Import Images
import footerImg from '../../../assets/images/Effects/footer_img.png';
import envelopeIcon from '../../../assets/images/Effects/envelope-outline.svg';

const Footer = () => {
  const { t } = useTranslation(); 

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
                <span>{t('footer.subscribe_title')}</span>
              </h3>
              <form className="row g-3" onSubmit={(e) => e.preventDefault()}>
                <div className="col-auto">
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder={t('footer.placeholder_name')} 
                  />
                </div>
                <div className="col-auto">
                  <input 
                    type="email" 
                    className="form-control" 
                    placeholder={t('footer.placeholder_email')} 
                  />
                </div>
                <div className="col-auto">
                  <button className="btn btn-blue" type="submit">
                    <span className="fa fa-paper-plane"></span> {t('footer.send')}
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
            <p className="mb-4">{t('footer.slogan')}</p>
            
            {/* Social Icons */}
            <ul className="list-unstyled custom-social d-flex gap-3 mb-4">
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-instagram"></i>
                </a>
              </li>
              <li>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-tiktok"></i>
                </a>
              </li>
            </ul>
          </div>

          {/* Footer Links */}
          <div className="col-lg-7 ms-auto">
            <div className="row links-wrap">
              <div className="col-6 col-md-6">
                <ul className="list-unstyled">
                  <li className="mb-2"><Link to="/about">{t('footer.about_us')}</Link></li>
                  <li className="mb-2"><Link to="/services">{t('footer.services')}</Link></li>
                  <li className="mb-2"><Link to="/blog">{t('footer.blog')}</Link></li>
                  <li className="mb-2"><Link to="/contact">{t('footer.contact')}</Link></li>
                </ul>
              </div>
              <div className="col-6 col-md-6">
                <ul className="list-unstyled">
                  <li className="mb-2"><Link to="#">{t('footer.support')}</Link></li>
                  <li className="mb-2"><Link to="#">{t('footer.team')}</Link></li>
                  <li className="mb-2"><Link to="#">{t('footer.leadership')}</Link></li>
                  <li className="mb-2"><Link to="#">{t('footer.privacy_policy')}</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="copyright border-top pt-4 mt-4">
          <div className="row align-items-center">
            <div className="col-lg-6 text-center text-lg-start">
              <p className="mb-0">&copy; 2025 ShoeFit. {t('footer.copyright')}</p>
            </div>
            <div className="col-lg-6 text-center text-lg-end">
              <ul className="list-unstyled d-inline-flex mb-0 gap-4">
                <li><Link to="#">{t('footer.terms')}</Link></li>
                <li><Link to="#">{t('footer.privacy')}</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;