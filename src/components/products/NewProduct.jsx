import React from "react";
import couchImg from '../../assets/images/converse.png'

const NewProduct = () => (
  <div className="hero">
    <div className="container">
      <div className="row justify-content-between">
        <div className="col-lg-5">
          <div className="intro-excerpt">
            <h1> <span className="d-block">Chuck Taylor All-Stars High-top Converse</span></h1>
            <p className="mb-4">
              Neweast sneaker of the week
            </p>
            <p>
              <a href="/shop" className="btn btn-secondary me-2">Try On</a>
              <a href="/explore" className="btn btn-white-outline">Shop Now</a>
            </p>
          </div>
        </div>
        <div className="col-lg-7">
          <div className="hero-img-wrap">
            <img src={couchImg} className="img-fluid" alt="Couch" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default NewProduct;
