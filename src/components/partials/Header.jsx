import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import userIcon from "../../assets/images/user.svg";
import cartIcon from "../../assets/images/wishlist.svg";

const Header = () => {
  const location = useLocation();
  const path = location.pathname;

  // Trạng thái mở/đóng dropdown user
  const [showDropdown, setShowDropdown] = useState(false);

  // Toggle dropdown khi rê chuột
  const handleMouseEnter = () => setShowDropdown(true);
  const handleMouseLeave = () => setShowDropdown(false);

  return (
    <nav className="custom-navbar navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          ShoeFit<span>.</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsFurni"
          aria-controls="navbarsFurni"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsFurni">
          <ul className="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
            <li className={`nav-item ${path === "/" ? "active" : ""}`}>
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className={`nav-item ${path === "/collection" ? "active" : ""}`}>
              <Link className="nav-link" to="/collection">Collection</Link>
            </li>
            <li className={`nav-item ${path === "/about" ? "active" : ""}`}>
              <Link className="nav-link" to="/about">About us</Link>
            </li>
            <li className={`nav-item ${path === "/services" ? "active" : ""}`}>
              <Link className="nav-link" to="/services">Services</Link>
            </li>
            <li className={`nav-item ${path === "/blog" ? "active" : ""}`}>
              <Link className="nav-link" to="/blog">Blog</Link>
            </li>
            <li className={`nav-item ${path === "/contact" ? "active" : ""}`}>
              <Link className="nav-link" to="/contact">Contact us</Link>
            </li>
          </ul>

          <ul className="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5">
            {/* Dropdown User */}
            <li
              className="nav-item dropdown"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                href="#"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded={showDropdown ? "true" : "false"}
                onClick={(e) => e.preventDefault()}
              >
                <img src={userIcon} alt="User" />
              </button>

              {showDropdown && (
                <ul
                  className="dropdown-menu show"
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "100%",
                    minWidth: "150px",
                  }}
                >
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/logout">
                      Logout
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Wishlist icon */}
            <li>
              <Link className="nav-link" to="/wishlist">
                <img src={cartIcon} alt="Wishlist" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
