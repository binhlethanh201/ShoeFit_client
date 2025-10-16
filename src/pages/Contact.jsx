import React from "react";
import "../assets/css/bootstrap.min.css";
import "../assets/css/tiny-slider.css";
import "../assets/css/style.css";
import "../assets/js/bootstrap.bundle.min.js";
import "../assets/js/tiny-slider.js";
import "../assets/js/custom.js";

import Header from "../components/partials/Header.jsx";
import NewProduct from "../components/products/NewProduct.jsx";

const Contact = () => {
  return (
    <>
      <Header activePage="contact" />
        <NewProduct/>
      <div className="untree_co-section">
        <div className="container">
          <div className="block">
            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-8 pb-4">
                {/* Contact info */}
                <div className="row mb-5">
                  <div className="col-lg-4">
                    <div className="service d-flex align-items-center no-shadow link horizontal active">
                      <div className="service-icon color-1 mb-4">
                        <i className="bi bi-geo-alt-fill"></i>
                      </div>
                      <div className="service-contents">
                        <p>43 Raymouth Rd. Baltemoer, London 3910</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="service d-flex align-items-center no-shadow link horizontal active">
                      <div className="service-icon color-1 mb-4">
                        <i className="bi bi-envelope-fill"></i>
                      </div>
                      <div className="service-contents">
                        <p>info@yourdomain.com</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="service d-flex align-items-center no-shadow link horizontal active">
                      <div className="service-icon color-1 mb-4">
                        <i className="bi bi-telephone-fill"></i>
                      </div>
                      <div className="service-contents">
                        <p>+1 294 3925 3939</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact form */}
                <form>
                  <div className="row">
                    <div className="col-6">
                      <div className="form-group">
                        <label className="text-black" htmlFor="fname">
                          First name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="fname"
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label className="text-black" htmlFor="lname">
                          Last name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="lname"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="text-black" htmlFor="email">
                      Email address
                    </label>
                    <input type="email" className="form-control" id="email" />
                  </div>

                  <div className="form-group mb-5">
                    <label className="text-black" htmlFor="message">
                      Message
                    </label>
                    <textarea
                      className="form-control"
                      id="message"
                      cols="30"
                      rows="5"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary-hover-outline"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Contact;
