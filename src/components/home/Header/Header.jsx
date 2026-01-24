import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import authService from "../../../services/authService";
import { toast } from "sonner";
import { ThemeContext } from "../../../context/ThemeContext";
import { useTranslation } from "react-i18next";

import heartIcon from "../../../assets/images/Effects/heart.svg";
import userIcon from "../../../assets/images/Effects/user.svg";
import sunIcon from "../../../assets/images/Effects/sun.svg";
import moonIcon from "../../../assets/images/Effects/moon.svg";
import coffeeIcon from "../../../assets/images/Effects/coffee.svg";
import "../../../assets/css/home/header/header.css";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { t } = useTranslation();

  const location = useLocation();
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");

  const isActive = (path) => {
    return location.pathname === path ? "nav-item active" : "nav-item";
  };

  const isFeaturesActive = [
    "/tryonvideo",
    "/tryon2d",
    "/styleadvisor",
  ].includes(location.pathname);

  const isChildActive = (path) => {
    return location.pathname === path
      ? "dropdown-item active-child"
      : "dropdown-item";
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await authService.logout();
      toast.success("Đăng xuất thành công!");
      navigate("/");
    } catch (error) {
      console.error("Lỗi đăng xuất:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
    }
  };

  const getCurrentThemeIcon = () => {
    if (theme === "dark") return moonIcon;
    if (theme === "coffee") return coffeeIcon;
    return sunIcon;
  };

  return (
    <nav
      className="custom-navbar navbar navbar-expand-md navbar-dark"
      aria-label="ShoeFit navigation bar"
    >
      <div className="container d-flex align-items-center justify-content-between">
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
          <Link className="navbar-brand fw-bold fs-3" to="/">
            ShoeFit<span>.</span>
          </Link>

          <ul className="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0 me-4">
            <li className={isActive("/")}>
              <Link className="nav-link" to="/">
                {t("header.home")}
              </Link>
            </li>

            <li
              className={`nav-item dropdown ${isFeaturesActive ? "active" : ""}`}
            >
              <a
                className="nav-link dropdown-toggle"
                href="/services"
                id="featuresDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {t("header.features") || "Tính năng"}
              </a>
              <ul
                className="dropdown-menu shadow-sm border-0"
                aria-labelledby="featuresDropdown"
              >
                <li>
                  <Link
                    className={isChildActive("/tryonvideo")}
                    to="/tryonvideo"
                  >
                    <i className="fas fa-video me-2"></i>{" "}
                    {t("header.tryonvideo")}
                  </Link>
                </li>
                <li>
                  <Link className={isChildActive("/tryon2d")} to="/tryon2d">
                    <i className="fas fa-camera me-2"></i>
                    {t("header.tryon2d")}
                  </Link>
                </li>
                <li>
                  <Link
                    className={isChildActive("/styleadvisor")}
                    to="/styleadvisor"
                  >
                    <i className="fas fa-wand-magic-sparkles me-2"></i>{" "}
                    {t("header.styleadvisor")}
                  </Link>
                </li>
              </ul>
            </li>
            <li className={isActive("/collection")}>
              <Link className="nav-link" to="/collection">
                {t("header.collection")}
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3">
            <Link className="nav-link p-0" to="/wishlist">
              <img
                src={heartIcon}
                alt="Wishlist"
                width="22"
                style={{
                  filter: "var(--icon-filter)",
                  transition: "filter 0.3s ease",
                }}
              />
            </Link>
            <div className="dropdown custom-dropdown">
              <button
                className="btn dropdown-toggle p-0 bg-transparent border-0"
                type="button"
                id="userDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={userIcon}
                  alt="User"
                  width="24"
                  style={{
                    filter: "var(--icon-filter)",
                    transition: "filter 0.3s ease",
                  }}
                />
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end shadow-sm border-0"
                aria-labelledby="userDropdown"
              >
                {isLoggedIn ? (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/profile">
                        <i className="fa-regular fa-user me-2"></i>{" "}
                        {t("header.profile")}
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/settings">
                        <i className="fa-solid fa-gear me-2"></i>{" "}
                        {t("header.settings")}
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button
                        className="dropdown-item text-danger w-100 text-start bg-transparent border-0"
                        onClick={handleLogout}
                      >
                        <i className="fa-solid fa-right-from-bracket me-2"></i>{" "}
                        {t("header.logout")}
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/login">
                        <i className="fa-solid fa-right-to-bracket me-2"></i>{" "}
                        {t("header.login")}
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/register">
                        <i className="fa-solid fa-user-plus me-2"></i>{" "}
                        {t("header.register")}
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
            <div className="dropdown custom-dropdown">
              <button
                className="btn dropdown-toggle p-0 bg-transparent border-0"
                type="button"
                id="themeDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                title="Đổi giao diện"
              >
                <img
                  src={getCurrentThemeIcon()}
                  alt="Change Theme"
                  width="24"
                  style={{
                    filter: "var(--icon-filter)",
                    transition: "filter 0.3s ease",
                  }}
                />
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end shadow-sm border-0"
                aria-labelledby="themeDropdown"
                style={{ minWidth: "150px" }}
              >
                <li>
                  <button
                    className={`dropdown-item ${
                      theme === "light" ? "active" : ""
                    }`}
                    onClick={() => toggleTheme("light")}
                    type="button"
                  >
                    ☀️ {t("common.light")}
                  </button>
                </li>
                <li>
                  <button
                    className={`dropdown-item ${
                      theme === "dark" ? "active" : ""
                    }`}
                    onClick={() => toggleTheme("dark")}
                    type="button"
                  >
                    🌙 {t("common.dark")}
                  </button>
                </li>
                <li>
                  <button
                    className={`dropdown-item ${
                      theme === "coffee" ? "active" : ""
                    }`}
                    onClick={() => toggleTheme("coffee")}
                    type="button"
                  >
                    ☕ {t("common.coffee")}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
