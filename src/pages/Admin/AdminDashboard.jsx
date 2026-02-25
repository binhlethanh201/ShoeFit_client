import React, { useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import authService from "../../services/authService";
import "../../assets/css/admin/admin.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  useEffect(() => {
    document.body.classList.add("admin-body");
    return () => {
      document.body.classList.remove("admin-body");
    };
  }, []);

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes("products")) return "products";
    if (path.includes("categories")) return "categories";
    if (path.includes("attributes")) return "attributes";
    return "dashboard";
  };

  const getNavLinkClass = (tabName) => {
    const isActive = getActiveTab() === tabName;
    return `nav-link w-100 text-start border-0 ${isActive ? "active" : ""}`;
  };

  return (
    <div className="container-fluid admin-wrapper">
      <div className="row">
        <nav
          className="col-md-2 d-none d-md-block sidebar vh-100 position-fixed"
          style={{ zIndex: 100 }}
        >
          <div className="position-sticky px-2">
            <div className="mb-5 px-3 d-flex align-items-center pt-4">
              <div
                className="bg-dark text-white rounded-circle d-flex align-items-center justify-content-center me-2"
                style={{ width: 32, height: 32 }}
              >
                <i className="fa-solid fa-shoe-prints small"></i>
              </div>
              <span
                className="fw-bold text-dark"
                style={{ fontSize: "18px", letterSpacing: "-0.5px" }}
              >
                ShoeFit Admin
              </span>
            </div>

            <ul className="nav flex-column gap-1">
              <li className="nav-item">
                <button
                  className={getNavLinkClass("dashboard")}
                  onClick={() => navigate("/admin/dashboard")}
                >
                  <i
                    className="fa-solid fa-chart-pie me-3"
                    style={{ width: 20 }}
                  ></i>{" "}
                  Tổng quan
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={getNavLinkClass("categories")}
                  onClick={() => navigate("/admin/dashboard/categories/page/1")}
                >
                  <i
                    className="fa-solid fa-layer-group me-3"
                    style={{ width: 20 }}
                  ></i>{" "}
                  Danh mục
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={getNavLinkClass("attributes")}
                  onClick={() => navigate("/admin/dashboard/attributes/page/1")}
                >
                  <i
                    className="fa-solid fa-tags me-3"
                    style={{ width: 20 }}
                  ></i>{" "}
                  Thuộc tính
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={getNavLinkClass("products")}
                  onClick={() => navigate("/admin/dashboard/products/page/1")}
                >
                  <i
                    className="fa-solid fa-box-open me-3"
                    style={{ width: 20 }}
                  ></i>{" "}
                  Sản phẩm
                </button>
              </li>
            </ul>

            <div className="mt-auto pt-5 px-3">
              <button
                className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center"
                onClick={handleLogout}
              >
                <i className="fa-solid fa-arrow-right-from-bracket me-2"></i>{" "}
                Đăng xuất
              </button>
            </div>
          </div>
        </nav>

        <main
          className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4"
          style={{ marginLeft: "16.666667%" }}
        >
          <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
            <h2 className="h4 fw-bold m-0 text-dark text-uppercase">
              {getActiveTab() === "dashboard"
                ? "Tổng quan"
                : `Quản lý ${getActiveTab()}`}
            </h2>
            <div className="d-flex align-items-center bg-white px-3 py-2 rounded-pill border">
              <span className="me-2 small text-secondary">Xin chào,</span>
              <span className="fw-bold text-dark me-2">
                {user?.username || "Admin"}
              </span>
              <div
                className="bg-light text-dark rounded-circle d-flex align-items-center justify-content-center border"
                style={{ width: 32, height: 32 }}
              >
                <i className="fa-solid fa-user small"></i>
              </div>
            </div>
          </div>

          <div className="admin-content-area">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
