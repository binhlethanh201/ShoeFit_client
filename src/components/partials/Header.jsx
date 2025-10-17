import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import userIcon from "../../assets/images/user.svg";
import cartIcon from "../../assets/images/wishlist.svg";

const Header = () => {
  const location = useLocation();
  const path = location.pathname;
  const [showDropdown, setShowDropdown] = useState(false);

  const handleMouseEnter = () => setShowDropdown(true);
  const handleMouseLeave = () => setShowDropdown(false);

  return (
    <nav className="custom-navbar navbar navbar-expand-md navbar-dark bg-dark py-3">
      <div className="container d-flex align-items-center justify-content-between">
        {/* Logo */}
        <Link className="navbar-brand fw-bold fs-3" to="/">
          ShoeFit<span className="text-primary">.</span>
        </Link>

        {/* Toggle button (mobile) */}
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

        {/* Menu */}
        <div className="collapse navbar-collapse" id="navbarsFurni">
          <ul className="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0 me-4">
            <li className={`nav-item ${path === "/" ? "active" : ""}`}>
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className={`nav-item ${path === "/services" ? "active" : ""}`}>
              <Link className="nav-link" to="/services">Services</Link>
            </li>
            <li className={`nav-item ${path === "/collection" ? "active" : ""}`}>
              <Link className="nav-link" to="/collection">Collection</Link>
            </li>
            <li className={`nav-item ${path === "/blog" ? "active" : ""}`}>
              <Link className="nav-link" to="/blog">Blog</Link>
            </li>
            <li className={`nav-item ${path === "/about" ? "active" : ""}`}>
              <Link className="nav-link" to="/about">About us</Link>
            </li>
            <li className={`nav-item ${path === "/contact" ? "active" : ""}`}>
              <Link className="nav-link" to="/contact">Contact us</Link>
            </li>
          </ul>

          {/* CTA + Icons */}
          <div className="d-flex align-items-center gap-3">
            {/* User Dropdown */}
            <div
              className="nav-item dropdown position-relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className="nav-link bg-transparent border-0 p-0"
                onClick={(e) => e.preventDefault()}
              >
                <img src={userIcon} alt="User" width="22" />
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
                    <Link className="dropdown-item" to="/profile">Profile</Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/logout">Logout</Link>
                  </li>
                </ul>
              )}
            </div>

            {/* Wishlist */}
            <Link className="nav-link p-0" to="/wishlist">
              <img src={cartIcon} alt="Wishlist" width="22" />
            </Link>

            {/* Join App Button */}
            <Link
              to="/tryonAR"
              className="btn btn-primary rounded-pill px-4 py-2 fw-semibold shadow-sm"
              style={{
                background: "#00C39A",
                border: "none",
                transition: "0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.background = "#00a982")}
              onMouseLeave={(e) => (e.target.style.background = "#00C39A")}
            >
              Join App
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
