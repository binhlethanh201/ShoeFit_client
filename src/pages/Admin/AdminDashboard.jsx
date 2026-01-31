import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";

import "../../assets/css/admin/admin.css";

import DashboardHome from "../../components/admin/DashboardHome";
import ProductManagement from "../../components/admin/ProductManagement";
import CategoryManagement from "../../components/admin/CategoryManagement";
import AttributeManagement from "../../components/admin/AttributeManagement";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  const [activeTab, setActiveTab] = useState("dashboard");

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

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardHome />;
      case "categories":
        return <CategoryManagement />;
      case "attributes":
        return <AttributeManagement />;
      case "products":
        return <ProductManagement />;
      default:
        return <DashboardHome />;
    }
  };

  const getNavLinkClass = (tabName) => {
    return `nav-link w-100 text-start border-0 ${
      activeTab === tabName ? "active" : ""
    }`;
  };

  return (
    <div className="container-fluid admin-wrapper">
      <div className="row">
        <nav
          className="col-md-2 d-none d-md-block sidebar vh-100 position-fixed"
          style={{ zIndex: 100 }}
        >
          <div className="position-sticky px-2">
            <div className="mb-5 px-3 d-flex align-items-center">
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
                  onClick={() => setActiveTab("dashboard")}
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
                  onClick={() => setActiveTab("categories")}
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
                  onClick={() => setActiveTab("attributes")}
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
                  onClick={() => setActiveTab("products")}
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
            <h2 className="h4 fw-bold m-0 text-dark">
              {activeTab === "dashboard"
                ? "Tổng quan"
                : activeTab === "categories"
                  ? "Danh mục sản phẩm"
                  : activeTab === "attributes"
                    ? "Thuộc tính biến thể"
                    : activeTab === "products"
                      ? "Danh sách sản phẩm"
                      : "Hệ thống"}
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

          <div className="admin-content-area">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
