import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";

// Import các components con
import DashboardHome from "../../components/admin/DashboardHome";
import ProductManagement from "../../components/admin/ProductManagement";
import CategoryManagement from "../../components/admin/CategoryManagement";
import AttributeManagement from "../../components/admin/AttributeManagement";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  const [activeTab, setActiveTab] = useState("dashboard");

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
    return `nav-link text-start w-100 border-0 ${
      activeTab === tabName
        ? "active bg-primary text-white"
        : "text-dark bg-transparent"
    }`;
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* --- SIDEBAR --- */}
        <nav className="col-md-2 d-none d-md-block bg-light sidebar vh-100 py-3 shadow-sm">
          <div className="position-sticky">
            <h4
              className="px-3 fw-bold mb-4"
              style={{ color: "var(--brand-blue)" }}
            >
              <i className="fa-solid fa-shield-halved me-2"></i> Admin
            </h4>

            <ul className="nav flex-column gap-2">
              <li className="nav-item">
                <button
                  className={getNavLinkClass("dashboard")}
                  onClick={() => setActiveTab("dashboard")}
                >
                  <i className="fa-solid fa-house me-2"></i> Dashboard
                </button>
              </li>

              <li className="nav-item">
                <button
                  className={getNavLinkClass("categories")}
                  onClick={() => setActiveTab("categories")}
                >
                  <i className="fa-solid fa-layer-group me-2"></i> Quản lý danh
                  mục
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={getNavLinkClass("attributes")}
                  onClick={() => setActiveTab("attributes")}
                >
                  <i className="fa-solid fa-tags me-2"></i> Quản lý thuộc tính
                </button>
              </li>

              <li className="nav-item">
                <button
                  className={getNavLinkClass("products")}
                  onClick={() => setActiveTab("products")}
                >
                  <i className="fa-solid fa-box me-2"></i> Quản lý sản phẩm
                </button>
              </li>
            </ul>

            <div className="mt-5 px-3">
              <hr />
              <button
                className="btn btn-outline-danger w-100"
                onClick={handleLogout}
              >
                <i className="fa-solid fa-right-from-bracket me-2"></i> Đăng
                Xuất
              </button>
            </div>
          </div>
        </nav>

        {/* --- MAIN CONTENT --- */}
        <main
          className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4"
          style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}
        >
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-4 border-bottom">
            <h1 className="h2">
              {activeTab === "dashboard"
                ? "Tổng quan"
                : activeTab === "categories"
                  ? "Quản lý danh mục"
                  : activeTab === "attributes"
                    ? "Quản lý thuộc tính"
                      : activeTab === "products"
                        ? "Quản lý sản phẩm"
                            : "Cấu hình hệ thống"}
            </h1>
            <div className="d-flex align-items-center">
              <span className="me-3">
                Xin chào, <strong>{user?.username || "Admin"}</strong>
              </span>
              <div
                className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center"
                style={{ width: 40, height: 40 }}
              >
                A
              </div>
            </div>
          </div>

          <div className="admin-content-area bg-white p-4 rounded shadow-sm">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
