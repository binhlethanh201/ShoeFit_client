import React from "react";
import img1 from "../../assets/images/tryon2-grid.jpg";
import img2 from "../../assets/images/tryon-grid.jpg";
import img3 from "../../assets/images/tryon3-grid.png";

const AIRender = () => (
  <div className="we-help-section">
    <div className="container">
      <div className="row justify-content-between">
        <div className="col-lg-7 mb-5 mb-lg-0">
          <div className="imgs-grid">
            <div className="grid grid-1">
              <img src={img1} alt="Interior Design 1" />
            </div>
            <div className="grid grid-2">
              <img src={img2} alt="Interior Design 2" />
            </div>
            <div className="grid grid-3">
              <img src={img3} alt="Interior Design 3" />
            </div>
          </div>
        </div>
        <div className="col-lg-5 ps-lg-5">
          <h2 className="section-title mb-4">AI and VR Try-on</h2>
          <p>
            ShoeFit is the first application in Vietnam that combines AI and 3D technology to help users virtually try on real shoes, choose the right size, and suggest personalized outfits – bringing a confident, convenient, and stylish online shoe shopping experience.
          </p>
          <ul className="list-unstyled custom-list my-4">
            <li>MADE FOR VIETNAM</li>
            <li>AI SIZE ASSISTANT</li>
            <li>3-IN-1 SMART EXPERIENCE</li>
            <li>ACCESSIBLE PRICING</li>
          </ul>
          <p><a href="/explore" className="btn">Explore</a></p>
        </div>
      </div>
    </div>
  </div>
);

export default AIRender;
